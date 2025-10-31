import React from "react";
function EditorButton({text,classname}){
    return (
        <button className={`px-5 py-2 rounded-3xl font-bold w-25 flex justify-center capitalize ${classname}`}>{text}</button>
    )
}
export default EditorButton;