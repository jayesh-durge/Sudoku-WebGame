import React from "react";
function DifficultyButton({text,active=false}){
    return (
        <button className={`w-fit text-white rounded-[5px] px-5 py-2 opacity-[0.75] m-2 ${active?"bg-[#1e2128]":"bg-[#babcc15d]"}`}>{text}</button>
    )
}
export default DifficultyButton;