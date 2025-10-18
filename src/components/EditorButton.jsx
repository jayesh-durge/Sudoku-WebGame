import React from "react";
function EditorButton({text,classname}){
    return (
        <button className={`px-5 py-2 rounded-2xl font-bold w-fit flex justify-center capitalize ${classname}`}>{text}</button>
    )
}
export default EditorButton;