<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Filliere extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'degree'];

    public function users(){
        return $this->belongsToMany(User::class);
    }
    public function courses(){
        return $this->belongsToMany(Course::class);
    }

}
