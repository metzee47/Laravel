<?php

namespace App\Http\Controllers\Users\Instructor;

namespace App\Http\Controllers;

// use App\Http\Requests\MessageRequest;

use App\Http\Resources\FilliereResource;
use App\Http\Resources\MessageResource;
use App\Http\Resources\UserResource;
use App\Models\Filliere;
use App\Models\Message;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

// use function PHPUnit\Framework\isEmpty;

class InstructorMessageController extends Controller

{

    
    
    public function index(Request $request){

        $user = $request->user();
        $query = Message::query();

        if(empty($request->query()))
            $query->where('sent_to' , $user->id)->where('status', 'unread');

            // dd(empty($request->query()));
        else{
            
            if ($display = $request['display']) {
                if($display == 'sent')
                    $query->where('sent_by', $user->id);
                else if($display == 'receive')
                    $query->where('sent_to' , $user->id);
                else{
                    $query->where('status', $display);

                    $query->where('sent_to', $user->id)->orWhere('sent_by', $user->id);
                }
            }
                        
            if ($sortBy = $request['sortBy']) {
                $query->orderBy($sortBy);
            }


        }

        
        // dd($request->query());
        
                    // dd($user);
        $messages = MessageResource::collection($query->orderBy('created_at', 'desc')->get());
        $params = $request->query() ?: ['' => ''];
        $msg = self::msg();

        return inertia('Users/Instructor/Message/Index', compact('messages', 'params', 'msg', 'user'));
    }

    public function create(Request $request){

        $user = $request->user();
        $students = UserResource::collection(User::query()->where('role', 'etudiant')->get());
        $fillieres = FilliereResource::collection($user->fillieres()->get());

        return inertia('Users/Instructor/Message/Create', compact('students', 'fillieres'));
    }
    public function store(Request $request){

        $data = $request->validate([
            'object' => 'required|in:information,demande,rappel',
            'content' => 'required|string|min:10',
            'destinataires' => 'required|in:admin,etudiant,fillieres',
            'sent_to' => 'nullable|array'
        ]);

        $data['sent_by'] = Auth::id();
        $msg = '';

        //notification
        $object = 'Message' ;
        $content =  'Vous avez recu un nouveau message.';

        if($data['destinataires'] == 'admin'){
            $admin = User::query()->where('role', 'admin')->get();
            foreach ($admin as $user) {
                $data['sent_to'] = $user->id;
                $data['file'] = $this->store_file($data);

                Message::create($data);
                $this->notification(Auth::id(),$user->id, $object, $content);

            }
            $msg = 'Message envoyé à Admin';

        }

        elseif($data['destinataires'] == 'etudiant'){
            // $admin = User::query()->where('role', 'admin')->get();
            foreach ($data['sent_to'] as $etudiant) {
                $data['sent_to'] = $etudiant;
                $data['file'] = $this->store_file($data);

                Message::create($data);
                $this->notification(Auth::id(),$etudiant, $object, $content);


                $etudiant = User::find($etudiant);
                // dd($etudiant);
                $msg = 'Message envoyé à l\'etudiant ' . $etudiant->name;
            }
        }

        elseif($data['destinataires'] == 'fillieres'){
            foreach ($data['sent_to'] as $filliere) {
                $filliere_users = Filliere::find($filliere)->users()->get();
                foreach ($filliere_users as $user) {
                    if ($user->role != 'professeur') {
                        $data['sent_to'] = $user->id;
                        $data['file'] = $this->store_file($data);
                        Message::create($data);
                    }
                    // dd($data);
                }
            }

            $msg = 'Message envoyé à tous les étudiants de la fillières sélectionnées:';
        }

        return redirect(route('instructor.message.index'))->with('success', $msg);
        
    }


    public function show(Message $message){
        if($message->sent_to == Auth::id()){
            $message->status = 'read';
            $message->update();
        }

        $message = new MessageResource($message);

        return inertia('Users/Instructor/Message/Show', compact('message'));
    }
}

