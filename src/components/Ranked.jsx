import React from "react";
function Rank({rank,img,username,score,classname}){
    return (
        <div className={`flex justify-between border-[4px] border-[#1d122a] capitalize text-white bg-[#0f1115] px-5 py-2 ${classname}`}>{rank}
        <div>{img}{username}</div>
        {score}</div>
    )
}
export default Rank;