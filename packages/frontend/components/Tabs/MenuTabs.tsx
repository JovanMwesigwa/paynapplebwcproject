import { ChevronRight } from "lucide-react";
import MenuCard from "../Cards/MenuCard";
import useFetchItems from "@/hooks/query/useFetchItems";
import LoadingPage from "../Spinners/LoadingPage";
import { MenuT } from "@/types";

const MenuTabs = ({ functionName }: { functionName: string }) => {
  const { data, isLoading, error } = useFetchItems({
    functionName: functionName,
  });

  if (isLoading)
    return (
      <div className="w-full overflow-x-auto my-3 scrollbar-hide">
        <div className="w-full overflow-x-auto my-3 scrollbar-hide flex-row flex gap-x-3 rounded-sm">
          <div className="flex bg-neutral-100 flex-row items-center gap-3 h-36 w-36"></div>
          <div className="flex bg-neutral-100 flex-row items-center gap-3 h-36 w-36"></div>
          <div className="flex bg-neutral-100 flex-row items-center gap-3 h-36 w-36"></div>
        </div>
      </div>
    );

  return (
    <div className="w-full overflow-x-auto my-3 scrollbar-hide">
      <div className="flex flex-row items-center gap-3 h-36">
        {(data as MenuT[])?.map((item: any) => (
          <MenuCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default MenuTabs;
