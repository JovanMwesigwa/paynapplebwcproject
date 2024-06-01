import { MenuT } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const MenuCard = ({ item }: { item: MenuT }) => {
  if (!item.image || !item.name || !item.price) return null;
  return (
    <Link
      href={`/cart/${item.id.toString()}`}
      className="h-full w-36 flex-shrink-0 flex flex-col"
    >
      <div className="flex flex-1 h-full w-full bg-neutral-300 relative overflow-hidden rounded-t-md">
        <Image src={item.image} layout="fill" objectFit="cover" alt="food" />
      </div>
      <div className="flex flex-col pt-1">
        <p className="text-[11px] text-neutral-400">{item.name}</p>
        <h1 className="text-sm font-bold">${item.price.toString()}</h1>
      </div>
    </Link>
  );
};

export default MenuCard;
