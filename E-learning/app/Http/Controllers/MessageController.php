<?php

namespace App\Http\Controllers;

use App\Http\Requests\MessageRequest;
use App\Http\Resources\FilliereResource;
use App\Http\Resources\MessageResource;
use App\Http\Resources\UserResource;
use App\Models\Filliere;
use App\Models\Message;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class MessageController extends Controller
{

    
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Message::query();

        if ($sortBy = $request['sortBy']) {
            $query->orderBy($sortBy);
        }

        if ($display = $request['display']) {
            if($display == 'sent')
                $query->where('sent_by', Auth::id());
            else if($display == 'receive')
                $query->where('sent_to' , Auth::id());
            else
                $query->where('status', $display);
        }

        $msg = self::msg();

        $messages = MessageResource::collection($query->orderBy('created_at', 'desc')->paginate(15));
        $params = $request->query() ?: ['' => ''];
        return inertia('Dashbord/Message/Index', compact('messages', 'params', 'msg'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $students = UserResource::collection(User::query()->where('role', 'etudiant')->get());
        $instructors = UserResource::collection(User::query()->where('role', 'professeur')->get());
        $fillieres = FilliereResource::collection(Filliere::all());
        return inertia('Dashbord/Message/Create', compact(
            'students',
            'instructors',
            'fillieres'
        ));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(MessageRequest $request)
    {
        $data = $request->validated();
        $data['sent_by'] = Auth::user()->id;
        switch($data['destinataires']){
            case "fillieres":
                // dd($data['sent_to']);

                foreach ($data['sent_to'] as $filliere) {
                    $filliere_users = Filliere::find($filliere)->users()->get();
                    foreach ($filliere_users as $user) {
                        $data['sent_to'] = $user->id;
                        Message::create($data);
                        // dd($data);
                    }
                }
            case "etudiants":
                // dd($data);

                foreach ($data['sent_to'] as $etudiant) {
                    $data['sent_to'] = $etudiant;
                    Message::create($data);
                    // dd($data);
                }

            case "professeurs":
                // dd($data);
                
                foreach ($data['sent_to'] as $professeur) {
                    $data['sent_to'] = $professeur;
                    Message::create($data);
                    // dd($data);
                }
        }
        $msg = 'Message envoye avec succes.';

        return redirect(route('dashboardmessage.index'))->with('success', $msg);
        
    }

    /**
     * Display the specified resource.
     */
    public function show(Message $message)
    {
        $message = new MessageResource($message);
        return inertia('Dashbord/Message/Show', compact('message'));
    }
    

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Message $message)
    {
        $message->delete();
        $msg = 'Supression du message ' . $message->id . '.';
        return to_route('dashboardmessage.index')->with('danger', $msg);
    }
}
