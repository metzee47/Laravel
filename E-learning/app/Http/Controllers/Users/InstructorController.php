<?php

namespace App\Http\Controllers\Users;

use App\Http\Controllers\Controller;
use App\Http\Resources\NotificationResource;
use App\Models\Notification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class InstructorController extends Controller
{
  
    public function home(){

        $msg = self::msg();
        $notifications = NotificationResource::collection(
            Notification::query()
                ->orderBy('created_at', 'desc')
                ->where('to', Auth::id())
                ->get()
        );
        return inertia('Users/Instructor/Home', compact('msg', 'notifications'));

    }
}
