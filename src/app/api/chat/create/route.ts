import Chat from "@/app/models/Chat";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: any) {
    try {
        const { userId } = getAuth(req);

        if (!userId) {
            return NextResponse.json({ message: "User not authenticated" }, { status: 401 });
        }

        const chatData = {
            userId,
            name: "New Chat",
            messages: [],
        };

        const chat = await Chat.create(chatData);

        if (!chat) {
            return NextResponse.json({ message: "Failed to create chat" }, { status: 500 });
        }

        return NextResponse.json({ message: "Chat created successfully", chatId: chat._id }, { status: 200 });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
