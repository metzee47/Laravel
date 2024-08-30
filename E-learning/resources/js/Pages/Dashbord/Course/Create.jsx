import FormCourse from "@/Components/FormCourse";
import Pagination from "@/Components/Pagination";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Body from "@/Layouts/Body";
import { Head, Link } from "@inertiajs/react";

export default function Create({auth, success, instructors}){
    
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl shadow-inner shadow-black text-black dark:text-gray-200 leading-tight px-4 py-3 rounded-md w-fit">Nouveau utilisateur</h2>
                    <Link
                        href={route('dashboardcourse.index')}
                        className="bg-sky-600 px-2 py-1 rounded-sm font-bold text-gray-800 hover:-translate-x-2 duration-200">Retour</Link>
                </div>
            }
        >
            <Head title="New Course" />
            {/* <pre>{JSON.stringify(courses, undefined, 2)}</pre> */}
            <Body>
                <FormCourse msg={success} instructors={instructors}/>

            </Body>
        </AuthenticatedLayout>
    )
}