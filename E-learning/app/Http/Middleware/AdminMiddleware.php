<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class AdminMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
            // dd(Auth::user()->role);
            if(!Auth::check())
                return redirect(route('login'));
        // if($can_access)
        //     // dd(Auth::user());
            if(Auth::user()->role == 'admin')
                return $next($request);


            if(Auth::user()->role == 'etudiant')
                return redirect(route('student.home'))->with('warning', "Vous n'avez pas acces à l'administration.");

            return redirect(route('instructor.home'))->with('warning', "Vous n'avez pas acces à l'administration.");
            
        // $not_authorized = Auth::user()->role == 'etudiant' || Auth::user()->role == 'professeur';

        // if($not_authorized)
        //     return back()->with('warning', "Vous n'avez pas acces à l'administration.");

        // return back()->with('warning', "Vous n'avez pas acces à cette page.");

    }
}
