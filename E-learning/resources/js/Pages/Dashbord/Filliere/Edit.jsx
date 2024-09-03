import FormFilliere from "@/Components/FormFilliere";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";

export default function Edit({
    auth, success, filliere, courses, students,
    related_courses, related_students }){


    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl shadow-inner shadow-black text-black dark:text-gray-200 leading-tight px-4 py-3 rounded-md w-fit">Modification utilisateur</h2>
                    <div className="flex gap-4">
                        <Link
                            href={route('dashboardfilliere.index')}
                            className="bg-sky-600 px-2 py-1 rounded-sm font-bold text-gray-800 hover:-translate-x-2 duration-200">Retour
                        </Link>
                        <Link
                            href={route('dashboardfilliere.show', filliere.data)}
                            className="bg-slate-900 px-2 py-1 rounded-sm font-bold text-slate-400 hover:translate-x-2 duration-200">Consulter
                        </Link>
                    </div>
                </div>
            }
        >
            <Head title="New Filliere" />
            {/* <pre>{JSON.stringify(related_courses, undefined, 2)}</pre> */}
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100 overflow-x-auto">
                            <FormFilliere 
                                msg={success} 
                                filliere={filliere.data} 
                                courses= {courses.data} 
                                // instructors = {instructors.data}
                                students = {students.data}
                                related_courses={related_courses}
                                // related_instructors={related_instructors}
                                related_students={related_students}
                                />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}