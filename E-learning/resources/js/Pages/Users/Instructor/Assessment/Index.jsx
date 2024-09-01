import PopUp from "@/Components/PopUp";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Body from "@/Layouts/Body";
import { Head, router } from "@inertiajs/react";
import { useEffect } from "react";

export default function Index({auth, assessments, msg}){
    assessments = assessments[0].data

    return (
        <AuthenticatedLayout
            user={auth.user}
            // msg={msg?.warning}
        >
            <Head title={`Instructors | Devoirs soumis`}  />
            <Body>
                {/* <pre>{JSON.stringify(assessments, undefined, 2)}</pre> */}

                {
                    msg?.warning && <PopUp msg = {msg?.warning} className = {'bg-yellow-400'}/>
                }


                <div className="mb-5">
                    <h3 className="text-xl italic font-bold py-2 px-4 mb-2 bg-gray-900 rounded-md">A Corriger</h3>
                    <AssessmentCard assessments={assessments}/>
                </div>
                <div className="mb-5">
                    <h3 className="text-xl italic font-bold py-2 px-4 mb-2 bg-gray-900 rounded-md">Déjà corrigés</h3>
                    <AssessmentCard assessments={assessments} action="done"/>
                    
                </div>

            </Body>
        </AuthenticatedLayout>
    )
}



const AssessmentCard = ({assessments, action = 'corriger'}) =>{

    const doCorrection = assessment => {
        // console.log(assessment);
        const id = assessment.assessment.id
        const student = assessment.student.id
        // console.log(id, student);
        
        router.get(route('instructor.assessment.correction', [id, student]))
    }

    const className = "w-full md:w-80 lg:max-w-96 flex-grow"

    return(
        <div className="flex flex-wrap items-center gap-3">
        {
            assessments.length > 0 && 
            assessments.map(assessment =>{
                // console.log(assessment);
                
                return(                            
                    action === 'corriger' ? 
                    !assessment.note && 
                    <div key={assessment.id} onClick={()=>doCorrection(assessment)} className={className}>
                        <AssessmentCardItem assessment={assessment} status={assessment.status}/>
                    </div> :

                    assessment.note && 
                    <div key={assessment.id} onClick={()=>doCorrection(assessment)} className={className}>
                    <AssessmentCardItem assessment={assessment} status={assessment.status}/>
                    </div>

                
                )
            })   
        }
        </div>
    )
}

const AssessmentCardItem = ({status, assessment}) =>{
    return(
        <div className="py-2 px-4 text-sm rounded-md shadow shadow-orange-950 bg-gray-900 italic">
            <div className={`text-teal-500 font-bold p-2 bg-slate-950 rounded-md mb-2`}>{assessment.student.name}</div>
            <div className="flex justify-between items-center mb-2">
                <h4 className=" text-slate-300 font-bold">Devoir {assessment.assessment.order} sur {assessment.assessment.title}</h4>
            
            </div>
            <div className="flex justify-between items-center">
                <h4 className="my-2 text-slate-300">
                    Note:  
                    {
                        assessment.note &&
                        <span className={`${assessment.note > 9 ? 'text-teal-500' :  'text-red-500'} font-bold mx-3 bg-gray-950 p-2 rounded-lg`}>
                            {assessment.note}
                        </span>

                    }

                </h4>
                { status === 'missed' && <div className={`text-gray-900 font-bold p-1 bg-red-400 rounded-lg`}>Missed</div>} 

            </div>
        </div>
    )
}

