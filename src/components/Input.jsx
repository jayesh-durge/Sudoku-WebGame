import React , {useId} from "react";
function Input({type="text", placeholder,labletext}){
    let id=useId();
    return (
        <label htmlFor={id}>  
            {labletext}  
            <input 
            type={type} 
            placeholder={placeholder} 
            id={id}
            className="bg-[#0d0f12] text-white w-full h-full p-2 outline-0 border-[4px] border-transparent rounded-xl focus:border-[#ffffff]"
            ></input>
        </label>
    )
}

export default Input;