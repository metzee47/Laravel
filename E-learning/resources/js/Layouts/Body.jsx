import PopUp from "@/Components/PopUp";
import { Transition } from "@headlessui/react";

export default function Body({children, msg}){
    return (
        <div className="py-8">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            {msg &&                            
                                <Transition
                                    show={msg}
                                    enter="transition ease-out duration-300"
                                    enterFrom="opacity-0 scale-0"
                                    enterTo="opacity-50 scale-100"
                                    leave="transition ease-in duration-75"
                                    // leaveFrom="opacity-100 scale-100"
                                    // leaveTo="opacity-0 scale-95"
                                >
                                    <PopUp msg={msg} className={'bg-yellow-600'}/>
                                </Transition>                                                                     
                            }
                            {children}
                        </div>
                    </div>
                </div>
        </div>
    )
}