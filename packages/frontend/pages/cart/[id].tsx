import RawHeader from "@/components/RawHeader";
import LoadingPage from "@/components/Spinners/LoadingPage";
import useFetchItemsWithArgs from "@/hooks/query/useFetchItemWithArgs";
import { MenuT } from "@/types";
import { Button } from "@headlessui/react";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/router";

const CartPage = () => {
  const { query } = useRouter();

  const { data, isLoading, error } = useFetchItemsWithArgs({
    functionName: "getMenuItem",
    args: [query.id],
  });

  if (isLoading) {
    return <LoadingPage />;
  }

  const item = data as MenuT;

  return (
    <div className="flex flex-1  w-full mt-10 p-4 flex-col relative">
      <RawHeader back />

      <div className="flex flex-col flex-1 ">
        <div className="flex flex-row w-full mt-3 items-center justify-between">
          <div className="flex w-full">
            <h1 className="text-sm font-medium">My Orders</h1>
          </div>

          <div className="flex flex-row w-full gap-x-2 items-center justify-end text-orange-500">
            <ChevronLeft size={18} />
            <p className="text-[11px] text-neutral-800">
              Item #{item.id.toString()}
            </p>
            <ChevronRight size={18} />
          </div>
        </div>

        <div className="flex flex-col w-full my-4 gap-y-1">
          <h1 className="text-sm font-semibold">Recipent: Paynapple Store </h1>
          <p className="text-xs text-neutral-400">
            Mon, Oct 16, 2024, 12:00 pm
          </p>
          <p className="text-xs text-neutral-400">#93762517351853</p>
        </div>

        <div className="flex w-full h-[1.5px] bg-neutral-200 mt-4"></div>

        <div className="w-full flex flex-row h-20 items-center justify-between">
          <div className="flex flex-row items-center">
            <div className="w-10 h-10 bg-neutral-300 relative overflow-hidden ">
              <Image
                src={item.image}
                layout="fill"
                objectFit="cover"
                alt="image"
              />
            </div>

            <div className="flex flex-col  mx-3">
              <h1 className="text-sm font-semibold">{item.name}</h1>
              <p className="text-[11px] text-neutral-400">{item.description}</p>
            </div>
          </div>

          <h1 className="text-sm  font-bold">${item.price.toString()}</h1>
        </div>

        <div className="flex w-full h-[1.5px] bg-neutral-200"></div>

        <div className="flex flex-col my-4 gap-y-4">
          <div className="flex flex-row w-full items-center justify-between">
            <p className="text-xs text-neutral-500">Subtotal</p>

            <h1 className="text-xs  font-bold">
              ${Number(item.price.toString()) + 0.002}
            </h1>
          </div>

          <div className="flex flex-row w-full items-center justify-between">
            <p className="text-xs text-neutral-500">Gas Fees</p>

            <h1 className="text-xs  font-bold">$0.0023</h1>
          </div>
        </div>

        <div className="flex w-full h-[1.5px] bg-neutral-200 "></div>

        <div className="flex flex-row w-full items-center justify-between my-4">
          <p className="text-sm font-semibold">Total</p>

          <h1 className="text-sm  font-bold">
            ${Number(item.price.toString()) + 0.0023}
          </h1>
        </div>
      </div>

      <div className="h-32 flex w-full items-center justify-between">
        <div className="flex flex-col">
          <h1 className="text-sm text-neutral-700">
            Want to talk to the AI Chef? 👉
          </h1>
          <p className="text-[10px] text-neutral-400">Powered by Olas</p>
        </div>

        <div className="flex flex-row items-center justify-center bg-purple-600 w-20 h-8 rounded-full">
          <p className="text-white text-sm mx-2">Ask</p>
          <Sparkles size={13} className="text-white" />
        </div>
      </div>

      <Button
        className="w-full mt-4 bg-green-500 text-white h-11 font-semibold text-sm rounded-sm "
        onClick={() => alert("Payment")}
      >
        Pay ${item.price.toString()}
      </Button>
    </div>
  );
};

export default CartPage;
