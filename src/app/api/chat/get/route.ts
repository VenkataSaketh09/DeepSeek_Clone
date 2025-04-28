import Chat from "@/app/models/Chat";
import { NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";

export async function GET(req: any){
    try{
        const {userId}=getAuth(req);
    if (!userId) {
        return NextResponse.json({error:"Unauthorized user"}, {status:401});
    }
    const data=await Chat.find({userId});
    return NextResponse.json({data}, {status:200});
    }
    catch (err){
        return NextResponse.json({error:"Internal server error"}, {status:500});
    }
}