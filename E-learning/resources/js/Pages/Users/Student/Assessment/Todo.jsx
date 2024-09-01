import PrimaryButton from "@/Components/PrimaryButton";
import RenderAssessment from "@/Components/RenderAssessment";
import { COURSE_DURATION } from "@/constant";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Body from "@/Layouts/Body";
import { Head, router, useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";

export default function Todo({auth, assessment}){

    const [content, setContent] = useState(assessment.content[0])
    const {data, setData, post, errors} = useForm({
        assessment_id: assessment.id,
        course_id: assessment.course_id,
        student_id: auth.user.id,
        content: assessment.content
    })

    const submitAssessment = () =>{
        post(route('student.assessment.submit-assessment', assessment))
    }

    useEffect(()=>{        
        post(route('student.assessment.store-assessment', assessment))    
    },[])

    return (
        <AuthenticatedLayout
            user={auth.user}
        >
            <Head title={`Do my assessment | ${assessment.title}`}  />


            <Body>
                {/* <pre>{JSON.stringify(assessment, undefined, 2)}</pre> */}

                <div className="flex flex-col md:flex-row items-center gap-4">
                    <h3 className="bg-yellow-500 text-gray-900 px-3 py-2 w-fit italic rounded-md font-bold">
                        Si vous quittez la page ou basculez vers un autre lien le devoir sera automatiquement soumis.
                    </h3>
                    <PrimaryButton
                        onClick = {e => e.preventDefault()}
                    >Compris
                    </PrimaryButton>
                </div>
                <RenderAssessment 
                    content={content} 
                    setData={setData}
                    id = {assessment.id}
                    course = {assessment.course_id}
                    order={assessment.order} 
                    duration={COURSE_DURATION[assessment.duration]} 
                />

                <div className=" mt-2 flex justify-end">
                    <PrimaryButton
                        onClick={submitAssessment}
                        // href={route('course.store')}
                        className="bg-cyan-600 text-gray-800 font-semibold px-2 py-1 rounded-md"
                    >
                            Soumettre le devoir
                    </PrimaryButton>
                </div>

            </Body>
        </AuthenticatedLayout>
    )
}