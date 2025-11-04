import React from "react";
import {Input,Form,Background,Container,ActionButton} from "./../components"
import {Chromium} from "lucide-react"
import {Link} from "react-router-dom"
function SignUp(){
    return (
        <>
            <div className="flex justify-center items-center w-screen h-screen  relative overflow-hidden">
                    <Form heading={"Welcome"} subheading={"Sign Up to create account."} classname={"bg-white/5 backdrop-blur-md border border-white/20 "}>
                        <div className="space-y-6">
                            <div className="space-y-4">
                                <Input type={"text"} placeholder={"john doe"} labletext={"Username"}/>
                                <Input type={"email"} placeholder={"john.doe@example.com"} labletext={"Email Address"}/>
                                <Input type={"password"} placeholder={"••••••••••"} labletext={"Password"}/>
                            </div>

                            <div className="space-y-3">
                                <ActionButton text={"Sign Up"} classname={"bg-[#8a8aff] text-white hover:bg-[#7070ff] font-medium"}/>
                                <div className="relative">
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-[#333]"></div>
                                    </div>
                                    <div className="relative flex justify-center text-xs uppercase">
                                        <span className="bg-[#121212]/80 backdrop-blur-sm px-2 text-[#666]">Or continue with</span>
                                    </div>
                                </div>
                                <ActionButton text={"Sign in with Google"} classname={"bg-[#00d154] text-black hover:bg-[#00bf4c] font-medium"} icon={<Chromium className="w-5 h-5" />} />
                                <button className="w-full py-2 text-[#666] hover:text-white transition-colors text-sm">
                                    Continue as Guest
                                </button>
                            </div>
                        </div>
                        <div className="pt-6 text-center text-sm border-t border-[#333] mt-6">
                            <span className="text-[#666]">Already have an account? </span>
                            <Link to={"/login"} className="text-[#8a8aff] hover:underline">Sign In</Link>
                        </div>
                    </Form>
            </div>
        </>

    )
}

export default SignUp;