<?php

namespace App\Http\Controllers\Users\Instructor;

use App\Http\Controllers\Controller;
use App\Http\Resources\CourseResource;
use App\Http\Resources\FilliereResource;
use App\Models\Assessment;
use App\Models\AssessmentNote;
use App\Models\Course;
use App\Models\Filliere;
use App\Models\Lesson;
use App\Models\Notification;
use App\Models\User;
use DateTime;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class InstructorCourseController extends Controller
{
    public function msg(){
        return [
            'success' => session('success'),
            'danger' => session('danger'),
            'warning' => session('warning')
        ];
    }
    
    public function index(Request $request){

        $user = $request->user();
        $query = $user->courses();
    
        if($search = $request['search'])
            $query->where('name', 'LIKE', "%" . $search . "%");
        
        // dd($request->query());
        
                    // dd($user);
        $fillieres = FilliereResource::collection(
            $user->fillieres()
                ->with('courses.lessons', 'courses.assessments')
                ->get());
        // $courses = CourseResource::collection($query->with('lessons')->get());
        // dd($fillieres);
        $params = $request->query() ?: ['' => ''];
        $msg = $this->msg();

        return inertia('Users/Instructor/Course/Index', compact('fillieres', 'params', 'msg'));
    }

    // LESSON SECTION GENERATE STORE AND SHOW

    public function generate_lesson(Course $course)
    {
        $msg = $this->msg();
        return inertia('Users/Instructor/Course/Lesson/Generate', compact('course', 'msg'));

    }

    public function store_lesson(Course $course, Request $request)
    {
        $data = $request->validate([
            'title' => 'required|string|min:4',
            'content' => 'array',
        ]);
        $data['content'] = json_encode($data['content']);
        $data['course_id'] = $course->id;
        Lesson::create($data);
        $msg = 'Nouvelle leçon générée(' . $data['title'] . ') pour le cours ' . $course->name;
        // dd($data);
        return redirect(route('instructor.course.index'))->with('success', $msg);

    }


    public function show_lesson(Lesson $lesson) 
    {
        $lesson->content = json_decode($lesson->content);
        // dd($lesson);
        return inertia('Users/Instructor/Course/Lesson/ShowLesson', compact('lesson'));

    }


    // ASSESSMENT SECTION GENERATE STORE AND SHOW


    public function generate_assessment(Course $course)
    {
        $msg = $this->msg();       
        return inertia('Users/Instructor/Course/Assessment/Generate', compact('course', 'msg'));

    }

    public function store_assessment(Course $course, Request $request)
    {
        $data = $request->validate([
            'title' => 'required|string|min:4',
            'order' => 'required|integer',
            'duration' => 'required|in:_1h,_1h30,_2h,_2h30,_3h',
            'assessment_date' => 'required|date|after:tomorrow',
            'limit_date' => 'required|date|after:assessment_date',
            'content' => 'array',
        ]);
        $data['content'] = json_encode($data['content']);
        $data['course_id'] = $course->id;
        $assessment = Assessment::create($data);

        //avertissement de nouvelle notification a l'admin
        $date = new DateTime($data['assessment_date']);
        $object = 'Devoir';
        $content = 'Un nouveau devoir est prévu pour le '. date_format($date,'Y-m-d à H:s');
        $admin = User::query()->where('role', 'admin')->get();
        foreach ($admin as $user) {
            $this->notification(Auth::id(),$user->id, $object, $content);
        }
        
        //generation du devoir pour chaque etudiant de la filliere 
        $related_students = Course::findOrFail($course->id)->fillieres()->first()->users()->where('role', 'etudiant')->get();
        $assessmentNote['status'] = 'in_progress';
        $assessmentNote['assessment_id'] = $assessment->id;
        $assessmentNote['content'] = $data['content'];
        $assessmentNote['course_id'] = $data['course_id'];
        foreach ($related_students as $student) {
            $assessmentNote['student_id'] = $student->id;
            AssessmentNote::create($assessmentNote);

            //avertissement de nouvelle notification a l'etudiant
            $this->notification(Auth::id(),$user->id, $object, $content);

            // dd($assessmentNote);
        }
        
        $msg = 'Nouveau devoir du cours' .$course->name. ' généré pour la date du ' . date_format($date,'Y-m-d to H:s');
        return redirect(route('instructor.course.index'))->with('success', $msg);

    }


    public function show_assessment(Assessment $assessment) 
    {
        $assessment->content = json_decode($assessment->content);
        // dd($assessment);
        return inertia('Users/Instructor/Course/Assessment/ShowAssessment', compact('assessment'));

    }
}
