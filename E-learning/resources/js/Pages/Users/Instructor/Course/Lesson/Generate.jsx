import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import RenderLesson from "@/Components/RenderLesson";
import TextareaInput from "@/Components/TextareaInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Body from "@/Layouts/Body";
import { Head, Link, useForm } from "@inertiajs/react";
import { useState } from "react";

export default function Generate({auth, msg, course, lesson=null}){

    const {data, setData, post, put, errors, reset} = useForm({
        content: [],
        title: '',

        _method: 'POST'
    })

    const [html, setHtml] = useState({})

    const [content, setContent] = useState([])
    const [showLesson, setShowLesson] = useState(false)
    const [showError, setShowError] = useState({
        msg: null,
        autorization: false
    })

    // useEffect(()=>{
    //     // console.log(data.content.length)
    //     console.log(html)
        
    // },[html])

    const generateLesson = e =>{
        e.preventDefault()
        
        post(route('instructor.course.store-lesson', course))

    }

    const addContent = (e,name) =>{

        e.preventDefault()
        setShowLesson(false)

        const inputName = name + content.length
        
        setHtml(html => ({...html, [inputName]: ''}))
        const label = name.charAt(0).toUpperCase() + name.slice(1) 
        // console.log(content);

        const textInput = 
            <div id={content.length} className="flex flex-col gap-2 mb-4">
                <InputLabel htmlFor= {inputName} value={`${name == 'video' ? 'Link de la video' : label}`} />
                <TextInput 
                    id = {inputName}
                    name = {inputName}
                    required
                    // value = {inputName}
                    // isFocused = {true}
                    onChange= {e=> {
                        setShowLesson(false)
                        setHtml(html => ({...html, [e.target.name]: e.target.value}))}
                    } 
                />
                <Link onClick={e=>removeContent(e)} className="px-3 py-2 bg-red-500 self-end text-xs rounded-md font-semibold">Supprimer</Link>
            </div>

        const textareaInput = 
            <div id={content.length} className="flex flex-col gap-2 mb-4">
                <InputLabel htmlFor= {inputName} value={`${label}`} />
                <TextareaInput 
                    id = {inputName}
                    name = {inputName}
                    rows = {5}
                    required
                    // value = {data.inputName}
                    // isFocused = {true}
                    onChange= {e=> {
                        setShowLesson(false)
                        setHtml(html => ({...html, [e.target.name]: e.target.value}))}
                    }  

                />
                <Link onClick={e=>removeContent(e)} className="px-3 py-2 bg-red-500 self-end text-xs rounded-md font-semibold">Supprimer</Link>
            </div>
        
        switch (name) {
            case 'subtitle':
                setContent(content => [...content, textInput]
                )
                break
            case 'title':
                setContent(content => [...content, textInput]
                )
                break
            case 'video':
                setContent(content => [...content, textInput]
                )
                break
            case 'paragraph':
                setContent(content => [...content, textareaInput]
                )
                break
            case 'list':
                setContent(content => [...content, textareaInput]
                )
                break
            case 'exemple':
                setContent(content => [...content, textareaInput]
                )
                break
                    
            default: null;
        }

    }

    const removeContent = e =>{
        e.preventDefault()
        setShowLesson(false)

        const id = e.target.parentNode.id
        // console.log(id, content);
        setContent(content.filter(c => c.props.id != id))
          
        setHtml(html => {
            const contentKeys = Object.keys(content)
            // console.log(contentKeys)
            const htmlkeys = Object.keys(html)
            const newContentKeys = {}

            htmlkeys.map((key, i) => {
                if(contentKeys[i]){
                    if(key.at(-1) == contentKeys[i])
                        newContentKeys[key] = html[key]
                    
                }
                
            })

            return newContentKeys
        });
            
            
        
        
        
        
        
    }

    const visualize = e => {
        e.preventDefault() 

        const htmlkeys = Object.keys(html)
        setData('content', [html])

        let oneFieldNull = false

        const displayMsg = msg =>{
            setShowError({['msg']: msg, ['autorization']: true})
                setTimeout(() => {
                    setShowError({['msg']: null, ['autorization']: false})                    
                }, 3000);
            oneFieldNull = true
            
        }

        if(htmlkeys.length < 1){
            const msg = 'Votre devoir n\'a pas de contenu.'
            displayMsg(msg)
        }

        htmlkeys.forEach(key => {
            if(html[key] === ''){
                const msg = 'Veuillez remplir tous les champs !'
                displayMsg(msg)
                
            }
        });

        
        setShowLesson(!oneFieldNull)
    }


    // console.log(renderHTML(2));
    

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
                        <div className="flex flex-col gap-2 mb-4">
                            <InputLabel htmlFor= {'title'} value={'Titre de la leçon'} />
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

                        {
                            content
                        }

                        {
                            showError.autorization && 
                            <div className="bg-yellow-500 text-slate-800 font-bold py-2 px-4 my-4 rounded-md">{showError.msg}</div>
                        }

                        <div className="flex gap-4 mb-4 flex-wrap">

                            <Link className="px-3 py-2 bg-slate-50 text-gray-900 font-bold text-sm rounded-md" onClick={e=>addContent(e,'title')}>Ajouter un grand titre</Link>
                            <Link className="px-3 py-2 bg-slate-50 text-gray-900 font-bold text-sm rounded-md" onClick={e=>addContent(e,'subtitle')}>Ajouter un sous titre</Link>
                            <Link className="px-3 py-2 bg-slate-50 text-gray-900 font-bold text-sm rounded-md" onClick={e=>addContent(e,'paragraph')}>Ajouter un paragraphe</Link>
                            <Link className="px-3 py-2 bg-slate-50 text-gray-900 font-bold text-sm rounded-md" onClick={e=>addContent(e,'exemple')}>Ajouter Exemple</Link>
                            <Link className="px-3 py-2 bg-slate-50 text-gray-900 font-bold text-sm rounded-md" onClick={e=>addContent(e,'list')}>Ajouter Liste</Link>
                            <Link className="px-3 py-2 bg-slate-50 text-gray-900 font-bold text-sm rounded-md" onClick={e=>addContent(e,'video')}>Ajouter Video</Link>
                            
                        </div>
                        

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
                    </div>
                </form>

                {
                    showLesson && 
                    <div>
                        <RenderLesson content={html}/>
                        <div className="mt-4 flex justify-end">
                            <Link
                                    onClick={(e)=> generateLesson(e)}
                                    // href={route('course.store')}
                                    className="bg-cyan-600 text-gray-800 font-semibold px-2 py-1 rounded-md"
                                >
                                    Publier
                            </Link>
                        </div>
                    </div>
                }

            </Body>
        </AuthenticatedLayout>
    )
}