import { MESSAGE_OBJECT, MESSAGE_STATUS, MESSAGE_STATUS_STYLE, ROLE } from "@/constant";
import { Link } from "@inertiajs/react";

export default function ShowMessage({message}){

    const content = message.content.split('\n\n')

    const displayContent = () =>{
        return(
            <div>
                {
                    content.map(line=>
                        <p className="mb-3">{line}</p>
                    )
                }
            </div>
        )
    }
    return(
        
        <div className="flex flex-col justify-start gap-5 mb-4 w-full">      
            {/* <pre>{JSON.stringify(message, undefined, 2)}</pre> */}

            <h2 className="font-semibold text-xl shadow-inner shadow-black text-black dark:text-gray-200 leading-tight px-4 py-3 rounded-md w-fit">Message Info</h2>
            <div className="bg-gray-900 p-5 rounded-md ">
                <div className="mb-2 flex gap-2 items-center">
                    <span className="text-slate-400">Object</span>
                    <h3 className="text-base text-green-200 italic ">{MESSAGE_OBJECT[message.object]}</h3>
                </div>
                <div className="mb-2 flex gap-2 items-center">
                    <span className="text-slate-400">Destinataire</span>
                    <h3 className="text-base text-green-200 italic">{message.sent_to.name} , {ROLE[message.sent_to.role]}</h3>
                </div>
                <div className="mb-2 flex gap-2 items-center">
                    <span className="text-slate-400">Expediteur</span>
                    <h3 className="text-base text-green-200 italic">{message.sent_by.name} , {ROLE[message.sent_by.role]}</h3>
                </div>
                <div className="mb-2 flex gap-2 items-center">
                    <span className="text-slate-400">Status</span>
                    <h3 className={`text-base ${MESSAGE_STATUS_STYLE[message.status]}`}>{MESSAGE_STATUS[message.status]}</h3>
                </div>
                {
                    message.file &&
                    <div className="mb-2 flex gap-2 items-center">
                        <span className="text-slate-400">Fichier(s)</span>
                        <Link 
                            href = {route('dashboardmessage.download-file', message)}
                            className={`text-sm italic duration-200 hover:underline hover:text-green-200 font-bold`}>
                            Télécharger
                        </Link>
                    </div>
                }
                <div className="mb-2 flex flex-col gap-4">
                    {/* <span className="text-slate-400">Contenu</span> */}
                    <h3 className="text-sm bg-gray-950 text-slate-400 rounded-md text-justify p-4 shadow-sm shadow-green-200 w-full">
                        {displayContent()}
                    </h3>
                </div>
            </div>
        </div>
    )
}