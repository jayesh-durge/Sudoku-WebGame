import React,{useId} from "react";
import {DifficultyButton,Container,GameOver,ControlSection,AccessicibilityBar} from "./../components"
import {ProfilePage, ScoreBoard} from "./../pages"
import {Flame} from "lucide-react"

function GamePage(){
    let difficultyLevels=["Initiate","Seeker","Solver","Strategist","Prodigy","Legend"];
    let whichPage=" ";
    let viewscoreBoard=true;
    let gameover=false;
    return (
        <div className="flex flex-col justify-between items-center w-screen h-screen">
            <header className="flex justify-between p-2 w-full h-full">
                <div>
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
                    <img 
                        src="./../profile.jpg" 
                        alt=""
                        className="rounded-full w-15 h-15 border-3 border-[#009999]"
                    />
                }
                </div>
                <div>
                    <div className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text">
                        <h1 className="text-transparent text-6xl font-bold text-center">CYBER SUDOKU</h1>
                    </div>
                    <Container classname={"py-1 px-5 my-2 border-2 border-[#001e1a] bg-black"}>
                            {
                                difficultyLevels.map((val,i)=>{
                                    return <DifficultyButton key={useId()} text={val} active={i==2}/>;
                                })
                            }       
                    </Container>
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
            </header>
            <main className={`h-[70vh] absolute z-200 flex justify-center items-center transform translate-y-40 ${whichPage=="Profile"?"w-[50vw]":"-translate-x-50 w-[70vw]"}`}>
                {gameover && <GameOver/>}
            </main>
            <div className={`absolute z-100 w-[50vw] left-0 bottom-0 flex justify-between items-end px-2 pb-2 ${whichPage=="Profile" ? "justify-end transform translate-x-50":""}`}>
                {whichPage!="Profile" && <AccessicibilityBar/>}
                <ControlSection/>
            </div>
        </div>
    )
}
export default GamePage;
