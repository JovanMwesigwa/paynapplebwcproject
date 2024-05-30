import { useRouter } from "next/router";
import React from "react";

const BackHeader = () => {
  const router = useRouter();
  return (
    <div className="flex flex-row h-12 border-b items-center justify-between fixed top-0 left-0 ring-0 w-full px-4">
      <div
        onClick={() => router.back()}
        className="flex flex-row items-center justify-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-4 h-4 mr-3"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
          />
        </svg>

        <h1 className="text-sm font-medium">Back</h1>
      </div>
    </div>
  );
};

export default BackHeader;
