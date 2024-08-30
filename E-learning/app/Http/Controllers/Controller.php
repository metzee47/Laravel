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
    public function search($query, Request $request){

        

        // $query = User::query();

        // // Applique le filtre de recherche si nécessaire
        // if($search = $request['search']){
        //     $query->where(function($query) use ($search){
        //         $query->where('name', 'LIKE', "%{$search}%")
        //             ->orWhere('email', 'LIKE', "%{$search}%")
        //             ->orWhere('address', 'LIKE', "%{$search}%");
        //     });
        // }

        // if ($sortBy = $request['sortBy']) {
        //     $query->orderBy($sortBy);
        // }

        // // Applique le filtre de type d'utilisateur si spécifié
        // if ($display = $request['display']) {
        //     $query->where('role', $display);
        // }

        // return $query;
    }
}
