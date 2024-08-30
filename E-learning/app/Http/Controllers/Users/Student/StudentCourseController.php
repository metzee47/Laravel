<?php

namespace App\Http\Controllers\Users\Student;

use App\Http\Controllers\Controller;
use App\Http\Resources\FilliereResource;
use App\Models\Lesson;
use Illuminate\Http\Request;

class StudentCourseController extends Controller
{
    public function index(Request $request){

        $user = $request->user();
        $query = $user->courses();
    
        if($search = $request['search'])
            $query->where('name', 'LIKE', "%" . $search . "%");
        
        // dd($request->query());
        
                    // dd($user);
        $fillieres = FilliereResource::collection($user->fillieres()->with('courses.lessons')->get());
        // $courses = CourseResource::collection($query->with('lessons')->get());
        // dd($fillieres);
        $params = $request->query() ?: ['' => ''];

        return inertia('Users/Student/Course/Index', compact('fillieres', 'params'));
    }

    public function show_lesson(Lesson $lesson) 
    {
        $lesson->content = json_decode($lesson->content);
        return inertia('Users/Student/Course/ShowLesson', compact('lesson'));

    }
}
