import Link from "next/link";
import React from "react";

const Mobile = () => {
  return (
    <div className="md:hidden px-2 py-2 flex justify-between items-center">
      <div>
        <Link href="/">
          <h1 className="text-2xl font-bold font-satoshi text-green-600">
            DoodleDuo
          </h1>
        </Link>
      </div>
    </div>
  );
};

export default Mobile;
