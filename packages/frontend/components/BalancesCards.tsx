import { sales } from "@/data";
import SalesCard from "./Cards/SalesCard";

const BalancesCards = () => {
  return (
    <div className="flex flex-row w-full h-20 items-center gap-3 ">
      {/* Card */}
      {sales.map((sale) => (
        <SalesCard key={sale.name} sale={sale} />
      ))}
    </div>
  );
};

export default BalancesCards;
