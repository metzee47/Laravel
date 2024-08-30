import FormUser from "@/Components/FormUser";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Body from "@/Layouts/Body";
import { Head, Link } from "@inertiajs/react";

export default function Edit({auth, msg, user, fillieres, related_fillieres}){
    user = user.data
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl shadow-inner shadow-black text-black dark:text-gray-200 leading-tight px-4 py-3 rounded-md w-fit">Modification utilisateur</h2>
                    <Link
                        href={route('dashboarduser.index')}
                        className="bg-teal-800 px-2 py-1 rounded-sm font-bold text-gray-800 hover:-translate-x-2 duration-200">Retour</Link>
                </div>
            }
        >
            <Head title="New User" />
            <Body>
                <FormUser 
                    msg={msg} 
                    user={user} 
                    fillieres={fillieres.data} 
                    related_fillieres={related_fillieres}
                />
            </Body>
                        
        </AuthenticatedLayout>
    )
}