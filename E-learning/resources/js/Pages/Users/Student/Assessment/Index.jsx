import { COURSE_DURATION } from "@/constant";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Body from "@/Layouts/Body";
import { Head, Link, router, useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";

export default function Index({auth, inProgressAssessment, missedAssessment, completedAssessment, completedId, missedId, msg}){

    // const assessments = {}
    const toDo = inProgressAssessment.data
    const completed = completedAssessment.data
    const missed = missedAssessment.data

    const {data, setData, post, errors} = useForm({
        missed:[],
        completed:[]
    })


    // const [toDo, setToDo] = useState([])
    const [warning, setWarning] = useState(undefined)

    useEffect(()=>{
        if (data.missed.length > 0) {
            post(route('student.assessment.missed-assessment'))                  
        }       
    },[data.missed])
    useEffect(()=>{
        console.log(data);
        
    },[data])

    useEffect(()=>{
        
        toDo.map(item =>   
        {
            const assessment = item.assessment
            const status = daysLeft(assessment.assessment_date, assessment.limit_date)            
            
            if (status !== 'fini'){                        
                // setToDo(toDo=>[...toDo, assessment])
                setData(data =>({
                    ...data,
                    completed:
                    [
                        ...data.completed,
                        {
                            assessment_id: assessment.id,
                            course_id: item.course.id,
                            content: [assessment.content],
                            _method: 'POST'
                        }
                    ]

                })
                    
                )
            }
            const heMissed = !Object.values(completedId).includes(assessment.id) && !Object.values(missedId).includes(assessment.id)         
            if(status === 'fini' && heMissed){  
                setData(data =>({
                    ...data,
                    missed:
                    [
                        ...data.missed,
                        {
                            assessment_id: assessment.id,
                            course_id: item.course.id,
                            content: [assessment.content],
                            
                            _method: 'POST'
                        }
                    ]

                })
                    
                )                                  
            }                    
        })
                
    },[])

    const daysLeft = (available_date, limit_date) =>{
        const [dateA, timeA] = available_date.split('à')
        const [yearA, monthA, dayA] = dateA.split('-')
        const [hoursA, minutesA] = timeA.split(':')
        const daysLeft = new Date(yearA, monthA - 1, dayA, hoursA, minutesA) - new Date()
        const days = Math.floor(daysLeft / 60000 / 60 / 24)
        const hoursLeft = Math.floor(daysLeft / 60000 / 60 % 24)
        const minutesLeft = Math.floor(daysLeft / 60000 / 60 / (24 * 60))

        const [dateL, timeL] = limit_date.split('à')
        const [yearL, monthL, dayL] = dateL.split('-')
        const [hoursL, minutesL] = timeL.split(':')

        const submitLimit = new Date(yearL, monthL - 1, dayL, hoursL, minutesL) - new Date()

        if (days > 0) {
            return `${days} jour(s) ${hoursLeft} heure(s) restants`
        }

        else if(hoursLeft > 0){
            return `${hoursLeft} heure(s) restantes`
        }

        else if(minutesLeft > 0) {
            return `${minutesLeft} minute(s) restantes`
        }

        return `${submitLimit > 0 ? 'en cours' : 'fini'}`
    }
    

    const doAssessment = (e, assessmen) =>{
        e.preventDefault()
        
        // router.get(route('student.assessment.do-assessment', assessmen))      

        const status = daysLeft(assessmen.assessment_date, assessmen.limit_date)

        if(status === 'en cours'){
            // setToDo(toDo.filter(assessment=> assessment.id !== assessmen.id))            
            router.get(route('student.assessment.do-assessment', assessmen))  
            setTimeout(() => {
                post(route('student.assessment.store-assessment', assessmen))    
            }, 4000);
            
        }
        
        else {
            setWarning('Epreuve pas encore disponible')
            setTimeout(() => {
                setWarning(undefined)
            }, 4000);
        }
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            
            // msg={msg?.warning}
        >
            <Head title={`Assessment | All`}/>

            <Body>
                {/* <pre>{JSON.stringify(toDo, undefined, 2)}</pre> */}

                {
                    warning && 
                    <div className="p-3 font-bold text-gray-900 my-3 rounded-md bg-yellow-500">{warning}</div>
                }
                {
                    msg?.warning && 
                    <div className="p-3 font-bold text-gray-900 my-3 rounded-md bg-yellow-500">{msg?.warning}</div>
                }

                <div className="mb-5">
                    <h3 className="text-xl italic font-bold py-2 px-4 mb-2 bg-gray-900 rounded-md">A faire</h3>
                    {
                        toDo.length > 0 ? 
                        toDo.map(item =>{
                            const status = daysLeft(item.assessment.assessment_date, item.assessment.limit_date)
                            return(
                                <div key={item.assessment.id} onClick={e=>doAssessment(e, item.assessment)} className="my-2 w-full md:w-1/2">
                                    <AssessmentCard status={status} assessment={item.assessment}/>
                                </div>
                            )
                        })   :
                        <div className="ml-10 text-slate-300 font-semibold italic text-base">Pas de devoir à faire pour le moment.</div>                     
                    }
                </div>

                <div className="mb-5">
                    <h3 className="text-xl italic font-bold py-2 px-4 mb-2 bg-gray-900 rounded-md">Accomplis</h3>
                    {
                        completed.length > 0 && 
                        completed.map(item =>
                            // const status = daysLeft(item.item_date, item.limit_date)
                            <div key={item.assessment.id} className="my-2 w-full md:w-1/2">
                                <AssessmentCard assessment={item.assessment}/>
                            </div>
                        )                                               
                    }
                </div>

                <div className="mb-5">
                    <h3 className="text-xl italic font-bold py-2 px-4 mb-2 bg-gray-900 rounded-md">Missed</h3>
                    {
                        missed.length > 0 && 
                        missed.map(item =>
                            
                            // const status = daysLeft(assessment.assessment_date, assessment.limit_date)
                            <div key={item.assessment.id} className="my-2 w-full md:w-1/2">
                                <AssessmentCard assessment={item.assessment} note={item.note}/>
                            </div>
                        )                                               
                    }
                </div>
            </Body>
        </AuthenticatedLayout>
    )
}


const AssessmentCard = ({status = '', assessment, note}) =>{
    // console.log(assessment);
    
    return(
        <div className="py-2 px-4 text-sm rounded-md shadow shadow-orange-950 bg-gray-900 italic">
            <div className="flex justify-between items-center">
                <h4 className=" text-slate-300 font-bold">Devoir {assessment.order} sur {assessment.title}</h4>
                <div className={`${status !== '' ? (status === 'en cours' ? 'text-teal-500 font-bold p-2 bg-slate-950 rounded-md': 'text-red-400 font-bold p-2 bg-slate-950 rounded-md') : ''}`}>{status}</div>
                {
                    status !== 'in_progress' && note &&
                    <div className=" flex gap-3 items-center font-bold" >
                        Note:   
                        <span className={`${note > 9 ? 'text-teal-500' : 'text-red-500'} text-lg px-2 bg-gray-950 rounded-md`}>{note}</span>
                    </div>
                }
            </div>
            <h4 className="my-2 text-slate-300">Durée: {COURSE_DURATION[assessment.duration]}</h4>
            <h4 className="my-2 text-slate-300">Date prévue: <span className="text-teal-500 font-bold mx-3">{assessment.assessment_date}</span></h4>
            <h4 className="my-2 text-slate-300">Date limite de soumission: <span className="text-teal-500 font-bold mx-3">{assessment.limit_date}</span></h4>
        </div>
    )
}