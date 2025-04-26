"use client";
import Image from "next/image";
import React, { useState } from "react";
import deepicon from "../assets/deepthink_icon.svg";
import searchIcon from "../assets/search_icon.svg";
import pinIcon from "../assets/pin_icon.svg";
import arrowIcon from "../assets/arrow_icon.svg";
import arrowIconDull from "../assets/arrow_icon_dull.svg";

interface promptProps {
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
}
const Promptbox = ({ isLoading, setIsLoading }: promptProps) => {
  const [prompt, setprompt] = useState("");
  return (
    <form
      className={`w-full ${
        false ? "max-w-3xl" : "max-w-2xl"
      } bg-[#404045] p-4 rounded-3xl mt-4 transition-all`}
    >
      <textarea
        className="outline-none w-full resize-none overflow-hidden break-words bg-transparent"
        rows={2}
        placeholder="Message DeepSeek.."
        required
        onChange={(e) => setprompt(e.target.value)}
        value={prompt}
      ></textarea>
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-2">
          <p className="flex items-center gap-2 text-xs border border-gray-300/40 px-2 py-1 rounded-full cursor-pointer hover:bg-gray-500/20 transition">
            <Image className="h-5" src={deepicon} alt="" />
            DeepThink(R1)
          </p>
          <p className="flex items-center gap-2 text-xs border border-gray-300/40 px-2 py-1 rounded-full cursor-pointer hover:bg-gray-500/20 transition">
            <Image className="h-5" src={searchIcon} alt="" />
            Search
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Image src={pinIcon} className="w-4 cursor-pointer" alt="" />
          <button
            className={`${
              prompt ? "bg-primary" : "bg-[#71717a]"
            } rounded-full p-2 cursor-pointer`}
          >
            <Image
              src={prompt ? arrowIcon : arrowIconDull}
              className="w-3.5 aspect-square"
              alt=""
            />
          </button>
        </div>
      </div>
    </form>
  );
};

export default Promptbox;
