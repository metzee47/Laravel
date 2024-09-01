import Checkbox from '@/Components/Checkbox';
import NotificationCard from '@/Components/NotificationCard';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Body from '@/Layouts/Body';
import { Head, router, useForm } from '@inertiajs/react';
import React, { useEffect, useState } from 'react';

export default function Dashboard({ auth, msg, notifications, totalUsers, authUsers,
    totalAdmin, totalInstructors, totalStudents, totalGot, totalMessages, totalSent, 
    totalUnread, myMessages, totalFillieres, totalCourses
 }) {

    notifications = notifications.data
    const fromInstructor = notifications.filter(notification=> notification.from.role === 'professeur')
    const fromStudent = notifications.filter(notification=> notification.from.role === 'etudiant')

    const [showStudentNotif, setShowStudentNotif] = useState(false)
    const [showInstructorNotif, setShowInstructorNotif] = useState(true)

    const {data, setData, post} = useForm({})
    const [checkbox, setCheckbox] = useState({})

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
        post(route('delete-notif'))
    }
    
    
    return (
        <AuthenticatedLayout
            user={auth.user}
            
        >
            <Head title="Dashboard"/>
            <Body msg={msg}>
            {/* <pre>{JSON.stringify(fromInstructor, undefined, 2)}</pre> */}
                
            <div className="flex flex-col justify-center items-center gap-5 font-bold text-sm">
                <div className="w-full gap-10 px-4 py-7 bg-gray-900">
                    <div className='text-xl p-2 bg-gray-950 rounded-md mb-3'>STATISTIQUES</div>

                    <div className="flex justify-around mb-7 gap-5">
                        <div className='flex-1 rounded-md bg-indigo-800 p-4'>
                            <h4 className='text-md bg-indigo-950 p-2 border-l-2 border-white mb-3'>USERS</h4>
                            <div className='flex flex-col md:flex-row md:flex-wrap gap-4 mt-3'>
                                <h4>Total Utilisateurs: <span className='rounded-2xl p-2 bg-indigo-950 text-base font-bold'>{totalUsers}</span></h4>
                                <h4>Dont authentifiés: <span className='rounded-2xl p-2 bg-indigo-950 text-base font-bold'>{authUsers}</span></h4>                                
                                <h4>Total étudiants: <span className='rounded-2xl p-2 bg-indigo-950 text-base font-bold'>{totalStudents}</span></h4>                                
                                <h4>Total professeurs: <span className='rounded-2xl p-2 bg-indigo-950 text-base font-bold'>{totalInstructors}</span></h4>                                
                                <h4>Administrateur: <span className='rounded-2xl p-2 bg-indigo-950 text-base font-bold'>{totalAdmin}</span></h4>                                
                            </div>
                        </div>
                        <div className='flex-1 rounded-md bg-sky-600 p-4'>
                            <h4 className='text-md bg-cyan-950 p-2 border-l-2 border-white mb-3'>MESSAGES</h4>
                            <div className='flex flex-col md:flex-row md:flex-wrap gap-4 mt-3'>
                                <h4>Mes Messages: <span className='rounded-2xl p-2 bg-sky-950 text-base font-bold'>{myMessages}</span></h4>
                                <h4>Recus: <span className='rounded-2xl p-2 bg-sky-950 text-base font-bold'>{totalGot}</span></h4>                                
                                <h4>Envoyés: <span className='rounded-2xl p-2 bg-sky-950 text-base font-bold'>{totalSent}</span></h4>                                
                                <h4>Messages non lus: <span className='rounded-2xl p-2 bg-red-500 text-bas text-gray-900 font-bold'>{totalUnread}</span></h4>                                
                                <h4>Total Messages: <span className='rounded-2xl p-2 bg-sky-950 text-base font-bold'>{totalMessages}</span></h4>                                
                            </div>
                        </div>
                        
                    </div>
                    <div className="flex justify-around mt-7 gap-5">
                        <div className='flex-1 rounded-md h-32 bg-emerald-600 p-4'>
                            <h4 className='text-md bg-emerald-950 p-2 border-l-2 border-white mb-3'>Fillieres</h4>
                            <div className='flex flex-col md:flex-row md:flex-wrap gap-4 mt-3'>
                                <h4>Total Fillieres: <span className='rounded-2xl p-2 bg-emerald-950 text-base font-bold'>{totalFillieres}</span></h4>
                                {/* <h4>Recus: <span className='rounded-2xl p-2 bg-sky-950 text-base font-bold'>{totalGot}</span></h4>                                
                                <h4>Envoyés: <span className='rounded-2xl p-2 bg-sky-950 text-base font-bold'>{totalSent}</span></h4>                                
                                <h4>Messages non lus: <span className='rounded-2xl p-2 bg-red-500 text-bas text-gray-900 font-bold'>{totalUnread}</span></h4>                                
                                <h4>Total Messages: <span className='rounded-2xl p-2 bg-sky-950 text-base font-bold'>{totalMessages}</span></h4>                                 */}
                            </div>
                        </div>
                        <div className='flex-1 rounded-md h-32 bg-purple-800 p-4'>
                            <h4 className='text-md bg-purple-950 p-2 border-l-2 border-white mb-3'>COURSES</h4>
                            <div className='flex flex-col md:flex-row md:flex-wrap gap-4 mt-3'>
                                <h4>Total Courses: <span className='rounded-2xl p-2 bg-purple-950 text-base font-bold'>{totalCourses}</span></h4>
                                {/* <h4>Recus: <span className='rounded-2xl p-2 bg-sky-950 text-base font-bold'>{totalGot}</span></h4>                                
                                <h4>Envoyés: <span className='rounded-2xl p-2 bg-sky-950 text-base font-bold'>{totalSent}</span></h4>                                
                                <h4>Messages non lus: <span className='rounded-2xl p-2 bg-red-500 text-bas text-gray-900 font-bold'>{totalUnread}</span></h4>                                
                                <h4>Total Messages: <span className='rounded-2xl p-2 bg-sky-950 text-base font-bold'>{totalMessages}</span></h4>                                 */}
                            </div>
                        </div>
                        
                    </div>

                </div>
                <div className=" w-full bg-gray-900 p-3">
                    <div className='text-xl p-2 bg-gray-950 rounded-md'>NOTIFICATIONS</div>
                    {
                        fromStudent.length > 0 || fromInstructor.length > 0 ?

                        <React.Fragment>
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
                    
                            <div className='my-3'>
                                <div className="flex justify-between">
                                    <h4 onClick={()=>setShowStudentNotif(!showStudentNotif)} className='text-base cursor-pointer my-3 py-1 px-2 rounded-lg w-fit bg-emerald-950'>From Students</h4>
                                    { 
                                        showStudentNotif &&
                                        <h4 onClick={markAsRead} className=' hover:scale-95 text-base cursor-pointer my-3 py-1 px-2 rounded-lg w-fit bg-emerald-950'>Marquer comme lu(s)</h4>
                                        
                                    }
                                </div>
                                {
                                    showStudentNotif &&
                                    <NotificationCard notifications ={fromStudent} checkbox={checkbox} setCheckbox={setCheckbox} setData={setData}/>
                                }
                            </div>
                        </React.Fragment> :

                        <div className='ml-7 italic font-semibold my-3'>Aucune notification à afficher</div>
                    
                    }
                    
                </div>

            </div>
            </Body>
            
        </AuthenticatedLayout>
    );
}


