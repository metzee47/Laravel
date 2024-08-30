<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserRequest;
use App\Http\Resources\CourseResource;
use App\Http\Resources\FilliereResource;
use App\Http\Resources\UserResource;
use App\Models\Filliere;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rules\Password;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */

    public function msg(){
        return [
            'success' => session('success'),
            'danger' => session('danger'),
            'warning' => session('warning')
        ];
    } 

    public function index(Request $request)
    {
        $msg = $this->msg();
        $query = User::query();

        // Applique le filtre de recherche si nécessaire
        if($search = $request['search']){
            $query->where(function($query) use ($search){
                $query->where('name', 'LIKE', "%{$search}%")
                    ->orWhere('email', 'LIKE', "%{$search}%")
                    ->orWhere('address', 'LIKE', "%{$search}%");
            });
        }

        if ($sortBy = $request['sortBy']) {
            $query->orderBy($sortBy);
        }

        // Applique le filtre de type d'utilisateur si spécifié
        if ($display = $request['display']) {
            $query->where('role', $display);
        }

        $users = $query->paginate(10);
        return inertia('Dashbord/User/Index', ['users'=> UserResource::collection($users), 'msg' => $msg, 'params' => $request->query() ?: [''=>'']]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $fillieres = FilliereResource::collection(Filliere::query()->orderBy('name')->get());
        
        $msg = $this->msg();
        
        return inertia('Dashbord/User/Create', compact(
            'fillieres',
            'msg'
        ));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(UserRequest $request)
    {

        $data = $request->validated();

        $data['password'] = Hash::make($data['password']);
        if($data['profil_image']){            
            if($data['role'] === 'admin') $data['profil_image'] = $data['profil_image']->store('admin', 'public');
            else if($data['role'] === 'etudiant') $data['profil_image'] = $data['profil_image']->store('etudiant', 'public');
            else if($data['role'] === 'professeur') $data['profil_image'] = $data['profil_image']->store('professeur', 'public');
        }
        $user = User::create($data);
        if($data['fillieres'])
            $user->fillieres()->sync($data['fillieres']);

        $msg = 'Nouveau '. $data['role']. ' au nom de '. $data['name']. ' cree.';
        return back()->with('success', $msg);
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        
        $related_fillieres = $user->role !== 'admin' ? FilliereResource::collection($user->fillieres()->get()) : null;
        $courses = [];

        if($related_fillieres){
            foreach ($related_fillieres as $filliere) {
                $courses[$filliere->name] = CourseResource::collection(Filliere::find($filliere->id)->courses()->get());
            // dd(Filliere::find($filliere->id)->courses()->get());
    
            }
        }
        // dd($courses);
        $user = new UserResource($user);
        return inertia('Dashbord/User/Show', compact('user', 'related_fillieres', 'courses'));
        
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {

        $fillieres = FilliereResource::collection(Filliere::query()->orderBy('name')->get());

        $related_fillieres = $user->fillieres()->pluck('id');
        $msg = $this->msg();
        $user = new UserResource($user);
    
        return inertia('Dashbord/User/Edit', compact(
            'fillieres',
            'related_fillieres',
            'user',
            'msg'
        ));
        
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
    {
        $data = $request->validate([
            'name' => 'required|min:4',
            'email' => ['required', 'email'],
            'password' => ['nullable', 'confirmed', Password::defaults()],
            'role' => 'required|in:admin,etudiant,professeur',
            'address' => 'nullable|min:3',
            'profil_image' => 'nullable|image|max:2000',
            'fillieres' => 'nullable|exists:fillieres,id',
        ]);

        // dd($data);

        if($data['password'] === '' || $data['password'] === null)
            $data['password'] = $user->password;

        if($data['profil_image'] !== null){
            if($user->profil_image){     
                Storage::disk('public')->delete($user->profil_image);  
            }
            if($data['role'] === 'admin') $data['profil_image'] = $data['profil_image']->store('admin', 'public');
            else if($data['role'] === 'etudiant') $data['profil_image'] = $data['profil_image']->store('etudiant', 'public');
            else if($data['role'] === 'professeur') $data['profil_image'] = $data['profil_image']->store('professeur', 'public');
        }

        else
            $data['profil_image'] = $user->profil_image;
        
        $user->update($data);

        if(isset($data['fillieres']))
            $user->fillieres()->sync($data['fillieres']);

        $msg = 'Nouvelle modification effectue sur les informations de '. $data['name'];
        return back()->with('success', $msg);
        
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        $user->delete();
        $msg = 'Supression utilisateur au nom ' . $user->name . ' effectue';
        return to_route('dashboarduser.index')->with('danger', $msg);
    }
}
