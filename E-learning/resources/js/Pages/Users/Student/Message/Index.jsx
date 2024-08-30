import MessageTable from "@/Components/MessageTable";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Body from "@/Layouts/Body";
import { Head, Link } from "@inertiajs/react";

export default function Index({auth, msg, messages, params}){
    messages = messages.data

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center gap-4">

                    <h2 className="font-semibold text-xl shadow-inner shadow-black text-black dark:text-gray-200 leading-tight px-4 py-3 rounded-md w-fit">Tous mes messages</h2>
                    <Link
                        href={route('instructor.message.create')}
                        className="bg-sky-600 px-2 py-1 rounded-sm font-bold text-gray-800 hover:translate-x-2 duration-200">Nouveau message
                    </Link>  
                </div>             
            }
            // msg={msg?.warning}
        >
            <Head title={`Instructor | ${auth.user.name}`}  />


            <Body>
            {/* <pre>{JSON.stringify(auth.user, undefined, 2)}</pre> */}

                {
                    msg?.danger &&
                        <div className="p-3 bg-red-800 font-bold text-gray-300 mb-3">{msg.danger}</div>
                }
                {
                    msg?.success &&
                        <div className="p-3 bg-teal-600 font-bold text-gray-800 mb-3">{msg.success}</div>
                }

                <MessageTable 
                    messages={messages} 
                    group_name={'instructor.message'} 
                    params={params}
                    url={'learner/message'}
                    user={auth.user}
                    />
            </Body>
        </AuthenticatedLayout>
    )
}