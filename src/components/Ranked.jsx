import React from "react";
function Rank({rank,img,username,score,classname}){
    return (
        <div className={`flex justify-between border-t-2 mb-1 border-[#1d122a] capitalize text-white bg-[#0f1115] px-5 py-3 ${classname}`}>
            <span className="w-20">{rank}</span>
            <div className="w-56 flex justify-evenly gap-2 ">
                <span>{img && <span className="mx-1">{<img src={img} className="rounded-full w-5 h-5 overflow-hidden inline"></img>}</span>}</span>
                <span >{username}</span>
            </div>
            <span className="w-30 text-center">{score}</span>
        </div>
    )
}
export default Rank;