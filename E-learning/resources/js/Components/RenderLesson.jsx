export default function RenderLesson ({content}) {
    
    const htmlkeys = Object.keys(content)
    let newContent = ['<div class=" flex flex-col gap-5 p-4 text-slate-300 bg-gray-800 rounded-md shadow-inner shadow-cyan-600 mt-4">']
    // console.log(htmlkeys);
    
    htmlkeys.forEach((key, i) => {
        let newKey = undefined
        if(i < 10)
            newKey = key.slice(0, -1)
        else
            newKey = key.slice(0, -2)


        switch (newKey) {
            case 'title':
                newContent.push(`<div class='py-3'><h1 class="text-2xl font-bold italic">${content[key]}</h1></div>`)
                                        
                break;
            case 'subtitle':
                newContent.push(`<div class='px-2'><h3 class='text-xl font-semibold italic'>${content[key]}</h3></div>`)
                    
                break;
            case 'exemple':
                const exempleContent = content[key].split('\n')
                newContent.push(`<div class="border-l-4 p-4 border-l-slate-300 bg-gray-900 rounded-md ">`)
                exempleContent.map(content=>
                    newContent.push(`<p class='my-2 ${content.includes('\n  ') ? 'ml-4' : ''}'>${content}</p>`)
                )
                newContent.push(`</div>`)
                    
                break;
            case 'paragraph':
                const paraContent = content[key].split('\n')
                newContent.push(`<div class="px-4">`)
                paraContent.map(content=>
                    newContent.push(`<p class='my-2'>${content}</p>`)
                )
                newContent.push(`</div>`)
                    
                break;
            case 'list':
                const listContent = content[key].split('\n')
                newContent.push(`<ul class="px-4 list-disc">`)
                listContent.map(content=>
                    newContent.push(`<li class='my-2'>${content}</li>`)
                )
                newContent.push(`</ul>`)
                    
                break;
            case 'video':
                newContent.push(`<div class="flex justify-center">${content[key]}</div>`)
                    
                break;
        
            default:
                break;
        }
   
    })

    // for(let i = 10; i < htmlkeys.length; i++){
    //     const key = htmlkeys[i]
        
    //     const newKey = key.slice(0, -2)
    //     console.log(newKey);
        
    //     switch (newKey) {
    //         case 'title':
    //             newContent.push(`<div class='py-3'><h1 class="text-2xl font-bold italic">${content[key]}</h1></div>`)
    //     console.log(key);
                                 
    //             break;
    //         case 'subtitle':
    //             newContent.push(`<div class='px-2'><h3 class='text-xl font-semibold italic'>${content[key]}</h3></div>`)
    //     console.log(key);
                    
    //             break;
    //         case 'exemple':
    //             const exempleContent = content[key].split('\n')
    //             newContent.push(`<div class="border-l-4 p-4 border-l-slate-300 bg-gray-900 rounded-md ">`)
    //             exempleContent.map(content=>
    //                 newContent.push(`<p class='my-2 ${content.includes('\n  ') ? 'ml-4' : ''}'>${content}</p>`)
    //             )
    //             newContent.push(`</div>`)
    //     console.log(key);
                    
    //             break;
    //         case 'paragraph':
    //             const paraContent = content[key].split('\n')
    //             newContent.push(`<div class="px-4">`)
    //             paraContent.map(content=>
    //                 newContent.push(`<p class='my-2'>${content}</p>`)
    //             )
    //             newContent.push(`</div>`)
    //     console.log(key);
                    
    //             break;
    //         case 'list':
    //             const listContent = content[key].split('\n')
    //             newContent.push(`<ul class="px-4 list-disc">`)
    //             listContent.map(content=>
    //                 newContent.push(`<li class='my-2'>${content}</li>`)
    //             )
    //             newContent.push(`</ul>`)
    //     console.log(key);
                    
    //             break;
    //         case 'video':
    //             newContent.push(`<div class="flex justify-center">${content[key]}</div>`)
    //     console.log(key);
                    
    //             break;
        
    //         default:
    //             break;
    //     }
    // }
        
        

    newContent.push('</div>')
    newContent = newContent.join('')
    // console.log(newContent.length);
    

    return <div dangerouslySetInnerHTML={{ __html: newContent || '' }} />

}




// import React from 'react';

// export default function ShowLeson({ content }) {
//     const htmlkeys = Object.keys(content);
//     // console.log(content);
    
