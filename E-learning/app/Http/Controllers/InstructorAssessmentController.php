<?php

namespace App\Http\Controllers;

use App\Http\Resources\AssessmentNoteResource;
use App\Models\Assessment;
use App\Models\AssessmentNote;
use App\Models\Course;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Auth;

class InstructorAssessmentController extends Controller
{
    public function index(Request $request){

        $user = $request->user();
        $assessments = new Collection([]);
        $coursesId = Course::query()->where('teached_by', $user->id)->pluck('id');
        foreach ($coursesId as $id) {
            $submit_assessments = AssessmentNoteResource::collection(AssessmentNote::query()->with('course', 'assessment', 'student')->where('course_id', $id)->get());
            if (!$submit_assessments->isEmpty()) {
                $assessments->push($submit_assessments);
            }
        }

        $msg = self::msg();

        return inertia('Users/Instructor/Assessment/Index', compact('assessments', 'msg'));
    }
    public function correction($assessment, $student){

        $assessment = AssessmentNoteResource::collection(
            AssessmentNote::query()
            ->with('course', 'assessment', 'student')
            ->where('assessment_id', $assessment)    
            ->where('student_id', $student)          
            ->get()       
        );
        // dd($assessment);
        $assessment = $assessment[0];
        if ($assessment->status === 'in_progress') {
            $msg = 'Devoir pas encore soumis par l\'élève: Il n\'a pas encore acces à l\'épreuve';
            return back()->with('warning', $msg);
        }
        // $user = $request->user();
        // dd($assessment);

        

        // $assessment = $assessment;
        // dd($assessment->assessment);
        $assessment->content = json_decode($assessment->content);
// dd($assessment->content);
        return inertia('Users/Instructor/Assessment/Correction', compact('assessment'));
    }

    public function save_note(Request $request){
        $data = $request->validate([
            'assessment_id' => 'required|integer|exists:assessments,id',
            'course_id' => 'required|integer|exists:courses,id',
            'student_id' => 'required|integer|exists:users,id',
            'status' => 'required|in:missed,completed,in_progress',
            'note' => 'required|integer|min:0|max:20'
        ]);

        $assessmentNote = AssessmentNote::query()
            ->where('assessment_id', $data['assessment_id'])
            ->where('course_id', $data['course_id'])
            ->where('student_id', $data['student_id']);

        // $data['sent_time'] = $assessmentNote[0]->sent_time;
        // dd($data);

        // dd($assessmentNote->update());
        $assessmentNote->update($data);

        //alerte notification etudiant
        $assessment = Assessment::find($data['assessment_id']);
        $object = 'Correction devoir' ;
        $content =  'Votre note du devoir '.$assessment->title. ' est disponible.';

        // $instructor = Course::findOrFail($data['course_id'])->professeur();

        $this->notification(Auth::id(), $data['student_id'], $object, $content);
        
        return redirect(route('instructor.assessment.index'));
    }
}
