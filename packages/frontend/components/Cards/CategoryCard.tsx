import { MenuCategory } from "@/data";
import React from "react";

const CategoryCard = ({ category }: { category: MenuCategory }) => {
  const isActive = category.active;
  return (
    <div
      className={`h-full w-full shadow-sm overflow-hidden  flex flex-col items-center justify-center  border border-neutral-100 ${
        isActive && "bg-green-500"
      }`}
    >
      <div className="flex flex-col pt-1 items-center justify-center ">
        <h1 className="text-lg">{category.emoji}</h1>
        <p
          className={`text-[10px] ${
            isActive ? "text-white" : " text-neutral-400"
          }`}
        >
          {category.title}
        </p>
        <h1
          className={`text-[11px] font-bold ${
            isActive ? "text-white" : " text-neutral-400 "
          }`}
        >
          {category.numOfItems} items
        </h1>
      </div>
    </div>
  );
};

export default CategoryCard;
