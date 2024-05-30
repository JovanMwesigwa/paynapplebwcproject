import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const MainHeader = () => {
  const router = useRouter();
  return (
    <div className="flex flex-row h-12 border-b items-center justify-between fixed top-0 left-0 ring-0 w-full px-4">
      <Link href="/" className="flex flex-row items-center justify-center">
        <h1 className="text-sm font-medium">🍏 Paynapple</h1>
      </Link>
    </div>
  );
};

export default MainHeader;
