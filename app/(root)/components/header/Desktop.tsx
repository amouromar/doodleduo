import Link from "next/link";
import React from "react";

const Desktop = () => {
  return (
    <div className="hidden md:block">
      <div className="flex justify-between items-center md:px-[10%] lg:px-[20%] md:py-4 lg:py-4">
        <div>
          <Link href="/">
            <h1 className="text-4xl font-bold font-satoshi text-green-600">DoodleDuo</h1>
          </Link>
        </div>
        <div>
          <Link href="/welcome">
            <button className="bg-green-600 text-white text-sm font-satoshi font-bold px-4 py-2 rounded-full cursor-pointer">
              Welcome
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Desktop;
