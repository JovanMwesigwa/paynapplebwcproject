import Image from "next/image";
import React from "react";

const MenuCard = () => {
  return (
    <div className="h-full overflow-hidden w-full  flex flex-col ">
      <div className="flex flex-1 h-full w-full bg-neutral-300 relative ">
        <Image
          src="https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          layout="fill"
          objectFit="cover"
          alt="food"
        />
      </div>

      <div className="flex flex-col pt-1 ">
        <p className="text-[11px] text-neutral-400">Tacos Salsa With Chicken</p>
        <h1 className="text-sm font-bold">$17.22</h1>
      </div>
    </div>
  );
};

export default MenuCard;
