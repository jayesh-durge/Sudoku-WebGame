import React from "react";
function IconButton({text,classname,icon}){
    return (
        <button className={`text-black px-5 py-2 bg-[#174d52] border-[3px] border-[#0ca0a3] rounded-xl font-bold opacity-[0.85]  w-fit flex justify-center ${classname}`}>{icon}{text}</button>
    )
}
export default IconButton;