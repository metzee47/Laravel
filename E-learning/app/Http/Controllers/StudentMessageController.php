<?php

namespace App\Http\Controllers;

// use App\Http\Requests\MessageRequest;
use App\Http\Resources\MessageResource;
use App\Http\Resources\UserResource;
use App\Models\Message;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

// use function PHPUnit\Framework\isEmpty;

class StudentMessageController extends Controller
{

    public function msg(){
        return [
            'success' => session('success'),
            'danger' => session('danger'),
            'warning' => session('warning')
        ];
    }
    
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
        $msg = $this->msg();

        return inertia('Users/Student/Message/Index', compact('messages', 'params', 'msg', 'user'));
    }

    public function create(){

        // $message = new MessageResource($message);compact('message')
        $instructors = UserResource::collection(User::query()->where('role', 'professeur')->get());

        return inertia('Users/Student/Message/Create', compact('instructors'));
    }
    public function store(Request $request){

        $data = $request->validate([
            'object' => 'required|in:information,demande,rappel',
            'content' => 'required|string|min:10',
            'destinataires' => 'required|in:admin,professeur',
            'sent_to' => 'nullable|array'
        ]);

        $data['sent_by'] = Auth::id();
        $msg = '';
        if($data['destinataires'] == 'admin'){
            $admin = User::query()->where('role', 'admin')->get();
            foreach ($admin as $user) {
                $data['sent_to'] = $user->id;
                Message::create($data);
                $msg = 'Message envoyé à Admin';
            }
        }

        elseif($data['destinataires'] == 'professeur'){
            // $admin = User::query()->where('role', 'admin')->get();
            foreach ($data['sent_to'] as $professeur) {
                $data['sent_to'] = $professeur;
                Message::create($data);

                $professeur = User::find($professeur);
                // dd($professeur);
                $msg = 'Message envoyé au professeur ' . $professeur->name;
            }
        }

        return redirect(route('student.message.index'))->with('success', $msg);
        
    }


    public function show(Message $message){
        if($message->sent_to == Auth::id()){
            $message->status = 'read';
            $message->update();
        }

        $message = new MessageResource($message);

        return inertia('Users/Student/Message/Show', compact('message'));
    }
}
