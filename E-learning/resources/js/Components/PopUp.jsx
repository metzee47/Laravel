
import React, { forwardRef } from 'react';

const PopUp = forwardRef(({ msg, className, ...props }, ref) => {
    return (
        <div ref={ref} className={` p-3 rounded-md text-bold text-base text-gray-900 mb-4 ${className}`} {...props}>
            {msg}
        </div>
    );
});

export default PopUp;

// export default function WarningPopUp({msg, className}){
//     return (
//         <div className={`p-3 rounded-md text-bold text-base text-gray-900 my-4 ${className}`}>
            
//         </div>
//     )
// }

