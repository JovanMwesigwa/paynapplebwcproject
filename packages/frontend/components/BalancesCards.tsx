import { sales } from "@/data";
import SalesCard from "./Cards/SalesCard";
import useFetchItems from "@/hooks/query/useFetchItems";
import { SalesT } from "@/types";

const BalancesCards = () => {
  const { data, isLoading, error } = useFetchItems({
    functionName: "getAllMenuSales",
  });

  if (isLoading)
    return (
      <div className="flex flex-row w-full h-20 items-center gap-3 ">
        <div className="w-full h-full border rounded-md bg-neutral-50 border-neutral-100 px-2 flex flex-col justify-evenly"></div>
      </div>
    );

  return (
    <div className="flex flex-row w-full h-20 items-center gap-3 ">
      {/* Card */}
      {/* {sales.map((sale) => (
        <SalesCard key={sale.name} sale={sale} />
      ))} */}
      {(data as SalesT[])?.map((sale) => (
        <SalesCard key={sale.name} sale={sale} />
      ))}
    </div>
  );
};

export default BalancesCards;
