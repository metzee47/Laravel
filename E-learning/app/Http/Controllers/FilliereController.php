<?php

namespace App\Http\Controllers;

use App\Http\Requests\FilliereRequest;
use App\Http\Resources\CourseResource;
use App\Http\Resources\FilliereResource;
use App\Http\Resources\UserResource;
use App\Models\Course;
use App\Models\Filliere;
use App\Models\User;
use Illuminate\Http\Request;

class FilliereController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Filliere::query();

        if($search = $request['search'])
            $query->where('name', 'LIKE', "%" . $search . "%");

        if ($sortBy = $request['sortBy']) {
                $query->orderBy($sortBy);
            }
    
        if ($display = $request['display']) {
            $query->where('degree', $display);
        }

        $fillieres = $query->paginate(10);

        return inertia('Dashbord/Filliere/Index', 
            [
                'fillieres' => FilliereResource::collection($fillieres),
                'msg' => ['success' => session('success'), 'danger' => session('danger')],
                'params' => $request->query() ?: ['' => '']
            ]);
        
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        // dd(Filliere::findOrFail(1)->users());

        $courses = CourseResource::collection(Course::query()->orderBy('name')->get());
        $students = UserResource::collection(User::query()->where('role', 'etudiant')->orderBy('name')->get());
        $instructors = UserResource::collection(User::query()->where('role', 'professeur')->orderBy('name')->get());
        $success = session('success');
        $courses = CourseResource::collection(Course::query()->orderBy('name')->get());
        return inertia('Dashbord/Filliere/Create',
                    compact(
                        'success', 
                        // 'filliere',
                        'courses',
                        'students',
                        'instructors',
                        // 'related_courses',
                        // 'related_users',
                    ));
        
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(FilliereRequest $request)
    {
        $data = $request->validated();
        $filliere = Filliere::create($data);

        $data['users'] = array_merge($data['students'], $data['instructors']);
        $filliere->courses()->sync($data['courses']);
        $filliere->users()->sync($data['users']);

        $msg = 'Nouvelle filliere ajoutée avec succes.';
        return back()->with('success', $msg);
        // dd($data['users'] );
    }

    /**
     * Display the specified resource.
     */
    public function show(Filliere $filliere)
    {
        $instructors = UserResource::collection($filliere->users()->where('role', 'professeur')->orderBy('name')->get());
        $students = UserResource::collection($filliere->users()->where('role', 'etudiant')->orderBy('name')->get());
        $courses = CourseResource::collection($filliere->courses()->orderBy('name')->get());

        return inertia('Dashbord/Filliere/Show', compact('filliere', 'instructors', 'courses', 'students'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Filliere $filliere)
    {
        $courses = CourseResource::collection(Course::query()->orderBy('name')->get());
        $students = UserResource::collection(User::query()->where('role', 'etudiant')->orderBy('name')->get());
        $instructors = UserResource::collection(User::query()->where('role', 'professeur')->orderBy('name')->get());
        $success = session('success');
        $filliere = new FilliereResource($filliere);
        // // dd($filliere);
        $related_courses = $filliere->courses()->pluck('id');
        $related_students = $filliere->users()->where('role','etudiant')->pluck('id');
        $related_instructors = $filliere->users()->where('role','professeur')->pluck('id');
        // dd($related_users);
        return inertia('Dashbord/Filliere/Edit', 
            compact(
                'success', 
                'filliere',
                'courses',
                'students',
                'instructors',
                'related_courses',
                'related_students',
                'related_instructors',
            ));
        
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(FilliereRequest $request, Filliere $filliere)
    {
        $data = $request->validated();

        $filliere->update($data);

        $data['users'] = array_merge($data['students'], $data['instructors']);
        $filliere->courses()->sync($data['courses']);
        $filliere->users()->sync($data['users']);

        $msg = 'Nouvelle modification effectuee sur ' . $filliere->name;
        return to_route('dashboardfilliere.index')->with('success', $msg);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Filliere $filliere)
    {
        $filliere->delete();
        $msg = 'Supression de la filliere ' . $filliere->name . '.';
        return to_route('dashboardfilliere.index')->with('danger', $msg);
    }
}
