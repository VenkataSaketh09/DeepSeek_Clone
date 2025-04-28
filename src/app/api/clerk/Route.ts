import { Webhook } from "svix";
import User from "@/app/models/User";
import {headers} from "next/headers";
import { NextResponse } from "next/server";
export async function POST(req:any){
    if (!process.env.SIGNING_SECRET) {
        throw new Error("SIGNING_SECRET is not defined in the environment variables");
    }
    const wh = new Webhook(process.env.SIGNING_SECRET);
    const headerPayLoad=await headers();
    const svixHeaders={
        'svix-id':headerPayLoad.get('svix-id') || '',
        'svix-signature':headerPayLoad.get('svix-signature') || '',
    };
    //get the payload and verify it
    const payload=await req.json();
    const body=JSON.stringify(payload);
    const {data,type}:any=wh.verify(body,svixHeaders)

    //prepare the user data to be saved in the database
    const userData={
        _id:data.id,
        email:data.email_addresses[0].email_address,
        name:`${data.first_name} ${data.last_name}`,
        image:data.image_url,
    };

    switch(type){
        case 'user.created':
            await User.create(userData);
            break;
        case 'user.updated':
            await User.findByIdAndUpdate(data.id,userData);
            break;
        case 'user.deleted':
            await User.findByIdAndDelete(data.id);
            break;
        default:
            break;
    }
    return NextResponse.json({message:"successfully Event received"});
}