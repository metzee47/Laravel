<?php

namespace App\Models;

use Illuminate\Support\Str;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Course extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'duration', 'description', 'teached_by'];

    public function professeur(){
        return $this->BelongsTo(User::class, 'teached_by');
    }

    public function lessons(){
        return $this->hasMany(Lesson::class);
    }
    public function fillieres(){
        return $this->belongsToMany(Filliere::class);
    }
    public function assessments(){
        return $this->hasMany(Assessment::class);
    }

    public function getSlug(){
        return Str::slug($this->name);
    }
}
