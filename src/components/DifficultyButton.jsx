import React from "react";
function DifficultyButton({text,active=false}){
    return (
        <button className={`w-fit rounded-xl text-white font-bold px-5 py-2 m-2 ${active?"bg-transparent ":"bg-[#babcc15d] opacity-[0.75]"}`}>{text}</button>
    )
}
export default DifficultyButton;