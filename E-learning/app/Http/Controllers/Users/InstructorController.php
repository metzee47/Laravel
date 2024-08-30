<?php

namespace App\Http\Controllers\Users;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class InstructorController extends Controller
{


    public static function msg(){

        return [
            'success' => session('success'),
            'warning' => session('warning'),
            'danger' => session('danger'),
        ];

    }
    
    public function home(){

        $msg = self::msg();
        return inertia('Users/Instructor/Home', compact('msg'));

    }
}
