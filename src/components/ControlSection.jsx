import React from "react";
import Container from "./Container";
import GameControlButton from "./GameControlButton";
import {Play,Pause,RotateCcw,Bug} from "lucide-react";
function ControlSection({time="00:00:00",bugs=0}){
    return (
        <Container classname={"flex-col p-3 bg-[#1e2128]"}>
            <div className="flex justify-evenly items-center">
                <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent font-bold text-4xl">{time}</span>
                <span className="text-center flex items-center text-[#00ab93] "><Bug className="text-[#ca545a] w-4.5 mr-1 ml-3" />{bugs}</span>
            </div>
            <div className="flex justify-evenly items-center gap-2">
                <GameControlButton 
                text={"start"} 
                icon={<Play className="w-4.5 mx-1" /> }
                classname={"bg-[#272952] border-[#4d4dff]"}
                />
                <GameControlButton 
                text={"pause"} 
                icon={<Pause className="w-4.5 mx-1"/>}
                classname={"bg-[#362952] border-[#9d4dff]"}
                />
                <GameControlButton 
                text={"reset"} 
                icon={<RotateCcw className="w-4.5 mx-1" />}
                classname={"bg-[#171a2e] border-[#8b8d96]"}
                />
            </div>
        </Container>
    )
}
export default ControlSection;