import React,{useId,useState} from "react";
import {DifficultyButton,Container,GameOver,ControlSection,AccessicibilityBar, SudokuBoard} from "./../components";
import {ProfilePage, ScoreBoard} from "./../pages";
import {Flame} from "lucide-react";
import { Outlet ,Link, useLocation } from "react-router-dom";


function GamePage(){
    let difficultyLevels=["Initiate","Seeker","Solver","Strategist","Prodigy","Legend"];
    const location=useLocation().pathname;
    let profilePage=location=="/Game-On/Profile";
    let viewscoreBoard=!String(location).includes("/Game-On/Player");
    let [gameOver,setGameover]=useState(false);
    let [difificulty,setDifficulty]=useState("Solver");

    return (
        <div className="flex w-screen h-screen justify-between p-2">
            <div >
                {
                    profilePage?
                    <Outlet/>
                    :
                    <div className="flex flex-col justify-between h-screen">
                        <Link to={"/Game-On/Profile"}>
                            <img 
                                src="./../profile.jpg" 
                                alt=""
                                className="rounded-full w-15 h-15 border-3 border-[#009999]"
                            />
                        </Link>
                            
                        <AccessicibilityBar/>
                    </div>
                    
                }
            </div>
            <div className="flex flex-col h-screen justify-between items-center">
                <div>
                    <div className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text">
                        <h1 className="text-transparent text-6xl font-bold text-center"><Link to={"/Game-On"}>SudokuOrbis</Link></h1>
                    </div>
                    <Container classname={"py-1 px-5 my-2 border-2 border-[#001e1a] bg-black overflow-x-scroll w-[50vw] "}>
                            {
                                difficultyLevels.map((val,i)=>{
                                    return <DifficultyButton key={useId()} text={val} active={val==difificulty} setDifficulty={setDifficulty} />;
                                })
                            }
                    </Container>
                </div>
                <SudokuBoard/>
                {gameOver && <GameOver/>}
                <ControlSection/>
            </div>
            <div>
                {
                    viewscoreBoard?
                    <ScoreBoard/>
                    :
                    <Outlet/>
                }
            </div>
        </div>
    )
}
export default GamePage;
