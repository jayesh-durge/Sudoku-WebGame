import React from "react";
import {Container, IconButton} from "./../components"
import {ArrowLeft,DiamondMinus,Check,Pen} from "lucide-react"
import {Link} from "react-router-dom"
function ProfilePage({self=true,img,username,level,rank,Bio="",Bagdes=[],solvedProblem=0,totalProblem=0,classname}){
    return (
        <Container classname={`text-white flex-col px-5 py-5 overflow-scroll h-screen w-[20vw] bg-[#1e2128] border-2 border-[#851fc7] ${classname}`}>
            <div className="h-screen">
            <div>
                <nav className="sticky top-0 flex justify-between items-center">
                    {!self && <Link to={"/Game-On"}> <ArrowLeft /></Link>}
                    <h1 className="text-2xl font-bold">Player Profile</h1>
                    {self && <Link to={"/Game-On"}><DiamondMinus /></Link>}
                </nav>
            </div>
            <div className="flex flex-col justify-center items-center py-4 gap-1 ">
                <img src={img} alt="" className=" w-25 h-25 rounded-full my-3"/>
                <span className="font-bold text-2xl">{username}</span>
                <span className="text-[#bdc1ca]">Level:{level}</span>
                <span className="text-[#bdc1ca]">Rank:{rank}</span>
            </div>
           { Bio.length>0?<div className="py-2">
               <span className="text-xl font-bold">Bio</span>
                <p className="w-9/10 text-center text-[#bdc1ca] transform translate-x-1/9">{ Bio}</p>
            </div>:""}
            
            <div className="py-2">
                <span className="text-xl font-bold">Bagde</span>
                    <div className="flex justify-evenly  flex-wrap items-center py-2 pl-3 w-65 gap-1 ">
                        {Bagdes.length>0?Bagdes.map((Bagde)=>(
                            <IconButton icon={Bagde.icon} text={Bagde.text} key={Bagde.id}/>
                        )): <div className="text-[#bdc1ca] text-center capitalize">No Bagdes in crate</div>}
                    </div>
            </div>

            <div className="py-2">
                <span className="text-xl font-bold">Sudoku's</span>
                <div className="text-center p-2 text-xl"><span className="text-3xl text-[#d91ae0] font-bold "> {solvedProblem}</span> /{totalProblem}</div>
                <div className="flex justify-center items-start -mt-2 text-[#02bceb]"><Check className="text-xs w-5" /> solved</div>
            </div>
           {self && <Link 
                        className="flex justify-center items-end mt-5 text-xl"
                        to={"/Account-Details"}
                        > <IconButton text={"Edit"} icon={<Pen className="mx-1 w-5"/>}/> </Link> }
            </div>
        </Container>
    )
}

export default ProfilePage;