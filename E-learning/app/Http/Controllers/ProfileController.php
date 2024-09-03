<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use App\Models\User;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $data = $request->validated();
        $user = Auth::user();
        
        
        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        if($data['profil_image'] !== null){
            if($user->profil_image){    
                Storage::disk('public')->delete($user->profil_image); 
            }
            if($user->role === 'admin') $data['profil_image'] = $data['profil_image']->store('admin', 'public');
            else if($user->role === 'etudiant') $data['profil_image'] = $data['profil_image']->store('etudiant', 'public');
            else if($user->role === 'professeur') $data['profil_image'] = $data['profil_image']->store('professeur', 'public');
        }
        
        else
        $data['profil_image'] = $user->profil_image;
    // dd($data);
    User::find($user->id)->update($data);
    
    $object = 'Modification Utisateur' ;
    $content =  'A fait quelques modifications sur ses informations personnelles.';
    
    // $instructor = Course::findOrFail($data['course_id'])->professeur();
    $admin = User::query()->where('role', 'admin')->get();
    // dd($admin);
        foreach ($admin as $user) {
            $this->notification(Auth::id(),$user->id, $object, $content);
        }


        return Redirect::route('profile.edit');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $object = 'Suppression Utisateur' ;
        $content =  'A supprimé son compte.';

        // $instructor = Course::findOrFail($data['course_id'])->professeur();
        $admin = User::query()->where('role', 'admin')->get();
        foreach ($admin as $user) {
            $this->notification(Auth::id(),$user->id, $object, $content);
            dd($user);
        }

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        

        return Redirect::to('/');
    }
}
