"use client";
import { Link, Share } from "lucide-react";
import React from "react";

import WhiteboardCanvas from "./canvas/WhiteboardCanvas";

const Room = () => {
  return (
    <div className="px-2 mt-4 font-satoshi md:px-[10%] lg:px-[20%]">
      {/* Header */}
      <header className="p-0 m-0">
        <nav className="flex flex-row items-center justify-between">
          {/* Room Name */}
          <div>
            <article>
              <div className="flex flex-col text-green-600 text-xl font-light whitespace-wrap">
                <p className="font-bold text-sm whitespace-nowrap">{`room.name`}</p>{" "}
                <p className="font-light text-sm">
                  {" "}
                  by {`room.creator`} with {`room.users.length`} others
                </p>
              </div>
              <p className="text-light text-sm font-light whitespace-wrap">{`room.description`}</p>
            </article>
          </div>
          {/* Actions */}
          <div className="flex flex-row items-center gap-2">
            <button className="bg-green-600 text-white text-sm font-satoshi font-bold px-2 py-2 rounded-full cursor-pointer">
              <Link size={16} />
            </button>
            <button className="bg-green-600 text-white text-sm font-satoshi font-bold px-2 py-2 rounded-full cursor-pointer">
              <Share size={16} />
            </button>
          </div>
        </nav>
      </header>
      {/* Body */}
      <main className="h-[calc(100vh-10rem)] mt-4 rounded flex items-center justify-center">
        <WhiteboardCanvas />
      </main>
    </div>
  );
};

export default Room;
