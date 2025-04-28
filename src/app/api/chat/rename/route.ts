import Chat from "@/app/models/Chat";
import { NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";

export async function POST(req:any){
    try{
        const {userId}=getAuth(req);

        if(!userId){
            return NextResponse.json({message:"Unauthorized"}, {status:401});
        }
        const {chatId, newName}=await req.json();
        await Chat.findByIdAndUpdate({
            _id:chatId,
            userId:userId,
        },{
            newName,
        })
        return NextResponse.json({success:true,message:"Chat name updated successfully"});
    }
    catch (error) {
        return NextResponse.json({message:"Internal server error"}, {status:500});
    }    
} 