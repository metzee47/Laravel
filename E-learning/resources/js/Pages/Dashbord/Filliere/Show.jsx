import Pagination from "@/Components/Pagination";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import { FILLIERE_DEGREE } from "@/constant";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";

export default function Show({auth, filliere, instructors, courses, students}){
    
    instructors = instructors.data
    students = students.data
    courses = courses.data
    
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center px-5">
                    <h2 className="font-semibold text-xl shadow-inner shadow-black text-black dark:text-gray-200 leading-tight px-4 py-3 rounded-md w-fit">Tous les cours</h2>
                    <div className="flex gap-4">
                        <Link
                            href={route('dashboardfilliere.index')}
                            className="bg-sky-600 px-2 py-1 rounded-sm font-bold text-gray-800 hover:-translate-x-2 duration-200">Retour
                        </Link>
                        <Link
                            href={route('dashboardfilliere.edit', filliere)}
                            className="bg-teal-600 px-2 py-1 rounded-sm font-bold text-gray-800 hover:translate-x-2 duration-200">Editer
                        </Link>
                    </div>
                </div>
            }
        >
            <Head title={filliere.name} />
            {/* <pre>{JSON.stringify(fillieres, undefined, 2)}</pre> */}
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100 overflow-x-auto">

                            <div className="flex justify-between gap-5 mb-4 md:flex-wrap">

                                <div className="flex-1">
                                    <h3 className="mb-3 font-bold">Informations sur la filliere</h3>
                                    <div className="bg-gray-900 p-5 rounded-md shadow-inner shadow-slate-500">
                                        <div className="mb-2">
                                            <span className="text-slate-400">Name</span>
                                            <h3 className="text-2xl">{filliere.name}</h3>
                                        </div>
                                        <div className="mb-2">
                                            <span className="text-slate-400">Degree</span>
                                            <h3 className="text-lg">{FILLIERE_DEGREE[filliere.degree]}</h3>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex-1">
                                    <h3 className="mb-3 font-bold">Les professeurs</h3>
                                    <div className="bg-gray-900 p-5 rounded-md shadow shadow-slate-500">
                                        {
                                            instructors.map(instructor=>
                                                <div className="hover:translate-x-2 duration-150 my-2 px-3 py-1 bg-slate-800 text-slate-500 font-bold">
                                                    <Link 
                                                        href={route('dashboarduser.show', instructor)}
                                                        >
                                                        {instructor.name}
                                                    </Link>
                                                </div>
                                            )                                        
                                        }
                                    </div>
                                </div>

                                <div className="flex-1">
                                    <h3 className="mb-3 font-bold">Les cours associés</h3>
                                    <div className="bg-gray-900 p-5 rounded-md shadow shadow-slate-100">
                                        {
                                            courses.map(course=>
                                                <div className=" my-2 px-3 py-1 bg-slate-900 text-slate-400 font-bold">{course.name}</div>
                                            )

                                            
                                        }
                                    </div>
                                </div>

                            </div>

                            <div>
                                <h3 className="mb-3 font-bold">Les élèves de la filliere</h3>
                                <div>
                                    <table className="w-full text-sm text-nowrap bg-gray-900 shadow-md">
                                        <thead className="uppercase text-left text-slate-500 border-b-2 border-slate-300">
                                        <tr>
                                            <th className="px-2 py-3">Profil</th>
                                            <th className="px-2 py-3">Nom Complet</th>
                                            <th className="px-2 py-3">Contact Mail</th>
                                            <th className="px-2 py-3">Adresse</th>
                                            <th className="px-2 py-3">Note Moyenne</th>
                                            
                                        </tr>
                                        </thead>
                                        <tbody className="text-left">
                                        {
                                            students.map((student, i) => 
                                                <tr key={student.id} className={`p-2 text-gray-500 text-sm my-1 ${!i%2 && 'bg-slate-600 text-slate-300'}`}>
                                                    <td className={`px-1 py-1`}>
                                                        {
                                                            student.profil_image ? <img src={student.profil_image} className="h-10 w-16 object-cover object-top obj"/> :
                                                            <div className={`bg-slate-800 center text-xs p-2 w-fit`}>no profil</div>
                                                        }
                                                    </td>
                                                    <td className="px-1 py-1">
                                                        <Link 
                                                            href={route('dashboarduser.show', student)}
                                                            className="hover:underline"
                                                            >
                                                            {student.name}
                                                        </Link>
                                                    </td>
                                                    <td className="px-1 py-1">{student.email}</td>
                                                    <td className="px-1 py-1">{student.address}</td>
                                                    <td className="px-1 py-1">{}</td>
                                                </tr>
                                        )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}
