import React from "react";
import Container from "./Container"
import EditorButton from "./EditorButton"
function AccessicibilityBar(){
    return (
        <Container classname={"flex-col p-2 gap-3 bg-[#0f1114]"}>
            <EditorButton text={"erase"} classname={"bg-[#ff4400] text-white"}/>
            <EditorButton text={"undo"} classname={"bg-[#00ffff] text-[#003d3d]"}/>
            <EditorButton text={"redo"} classname={"bg-[#9d4dff] text-white"}/>
            <EditorButton text={"new"} classname={"bg-[#1dd75b] text-black"}/>
        </Container>
    )
}
export default AccessicibilityBar;