import { Link, useForm } from "@inertiajs/react";
import InputError from "./InputError";
import InputLabel from "./InputLabel";
import SelectInput from "./SelectInput";
import { MESSAGE_OBJECT } from "@/constant";
import TextareaInput from "./TextareaInput";
import MessageReceiver from "./MessageReceiver";
import TextInput from "./TextInput";
// import { useEffect, useState } from "react";


export default function FormMessage({ msg = null, instructors, students, fillieres, role = 'admin'})    
{

    
    // console.log(message.length)
    const {data, setData, post, errors, reset} = useForm({
        object: '',
        content: '',
        destinataires: '',
        sent_by: '',
        file: '',
        sent_to: [],
        _method: 'POST'
    })

    

    // console.log(data)
    const handleSubmit = e => {
        e.preventDefault()

        if(role === 'admin')
            post(route('dashboardmessage.store')) 
        else if(role === 'etudiant')
            post(route('student.message.store'))  
        else
            post(route('instructor.message.store'))  


    }

    // console.log(data)

    return(
        <form className="p-4 rounded-md">

            {
                msg &&
                <div className="p-3 bg-teal-800 font-bold text-gray-800 mb-3">{msg}</div>
            }

                <div className=" flex flex-col gap-2 mb-4">
                    <InputLabel htmlFor= 'object' value={'Message Object'} />
                    <SelectInput
                        id = 'object'
                        name = 'object'
                        value = {data.object}
                        className='w-full'
                        onChange= {e=> setData('object', e.target.value)}
                    >
                        {
                            role == 'admin' ?
                            <>
                                <option value="">Select object</option>
                                <option value="warning">{MESSAGE_OBJECT['warning']}</option>
                                <option value="information">{MESSAGE_OBJECT['information']}</option>
                                <option value="alerte">{MESSAGE_OBJECT['alerte']}</option>
                                <option value="a_venir">{MESSAGE_OBJECT['a_venir']}</option>
                                <option value="demande">{MESSAGE_OBJECT['demande']}</option>
                                <option value="rappel">{MESSAGE_OBJECT['rappel']}</option>
                            </>
                            :
                            <>
                                <option value="">Select object</option>
                                <option value="information">{MESSAGE_OBJECT['information']}</option>
                                <option value="demande">{MESSAGE_OBJECT['demande']}</option>
                                <option value="rappel">{MESSAGE_OBJECT['rappel']}</option>
                            </>

                        }
                        
                        
                        
                    </SelectInput>
                    <InputError message={errors.object}/>
                </div>
            
                <div className=" flex flex-col gap-2 mb-4">
                <InputLabel htmlFor= 'content' value={'Message Body'} />
                <TextareaInput 
                    id = 'content'
                    name = 'content'
                    value = {data.content}
                    rows = {5}
                    onChange= {e=> setData('content', e.target.value)} 
                />
                
                <InputError message={errors.content}/>
            </div>

            <div className=" flex flex-col gap-2 mb-4">
                <InputLabel htmlFor= 'destinataires' value={'Message Receiver(s)'} />
                <SelectInput
                    id = 'destinataires'
                    name = 'destinataires'
                    value = {data.destinataires}
                    className='w-full'
                    onChange= {e=> 
                        {
                            // console.log(data.sent_to);
                            
                            setData('sent_to', [])
                            setData('destinataires', e.target.value)
                        }
                    }
                >
                    {
                        role === 'admin' &&
                        <>
                            <option value=''>Select receiver</option>
                            <option value="fillieres">Fillieres</option>
                            <option value="etudiants">Un ou plusieurs etudiant</option>
                            <option value="professeurs">Un ou plusieurs professeurs</option>
                        </>

                        
                    }
                    {
                        role === 'etudiant' &&
                        <>
                            <option value=''>Select receiver</option>
                            <option value="admin">Admin</option>
                            <option value="professeur">Professeur</option>
                        </>

                        
                    }
                    {
                        role === 'professeur' &&
                        <>
                            <option value=''>Select receiver</option>
                            <option value="admin">Admin</option>
                            <option value="fillieres">Fillieres</option>
                            <option value="etudiant">Etudiant</option>
                        </>

                        
                    }
                                            
                </SelectInput>
                <InputError message={errors.destinataires}/>
            </div>

            {
                (data.destinataires || data.destinataires === "") && 
                               

                <MessageReceiver
                    fillieres={fillieres}
                    instructors={instructors}
                    students={students}
                    setData={setData}
                    errors={errors.sent_to}
                    data={data}
                    receiver={data.destinataires}
                />
                
            }

            <div className="flex flex-col gap-2 mb-4">
                <InputLabel htmlFor = 'file' value={'Fichier ou image'}/>
                <TextInput
                    id = 'file'
                    type = 'file'
                    name = 'file'
                    className = 'text-white'
                    placeholder = 'Televerser un fichier ou image'
                    // value = {data.file}
                    onChange= {e=> setData('file', e.target.files[0])} 
                />
                
                <InputError message={errors.file}/>
            </div>


            

            <div className="flex gap-3 justify-end">
                
                <Link
                    onClick={e=> handleSubmit(e)}
                    // href={route('message.store')}
                    className="bg-teal-600 text-gray-800 font-semibold px-2 py-1 rounded-md"
                >
                    Envoyer
                </Link>
            </div>
        </form>
    )
}