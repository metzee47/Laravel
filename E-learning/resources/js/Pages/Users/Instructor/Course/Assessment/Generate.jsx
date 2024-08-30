import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Radio from "@/Components/Radio";
import RenderAssessment from "@/Components/RenderAssessment";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Body from "@/Layouts/Body";
import { Head, Link, useForm } from "@inertiajs/react";
import { useState, useEffect } from "react";

export default function Generate({auth, msg, course}){

    const {data, setData, post, errors} = useForm({
        content: [],
        title: '',
        order: '',
        duration: '',
        assessment_date: '',
        limit_date: '',
        _method: 'POST'
    })

    const [html, setHtml] = useState({})

    const [content, setContent] = useState([])
    const [showAssessment, setShowAssessment] = useState(false)
    const [showError, setShowError] = useState({
        msg: null,
        autorization: false
    })

    const saveData = (e, inputName) =>{

        setShowAssessment(false)
        // console.log(inputNameValue);        
        setHtml(html => 
            ({
                ...html, 
                ['assessmentQuestions']:{
                    ...html.assessmentQuestions,
                    [inputName]:
                    {
                        ...html.assessmentQuestions[inputName],
                        responses:
                        {
                            ...html.assessmentQuestions[inputName].responses,  
                            [e.target.name]: e.target.value,

                        }
    
                    }
                    
                }

            })
        )
        
    }
    

    // useEffect(()=>{
    //     console.log(content)        
    // },[content])

    // useEffect(()=>{
    //     console.log(html)        
    // },[html])

    const saveAssessment = e =>{
        e.preventDefault()
        
        post(route('instructor.course.store-assessment', course))

    }

    const addContent = (e, name, choix = 3) =>{

        e.preventDefault()

        const inputName = name + content.length
        setShowAssessment(false)

        let assessmentResponses = {}
        let studentResponses = {}

        for (let index = 0; index < choix; index++) {
            assessmentResponses[`response${index + 1}`] = '';
            studentResponses[`response${index + 1}`] = {checked:false};

        }        
        
        setHtml(html => 
            ({
                ...html,
                ['assessmentQuestions']:{
                    ...html.assessmentQuestions,
                    [inputName]: {
                        question: '',
                        responses: assessmentResponses
                    }
                },
                ['studentResponses']:{
                    ...html.studentResponses,
                    [inputName]:{
                        question: '',
                        responses: studentResponses
                    }
                }
            })
        )
        

        const input = 
            <div id={content.length} className="flex flex-col gap-2 mb-4">
                <InputLabel htmlFor= {'question'} value={`Question ${content.length + 1}`} />
                <TextInput 
                    id = {'question'}
                    name = {'question'}
                    required
                    // value = {'question'}
                    isFocused = {true}
                    onChange= {e=> 
                        setHtml(html => 
                            ({
                                ...html, 
                                ['assessmentQuestions']:{
                                    ...html.assessmentQuestions,
                                    [inputName]:
                                    {
                                        ...html.assessmentQuestions[inputName],
                                        question: e.target.value,
                    
                                    }
                                    
                                },
                                ['studentResponses']:{
                                    ...html.studentResponses,
                                    [inputName]:
                                    {
                                        ...html.studentResponses[inputName],
                                        question: e.target.value,
                    
                                    }
                                    
                                },
                
                            })
                        )
                    }
                />
                {
                    Array.from({ length: choix }, (_, index) => {
                        if(name === 'simple_q')
                            return <div key={index} className="flex gap-4 items-center">
                                <Radio value ={`${index + 1}`} name = {'response'}/>
                                <TextInput 
                                    id = {`response${index + 1}`}
                                    name = {`response${index + 1}`}
                                    placeholder = {`Reponse ${index + 1}`}
                                    className = {'w-1/2'}
                                    // value = {`response${index + 1}`}
                                    // isFocused = {true}
                                    onChange= {e=> saveData(e, inputName, 'responses')} 
                                />
                            </div>
                        else if(name === 'complex_q')
                            return <div className="flex gap-4 items-center">
                            <Checkbox key={index} value ={`${index + 1}`} name = {`question_${index + 1}[]`}/>
                            <TextInput 
                                id = {`response${index + 1}`}
                                name = {`response${index + 1}`}
                                placeholder = {`Reponse ${index + 1}`}
                                className = {'w-1/2'}
                                // value = {`response${index + 1}`}
                                // isFocused = {true}
                                onChange= {e=> saveData(e, inputName, choix, 'responses')} 
                            />
                        </div>
                            
                    })
                
                    
                }
                <Link onClick={e=> removeContent(e)} className="px-3 py-2 bg-red-500 self-end text-xs rounded-md font-semibold">Supprimer</Link>
            </div>

        setContent(content => [...content, input])

    }

    const removeContent = e => {
        
        e.preventDefault()
        setShowAssessment(false)

        const id = e.target.parentNode.id
        setContent(content.filter(c => c.props.id != id))
        setHtml(html=>{
            const contentKeys = Object.keys(content)                    
            const newContentKeys = {}
            const newResponsesKeys = {}
            const htmlkeys = html.assessmentQuestions && Object.keys(html?.assessmentQuestions)
            if (htmlkeys) {
                htmlkeys.map((key, i) => {                                                   
                    if(contentKeys[i]){
                        if(key.at(-1) == contentKeys[i]){
                            newContentKeys[key] = html.assessmentQuestions[key]                
                            newResponsesKeys[key] = html.studentResponses[key]                
                        }
                             
                    }           
                })
            }            

            return {
                ...html,
                ['assessmentQuestions']: newContentKeys,
                ['studentResponses']: newResponsesKeys
            }
    
        })      
          
    }

    const visualize = e => {
        e.preventDefault() 

        
        setData('content', [html])
        
        let oneFieldNull = false
        
        const displayMsg = msg =>{
            setShowError({['msg']: msg, ['autorization']: true})
            setTimeout(() => {
                setShowError({['msg']: null, ['autorization']: false})                    
            }, 3000);
            oneFieldNull = true
            
        }
        
        const htmlkeys = html?.assessmentQuestions && Object.keys(html.assessmentQuestions)
        const noContent = htmlkeys?.length === 0 || Object.keys(html).length === 0
        
        if(noContent){
            const msg = 'Votre devoir n\'a pas de contenu.'
            displayMsg(msg)
        }
        
        else{
            htmlkeys.forEach((key, i) => {
                const responsesKey = Object.keys(html.assessmentQuestions[key].responses)
                if(html.assessmentQuestions[key].question.trim() === ''){
                    const msg = `Veuillez remplir la question ${i+1}!`
                    displayMsg(msg)
                    return
                }
                
                responsesKey.forEach(response =>{
                    if(html.assessmentQuestions[key].responses[response].trim() === ''){
                        const msg = `Veuillez remplir toutes les réponses de la question ${i+1}!`
                        displayMsg(msg)
                        return
                    }
                })
            })

        }

        setShowAssessment(!oneFieldNull)
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            
            // msg={msg?.warning}
        >
            <Head title={`Student | ${auth.user.name}`}  />


            <Body>
            
                {/* New Lesson to course {course.name} */}

                {
                    msg?.success &&
                    <div className="p-3 bg-teal-700 font-bold text-gray-950 mb-3">{msg.success}</div>
                }
            
                <form>
                    <div className="">
                        {/* {content()} */}
                        <div className="flex gap-x-5 flex-wrap">
                            <div className="flex-1 flex flex-col gap-2 mb-4">
                                <InputLabel htmlFor= {'title'} value={'Titre du devoir'} />
                                <TextInput
                                    id = {'title'}
                                    name = {'title'}
                                    value = {data.title}
                                    isFocused = {true}
                                    onChange= {e=> setData('title', e.target.value)} 
                                />
                                <InputError message={errors.title}/>
                                {/* <InputError message={errors.content}/> */}
                            </div>
                            <div className="flex-1 flex flex-col gap-2 mb-4">
                                <InputLabel htmlFor= {'order'} value={'Ordre du devoir'} />
                                <TextInput 
                                    id = {'order'}
                                    name = {'order'}
                                    type = 'number'
                                    value = {data.order}
                                    onChange= {e=> setData('order', e.target.value)} 
                                />
                                <InputError message={errors.order}/>
                                {/* <InputError message={errors.content}/> */}
                            </div>
                            <div className="flex-1 flex flex-col gap-2 mb-4">
                                <InputLabel htmlFor= {'duration'} value={'Durée du devoir'} />
                                <SelectInput
                                    id = 'duration'
                                    name = 'duration'
                                    value = {data.duration}
                                    onChange= {e=> setData('duration', e.target.value)} 
                                >
                                        <option value="">Selectionnez la durée</option>
                                        <option value="_1h">1heure</option>
                                        <option value="_1h30">1h30mn</option>
                                        <option value="_2h">2heures</option>
                                        <option value="_2h30">2h30mn</option>
                                        <option value="_3h">3heures</option>
                                </SelectInput>
                                <InputError message={errors.duration}/>
                                {/* <InputError message={errors.content}/> */}
                            </div>
                        </div>
                        <div className="flex gap-5 flex-wrap">
                            <div className="flex-1 flex flex-col gap-2 mb-4">
                                <InputLabel htmlFor= {'assessment_date'} value={'Date du devoir'} />
                                <TextInput
                                    type = 'datetime-local'
                                    id = {'assessment_date'}
                                    name = {'assessment_date'}
                                    value = {data.assessment_date}
                                    isFocused = {true}
                                    onChange= {e=> setData('assessment_date', e.target.value)} 
                                />
                                <InputError message={errors.assessment_date}/>
                                {/* <InputError message={errors.content}/> */}
                            </div>
                            <div className="flex-1 flex flex-col gap-2 mb-4">
                                <InputLabel htmlFor= {'limit_date'} value={'Date limite de soumission'} />
                                <TextInput 
                                    type = 'datetime-local'  
                                    id = {'limit_date'}
                                    name = {'limit_date'}
                                    value = {data.limit_date}
                                    onChange= {e=> setData('limit_date', e.target.value)} 
                                />
                                <InputError message={errors.limit_date}/>
                                {/* <InputError message={errors.content}/> */}
                            </div>
                            
                        </div>

                        {
                            content
                        }

                        {
                            showError.autorization && 
                            <div className="bg-yellow-500 text-slate-900 font-bold py-2 px-4 my-4 rounded-md">{showError.msg}</div>
                        }

                        <div className="flex gap-4 mb-4 flex-wrap">

                            <Link className="px-3 py-2 bg-slate-50 text-gray-900 font-bold text-sm rounded-md" onClick={e=>addContent(e,'complex_q')}>Question à multiples réponses de 3 choix</Link>
                            <Link className="px-3 py-2 bg-slate-50 text-gray-900 font-bold text-sm rounded-md" onClick={e=>addContent(e,'complex_q', 4)}>Question à multiples réponses de 4 choix</Link>
                            <Link className="px-3 py-2 bg-slate-50 text-gray-900 font-bold text-sm rounded-md" onClick={e=>addContent(e,'simple_q')}>Question simple de 3 choix</Link>
                            <Link className="px-3 py-2 bg-slate-50 text-gray-900 font-bold text-sm rounded-md" onClick={e=>addContent(e,'simple_q', 4)}>Question simple de 4 choix</Link>
                            {/* <Link className="px-3 py-2 bg-slate-50 text-gray-900 font-bold text-sm rounded-md" onClick={e=>addContent(e,'paragraph')}>Ajouter un paragraphe</Link>
                            <Link className="px-3 py-2 bg-slate-50 text-gray-900 font-bold text-sm rounded-md" onClick={e=>addContent(e,'exemple')}>Ajouter Exemple</Link>
                            <Link className="px-3 py-2 bg-slate-50 text-gray-900 font-bold text-sm rounded-md" onClick={e=>addContent(e,'list')}>Ajouter Liste</Link>
                            <Link className="px-3 py-2 bg-slate-50 text-gray-900 font-bold text-sm rounded-md" onClick={e=>addContent(e,'video')}>Ajouter Video</Link> */}
                            
                        </div>
                        

                        {
                            !showAssessment &&
                            <div className="flex gap-3 justify-end">                
                                <Link
                                    onClick={(e)=>{visualize(e)}
                                    }
                                    // href={route('course.store')}
                                    className="bg-cyan-600 text-gray-800 font-semibold px-2 py-1 rounded-md"
                                >
                                    Visualiser
                                </Link>
                            </div>
                        }
                    </div>
                </form>

                {
                    showAssessment && 
                    <div>
                        <RenderAssessment content={html} setContent={setHtml}/>
                        <div className="mt-4 flex justify-end">
                            <Link
                                    onClick={(e)=> saveAssessment(e)}
                                    // href={route('course.store')}
                                    className="bg-cyan-600 text-gray-800 font-semibold px-2 py-1 rounded-md"
                                >
                                    Enregistrer
                            </Link>
                        </div>
                    </div>
                }

            
            </Body>
        </AuthenticatedLayout>
    )
}