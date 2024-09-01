import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import RenderAssessment from "@/Components/RenderAssessment";
import TextInput from "@/Components/TextInput";
import { COURSE_DURATION } from "@/constant";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Body from "@/Layouts/Body";
import { Head, useForm } from "@inertiajs/react";

export default function Correction({auth, assessment}){

    assessment = assessment.data

    let content = assessment.content;  
    if (assessment.status === 'missed') {
        content = JSON.parse(content[0])
        // console.log('mo');
        
    }

    const {data, setData, post, errors} = useForm({
        assessment_id: assessment.assessment.id,
        course_id: assessment.course.id,
        student_id: assessment.student.id,
        status: assessment.status,
        note: assessment.note || ''
    })

    const saveNote = key =>{
        if(key === 'Enter')
            post(route('instructor.assessment.save-note'))  
            
        return 
    }
    
    
    // assessment.content = JSON.parse(assessment.content)
    return (
        <AuthenticatedLayout
            user={auth.user}
        >
            <Head title={`Assessment | Correction`}  />


            <Body>
                {/* <pre>{JSON.stringify(content, undefined, 2)}</pre> */}

                <div className="flex justify-between items-center gap-4">
                    <h3 className="shadow-inner shadow-cyan-600 px-3 py-2 w-fit mb-2 italic rounded-md font-bold">Correction du devoir de {assessment.student.name}</h3>
                    <div className="justify-end flex flex-col gap-2 mb-4">
                        <InputLabel htmlFor = 'note' value={'Note du devoir'}/>
                        <TextInput
                            id = 'note'
                            type = 'number'
                            name = 'note'
                            className = 'text-white'
                            value = {data.note}
                            onKeyPress = {e => saveNote(e.nativeEvent.key)}
                            onChange= {e=> setData('note', e.target.value)} 
                        />
                        
                        <InputError message={errors.note}/>
                    </div>
                </div>
                <RenderAssessment content={content[0]} order={assessment.assessment.order} duration={COURSE_DURATION[assessment.assessment.duration]}/> 

            </Body>
        </AuthenticatedLayout>
    )
}