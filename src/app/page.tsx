"use client";
import Image from "next/image";
import menuIcon from "./assets/menu_icon.svg";
import chatIcon from "./assets/chat_icon.svg";
import logoIcon from "./assets/logo_icon.svg";
import { useState } from "react";
export default function Home() {
  const [expand, setExpand] = useState(false);
  const [messages,setMessages]=useState("");
  return (
    <div>
      <div className="flex h-screen">
        {/* sidebar nav */}
        <div className="flex-1 flex flex-col items-center justify-center px-4 pb-8 bg-[#292a2d] text-white relative">
          <div className="md:hidden absolute px-4 top-6 flex items-center justify-between w-full">
            <Image onClick={()=>expand ? setExpand(false) : setExpand(true)}
            className="rotate-180" src={menuIcon} alt="menu icon" />
            <Image 
            className="opacity-70" src={chatIcon} alt="chat icon" />
          </div>

          {
            messages.length===0 ?
            (
              <>
              <div className="flex items-center gap-3">
                <Image src={logoIcon} alt="deepseek logo" className="h-16"/>
                <p className="text-2xl font-medium">Hi, I'm DeepSeek.</p>
              </div>
              <p className="text-sm mt-2">How Can I help you Today?</p>
              </>
            ) :
            (
              <div>

              </div>
            )
          }
          {/* prompt Box */}
          <p className="text-xs absolute bottom-1 text-gray-500">AI-generated, for Reference only</p>
        </div>
      </div>
    </div>
  );
}
