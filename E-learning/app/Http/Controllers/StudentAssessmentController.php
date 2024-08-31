<?php

namespace App\Http\Controllers;

use App\Http\Resources\AssessmentNoteResource;
use App\Http\Resources\AssessmentResource;
use App\Http\Resources\FilliereResource;
use App\Models\Assessment;
use App\Models\AssessmentNote;
use App\Models\Course;
use App\Models\Notification;
use DateTime;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class StudentAssessmentController extends Controller
{


    private function getAssessementNote($assessment){
        return AssessmentNote::query()
        ->where('assessment_id', $assessment->id)
        ->where('student_id', Auth::id())
        ->where('course_id', $assessment->course_id)
        ->get()[0];

    }

    public function index(Request $request){
        $user = $request->user();
        // Notification::query();

        $inProgressAssessment = AssessmentNoteResource::collection(
            AssessmentNote::query()
                ->with('student', 'course', 'assessment')
                ->where('student_id', $user->id)
                ->where('status', 'in_progress')
                ->get());
        $missedAssessment = AssessmentNoteResource::collection(
            AssessmentNote::query()
                ->with('student', 'course', 'assessment')
                ->where('student_id', $user->id)
                ->where('status', 'missed')
                ->get());
        $completedAssessment = AssessmentNoteResource::collection(
            AssessmentNote::query()
                ->with('student', 'course', 'assessment')
                ->where('student_id', $user->id)
                ->where('status', 'completed')
                ->get());
        $completedId = AssessmentNote::query()
            ->where('status', 'missed')
            ->where('student_id', $user->id)
            ->pluck('assessment_id');
        $missedId = AssessmentNote::query()
            ->where('status', 'missed')
            ->where('student_id', $user->id)
            ->pluck('assessment_id');
        // dd($completedId);

        $msg = self::msg();

        $fillieres = FilliereResource::collection(
            $user->fillieres()
                ->with('courses.lessons', 'courses.assessments')
                ->get());
                
        return inertia('Users/Student/Assessment/Index', 
                compact(
                    'fillieres', 
                    'inProgressAssessment',
                    'missedAssessment', 
                    'completedAssessment', 
                    'msg', 
                    'completedId',
                    'missedId'
                )
            );

    }

    public function do_assessment(Assessment $assessment){

        $assessment->content = json_decode($assessment->content);

        $assessmentNote = $this->getAssessementNote($assessment);

        // dd($assessmentNote[0]->status);

        if($assessmentNote->status === 'missed'){
            $msg = 'Vous avez raté le devoir sur ' . $assessment->title;
            return redirect(route('student.assessment.index'))->with('warning', $msg);
        }

        else if($assessmentNote->status === 'completed' && $assessmentNote->sent_time){
            $msg = 'Vous avez déjà complété le devoir sur ' . $assessment->title;
            return redirect(route('student.assessment.index'))->with('warning', $msg);
        }
                
        return inertia('Users/Student/Assessment/Todo', compact('assessment'));

    }

    public function store_assessment(Request $request, Assessment $assessment){
        $this->save_assessment($request, $assessment, 'store');

        return inertia('Users/Student/Assessment/Todo', compact('assessment'));
       
    }

    public function submit_assessment(Request $request, Assessment $assessment){
        $this->save_assessment($request, $assessment, 'submit');
        
        return redirect(route('student.assessment.index'))->with('success', 'Devoir soummis avec succes!');
       
    }
    public function missed_assessment(Request $request){
        $data = $request->validate([
            'missed' => 'nullable|array',
            'completed' => 'nullable|array'
        ]);

        $data['status'] = 'missed';
        $data['student_id'] = $request->user()->id;
        foreach ($data['missed'] as $d) {
            $data['assessment_id'] = $d['assessment_id'];
            $data['course_id'] = $d['course_id'];
            $data['content'] = json_encode($d['content']); 
            // dd($data);  
            AssessmentNote::create($data);

        }
        $assessment = Assessment::findOrFail($data['assessment_id']);

        $object = 'Devoir Manqué' ;
        $content =  Auth::user()->name . ' a raté son devoir('. $assessment->name . ')';

        $instructor = Course::findOrFail($data['course_id'])->professeur();

        $this->notification(Auth::id(), $instructor, $object, $content);
        $msg = 'Vous avez raté un nouveau devoir';

        return redirect(route('student.assessment.index'))->with('warning', $msg);
       
    }

    private function save_assessment($request, $assessment, $status){ 
        $data = $request->validate([
            'assessment_id' => 'required|integer|exists:assessments,id',
            'content' => 'required|array',
            'course_id' => 'required|integer|exists:courses,id',
        ]);

        $data['status'] = $status;
        $data['student_id'] = $request->user()->id;
        // $data['assessment_id'] = $assessment->id;
        $data['content'] = json_encode($data['content']);
        $status === 'submit' && $data['sent_time'] = new DateTime();
        unset($data['id']);

        //mis a jour des notes devoir pour l'eleve 
        AssessmentNote::query()
            ->where('assessment_id', $data['assessment_id'])
            ->where('student_id', $data['student_id'])
            ->where('course_id', $data['course_id'])
            ->update($data);

        // notification pour le professeur
        $object = $status === 'submit' ? 
            'Soumission Devoir':
            'Début Devoir' ;
        $content = $status === 'submit' ? 
            Auth::user()->name . ' a soummis son devoir('. $assessment->name . ')' :
            Auth::user()->name . ' vient de commencer le devoir sur ' . $assessment->name;

        $instructor = Course::findOrFail($data['course_id'])->professeur();

        $this->notification(Auth::id(), $instructor, $object, $content);
        

        
    }

    
}
