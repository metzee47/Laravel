import Pagination from "@/Components/Pagination";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import { COURSE_DURATION } from "@/constant";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";

export default function Index({auth, courses, msg, params = {}}){
    const links = courses.meta.links
    courses = courses.data
    // params = params || {}
    const searchField = (name, value) =>{
        if(!value){
            delete(params[name])
        }

        else
            params[name] = value

        router.get(route('dashboardcourse.index'), params)
    }

    const onKeypress = e => {
        if(e.key !== 'Enter')
            return

        searchField(e.target.name, e.target.value)
    }

    const handleDelete = (e, course) => {
        e.preventDefault();
        if(window.confirm(`Are you sure want to delete course ` + course.name))
            router.delete(route('dashboardcourse.destroy', course.id))
    }
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center px-5">
                    <h2 className="font-semibold text-xl shadow-inner shadow-black text-black dark:text-gray-200 leading-tight px-4 py-3 rounded-md w-fit">Tous les cours</h2>
                    <Link
                        href={route('dashboardcourse.create')}
                        className="bg-teal-800 px-2 py-1 rounded-sm font-bold text-gray-800 hover:translate-x-2 duration-200">New Course</Link>
                </div>
            }
        >
            <Head title="Courses" />
            {/* <pre>{JSON.stringify(courses, undefined, 2)}</pre> */}
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100 overflow-x-auto">

                        {
                            msg?.danger &&
                                <div className="p-3 bg-red-800 font-bold text-gray-300 mb-3">{msg.danger}</div>
                        }
                        {
                            msg?.success &&
                                <div className="p-3 bg-teal-600 font-bold text-gray-800 mb-3">{msg.success}</div>
                        }

                        {/* <pre>{JSON.stringify(courses, undefined, 2)}</pre> */}

                        <div className="flex justify-around gap-4 mb-3">
                            <TextInput 
                                id = 'search'
                                name = 'search'
                                defaultValue = {params.search}
                                onBlur = {e=> searchField(e.target.name, e.target.value)}
                                onKeyPress = {e=> onKeypress(e)}
                                className =  'flex-1'
                                placeholder="Rechercher par nom."/>
                            <SelectInput
                                id = 'display'
                                name = 'display'
                                defaultValue = {params.display}
                                
                                onChange = {e=> searchField(e.target.name, e.target.value)}
                                className =  'flex-1'
                                >
                                <option value="">Afficher uniquement</option>
                                <option value="_1h">1heure</option>
                                <option value="_1h30">1h30mn</option>
                                <option value="_2h">2heures</option>
                                <option value="_2h30">2h30mn</option>
                                <option value="_3h">3heures</option>
                            </SelectInput>
                            <SelectInput
                                id = 'sortBy'
                                name = 'sortBy'
                                defaultValue = {params.sortBy}
                                onChange = {e=> searchField(e.target.name, e.target.value)}
                                className = 'flex-1'
                                >
                                <option value="">Trier par</option>
                                <option value="id">Id</option>
                                <option value="name">Nom</option>
                                <option value="name">Professeur</option>
                                <option value="created_at">Date de creation</option>
                                
                            </SelectInput>
                        </div>
                        <table className="w-full text-sm text-nowrap bg-gray-900 shadow-md">
                            <thead className="uppercase text-left text-slate-300 border-b-2 border-slate-300">
                                <tr>
                                    <th className="px-2 py-3">Id</th>
                                    <th className="px-2 py-3">Name</th>
                                    <th className="px-2 py-3">duration</th>
                                    <th className="px-2 py-3">teached by</th>
                                    <th className="px-2 py-3">date de creation</th>
                                    
                                    <th className="text-right px-2">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="text-left">
                                {
                                    courses.map(course => 
                                        <tr key={course.id} className="p-2 text-gray-500 hover:bg-slate-700 hover:text-slate-100 duration-200 my-1">
                                            <th className="px-2 py-3">{course.id}</th>
                                            <td className="px-2 py-3">{course.name}</td>
                                            <td className="px-2 py-3">{COURSE_DURATION[course.duration]}</td>
                                            <td className="px-2 py-3">{course.teached_by.name}</td>
                                            <td className="px-2 py-3">{course.created_at}</td>
                                            
                                            <td className="font-bold">
                                                <div className="flex gap-3 text-xs uppercase justify-end px-2 font-bold">
                                                    <Link 
                                                        href={route('dashboardcourse.edit', course.id)}
                                                        className="text-teal-800 hover:underline">
                                                        Edit
                                                    </Link>
                                                    <Link 
                                                        onClick={e=> handleDelete(e, course)}
                                                        className="text-red-800 hover:underline ">
                                                        Delete
                                                    </Link>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                            
                            {links.length > 3 && <Pagination links={links}></Pagination>}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}
