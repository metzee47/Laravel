import Pagination from "@/Components/Pagination";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import { FILLIERE_DEGREE } from "@/constant";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";

export default function Index({auth, fillieres, msg, params = {}}){
    const links = fillieres.meta.links
    fillieres = fillieres.data
    // params = params || {}
    const searchField = (name, value) =>{
        if(!value){
            delete(params[name])
        }

        else
            params[name] = value

        router.get(route('dashboardfilliere.index'), params)
    }

    const onKeypress = e => {
        if(e.key !== 'Enter')
            return

        searchField(e.target.name, e.target.value)
    }

    const handleDelete = (e, filliere) => {
        e.preventDefault();
        if(window.confirm(`Are you sure want to delete filliere ` + filliere.name))
            router.delete(route('dashboardfilliere.destroy', filliere.id))
    }
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center px-5">
                    <h2 className="font-semibold text-xl shadow-inner shadow-black text-black dark:text-gray-200 leading-tight px-4 py-3 rounded-md w-fit">Tous les cours</h2>
                    <Link
                        href={route('dashboardfilliere.create')}
                        className="bg-teal-800 px-2 py-1 rounded-sm font-bold text-gray-800 hover:translate-x-2 duration-200">New Filliere</Link>
                </div>
            }
        >
            <Head title="Fillieres" />
            {/* <pre>{JSON.stringify(fillieres, undefined, 2)}</pre> */}
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

                        {/* <pre>{JSON.stringify(msg, undefined, 2)}</pre> */}

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
                                className = 'flex-1'
                                >
                                <option value="">Afficher uniquement</option>
                                <option value="annee_1">1ère année</option>
                                <option value="annee_2">2ème année</option>
                                <option value="licence">Licence Professionnelle</option>
                                <option value="master_1">Master 1</option>
                                <option value="master_2">Master 2</option>
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
                                <option value="created_at">Date de creation</option>
                                
                            </SelectInput>
                        </div>
                        <table className="w-full text-sm text-nowrap bg-gray-900 shadow-md">
                            <thead className="uppercase text-left text-slate-300 border-b-2 border-slate-300">
                                <tr>
                                    <th className="px-2 py-3">Id</th>
                                    <th className="px-2 py-3">Name</th>
                                    <th className="px-2 py-3">degree</th>
                                    <th className="px-2 py-3">date de creation</th>
                                    
                                    <th className="text-right px-2">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="text-left">
                                {
                                    fillieres.map(filliere => 
                                        <tr key={filliere.id} className="p-2 text-gray-500 hover:bg-slate-700 hover:text-slate-100 duration-200 my-1">
                                            <th className="px-2 py-3">{filliere.id}</th>
                                            <td className="px-2 py-3">
                                                <Link
                                                    href={route('dashboardfilliere.show', filliere)}
                                                    className="hover:underline "
                                                >
                                                    {filliere.name}
                                                </Link>
                                            </td>
                                            <td className="px-2 py-3">{FILLIERE_DEGREE[filliere.degree]}</td>
                                            <td className="px-2 py-3">{filliere.created_at}</td>
                                            
                                            <td className="font-bold">
                                                <div className="flex gap-3 text-xs uppercase justify-end px-2 font-extrabold">
                                                    <Link 
                                                        href={route('dashboardfilliere.edit', filliere.id)}
                                                        className="text-teal-800 hover:underline">
                                                        Edit
                                                    </Link>
                                                    <Link 
                                                        onClick={e=> handleDelete(e, filliere)}
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
