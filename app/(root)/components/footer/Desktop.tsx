import Link from "next/link";
import React from "react";

const Desktop = () => {
  return (
    <div className="hidden md:block">
      <div className="flex justify-center items-center md:px-[10%] lg:px-[20%] md:py-4 lg:py-4">
        <div>
          <Link href="https://github.com/amouromar">
            <h1 className="text-xs font-bold text-gray-500 underline-offset-2 underline">
              made by amour
            </h1>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Desktop;
