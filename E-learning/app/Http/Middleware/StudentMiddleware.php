<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class StudentMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
            if(!Auth::check())
                return redirect(route('login'));

            $authorized = Auth::user()->role == 'etudiant';
        
            if($authorized)
                return $next($request);

            if(Auth::user()->role == 'admin')
                return redirect(route('dashboard'))->with('warning', "Vous n'avez pas acces à cette ressource.");
            
            return redirect(route('instructor.home'))->with('warning', "Vous n'avez pas acces à la page étudiant.");


        // if($not_authorized)
        //     return back()->with('warning', "Vous n'avez pas acces à l'administration.");

        // return back()->with('warning', "Vous n'avez pas acces à cette page.");

    }
}
