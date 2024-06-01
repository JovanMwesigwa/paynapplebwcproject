import BalancesCards from "@/components/BalancesCards";
import BalancesHeader from "@/components/BalancesHeader";
import MainHeader from "@/components/MainHeader";
import MenuCategory from "@/components/Selectors/MenuCatergory";
import CategoryTabs from "@/components/Tabs/CategoryTabs";
import MenuTabs from "@/components/Tabs/MenuTabs";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";

import Link from "next/link";

export default function Home() {
  return (
    <main className="w-full flex flex-col h-full mt-16  text-gray-800 px-4 flex-1 relative">
      <MainHeader />

      <BalancesHeader />

      {/* Charts */}
      <BalancesCards />

      {/* Menu catgories */}
      <div className="flex flex-row w-full mt-3 items-center justify-between">
        <div className="flex w-full">
          <h1 className="text-sm font-medium">Categories</h1>
        </div>

        <div className="flex flex-row w-full gap-x-2 items-center justify-end text-orange-500">
          <ChevronLeft size={15} />
          <ChevronRight size={15} />
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

      <Link
        href="/create"
        className="w-12 h-12 bg-orange-500 fixed bottom-6 right-5 rounded-full shadow-md z-30 flex items-center justify-center"
      >
        <div className="relative">
          <Plus size={20} className="text-white" />
        </div>
      </Link>
    </main>
  );
}
