import { ChevronRight } from "lucide-react";
import MenuCard from "../Cards/MenuCard";

const MenuTabs = () => {
  return (
    <div className="flex flex-row w-full h-36 items-center gap-3 my-3 relative">
      <MenuCard />
      <MenuCard />
      <MenuCard />

      <div className="flex flex-row bg-white shadow-md absolute right-0 top-10 rounded-l-full p-1  items-center justify-center text-orange-500 pl-3">
        <h1 className="text-[10px]">View all</h1>
        <ChevronRight size={12} />
      </div>
    </div>
  );
};

export default MenuTabs;
