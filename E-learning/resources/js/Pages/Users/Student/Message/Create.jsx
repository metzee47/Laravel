import FormMessage from "@/Components/FormMessage";
import PopUp from "@/Components/PopUp";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Body from "@/Layouts/Body";
import { Head, Link } from "@inertiajs/react";

export default function Home({auth, instructors}){
    instructors = instructors.data
    
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center px-5">
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Nouveau message</h2>                    
                    <Link
                        href={route('instructor.message.index')}
                        className="bg-sky-600 px-2 py-1 rounded-sm font-bold text-gray-800 hover:-translate-x-2 duration-200">Retour
                    </Link>                    
                </div>                
            }
            // msg={msg?.warning}
        >
            <Head title={`Instructor | ${auth.user.name}`}/>

            
            <Body>
                <FormMessage instructors={instructors} role="etudiant"/>
            </Body>
        </AuthenticatedLayout>
    )
}