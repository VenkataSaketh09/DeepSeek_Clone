import Chat from "@/app/models/Chat";
import { NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";

export async function POST(req: any){
    try{
        const {userId}=getAuth(req);
        const {chatId}=await req.json();
    if (!userId) {
        return NextResponse.json({error:"Unauthorized user"}, {status:401});
    }
    await Chat.findByIdAndDelete(chatId);
    return NextResponse.json({message:"Chat deleted successfully"}, {status:200});
    }
    catch (err){
        return NextResponse.json({error:"Internal server error"}, {status:500});
    }
}