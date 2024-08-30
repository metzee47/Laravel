import { MESSAGE_OBJECT, MESSAGE_STATUS, MESSAGE_STATUS_STYLE } from "@/constant";
import { Link, router } from "@inertiajs/react";
import SelectInput from "./SelectInput";

export default function MessageTable({messages, group_name, params, user }){

    const searchField = (name, value) =>{
        if(!value){
            delete(params[name])
        }

        else
            params[name] = value

        // if(url)
        //     router.get(url, params);
        // else ${message.sent_to.id == user.id && message.status == 'unread' ? 'bg-teal-500' : ''}
            router.get(route(`${group_name}.index`), params)

        
    }

    const handleDelete = (e, message) => {
        e.preventDefault();
        if(window.confirm(`Are you sure want to delete message ` + message.id))
            router.delete(route(`${group_name}.destroy`, message.id))
    }
    // console.log(user);
    

    return (

        <>
        <div className="flex justify-center gap-4 mb-3">
            <SelectInput
                id = 'display'
                name = 'display'
                defaultValue = {params?.display}
                
                onChange = {e=> searchField(e.target.name, e.target.value)}
                className = 'flex-1'
                >
                <option value="">Afficher uniquement</option>
                <option value="sent">Envoyé</option>
                <option value="receive">Reçu</option>
                <option value="unread">Pas encore lu</option>
                <option value="read">Déjà lu</option>
            </SelectInput>
            <SelectInput
                id = 'sortBy'
                name = 'sortBy'
                defaultValue = {params?.sortBy}
                onChange = {e=> searchField(e.target.name, e.target.value)}
                className = 'flex-1'
                >
                <option value="">Trier par</option>
                <option value="object">Object</option>
                <option value="created_at">Date d'envoi</option>
                {/* <option value="unread">Pas encore lu</option>
                <option value="read">Déjà lu</option> */}
                {/* <option value="created_at">Id</option> */}
                
            </SelectInput>
        </div>

        <div className="overflow-x-auto">
        <table className="w-full text-sm text-nowrap bg-gray-900 shadow-md">
            <thead className="uppercase text-left text-slate-300 border-b-2 border-slate-300">
                <tr >
                    <td className='px-2 py-3'></td>
                    {/* <td className='px-2 py-3'>ID</td> */}
                    <td className='px-2 py-3'>Object</td>
                    <td className='px-2 py-3'>Sender</td>
                    <td className='px-2 py-3'>Receiver</td>
                    <td className='px-2 py-3'>Status</td>
                    <td className='px-2 py-3'>Sent date</td>
                    <td className='px-2 py-3 text-right'>Actions</td>
                </tr>
            </thead>
            <tbody>
                {
                messages.map(message=>
                    <tr key={message.id} className={`p-2 text-gray-500 hover:bg-slate-700 hover:text-slate-100 duration-200 my-1 ${message.sent_to.id == user.id && message.status == 'unread' ? ' text-slate-100 font-bold' : ''}`}>
                        <td className='text-center py-3'>
                            <span className={`${message.sent_to.id == user.id && message.status == 'unread' ? 'bg-teal-700 text-slate-100 font-bold rounded-lg px-2 py-1 shadow shadow-white' : ''}`}>
                                {message.sent_to.id == user.id && message.status == 'unread' ? 'new' : ''}
                            </span>
                        </td>
                        {/* <td className='px-2 py-3'>{message.id}</td> */}
                        <td className='px-2 py-3'>{MESSAGE_OBJECT[message.object]}</td>
                        <td className='px-2 py-3'>{message.sent_by.name}</td>
                        <td className='px-2 py-3'>{message.sent_to.name}</td>
                        <td className={`px-2 py-3 ${MESSAGE_STATUS_STYLE[message.status]}`}>{MESSAGE_STATUS[message.status]}</td>
                        <td className='px-2 py-3'>{message.created_at}</td>
                        <td className='px-2 py-3'>
                            <div className="flex gap-3 text-xs uppercase justify-end px-2 font-bold">
                                <Link
                                    href={route(`${group_name}.show`, message)}
                                    className="text-cyan-800 hover:underline">
                                    Voir
                                </Link>
                                <Link 
                                    onClick={e=> handleDelete(e, message)}
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
        </div>
    </>
    )
}