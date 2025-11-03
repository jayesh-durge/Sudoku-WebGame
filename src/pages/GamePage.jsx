import React,{useId} from "react";
import {DifficultyButton,Container,GameOver,ControlSection,AccessicibilityBar} from "./../components"
import {ProfilePage, ScoreBoard} from "./../pages"
import {Flame} from "lucide-react"

function GamePage(){
    let difficultyLevels=["Initiate","Seeker","Solver","Strategist","Prodigy","Legend"];
    let whichPage="";
    let viewscoreBoard=true;
    let gameover=true;
    return (
        <div className="flex w-screen h-screen justify-between p-2">
            <div >
                {
                    whichPage=="Profile"?
                    <ProfilePage 
                            img={"./../profile.jpg"}
                            username={"jayesh durge"}
                            level={14}
                            rank={12}
                            Bio={"word imposiable itself says im possible"}
                            Bagdes={[{text:"supers",icon:<Flame />,id:1},{text:"supers",icon:<Flame />,id:1},{text:"supers",icon:<Flame />,id:1},{text:"supers",icon:<Flame />,id:1},{text:"supers",icon:<Flame />,id:1},{text:"supers",icon:<Flame />,id:1}]}
                            solvedProblem={13}
                            totalProblem={15}
                            classname={"mr-1"}
                    />
                    :
                    <div className="flex flex-col justify-between h-screen">
                            <img 
                            src="./../profile.jpg" 
                            alt=""
                            className="rounded-full w-15 h-15 border-3 border-[#009999]"
                        />
                        <AccessicibilityBar/>
                    </div>
                    
                }
            </div>
            <div className="flex flex-col h-screen justify-between items-center">
                <div>
                    <div className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text">
                        <h1 className="text-transparent text-6xl font-bold text-center">SudokuOrbis</h1>
                    </div>
                    <Container classname={"py-1 px-5 my-2 border-2 border-[#001e1a] bg-black overflow-x-scroll w-[50vw] "}>
                            {
                                difficultyLevels.map((val,i)=>{
                                    return <DifficultyButton key={useId()} text={val} active={i==2}/>;
                                })
                            }       
                    </Container>
                </div>
                {gameover && <GameOver/>}
                <ControlSection/>
            </div>
            <div>
                {
                    viewscoreBoard?
                    <ScoreBoard/>
                    :
                    <ProfilePage 
                        img={"./../profile.jpg"}
                        username={"jayesh durge"}
                        level={14}
                        rank={12}
                        self={false}
                        Bio={"word imposiable itself says im possible"}
                        Bagdes={[{text:"supers",icon:<Flame />,id:1},{text:"supers",icon:<Flame />,id:1},{text:"supers",icon:<Flame />,id:1},{text:"supers",icon:<Flame />,id:1},{text:"supers",icon:<Flame />,id:1},{text:"supers",icon:<Flame />,id:1}]}
                        solvedProblem={13}
                        totalProblem={15}
                        classname={"mr-1"}
                    />
                }
            </div>
        </div>
    )
}
export default GamePage;
