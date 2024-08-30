<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Assessment extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'order',
        'duration',
        'limit_date',
        'assessment_date',
        'content',
        'course_id'
    ];

    public function course(){
        return $this->belongsTo(Course::class, 'course_id');
    }
}
