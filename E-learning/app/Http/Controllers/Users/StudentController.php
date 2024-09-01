<?php

namespace App\Http\Controllers\Users;

use App\Http\Controllers\Controller;
use App\Http\Resources\NotificationResource;
use App\Models\Assessment;
use App\Models\AssessmentNote;
use App\Models\Course;
use App\Models\Notification;
use App\Models\User;
use DateTime;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class StudentController extends Controller
{

    
    public function home(){

        $msg = self::msg();
        $notifications = NotificationResource::collection(
            Notification::query()
                ->orderBy('created_at', 'desc')
                ->where('to', Auth::id())
                ->get()
        );
        return inertia('Users/Student/Home', compact('msg', 'notifications'));

    }

    public function delete_notif(Request $request){
        $this->delete_notif($request);
    }
}
