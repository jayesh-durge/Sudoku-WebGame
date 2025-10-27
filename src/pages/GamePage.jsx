import React,{useId} from "react";
import {DifficultyButton,Container} from "./../components"
function GamePage(){
    let difficultyLevels=["Initiate","Seeker","Solver","Strategist","Prodigy","Legend"];
    return (
        <div>
            
            <header className="flex justify-between p-4">
                <img 
                src="./../profile.jpg" 
                alt=""
                className="rounded-full w-13 h-13"
                />
                <div>
                    <div className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text">
                        <h1 className="text-transparent text-7xl font-bold text-center">CYBER SUDOKU</h1>
                    </div>
                    <Container classname={"py-3 px-5 my-2"}>
                            {
                                difficultyLevels.map((val)=>{
                                    return <DifficultyButton key={useId()} text={val}/>;
                                })
                            }       
                    </Container>
                </div>
                <div>
                    {/* leader board */}
                </div>
            </header>
            <main>
                    {/* here cube will be placed */}
            </main>
        </div>
    )
}
export default GamePage;