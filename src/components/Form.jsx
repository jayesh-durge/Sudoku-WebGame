import React from "react";
function Form({heading,subheading, children ,classname }){
    return (
        <form action="" className={`backdrop-blur-2xl text-white p-8 rounded-2xl w-[400px] shadow-2xl border border-white/5 ${classname}`}>
            <h1 className="text-2xl font-semibold">{heading}</h1>
            <h2 className="text-sm text-[#666] mt-1 mb-8">{subheading}</h2>
            {children}
        </form>
    )
}

export default Form;