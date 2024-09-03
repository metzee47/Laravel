<?php

namespace App\Http\Controllers;

use App\Models\Notification;
use Illuminate\Http\Request;

abstract class Controller
{

    public function notification($from, $to, $object, $content){
        $notif['from'] = $from;
        $notif['to'] = $to;
        $notif['object'] = $object;
        $notif['content'] = $content;
        Notification::create($notif);
    }

    public static function msg(){

        return [
            'success' => session('success'),
            'warning' => session('warning'),
            'danger' => session('danger'),
        ];

    }

    public function delete_notif(Request $request){
        $data = $request->input();
        foreach ($data as $notif) {
            Notification::find($notif)->delete();
        }
        return back();
    }

    public function store_file($data){
        if($data['file'])     

            $data['file'] = $data['file']->store('message_files', 'public');
            // dd($data['file']);

        return $data['file'];
        
        
    }
}
