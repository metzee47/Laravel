<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AssessmentNote extends Model
{
    use HasFactory;

    protected $fillable = [
        'student_id',
        'assessment_id',
        'course_id',
        'note',
        'status',
        'sent_time'
    ];

    public function student(){
        return $this->belongsTo(User::class, 'student_id');
    }
    public function assessment(){
        return $this->belongsTo(Assessment::class, 'assessment_id');
    }
    public function course(){
        return $this->belongsTo(Course::class, 'course_id');
    }
    
}
