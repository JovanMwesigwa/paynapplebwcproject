import { Sales } from "@/data";
import { CircleArrowUp } from "lucide-react";
import React from "react";

const SalesCard = ({ sale }: { sale: Sales }) => {
  return (
    <div className="w-full h-full border rounded-md bg-neutral-50 border-neutral-100 px-2 flex flex-col justify-evenly">
      <div className="flex flex-row w-full items-center">
        <div className={`h-1 ${sale.color} w-3 rounded-full`}></div>
        <h1 className="text-[10px] mx-1 ">{sale.name}</h1>
      </div>

      <div className="flex flex-row items-center ">
        <h1 className="text-base font-bold">${sale.total}</h1>
        <div
          className={`flex flex-row items-center px-1 py-[2px] ml-2 justify-center rounded-sm ${
            sale.increase ? "bg-green-100" : "bg-red-100"
          } `}
        >
          <CircleArrowUp
            size={9}
            className={`${sale.increase ? "text-green-500" : "text-red-500"} `}
          />
          <p
            className={`text-[9px] ${
              sale.increase ? "text-green-500" : "text-red-500"
            } font-bold ml-1`}
          >
            {sale.increase ? "+" : "-"}
            {sale.percentage}%
          </p>
        </div>
      </div>
    </div>
  );
};

export default SalesCard;
