<?php

namespace App\Http\Controllers;

use App\Http\Requests\CourseRequest;
use App\Http\Resources\CourseResource;
use App\Http\Resources\UserResource;
use App\Models\Course;
use App\Models\User;
use Illuminate\Http\Request;

class CourseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        // dd(CourseResource::collection(Course::all()));
        $query = Course::query();

        if($search = $request['search'])
            $query->where('name', 'LIKE', "%" . $search . "%");

        if ($sortBy = $request['sortBy']) {
                $query->orderBy($sortBy);
            }
        
        if ($display = $request['display']) {
            $query->where('duration', $display);
        }
        $courses = $query->paginate(10);

        return inertia('Dashbord/Course/Index', 
            [
                'courses' => CourseResource::collection($courses),
                'msg' => ['success' => session('success'), 'danger' => session('danger')],
                'params' => $request->query() ?: ['' => '']
            ]);

        // $instructors = UserResource::collection(User::query()->where('role', 'professeur')->orderBy('name')->get());

        // return inertia('Dashbord/Course/Create', ['success' => session('success'), 'instructors' => $instructors]);
        
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $instructors = UserResource::collection(User::query()->where('role', 'professeur')->orderBy('name')->get());

        return inertia('Dashbord/Course/Create', ['success' => session('success'), 'instructors' => $instructors]);
        
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CourseRequest $request)
    {
        $data = $request->validated();
        // dd($data);
        Course::create($data);
        $msg = 'Nouvel cours ajoute avec succes.';
        return back()->with('success', $msg);

    }

    /**
     * Display the specified resource.
     */
    public function show(Course $course)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Course $course)
    {
        $instructors = UserResource::collection(User::query()->where('role', 'professeur')->orderBy('name')->get());

        return inertia('Dashbord/Course/Edit', 
            [
                'success' => session('success'), 
                'course' => new CourseResource($course), 
                'instructors' => $instructors
            ]);
        
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(CourseRequest $request, Course $course)
    {
        $data = $request->validated();

        $course->update($data);
        $msg = 'Nouvelle modification effectuee sur ' . $course->name;
        return to_route('dashboardcourse.index')->with('success', $msg);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Course $course)
    {
        $course->delete();
        $msg = 'Supression du cours ' . $course->name . '.';
        return to_route('dashboardcourse.index')->with('danger', $msg);
    }
}
