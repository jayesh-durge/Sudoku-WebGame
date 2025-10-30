import React from "react";
import { twMerge } from "tailwind-merge";
function Container({classname,children}){
    return (
        <div className={twMerge(`bg-gradient-to-r from-[#010102] via-[#16191d] to-[#010101] flex justify-center h-fit w-fit rounded-xl ${classname}`)}>{children}</div>
    )
}

export default Container;