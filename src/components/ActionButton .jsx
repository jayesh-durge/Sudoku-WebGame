import React from "react";
function ActionButton({text, icon, classname}){
    return (
        <button className={`capitalize w-full max-w-sm rounded-xl py-3 flex justify-center words ${classname} `}>{icon}
        {text}</button>
    )
}
export default ActionButton ;