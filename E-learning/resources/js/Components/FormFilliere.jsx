import { Link, useForm } from "@inertiajs/react";
import InputError from "./InputError";
import InputLabel from "./InputLabel";
import TextInput from "./TextInput";
import SelectInput from "./SelectInput";
import { Related } from "./Related";
// import { useEffect, useState } from "react";


export default function FormFilliere({
    filliere = {}, msg = null, courses, 
    related_courses = null, related_students = null, 
    related_instructors = null, instructors, students})
    
{

    
    // console.log(filliere.length)
    const {data, setData, post, put, errors, reset} = useForm({
        name: filliere.name || '',
        degree: filliere.degree || '',
        courses: related_courses || [],
        students: related_students || [],
        instructors: related_instructors || [],
        created_at: filliere.created_at || '',
        _method: filliere.id ? 'PUT' : 'POST'
    })

    

    // console.log(findCourse(3))
    const handleSubmit = e => {
        e.preventDefault()
    // console.log(data)
        if(filliere.id)
            post(route('dashboardfilliere.update', filliere.id))

        
        else
            post(route('dashboardfilliere.store'))
        // filliere.id ?  : 
        // href={filliere.length ? route('filliere.update') : route('filliere.create')}       

    }

    // console.log(data)

    return(
        <form className="p-4 rounded-md">

            {
                msg &&
                <div className="p-3 bg-teal-800 font-bold text-gray-800 mb-3">{msg}</div>
            }

                <div className=" flex flex-col gap-2 mb-4">
                    <InputLabel htmlFor= 'name' value={'Filliere Name'} />
                    <TextInput 
                        id = 'name'
                        name = 'name'
                        value = {data.name}
                        isFocused = {true}
                        onChange= {e=> setData('name', e.target.value)} 
                    />
                    <InputError message={errors.name}/>
                </div>
            
                <div className="flex-1 flex flex-col gap-2 mb-4">
                    <InputLabel htmlFor = 'degree' value={'Degree'}/>
                    <SelectInput
                        id = 'degree'
                        name = 'degree'
                        value = {data.degree}
                        className='w-full'
                        onChange= {e=> setData('degree', e.target.value)}
                    >
                        <option value="">Select degree</option>
                        <option value="annee_1">1ère année</option>
                        <option value="annee_2">2ème année</option>
                        <option value="licence">Licence Professionnelle</option>
                        <option value="master_1">Master 1</option>
                        <option value="master_2">Master 2</option>
                    </SelectInput>
                    <InputError message={errors.degree}/>
                </div>

                

                {/* <pre>{JSON.stringify(related_courses, undefined, 2)}</pre> */}


                <Related
                    data={data.courses}
                    name='courses'
                    related_data={courses}
                    setData={setData}
                    errors={errors.courses}
                />
                
                <Related
                    data={data.students}
                    name='students'
                    related_data={students}
                    setData={setData}
                    errors={errors.students}
                />

                <Related
                    data={data.instructors}
                    name='instructors'
                    related_data={instructors}
                    setData={setData}
                    errors={errors.instructors}
                />


                {/* <div className="flex-1 flex flex-col gap-2 mb-4">
                    {
                    data.students.length > 0 &&
                    <>
                        <InputLabel value={'Related Students'}/>

                        <div className="flex flex-wrap gap-x-28 gap-y-3 mb-4">
                            {
                                data.students.map(user => 
                                    <div key={user} className="px-3 py-1 rounded-sm bg-slate-700 relative hover:cursor-pointer">
                                        <span className="text-sm font-bold">{findCourse(user)[0].name}</span>
                                        <span onClick={e => remove(user, data.students)} className="bg-red-500 p-2 font-bold absolute -top-2 rounded-xl text-xs hover:bg-red-900 duration-150">remove</span>
                                    </div>
                                )
                            }
                        </div>
                    </>
                    }

                    <InputLabel htmlFor = 'students' value={'New students'}/>

                    <SelectInput
                        id = 'students'
                        name = 'students[]'
                        multiple
                        // value = {data.students}
                        className='w-full'
                        onChange= {e=> Add(e, data.students)}
                    >
                        {
                            students.map(student => <option className={`my-1 text-sm p-1 `} key={student.id} value={student.id}>{student.name}</option>)
                        }
                    </SelectInput>
                    <InputError message={errors.students}/>
                </div> */}
            
                {/* <div className=" flex flex-col gap-2 mb-4">
                    <InputLabel htmlFor= 'created_at' value={'Creation Date'} />
                    <TextInput 
                        id = 'created_at'
                        created_at = 'created_at'
                        value = {data.created_at}
                        isFocused = {true}
                        onChange= {e=> setData('created_at', e.target.value)} 
                    />
                    <InputError message={errors.created_at}/>
                </div> */}
            
            

            <div className="flex gap-3 justify-end">
                
                <Link
                    onClick={e=> handleSubmit(e)}
                    // href={route('filliere.store')}
                    className="bg-teal-600 text-gray-800 font-semibold px-2 py-1 rounded-md"
                >
                    {filliere.id ? 'Update' : 'Create'} 
                </Link>
            </div>
        </form>
    )
}