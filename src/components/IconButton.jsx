import React from "react";
function IconButton({text,classname,icon}){
    return (
        <button className={`text-black flex items-center px-4 py-2 bg-[#174d52] 
                  border-2 border-[#0ca0a3] rounded-full font-semibold 
                  opacity-85 m-[1px] hover:opacity-100 transition 
                  duration-200 ease-in-out ${classname}`}>
            {icon && <span className="mx-1/2">{icon}</span>} 
            {text}
        </button>
    )
}
export default IconButton;