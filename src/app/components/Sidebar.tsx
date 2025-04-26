import React from "react";
import logoText from "../assets/logo_text.svg";
import logoIcon from "../assets/logo_icon.svg";
import menuIcon from "../assets/menu_icon.svg";
import sideBarIcon from "../assets/sidebar_icon.svg";
import sidebarCloseIcon from "../assets/sidebar_close_icon.svg";
import chatIcon from "../assets/chat_icon.svg";
import chatIconDull from "../assets/chat_icon_dull.svg";
import phoneIcon from "../assets/phone_icon.svg";
import phoneIconDull from "../assets/phone_icon_dull.svg";
import qrCode from "../assets/qrcode.png";
import newIcon from "../assets/new_icon.svg";
import profileIcon from "../assets/profile_icon.svg";
import Image from "next/image";
import { useClerk,UserButton, useUser } from "@clerk/nextjs";
import { useAppContext } from "../context/AppContext";
interface sidebarProps {
  expand: boolean;
  setExpand: (value: boolean) => void;
}
function Sidebar({ expand, setExpand }: sidebarProps) {
  const {openSignIn} = useClerk();
  const {isLoaded,user} = useAppContext();
  return (
    <div
      className={`flex flex-col justify-between bg-[#212327] pt-7 transition-all z-50 max-md:absolute max-md:h-screen ${
        expand ? "p-4 w-64" : "md:w-20 w-0 max-md:overflow-hidden"
      }`}
    >
      <div>
        <div
          className={`flex ${
            expand ? "flex-row gap-10" : `flex-col items-center gap-8`
          }`}
        >
          <Image
            className={expand ? "w-36" : "w-10"}
            src={expand ? logoText : logoIcon}
            alt="logos"
          />
          <div
            onClick={() => (expand ? setExpand(false) : setExpand(true))}
            className="group relative flex items-center justify-center hover:bg-gray-500/20 transition-all duration-300 h-9 w-9 aspect-square rounded-lg cursor-pointer"
          >
            <Image src={menuIcon} className="md:hidden" alt="menuIcon" />
            <Image
              src={expand ? sidebarCloseIcon : sideBarIcon}
              alt="sidebarIcon"
              className="hidden md:block w-7"
            />
          </div>
          <div
            className={`absolute w-max ${
              expand ? "left-1/2 -translate-x-1/2 top-12" : "-top-12 left-0"
            } opacity-0 group-hover:opacity-100 transition bg-black text-white text-sm px-3 py-2 rounded-lg shadow-lg pointer-events-none`}
          >
            {expand ? "Close Sidebar" : "Open Sidebar"}
            <div
              className={`w-3 h-3 absolute bg-black rotate-45 ${
                expand
                  ? "left-1/2 -top-1.5 -translate-x-1/2"
                  : "left-4 -bottom-1.5"
              }`}
            ></div>
          </div>
        </div>
        <button
          className={`mt-8 flex items-center justify-center cursor-pointer ${
            expand
              ? "bg-primary hover:opacity-90 rounded-2xl gap-2 p-2.5 w-max"
              : "group relative h-9 w-9 mx-auto hover:bg-gray-500/30 rounded-lg"
          }`}
        >
          <Image
            className={expand ? "w-6" : "w-7"}
            src={expand ? chatIcon : chatIconDull}
            alt="chatIcon"
          />
          <div className="absolute w-max -top-12 -right-12 opacity-0 group-hover:opacity-100 transition bg-black text-white text-sm px-3 py-2 rounded-lg shadow-lg pointer-events-none">
            New Chat
            <div className="w-3 h-3 absolute bg-black rotate-45 left-4 -bottom-1.5"></div>
          </div>
          {expand && <p className="text-white text font-medium">New Chat</p>}
        </button>
        <div
          className={`mt-8 text-white/25 text-sm ${
            expand ? "block" : "hidden"
          }`}
        >
          <p className="my-1">Recents</p>
          {/* chat label */}
        </div>
      </div>
      <div>
        <div className={`flex items-center cursor-pointer group relative ${expand?"gap-1 text-white/80 text-sm p-2.5 border border-primary rounded-lg hover:bg-white/10 cursor-pointer":"h-10 w-10 mx-auto hover:bg-gray-500/30 rounded-lg"}`}>
          <Image
            className={expand ? "w-5" : "w-6.5 mx-auto"}
            src={expand ? phoneIcon : phoneIconDull}
            alt=""
          />
          <div className={`absolute -top-60 pb-8 ${!expand && "-right-40"} opacity-0 group-hover:opacity-100 hidden group-hover:block transition `}>
            <div className="relative w-max bg-black text-white text-sm p-3 rounded-lg shadow-lg">
              <Image src={qrCode} alt="" className="w-44" />
              <p>Scan to get DeepSeek APP</p>
              <div
                className={`w-3 h-3 absolute bg-black rotate-45 ${
                  expand ? "right-1/2" : "left-4"
                } -bottom-1.5`}
              ></div>
            </div>
          </div>
          {expand && (
          <>
            <span>Get App</span>
            <Image src={newIcon} alt="" className="ml-2 mt-1" />
          </>
        )}
        </div>
        <div  onClick={() => {
  if (isLoaded && !user) openSignIn()}}
        className={`flex items ${expand ? 'hover:bg-white/10 rounded-lg':'justify-center w-full'} gap-3 text-white/60 text-sm p-2 mt-2 cursor-pointer`}>
          {
            user?<UserButton/>:<Image src={profileIcon} alt='' className="w-7"/>
          }
            {expand && <span>My profile</span>}
        </div>
        
      </div>
    </div>
  );
}

export default Sidebar;
