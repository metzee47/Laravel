import { Link, useForm } from "@inertiajs/react";
import InputError from "./InputError";
import InputLabel from "./InputLabel";
import TextInput from "./TextInput";
import SelectInput from "./SelectInput";
import TextareaInput from "./TextareaInput";


export default function FormCourse({course = {}, msg = null, instructors}){
    // console.log(course.length)
    const {data, setData, post, put, errors, reset} = useForm({
        name: course.name || '',
        duration: course.duration || '',
        description: course.description || '',
        teached_by: course?.teached_by?.id || '',
        created_at: course.created_at || '',
        _method: course.id ? 'PUT' : 'POST'
    })

    const handleSubmit = e => {
        e.preventDefault()
    // console.log(data)
        if(course.id)
            post(route('dashboardcourse.update', course.id))

        
        else
            post(route('dashboardcourse.store'))
        // course.id ?  : 
        // href={course.length ? route('course.update') : route('course.create')}       

    }

    // console.log(data)

    return(
        <form className="p-4 rounded-md">

            {
                msg &&
                <div className="p-3 bg-teal-800 font-bold text-gray-800 mb-3">{msg}</div>
            }

            {/* <pre>{JSON.stringify(course.teached_by.name, undefined, 2)}</pre> */}


            <div className=" flex flex-col gap-2 mb-4">
                <InputLabel htmlFor= 'name' value={'Course Name'} />
                <TextInput 
                    id = 'name'
                    name = 'name'
                    value = {data.name}
                    isFocused = {true}
                    onChange= {e=> setData('name', e.target.value)} 
                />
                <InputError message={errors.name}/>
            </div>

            <div className=" flex flex-col gap-2 mb-4">
                <InputLabel htmlFor= 'description' value={'Course Description'} />
                <TextareaInput 
                    id = 'description'
                    name = 'description'
                    value = {data.description}
                    onChange= {e=> setData('description', e.target.value)} 
                />
                
                <InputError message={errors.description}/>
            </div>
            
        
            <div className="flex-1 flex flex-col gap-2 mb-4">
                <InputLabel htmlFor = 'duration' value={'Duration'}/>
                <SelectInput
                    id = 'duration'
                    name = 'duration'
                    value = {data.duration}
                    className='w-full'
                    onChange= {e=> setData('duration', e.target.value)} 
                >
                    <option value="">Select duration</option>
                    <option value="_1h">1heure</option>
                    <option value="_1h30">1h30mn</option>
                    <option value="_2h">2heures</option>
                    <option value="_2h30">2h30mn</option>
                    <option value="_3h">3heures</option>
                </SelectInput>
                <InputError message={errors.duration}/>
            </div>

            <div className="flex-1 flex flex-col gap-2 mb-4">
                <InputLabel htmlFor = 'teached_by' value={'Professeur Responsable'}/>
                <SelectInput
                    id = 'teached_by'
                    name = 'teached_by'
                    value = {data.teached_by}
                    className='w-full'
                    onChange= {e=> setData('teached_by', e.target.value)} 
                >
                    <option value="">Select Professeur</option>
                    {
                        instructors.data.map(instructor => 
                            <option value={instructor.id}>{instructor.name}</option>
                        )
                    }
                    
                </SelectInput>
                <InputError message={errors.teached_by}/>
            </div>
                
            <div className="flex gap-3 justify-end">
                
                <Link
                    onClick={e=> handleSubmit(e)}
                    // href={route('course.store')}
                    className="bg-teal-600 text-gray-800 font-semibold px-2 py-1 rounded-md"
                >
                    {course.id ? 'Update' : 'Create'} 
                </Link>
            </div>
        </form>
    )
}