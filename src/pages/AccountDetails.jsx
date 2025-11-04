import React,{useId} from "react";
import {Container,Form,Input,ActionButton} from "./../components"
import {LogOut,Camera,ArrowLeft} from "lucide-react"
import { Link } from "react-router-dom";
function AccountDetails({username}){
    let id1=useId();
    let id2=useId();
    return (
        <div className="flex flex-col items-center  justify-around w-screen h-screen bg-transparent text-white overflow-scroll">
                <Link 
                className="w-screen flex justify-start items-center p-3 text-2xl capitalize"
                to={"/Game-On"}
                ><ArrowLeft size={30} /> back to game board</Link>

                <Container classname={"my-15 bg-black"}>
                    <Form heading={"Account Details"} subheading={"Manage your profile information and how it appears to others."} classname={"w-[600px] h-[700px] overflow-scroll"}>
                        <div className="flex flex-col items-center mb-8">
                            <div className="relative mb-4">
                                <img src="./../../profile.jpg" alt="" className="rounded-full w-[88px] h-[88px] object-cover"/>
                                <div className="absolute bottom-0 right-0 bg-[#1dd75b] p-1.5 rounded-full cursor-pointer">
                                    <Camera size={13} />
                                </div>
                            </div>
                            <h3 className="text-xl font-medium mb-1.5 ">{username}</h3>
                            <label htmlFor={id1} className="text-[13px] text-[#9d85ff] cursor-pointer hover:text-[#8b71ff]">
                                Update Profile Picture
                                <input type="file" id={id1} className="hidden"/>
                            </label>
                        </div>
                        <hr className="border-gray-800 mb-7" />
                        <div className="space-y-5">
                            <Input labletext={"Username"} type={"text"} placeholder={"Aurora_Nova"}/>
                            <Input labletext={"Email Address"} type={"email"} placeholder={"aurora.nova@example.com"} />
                            
                        <label htmlFor={id2} className="text-sm font-medium text-white">
                            Bio / About Me
                            <textarea id={id2}
                            placeholder="Digital artist and UX designer passionate about futuristic interfaces and immersive experiences. Exploring the intersection of creativity and technology." 
                            className="w-full px-2 py-1 mt-0.5 bg-[#1a1a1a] rounded-md border-2 border-[#232039] text-white focus:outline-none focus:ring-2 focus:ring-[#8a8aff] focus:border-transparent h-22 text-[12px]"
                            ></textarea>
                        </label>
                          <div className="w-full justify-start items-center">
                              <ActionButton text={"Save Changes"} classname={"bg-[#9d85ff] w-fit mt-2"}/>
                          </div>
                        </div>
                    </Form>
                </Container>

                <Container classname={"my-15 bg-black"}>
                    <Form heading={"Security & Privacy"} subheading={"Update your password and enhance your account security."}
                    classname={"w-[600px] h-[550px]"}
                    >
                        <div className="space-y-5">
                            <Input labletext={"Current Password"} type={"password"} placeholder={"••••••••"}/>
                            <Input labletext={"New Password"} type={"password"} placeholder={"••••••••"}/>
                            <Input labletext={"Confirm New Password"} type={"password"} placeholder={"••••••••"}/>
                            <div className="w-full justify-start items-center">
                              <ActionButton text={"Change Password"} classname={"bg-[#9d85ff] w-fit mt-2"}/>
                          </div>
                        </div>
                        <hr className="border-gray-800 my-7" />
                        <div className="flex justify-end items-center w-full">
                            <ActionButton 
                                text={"Log out"} 
                                icon={<LogOut size={14}/>} 
                                classname={"bg-[#ff4747] text-[14px] px-3 py-2 w-fit hover:bg-[#ff3333] transition-colors"}
                            />
                        </div>
                    </Form>
                </Container>
        </div>
    )
}
export default AccountDetails;