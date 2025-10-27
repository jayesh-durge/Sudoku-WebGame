import React from "react";
function ActionButton({text, icon, classname}){
    return (
        <button className={`w-full px-3 py-2 rounded-md flex items-center justify-center transition-colors ${classname}`}>
            {icon && <span className="mr-2">{icon}</span>}
            {text}
        </button>
    )
}
export default ActionButton ;