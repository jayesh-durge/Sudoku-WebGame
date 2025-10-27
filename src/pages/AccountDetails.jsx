import React,{useId} from "react";
import {Container,Form,Input,ActionButton} from "./../components"
import {Trash2,Camera} from "lucide-react"
function AccountDetails(){
    let id1=useId();
    let id2=useId();
    return (
        <div className="flex flex-col items-center  justify-around w-screen h-screen bg-transparent text-white overflow-scroll">
                <Container classname={"my-15"}>
                    <Form heading={"Account Details"} subheading={"Manage your profile information and how it appears to others."} classname={"w-[600px] h-[700px] overflow-scroll"}>
                        <div className="flex flex-col items-center mb-8">
                            <div className="relative mb-4">
                                <img src="./../../profile.jpg" alt="" className="rounded-full w-[88px] h-[88px] object-cover"/>
                                <div className="absolute bottom-0 right-0 bg-[#1dd75b] p-1.5 rounded-full cursor-pointer">
                                    <Camera size={13} />
                                </div>
                            </div>
                            <h3 className="text-[17px] font-medium mb-1.5">Aurora_Nova</h3>
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
                            className="w-full px-3 py-2 bg-[#1a1a1a] rounded-md border border-[#333] text-white focus:outline-none focus:ring-2 focus:ring-[#8a8aff] focus:border-transparent"
                            ></textarea>
                        </label>
                            <ActionButton text={"Save Changes"} classname={"bg-[#9d85ff] w-full mt-1"}/>
                        </div>
                    </Form>
                </Container>

                <Container classname={"my-15"}>
                    <Form heading={"Security & Privacy"} subheading={"Update your password and enhance your account security."}
                    classname={"w-[600px] h-[550px]"}
                    >
                        <div className="space-y-5">
                            <Input labletext={"Current Password"} type={"password"} placeholder={"••••••••"}/>
                            <Input labletext={"New Password"} type={"password"} placeholder={"••••••••"}/>
                            <Input labletext={"Confirm New Password"} type={"password"} placeholder={"••••••••"}/>
                            <ActionButton text={"Change Password"} classname={"bg-[#9d85ff] w-full"}/>
                        </div>
                        <hr className="border-gray-800 my-7" />
                        <div className="flex justify-end mt-auto">
                            <ActionButton 
                                text={"Delete Account"} 
                                icon={<Trash2 size={12} />} 
                                classname={"bg-[#ff4747] text-[12px] px-3 py-1.5 hover:bg-[#ff3333] transition-colors"}
                            />
                        </div>
                    </Form>
                </Container>
        </div>
    )
}
export default AccountDetails;