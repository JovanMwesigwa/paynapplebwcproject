import { ChevronDown, CircleArrowUp } from "lucide-react";
import React from "react";

const BalancesHeader = () => {
  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-row w-full items-center justify-between mb-3">
        <h1 className="text-[12px] font-medium">Total sales</h1>

        <div className="flex flex-row items-center bg-neutral-50 border p-1 px-2 rounded-sm">
          <h1 className="text-[11px] mr-1 font-light">Last 30 Days</h1>
          <ChevronDown size={18} className="text-gray-800" />
        </div>
      </div>
      <div className="flex mb-3 flex-col">
        <div className="flex flex-row items-center ">
          <h1 className="text-xl font-bold">$1,256</h1>
          <div className="flex flex-row items-center px-1 py-[2px] ml-2 justify-center rounded-sm bg-green-100">
            <CircleArrowUp size={10} className="text-green-500" />
            <p className="text-[10px] text-green-500 font-bold ml-1">+23%</p>
          </div>
        </div>
        <p className="text-[11px] font-thin">
          Yay! your sales have surged by $250 in the last month!
        </p>
      </div>

      <div className="flex w-full h-1 rounded-full gap-x-1 overflow-hidden mb-3">
        <div className="w-full h-full bg-blue-500 rounded-full"></div>
        <div className="w-2/3 h-full bg-orange-500 rounded-full"></div>
        <div className="w-1/4 h-full bg-red-500 rounded-full"></div>
      </div>
    </div>
  );
};

export default BalancesHeader;
