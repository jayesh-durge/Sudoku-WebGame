import React from "react";
function Rank({rank,img,username,score,classname}){
    return (
        <div className={`flex justify-between border-t-[3px] border-[#1d122a] capitalize text-white bg-[#0f1115] px-5 py-2 rounded-xl ${classname}`}>{rank}
        <div>
            {img && <span className="mx-2">{<img src={img} className="rounded-full w-5 h-5 overflow-hidden inline"></img>}</span>}
            {username}
        </div>
        {score}</div>
    )
}
export default Rank;