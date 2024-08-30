import RenderAssessment from "@/Components/RenderAssessment";
import { COURSE_DURATION } from "@/constant";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Body from "@/Layouts/Body";
import { Head, Link } from "@inertiajs/react";

export default function ShowAssessment({auth, assessment}){

    // assessment.content = JSON.parse(assessment.content)
    return (
        <AuthenticatedLayout
            user={auth.user}
        >
            <Head title={`Assessment | ${assessment.title}`}  />


            <Body>
                {/* <pre>{JSON.stringify(assessment, undefined, 2)}</pre> */}

                <div className="flex justify-between items-center gap-4">
                    <h3 className="shadow-inner shadow-cyan-600 px-3 py-2 w-fit mb-2 italic rounded-md font-bold">{assessment.title}</h3>
                    <div className="flex gap-4">
                        <Link
                            href={route('instructor.course.index')}
                            className="bg-red-300 px-2 py-1 rounded-md font-bold text-gray-800 hover:bg-red-400 duration-150">Retour
                        </Link>
                        <Link
                            // href={route('instructor.course.edit', user)}
                            className="bg-teal-300 px-2 py-1 rounded-md font-bold text-gray-800 hover:bg-teal-500 duration-150">Editer
                        </Link>
                    </div>
                </div>
                <RenderAssessment content={assessment.content[0]} order={assessment.order} duration={COURSE_DURATION[assessment.duration]}/>

            </Body>
        </AuthenticatedLayout>
    )
}