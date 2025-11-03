import React from "react";
import { twMerge } from "tailwind-merge";
function ActionButton({text, icon, classname}){
    return (
        <button className={twMerge(`w-full px-3 py-2 rounded-md flex items-center justify-center transition-colors text-sm ${classname}`)}>
            {icon && <span className="mr-2">{icon}</span>}
            {text}
        </button>
    )
}
export default ActionButton ;