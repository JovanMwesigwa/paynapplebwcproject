import { ChevronRight } from "lucide-react";
import MenuCard from "../Cards/MenuCard";
import CategoryCard from "../Cards/CategoryCard";
import { menuCategories } from "@/data";

const CategoryTabs = () => {
  return (
    <div className="flex flex-row w-full h-20 items-center gap-3 my-3 relative overflow-x-scroll">
      {menuCategories.map((category, index) => (
        <CategoryCard key={index} category={category} />
      ))}
    </div>
  );
};

export default CategoryTabs;
