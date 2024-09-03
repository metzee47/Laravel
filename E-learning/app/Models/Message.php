<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    use HasFactory;

    protected $fillable = ['object', 'content', 'sent_to', 'sent_by', 'file'];

    public function sender(){
        return $this->belongsTo(User::class, 'sent_by');
    }
    public function receiver(){
        return $this->belongsTo(User::class, 'sent_to');
    }
}
