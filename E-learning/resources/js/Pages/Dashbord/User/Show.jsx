import { ROLE } from "@/constant";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Body from "@/Layouts/Body";
import { Link } from "@inertiajs/react";

export default function Show({auth, user, related_fillieres, courses}){
    user = user.data
    const default_img_url = '/storage/'
    return(
        <AuthenticatedLayout
        user={auth.user}
        header={
            <div className="flex justify-between items-center px-5">
                <h2 className="font-semibold text-xl shadow-inner shadow-black text-black dark:text-gray-200 leading-tight px-4 py-3 rounded-md w-fit">Tous sur {user.role} {user.name}</h2>
                <div className="flex gap-4">
                    <Link
                        href={route('dashboarduser.index')}
                        className="bg-sky-600 px-2 py-1 rounded-sm font-bold text-gray-800 hover:-translate-x-2 duration-200">Retour
                    </Link>
                    <Link
                        href={route('dashboarduser.edit', user)}
                        className="bg-teal-600 px-2 py-1 rounded-sm font-bold text-gray-800 hover:translate-x-2 duration-200">Editer
                    </Link>
                </div>
            </div>}
        >

            {/* <pre>{JSON.stringify(user, undefined, 2)}</pre> */}


            <Body>
                <div className="flex gap-7 border-y-2 p-4 shadow-sm shadow-black">
                    <div>
                        {
                            user.profil_image ? 
                            <img src={user.profil_image} className="w-64"/> :
                            <div className="w-64 h-64 flex justify-center items-center bg-gray-900 text-slate-300 rounded-md shadow-inner shadow-slate-400 text-xl">No profil</div>
                        }
                        <h3 className="text-base italic ml-4 my-2">{user.name}</h3>
                    </div>
                    <div className="hover:cursor-pointer">

                        <h2 className="font-semibold text-sm shadow-inner shadow-black text-slate-300 px-4 py-3 rounded-md w-fit mb-3">Informations personnelles</h2>

                        <div className="flex gap-3 items-center mb-3">
                            <h3 className="text-base text-blue-600">Adresse</h3> <span className="font-bold text-lg">{user.address}</span>
                        </div>
                        <div className="flex gap-3 items-center mb-3">
                            <h3 className="text-base text-blue-600">Email</h3> <span className="font-bold text-lg">{user.email}</span>
                        </div>
                        <div className="flex gap-3 items-center mb-3">
                            <h3 className="text-base text-blue-600">Profession</h3> <span className="font-bold text-lg">{ROLE[user.role]}</span>
                        </div>
                        {
                            related_fillieres && 
                            <div className="flex gap-3">
                                <h3 className="text-base text-blue-600 ">Filleres</h3>
                                <div className="flex gap-x-2 flex-wrap -mt-0.5">
                                    {
                                        related_fillieres.data.map(filliere=> <span className="font-bold text-lg">{filliere.name}</span>)
                                    }
                                </div>
                                
                            </div>
                        }
                    </div>

                </div>

                <div className="mt-5 flex justify-center items-center gap-x-16 flex-wrap">
                    {
                        related_fillieres?.data.map(filliere=>
                            <div className={`${related_fillieres.data.length > 2 ? 'flex-1' : 'w-96'}`}>
                                <h2 className="font-semibold text-sm shadow-inner shadow-black text-slate-300 px-4 py-3 rounded-md w-fit mb-3">{filliere.name}</h2>

                                <div className="p-4 shadow-sm shadow-black border-t-2">
                                    <table className="w-full text-sm bg-gray-900 shadow-md">
                                        <thead className="uppercase text-slate-500 border-b-2 border-slate-300">
                                            <tr>
                                                <th className="p-2 text-left">Course</th>
                                                <th className="p-2 text-right">Notes</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                courses[filliere.name].data.map(course =>
                                                    <tr>
                                                        <td className="p-2">{course.name}</td>
                                                        <td className="p-2 text-right mr-3">{Math.floor(Math.random() * 21)}</td>
                                                    </tr>
                                                )
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )
                    }
                </div>
            </Body>

        </AuthenticatedLayout>
    )
}