import React from "react";
import copyIcon from "../assets/copy_icon.svg";
import pencilicon from "../assets/pencil_icon.svg";
import regenerateIcon from "../assets/regenerate_icon.svg";
import likeIcon from "../assets/like_icon.svg";
import dislikeIcon from "../assets/dislike_icon.svg";
import logoIcon from "../assets/logo_icon.svg";
import Image from "next/image";
interface MessageProps {
    role:string;
    content:string;
}
const Message = ({ role, content }:MessageProps) => {
  return (
    <div className="flex flex-col items-center w-full max-w-3xl text-sm">
      <div
        className={`flex flex-col w-full mb-8 ${
          role === "user" && "items-end"
        }`}
      >
        <div
          className={`group relative flex max-w-2xl py-3 rounded-xl ${
            role === "user" ? "bg-[#41458] px-5" : "gap-3"
          }`}
        >
          <div
            className={`opacity-0 group-hover:opacity-100 absolute ${
              role === "user" ? "-left-16 top-2.5" : "left-9 -bottom-6"
            } transition-all`}
          >
            <div className="flex items-center gap-2 opacity-70">
              {role === "user" ? (
                <>
                  <Image src={copyIcon} alt="" className="w-4 cursor-pointer" />
                  <Image
                    src={pencilicon}
                    alt=""
                    className="w-4.5 cursor-pointer"
                  />
                </>
              ) : (
                <>
                  <Image
                    src={copyIcon}
                    alt=""
                    className="w-4.5 cursor-pointer"
                  />
                  <Image
                    src={regenerateIcon}
                    alt=""
                    className="w-4 cursor-pointer"
                  />
                  <Image src={likeIcon} alt="" className="w-4 cursor-pointer" />
                  <Image
                    src={dislikeIcon}
                    alt=""
                    className="w-4 cursor-pointer"
                  />
                </>
              )}
            </div>
          </div>
          {role === "user" ? (
            <span className="text-white/90">{content}</span>
          ) : (
            <>
              <Image
                src={logoIcon}
                alt=""
                className="h-9 w-9 p-1 border border-white/15 rounded-full"
              />
              <div className="space-y-4 w-full ovevrflow-scroll">
                {content}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Message;
