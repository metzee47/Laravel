<?php

namespace App\Http\Controllers;

use App\Http\Resources\NotificationResource;
use App\Models\Course;
use App\Models\Filliere;
use App\Models\Message;
use App\Models\Notification;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Ramsey\Uuid\Type\Integer;

class NotificationController extends Controller
{
    public function dashbord(){
        $msg = session('warning');
        //users
        $totalUsers = User::query()->count();
        $totalStudents = User::query()->where('role', 'etudiant')->count();
        $totalInstructors = User::query()->where('role', 'professeur')->count();
        $totalAdmin = User::query()->where('role', 'admin')->count();
        $authUsers = User::query()->where('email_verified_at', '!=', 'NULL')->count();

        //messages
        $totalMessages = Message::query()->count();
        $myMessages = Message::query()->where('sent_to', Auth::id())->orWhere('sent_by',Auth::id())->count();
        $totalGot = Message::query()->where('sent_to', Auth::id())->count();
        $totalUnread = Message::query()->where('sent_to', Auth::id())->where('status', 'unread')->count();
        $totalSent = Message::query()->where('sent_by',Auth::id())->count();

        //fillieres
        $totalFillieres = Filliere::query()->count();

        //courses
        $totalCourses = Course::query()->count();
        // dd($totalUnread);
        $notifications = NotificationResource::collection(
            Notification::query()
                ->orderBy('created_at', 'desc')
                ->where('to', Auth::id())
                ->get()
        );
        
        return Inertia::render('Dashboard', compact(
            'msg', 
            'notifications', 
            'totalUsers',
            'authUsers',
            'totalStudents',
            'totalInstructors',
            'totalAdmin',
            'totalMessages',
            'totalGot',
            'totalUnread',
            'totalSent',
            'myMessages',
            'totalFillieres',
            'totalCourses'

        ));
    }

    public function delete_notif(Request $request){
        $data = $request->input();
        foreach ($data as $notif) {
            Notification::findOrFail($notif)->delete();
        }
        return back();
    }
}
