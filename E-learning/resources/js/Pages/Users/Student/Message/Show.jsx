
import ShowMessage from "@/Components/ShowMessage";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Body from "@/Layouts/Body";
import { Head, Link } from "@inertiajs/react";

export default function Show({auth, message}){    
    message = message.data    
    // console.log(message);
    
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-end items-center px-5">
                    <div className="flex gap-4">
                        <Link
                            href={route('instructor.message.index')}
                            className="bg-sky-600 px-2 py-1 rounded-sm font-bold text-gray-800 hover:-translate-x-2 duration-200">Retour
                        </Link>
                        {/* <Link
                            onClick={e => handleDelete(e, message)}
                            className="bg-red-600 px-2 py-1 rounded-sm font-bold text-slate-300 hover:translate-x-2 duration-200">Supprimer
                        </Link> */}
                    </div>
                </div>
            }
        >
            <Head title={'message'} />
            <Body>
            {/* <pre>{JSON.stringify(message, undefined, 2)}</pre> */}

                <ShowMessage message={message}/>
            </Body>
        </AuthenticatedLayout>
    )
}
