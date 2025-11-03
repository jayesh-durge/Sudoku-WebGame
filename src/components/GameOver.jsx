import React from "react";
import Container from "./Container";
import ActionButton from "./ActionButton"

function GameOver(){
    return (
        <Container classname={"text-white flex-col justify-evenly items-center border-[#9077f3] border-4 p-10 w-[30vw] h-[35vh] bg-black absolute top-55"}>
            <h1 className="font-bold text-3xl uppercase">Game completed!</h1>
            <h2 className="font-bold  capitalize">ready for another challenge?</h2>
            <ActionButton text={"play new game"} classname={"bg-[#9077f3] capitalize rounded-3xl w-fit px-5"}/>
        </Container>
    )
}

export default GameOver;