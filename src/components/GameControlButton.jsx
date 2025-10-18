import React from "react";
function GameControlButton({text,icon,classname}){
    return (
        <button className={`w-fit h-fit text-white flex justify-center px-5 py-2 opacity-[0.75] border-[3px] rounded-xl ${classname}`}>{icon}{text}</button>
    )
}
export default GameControlButton;