
import ShowMessage from "@/Components/ShowMessage";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Body from "@/Layouts/Body";
import { Head, Link, router } from "@inertiajs/react";

export default function Show({auth, message}){
    
    message = message.data

    const handleDelete = (e, message) => {
        e.preventDefault();
        if(window.confirm(`Are you sure want to delete this message `))
            router.delete(route('dashboardmessage.destroy', message.id))
    }
    
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-end items-center px-5">
                    <div className="flex gap-4">
                        <Link
                            href={route('dashboardmessage.index')}
                            className="bg-sky-600 px-2 py-1 rounded-sm font-bold text-gray-800 hover:-translate-x-2 duration-200">Retour
                        </Link>
                        <Link
                            onClick={e => handleDelete(e, message)}
                            className="bg-red-600 px-2 py-1 rounded-sm font-bold text-slate-300 hover:translate-x-2 duration-200">Supprimer
                        </Link>
                    </div>
                </div>
            }
        >
            <Head title={message.id} />
            {/* <pre>{JSON.stringify(messages, undefined, 2)}</pre> */}
            <Body>
                <ShowMessage message={message}/>
            </Body>
        </AuthenticatedLayout>
    )
}
