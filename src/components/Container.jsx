import React from "react";
function Container({children}){
    return (
        <div className="bg-gradient-to-r from-[#010102] via-[#16191d] to-[#010101] h-40 w-fit p-4 flex justify-center rounded-xl">{children}</div>
    )
}

export default Container;