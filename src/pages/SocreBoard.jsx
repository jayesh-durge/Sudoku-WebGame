import React from "react";
import {Container,Ranked} from "./../components"
function ScoreBoard(){
    let leaderBoard=[
        {
            id:123456,
            username:"jayesh durge",
            score:360
        },
        {
            id:234567,
            username:"prathmesh durge",
            score:300
        },
        {
            id:34567,
            username:"vedant ramdham",
            score:290
        },
        {
            id:45678,
            username:"mukund gaikwad",
            score:290
        },
        {
            id:56789,
            username:"mayank nagbhidkar",
            score:280
        },
        {
            id:6789,
            username:"arpit khanpasole",
            score:270
        },
        
    ]
    return <>
        <Container classname={"flex-col p-5 ml-2 h-screen w-[25vw] justify-start overflow-scroll bg-[#0f1115] border-2 border-[#0c4043]"}>
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text">
                <h1 className="text-transparent text-4xl font-bold text-center mb-7">Masterboard</h1>
            </div>
            <nav>
                <ul className="list-none text-white flex justify-between px-5 py-3">
                    <li>Rank</li>
                    <li>Player</li>
                    <li>Score</li>
                </ul>
            </nav>
            <div>
                {
                    leaderBoard.map((player,i) => (
                        <Ranked rank={i+1} username={player.username} score={player.score} img={"./../profile.jpg"} key={player.id}/>
                    ))
                }
            </div>
        </Container>
    </>
}

export default ScoreBoard;