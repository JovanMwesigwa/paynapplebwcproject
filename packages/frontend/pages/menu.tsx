import RawHeader from "@/components/RawHeader";
import MenuCategory from "@/components/Selectors/MenuCatergory";
import CategoryTabs from "@/components/Tabs/CategoryTabs";
import MenuTabs from "@/components/Tabs/MenuTabs";
import {
  Calculator,
  ChevronLeft,
  ChevronRight,
  ShoppingBag,
} from "lucide-react";
import Link from "next/link";

export default function Menu() {
  return (
    <main className="w-full flex flex-col mt-14  h-full text-gray-800 px-4 flex-1 relative">
      <RawHeader />

      {/* Menu catgories */}
      <div className="flex flex-row w-full mt-3 items-center justify-between">
        <div className="flex w-full">
          <h1 className="text-sm font-medium">Categories</h1>
        </div>

        <div className="flex flex-row w-full gap-x-2 items-center justify-end text-orange-500">
          <Link
            href="/terminal"
            className="flex flex-row items-center bg-yellow-400 py-1 rounded-sm px-3"
          >
            <Calculator size={13} className="text-gray-800 mr-1" />
            <h1 className="text-[11px] text-gray-800">Terminal</h1>
          </Link>
        </div>
      </div>

      <CategoryTabs />

      <div className="flex flex-row w-full mt-3 items-center justify-between">
        <div className="flex w-full">
          <h1 className="text-sm font-medium">🍹 Drinks</h1>
        </div>

        <MenuCategory />
      </div>
      <MenuTabs functionName="getDrinks" />

      <div className="flex flex-row w-full mt-3 items-center justify-between">
        <div className="flex w-full">
          <h1 className="text-sm font-medium">🍔 Burgers</h1>
        </div>

        <MenuCategory />
      </div>
      <MenuTabs functionName="getBurgers" />

      <div className="flex flex-row w-full mt-3 items-center justify-between">
        <div className="flex w-full">
          <h1 className="text-sm font-medium">🍰 Desserts</h1>
        </div>

        <MenuCategory />
      </div>
      <MenuTabs functionName="getDesserts" />

      <div className="w-12 h-12 bg-orange-500 fixed bottom-6 left-5 rounded-full shadow-md z-30 flex items-center justify-center">
        <div className="relative">
          <ShoppingBag size={20} className="text-white" />
        </div>
      </div>
    </main>
  );
}
