import React , {useId} from "react";
function Input({type="text", placeholder,labletext}){
    let id=useId();
    return (
        <div className="space-y-2">
            <label htmlFor={id} className="text-sm font-medium text-white">
                {labletext}
            </label>
            <input 
                type={type} 
                placeholder={placeholder} 
                id={id}
                className="w-full px-2 py-1 bg-[#1a1a1a]  mt-0.5 rounded-md border-2 border-[#232039] text-white focus:outline-none focus:ring-2 focus:ring-[#8a8aff] focus:border-transparent text-[12px]"
            />
        </div>
    )
}

export default Input;