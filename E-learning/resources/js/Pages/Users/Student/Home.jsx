import NotificationCard from "@/Components/NotificationCard";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Body from "@/Layouts/Body";
import { Head, useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";

export default function Home({auth, msg, notifications}){
    notifications = notifications.data
    const fromInstructor = notifications.filter(notification=> notification.from.role === 'professeur')
    const {data, setData, post} = useForm({})
    const [checkbox, setCheckbox] = useState({})
    const [showInstructorNotif, setShowInstructorNotif] = useState(true)


    useEffect(()=>{
        setCheckbox(()=>
        {
            let initialValues = {}
            notifications.map(notification=>{
                initialValues[`notif${notification.id}`] = {
                    id: notification.id,
                    checked: false
                }
            })

            return initialValues
        })
    },[])

    useEffect(()=>{
        const notifReaded = Object.keys(checkbox).filter(notif=> checkbox[notif].checked === true)
        setData(()=>{
            let data = {}
            notifReaded.map(notif=> data[notif] = checkbox[notif].id)
            return data
        }) 
        
    },[checkbox])

    const markAsRead = () => {
        post(route('dashboard.delete-notif'))
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            
            // msg={msg?.warning}
        >
            <Head title={`Student | ${auth.user.name}`}  />


            <Body msg={msg.warning}>
            <div className=" w-full bg-gray-900 p-3">
                <div className='text-xl p-2 bg-gray-950 rounded-md'>NOTIFICATIONS</div>
                <div>
                    <div className="flex justify-between">
                        <h4 onClick={()=>setShowInstructorNotif(!showInstructorNotif)} className='text-base cursor-pointer my-3 py-1 px-2 rounded-lg w-fit bg-emerald-950 '>From Instructors</h4>
                        
                        { 
                            showInstructorNotif &&
                            <h4 onClick={markAsRead} className=' hover:scale-95 text-base cursor-pointer my-3 py-1 px-2 rounded-lg w-fit bg-emerald-950'>Marquer comme lu(s)</h4>
                            
                        }
                    </div>
                    {
                        showInstructorNotif &&
                        <NotificationCard notifications={fromInstructor} checkbox={checkbox} setCheckbox={setCheckbox} setData={setData}/>
                    }
            
                </div>
            </div>
            </Body>
        </AuthenticatedLayout>
    )
}