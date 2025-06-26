import Link from "next/link";
import React from "react";

const Desktop = () => {
  return (
    <div className="hidden md:block">
      <div className="flex justify-between items-center md:px-[10%] lg:px-[20%] md:py-8 lg:py-8">
        <div>
          <Link href="https://github.com/amouromar">
            <h1 className="text-xs font-bold text-gray-500 underline-offset-2 underline">
              made by amour
            </h1>
          </Link>
        </div>
        <div>
          <Link
            href="mailto:amourhamisiomar@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="bg-gray-800 text-xs text-white font-bold px-4 py-2 rounded-full cursor-pointer">
              Get in touch
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Desktop;
