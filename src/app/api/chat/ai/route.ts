export const maxDuration=60;
import { getAuth } from "@clerk/nextjs/server";
import OpenAI from "openai";
import Chat from "@/app/models/Chat";
import { NextResponse } from "next/server";

//initialize OpenAI with DeepSeek API Key and base URL
const openai = new OpenAI({
    baseURL: 'https://api.deepseek.com',
    apiKey: process.env.DEEPSEEK_API_KEY
});

export async function POST(req: any) {
    try {
        const { userId } = getAuth(req);
        const { chatId, prompt }: any = await req.json();
        
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized user" }, { status: 401 });
        }

        const data = await Chat.findOne({ _id: chatId, userId });

        const userPrompt = {
            role: "user",
            content: prompt,
            timestamp: Date.now(),
        };

        data.messages.push(userPrompt);

        const completion = await openai.chat.completions.create({
            messages: [{ role: "user", content: prompt }],
            model: "deepseek-chat",
            store: true,
        });

        const message = {
            ...completion.choices[0].message,
            timestamp: Date.now(),
        };

        data.messages.push(message);
        await data.save(); 

        return NextResponse.json({ success: true, message });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
