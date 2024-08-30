import FormFilliere from "@/Components/FormFilliere";
import Pagination from "@/Components/Pagination";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";

export default function Create({auth, success, courses, students, instructors}){
    
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl shadow-inner shadow-black text-black dark:text-gray-200 leading-tight px-4 py-3 rounded-md w-fit">Nouvelle Filliere</h2>
                    <Link
                        href={route('dashboardfilliere.index')}
                        className="bg-sky-600 px-2 py-1 rounded-sm font-bold text-gray-800 hover:-translate-x-2 duration-200">Retour</Link>
                </div>
            }
        >
            <Head title="New Filliere" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100 overflow-x-auto">
            {/* <pre>{JSON.stringify(students, undefined, 2)}</pre> */}

                            <FormFilliere msg={success} courses={courses.data} students={students.data} instructors={instructors.data}/>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}