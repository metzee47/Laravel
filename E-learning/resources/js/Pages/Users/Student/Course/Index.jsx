import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { COURSE_DURATION } from "@/constant";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Body from "@/Layouts/Body";
import { Head, Link, router } from "@inertiajs/react";

export default function Index({auth, fillieres, params}){
    // courses = courses.data
    fillieres = fillieres.data

    const searchField = (name, value) =>{
        if(!value){
            delete(params[name])
        }

        else
            params[name] = value

        router.get(route('student.course.index'), params)
    }

    const onKeypress = e => {
        if(e.key !== 'Enter')
            return

        searchField(e.target.name, e.target.value)
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            // msg={msg?.warning}
        >
            <Head title={`Instructor | ${auth.user.name}`}/>


            <Body>
                {/* <pre>{JSON.stringify(fillieres, undefined, 2)}</pre> */}

                <div className="w-full flex justify-center mb-5">
                    <TextInput 
                            id = 'search'
                            name = 'search'
                            defaultValue = {params.search}
                            onBlur = {e=> searchField(e.target.name, e.target.value)}
                            onKeyPress = {e=> onKeypress(e)}
                            className =  'flex-1'
                            placeholder="Rechercher un cours"/>
                </div>

                <div className="">
                    {
                        fillieres.map(filliere=>{

                            return(
                                <div className="p-4 border-l-2 border-t-2 border-slate-300 shadow-sm shadow-black my-8">
                                    <h1 className="text-xl font-bold bg-gray-900 p-3 rounded-md w-fit inline-block mr-2">{filliere.name}</h1><span className="text-gray-900 px-3 py-1 bg-slate-300 text-xs rounded-lg font-bold hover:cursor-pointer">masquer les cours</span>
                                    <div className="flex justify-center gap-x-10 flex-wrap my-4 items-center">
                                        {
                                        filliere.courses.map(course=>
                                            <div key={course.id} className="w-full md:w-80 bg-gray-900 border-x-2 my-5 rounded-md shadow shadow-yellow-900 p-4 ">
                                                <div className="shadow-inner shadow-cyan-600 px-3 py-2 w-fit mb-2 italic rounded-md font-bold">{course.name}</div>
                                                {                            
                                                    course.description && course.description
                                                }
                                                <div>
                                                    {
                                                        course.lessons.length > 0 ?
                                                        course.lessons.map(lesson=>
                                                            <div className="ml-4 flex gap-3 items-center my-2">
                                                                <Link 
                                                                    href={route('student.course.show-lesson', lesson)}
                                                                    className="font-bold px-2 py-1 bg-green-800 text-gray-900 rounded-md hover:cursor-pointer hover:scale-95 duration-200">
                                                                    {lesson.title}
                                                                </Link>
                                                            </div>
                                                        ) :
                                                        <div className="bg-red-400 w-fit text-gray-900 px-2 py-1 my-2 rounded-md text-sm">Aucune leçon générée pour ce cours</div>
                                                    }
                                                </div>
                                                <div>{COURSE_DURATION[course.duration]}</div>
                        
                
                                            </div>
                                            
                                        )
                                    }
                                    </div>
                                </div>
                                
                            )
                            
                        })
                    }
                </div>

            </Body>
        </AuthenticatedLayout>
    )
}