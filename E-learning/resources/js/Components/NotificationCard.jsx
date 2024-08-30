import Checkbox from "./Checkbox"

const NotificationCard = ({notifications, checkbox, setCheckbox, setData}) =>{

    // const markAsRead = (e, id) =>{
    //     e.preventDefault()
    //     const params = {id: id}
    //     // console.log(params);
        
    //     router.post(route('dashboard.delete-notif', id))

    // }
    

    return(
        notifications.length > 0 ?
        <table className="w-full text-sm text-nowrap bg-gray-900 shadow-md">
                            
            <tbody className="text-left">
                {
                    notifications.map(notification=>{
                        const inputName = `notif${notification.id}`
                        // console.log(Object.keys(checkbox).length);
                        
                        return (
                            <tr key={notification.id} className='hover:bg-gray-800 duration-200'>
                            <td className="px-2 py-3 text-wrap">{notification.object}</td>
                            <td className="px-2 py-3 text-wrap">{notification.content}</td>
                            <td className="px-2 py-3 text-wrap">{notification.created_at}</td>
                            <td className="px-2 py-3 text-wrap">{notification.from.name}</td>
                            <td className="px-2 py-3 text-wrap text-right">
                                <Checkbox
                                    id={inputName}
                                    name={inputName}
                                    checked = {checkbox[inputName] ? checkbox[inputName].checked : false}
                                    onChange = {e => {
                                        // e.preventdefault()
                                            // console.log(notifReaded);
                                            
                                            setCheckbox(checkbox => ({
                                                ...checkbox, 
                                                [e.target.name]: {
                                                    id:notification.id, 
                                                    checked: e.target.checked
                                                }
                                            })
                                        )}
                                    }
                                />
                            </td>
                        </tr>
                        )
                    }
                        
                    )
                }
            </tbody>

        </table> :

        <div className='ml-7 italic font-semibold my-3'>Aucune notification à afficher</div>
    )
}

export default NotificationCard;