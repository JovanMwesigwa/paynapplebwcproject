import { ChevronRight } from "lucide-react";
import MenuCard from "../Cards/MenuCard";

const MenuTabs = () => {
  return (
    <div className="flex flex-row w-full h-36 items-center gap-3 my-3 relative">
      <MenuCard />
      <MenuCard />
      <MenuCard />
    </div>
  );
};

export default MenuTabs;
