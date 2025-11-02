import React from "react";
function Background(){
    <style>

    </style>
    return (
        <>
            <div className="bg-[#070b0f] w-screen h-screen flex overflow-hidden absolute -z-10">
                <div className="w-[250px] h-[250px] bg-[#1440458f] rounded-full move3 translate-6"></div>
                <div className="w-[250px] h-[250px] bg-[#141c29] rounded-full move1 "></div>
                <div className="w-[250px] h-[250px] bg-[#032d168b] rounded-full move2 translate-1/2"></div>
            </div>
            <style jsx>{`
                    .move1{
                    animation: randomMove1 20s ease-in-out infinite alternate;
                    }
                    .move2{
                    animation: randomMove2 20s ease-in-out infinite alternate;
                    }
                    .move3{
                    animation: randomMove3 20s ease-in-out infinite alternate;   
                    }
                    @keyframes randomMove1 {
                    0%   { transform: translate(0, 0); }
                    25%  { transform: translate(60vw, 10vh); }
                    50%  { transform: translate(30vw, 80vh); }
                    75%  { transform: translate(80vw, 50vh); }
                    100% { transform: translate(0, 0); }
                    }
                    @keyframes randomMove2 {
                    0%   { transform: translate(0, 0); }
                    20%  { transform: translate(50vw, 70vh); }
                    40%  { transform: translate(20vw, 20vh); }
                    60%  { transform: translate(80vw, 30vh); }
                    80%  { transform: translate(10vw, 50vh); }
                    100% { transform: translate(0, 0); }
                    }
                    @keyframes randomMove3 {
                    0%   { transform: translate(0, 0); }
                    15%  { transform: translate(70vw, 20vh); }
                    35%  { transform: translate(40vw, 60vh); }
                    55%  { transform: translate(10vw, 30vh); }
                    75%  { transform: translate(80vw, 80vh); }
                    100% { transform: translate(0, 0); }
                    }
            `}</style>
        </>
    )
}
export default Background;