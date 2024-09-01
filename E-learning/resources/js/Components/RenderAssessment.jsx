import { useEffect, useState } from "react";


function RenderAssessment({content, setData = function(){}, id, course, duration , order}) {
    
    const questions = content?.assessmentQuestions
    const contentKeys = Object.keys(questions)
    
    const [responses, setResponses] = useState(content.studentResponses)
        
    const [assessmentContent, setAssessmentContent] = useState([])

    useEffect(()=>{

        setAssessmentContent([])
        
        contentKeys.map((key, i) => {
            let newKey = i < 10 ? key.slice(0, -1) : key.slice(0, -2)
            const responsesKey = Object.keys(questions[key].responses)
            let newContent = []
            // console.log(responses[key].responses);
    
            switch (newKey) {
                case 'simple_q':
                    responsesKey.map((response, index) => {                            
                        newContent.push(
                            <div key={`q${i + 1}r${index + 1}`} className='flex gap-x-5 items-center ml-7 mb-2'>
                                <input 
                                    type = {'radio'} 
                                    id = {`q${i + 1}r${index + 1}`} 
                                    name = {`q${i + 1}r${index + 1}`}
                                    value = {`q${i + 1}r${index + 1}`}
                                    className = 'dark:bg-gray-900 border-gray-300 dark:border-gray-200 text-indigo-600 shadow-sm focus:ring-indigo-500 dark:focus:ring-indigo-600 dark:focus:ring-offset-gray-800'
                                    checked = {responses[key].responses === `q${i + 1}r${index + 1}`}
                                    // checked = {responses[key].responses[`response${index + 1 }`].checked}
                                    onChange = {e => handleChange(e, key)}
                                    />
                                <label htmlFor = {`q${i + 1}r${index + 1}`} className='font-medium text-sm'>
                                    {questions[key].responses[response]}
                                </label>
                            </div>
                        )    }        
                    )
                
                                                    
                    break
            
                case 'complex_q':
                    responsesKey.map((response, index) => {
                        newContent.push(
                            <div className='flex gap-x-5 items-center ml-7 mb-2'>
                                <input 
                                    type = 'checkbox' 
                                    id = {`q${i + 1}r${index + 1}`} 
                                    name = {`response${index + 1 }`}
                                    value = {index + 1} 
                                    checked = {responses[key].responses[`response${index + 1 }`].checked}
                                    onChange = {e => handleChange(e, key)}
                                    className = 'dark:bg-gray-900 border-gray-300 dark:border-gray-700 text-indigo-600 shadow-sm focus:ring-indigo-500 dark:focus:ring-indigo-600 dark:focus:ring-offset-gray-800 '/>
                                <label 
                                    htmlFor = {`q${i + 1}r${index + 1}`} 
                                    className='font-medium text-sm'
                                >
                                    {questions[key].responses[response]}
                                </label>
                            </div>
                        ) }           
                    )
                        
                    break
            
                default:
                    null
            }
    
            
            setAssessmentContent(assessmentContent=> 
            [
                ...assessmentContent,
                <div key = {key} className="my-2 flex flex-col gap-y-2">
                    <div className='px-2'>
                        <h3 className='text-lg font-semibold'>
                            {i + 1}. {questions[key].question}
                        </h3>
                    </div>
                    {newContent}
                </div>
            ]
                
            ) 

        })       
        
        setData(
            {
                assessment_id: id,
                course_id: course,
                content: [
                    {
                        ...content,
                        ['studentResponses']:responses
                    }
                ],
                _method: 'POST'
            }
        )
        
    }, [responses])

    const handleChange = (e, key) => {
        e.preventDefault()
        // console.log(responses[key], responses[key].responses[`response${index + 1 }`]);
        
        setResponses(responses => {
            if (key.includes('simple_q')) {
                const initialResponses = content.studentResponses[key].responses
                // console.log(initialResponses);
                
                return {
                    ...responses, 
                    [key]:
                    {
                        ...responses[key],
                        responses: e.target.value
                        // {
                        //     ...initialResponses,
                        //     [e.target.name]:
                        //         {
                        //             checked: e.target.checked
                        //         }
                        // }
                    }
                }

            }

            else if (key.includes('complex_q')){
                return {
                    ...responses, 
                    [key]:{
                        ...responses[key],
                        responses:{
                            ...responses[key].responses,
                            [e.target.name]:
                            {
                                checked: e.target.checked
                            }
                        }
                        
                    }
                }
            }
        }

        )
       

    }   
                
    return (
    
    <div className=" flex flex-col gap-5 p-4 text-gray-300 bg-gray-900 rounded-md shadow-inner shadow-slate-300 mt-4">
        <div className="flex justify-between items-center text-lg font-semibold text-indigo-500 p-3">
            <h1 className="underline ">Devoir {order}</h1>
            <p>Durée: {duration}</p>
        </div>

        {assessmentContent}

    </div>

    )

}

export default RenderAssessment