// const NotificationCard = ({notifications, checkbox, setCheckbox, setData}) =>{

//     // const markAsRead = (e, id) =>{
//     //     e.preventDefault()
//     //     const params = {id: id}
//     //     // console.log(params);
        
//     //     router.post(route('dashboard.delete-notif', id))

//     // }
//     // $date = new DateTime($data['assessment_date']);
//     // $object = 'Devoir';
//     // $content = 'Un nouveau devoir est prévu pour le '. date_format($date,'Y-m-d à H:s');
//     // $admin = User::query()->where('role', 'admin')->get();
//     // foreach ($admin as $user) {
//     //     $this->notification(Auth::id(),$user->id, $object, $content);
//     // }

//     return(
//         notifications.length > 0 ?
//         <table className="w-full text-sm text-nowrap bg-gray-900 shadow-md">
                            
//             <tbody className="text-left">
//                 {
//                     notifications.map(notification=>{
//                         const inputName = `notif${notification.id}`
//                         // console.log(Object.keys(checkbox).length);
                        
//                         return (
//                             <tr key={notification.id} className='hover:bg-gray-800 duration-200'>
//                             <td className="px-2 py-3 text-wrap">{notification.object}</td>
//                             <td className="px-2 py-3 text-wrap">{notification.content}</td>
//                             <td className="px-2 py-3 text-wrap">{notification.created_at}</td>
//                             <td className="px-2 py-3 text-wrap">{notification.from.name}</td>
//                             <td className="px-2 py-3 text-wrap text-right">
//                                 <Checkbox
//                                     id={inputName}
//                                     name={inputName}
//                                     checked = {checkbox[inputName] ? checkbox[inputName].checked : false}
//                                     onChange = {e => {
//                                         // e.preventdefault()
//                                             // console.log(notifReaded);
                                            
//                                             setCheckbox(checkbox => ({
//                                                 ...checkbox, 
//                                                 [e.target.name]: {
//                                                     id:notification.id, 
//                                                     checked: e.target.checked
//                                                 }
//                                             })
//                                         )}
//                                     }
//                                 />
//                             </td>
//                         </tr>
//                         )
//                     }
                        
//                     )
//                 }
//             </tbody>

//         </table> :

//         <div className='ml-7 italic font-semibold my-3'>Aucune notification à afficher</div>
//     )
// }
