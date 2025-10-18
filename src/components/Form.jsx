import React from "react";
function Form({heading,subheading, children }){
    return (
        <form action="" className="bg-[#060708] text-white p-5 border-[#0c0d11] border-8 rounded-xl">
            <h1 className="capitalize font-bold text-2xl">{heading}</h1>
            <h2 className="text-sm text-[#b4b5b5]">{subheading}</h2>
            {children }
        </form>
    )
}

export default Form;