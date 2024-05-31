import BalancesCards from "@/components/BalancesCards";
import BalancesHeader from "@/components/BalancesHeader";
import MainHeader from "@/components/MainHeader";
import MenuCategory from "@/components/Selectors/MenuCatergory";
import MenuTabs from "@/components/Tabs/MenuTabs";
import { ChevronDown, CircleArrowUp } from "lucide-react";

export default function Home() {
  // useEffect(() => {
  //   if (session) {
  //     getLookupAddress();
  //   }
  // }, [session, odisRegistedAddresses]);

  // if (session && odisRegistedAddresses === "" && !loading) {
  //   // navigate to the register on social connect page
  //   router.push("/register");
  // }

  return (
    <main className="w-full flex flex-col  h-full  text-gray-800 px-4 flex-1 relative">
      <MainHeader />

      <BalancesHeader />

      {/* Charts */}
      <BalancesCards />

      {/* Menu catgories */}
      <div className="flex flex-row w-full mt-3 items-center justify-between">
        <div className="flex w-full">
          <h1 className="text-sm font-medium">Categories</h1>
        </div>
      </div>

      <div className="flex flex-row w-full mt-3 items-center justify-between">
        <div className="flex w-full">
          <h1 className="text-sm font-medium">Menu</h1>
        </div>

        <MenuCategory />
      </div>

      {/* Menus */}
      <MenuTabs />
      <MenuTabs />
      <MenuTabs />
      <MenuTabs />
    </main>
  );
}
