import Pagination from "@/Components/Pagination";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Body from "@/Layouts/Body";
import { Head, Link, router } from "@inertiajs/react";

export default function Index({auth, users, msg, params = {}}){
    const links = users.meta.links
    users = users.data
    // params = params || {}
    const searchField = (name, value) =>{
        if(!value){
            delete(params[name])
        }

        else
            params[name] = value

        router.get(route('dashboarduser.index'), params)
    }

    const onKeypress = e => {
        if(e.key !== 'Enter')
            return

        searchField(e.target.name, e.target.value)
    }

    const handleDelete = (e, user) => {
        e.preventDefault();
        if(window.confirm(`Are you sure want to delete user ` + user.name))
            router.delete(route('dashboarduser.destroy', user.id))
    }
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center px-5">
                    <h2 className="font-semibold text-xl shadow-inner shadow-black text-black dark:text-gray-200 leading-tight px-4 py-3 rounded-md w-fit">Liste des utilsateurs</h2>
                    <Link
                        href={route('dashboarduser.create')}
                        className="bg-teal-800 px-2 py-1 rounded-sm font-bold text-gray-800 hover:translate-x-2 duration-200">New User</Link>
                </div>
            }
        >
            <Head title="Users" />
            {/* <pre>{JSON.stringify(users, undefined, 2)}</pre> */}
            <Body msg={msg.warning}>

                {
                    msg.danger &&
                        <div className="p-3 bg-red-800 font-bold text-gray-300 mb-3">{msg.danger}</div>
                }

                <div className="flex justify-around gap-4 mb-3">
                    <TextInput 
                        id = 'search'
                        name = 'search'
                        defaultValue = {params.search}
                        onBlur = {e=> searchField(e.target.name, e.target.value)}
                        onKeyPress = {e=> onKeypress(e)}
                        className =  'flex-1'
                        placeholder="Rechercher un nom, email, address"/>
                    <SelectInput
                        id = 'display'
                        name = 'display'
                        defaultValue = {params.display}
                        
                        onChange = {e=> searchField(e.target.name, e.target.value)}
                        className =  'flex-1'
                        >
                        <option value="">Afficher uniquement</option>
                        <option value="admin">Admin</option>
                        <option value="etudiant">Etudiant</option>
                        <option value="professeur">Professeur</option>
                    </SelectInput>
                    <SelectInput
                        id = 'sortBy'
                        name = 'sortBy'
                        defaultValue = {params.sortBy}
                        onChange = {e=> searchField(e.target.name, e.target.value)}
                        className =  'flex-1'
                        >
                        <option value="">Trier par</option>
                        <option value="id">Id</option>
                        <option value="name">Nom</option>
                        <option value="email">Email</option>
                        <option value="role">Role</option>
                        <option value="address">Address</option>
                    </SelectInput>
                </div>
                <table className="w-full text-sm text-nowrap bg-gray-900 shadow-md">
                    <thead className="uppercase text-left text-slate-300 border-b-2 border-slate-300">
                        <tr>
                            <th className="px-2 py-3">Id</th>
                            <th className="px-2 py-3">Name</th>
                            <th className="px-2 py-3">Email</th>
                            <th className="px-2 py-3">Role</th>
                            <th className="px-2 py-3">Address</th>
                            <th className="text-right px-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-left">
                        {
                            users.map(user => 
                                
                                    <tr key={user.id} className="p-2 text-gray-500 hover:bg-slate-700 hover:text-slate-100 duration-200 my-1">
                                        
                                        <th className="px-2 py-3">{user.id}</th>
                                        <td className="px-2 py-3">
                                            <Link 
                                                href={route('dashboarduser.show', user)}
                                                className="hover:underline"
                                                >
                                                {user.name}
                                            </Link>
                                        </td>
                                        <td className="px-2 py-3">{user.email}</td>
                                        <td className="px-2 py-3 capitalize">{user.role}</td>
                                        <td className="px-2 py-3">{user.address}</td>
                                        <td className="font-bold">
                                            <div className="flex gap-3 text-xs uppercase justify-end px-2 font-bold">
                                                <Link 
                                                    href={route('dashboarduser.edit', user.id)}
                                                    className="text-teal-800 hover:underline">
                                                    Edit
                                                </Link>
                                                <Link 
                                                    onClick={e=> handleDelete(e, user)}
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

            </Body>
        </AuthenticatedLayout>
    )
}