//     return (
//         <div className="flex flex-col gap-5 p-4 text-slate-300 bg-gray-800 rounded-md shadow-inner shadow-cyan-600 mt-4">
//             {htmlkeys.map(key => {
//                 // console.log(key);
                
//                 const newKey = key.slice(0, -1);
//                 switch (newKey) {
                    
//                     case 'title':
//                         console.log(newKey)

//                         return <div key={key} className='py-3'><h1 className="text-2xl font-bold italic">{content[key]}</h1></div>;
//                     case 'subtitle':
//                         console.log(newKey)
//                         return <div key={key} className='px-2'><h3 className='text-xl font-semibold italic'>{content[key]}</h3></div>;
//                     case 'exemple':
//                         console.log(newKey)
//                         return (
//                             <div key={key} className="border-l-4 p-4 border-l-slate-300 bg-gray-900 rounded-md">
//                                 {content[key].split('\n').map((line, index) => (
//                                     <p key={index} className={`my-2 ${line.includes('\n  ') ? 'ml-4' : ''}`}>{line}</p>
//                                 ))}
//                             </div>
//                         );
//                     case 'paragraph':
//                         console.log(newKey)
//                         return (
//                             <div key={key} className="px-4">
//                                 {content[key].split('\n').map((line, index) => (
//                                     <p key={index} className='my-2'>{line}</p>
//                                 ))}
//                             </div>
//                         );
//                     case 'list':
//                         console.log(newKey)
//                         console.log(newKey)
//                         return (
//                             <ul key={key} className="px-4 list-disc">
//                                 {content[key].split('\n').map((line, index) => (
//                                     <li key={index} className='my-2'>{line}</li>
//                                 ))}
//                             </ul>
//                         );
//                     case 'video':
//                         console.log(newKey)
//                         return <div key={key} className="flex justify-center" dangerouslySetInnerHTML={{ __html: content[key] }} />;
//                     default:
//                         return null;
                    
                    
                    
//                 }
//             })}
//         </div>
//     );
// }

import React, { useState, useEffect } from 'react';

// export default function ShowLeson({ content }) {
//     const htmlkeys = Object.keys(content);

//     let newContent = '<div class="flex flex-col gap-5 p-4 text-slate-300 bg-gray-800 rounded-md shadow-inner shadow-cyan-600 mt-4">';

//     const tellSwitch = (i) =>{
//         if(htmlkeys[i]){
//             const key = htmlkeys[i];
//             const newKey = key.slice(0, -1);

//             switch (newKey) {
//                 case 'title':
//                     newContent += `<div class='py-3'><h1 class="text-2xl font-bold italic">${content[key]}</h1></div>`;
//                     break;
//                 case 'subtitle':
//                     newContent += `<div class='px-2'><h3 class='text-xl font-semibold italic'>${content[key]}</h3></div>`;
//                     break;
//                 case 'exemple':
//                     const exempleContent = content[key].split('\n');
//                     newContent += `<div class="border-l-4 p-4 border-l-slate-300 bg-gray-900 rounded-md">`;
//                     exempleContent.forEach(line => {
//                         newContent += `<p class='my-2 ${line.includes('\n  ') ? 'ml-4' : ''}'>${line}</p>`;
//                     });
//                     newContent += `</div>`;
//                     break;
//                 case 'paragraph':
//                     const paraContent = content[key].split('\n');
//                     newContent += `<div class="px-4">`;
//                     paraContent.forEach(line => {
//                         newContent += `<p class='my-2'>${line}</p>`;
//                     });
//                     newContent += `</div>`;
//                     break;
//                 case 'list':
//                     const listContent = content[key].split('\n');
//                     newContent += `<ul class="px-4 list-disc">`;
//                     listContent.forEach(line => {
//                         newContent += `<li class='my-2'>${line}</li>`;
//                     });
//                     newContent += `</ul>`;
//                     break;
//                 case 'video':
//                     newContent += `<div class="flex justify-center">${content[key]}</div>`;
//                     break;
                
//             }
//         }

//         else
//             return null        
//     }

//     for (let i = 0; i < 10; i++) {
        
//         // console.log(key);
        
//         tellSwitch(i)
        
//     }
//     for (let i = 10; i < 20; i++) {
        
//         // console.log(key);
        
//         tellSwitch(i)
        
//     }

//     newContent += '</div>';

//     return <div dangerouslySetInnerHTML={{ __html: newContent || '' }} />;
// }


