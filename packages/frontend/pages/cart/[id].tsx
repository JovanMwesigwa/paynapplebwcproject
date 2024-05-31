import RawHeader from "@/components/RawHeader";
import { Button } from "@headlessui/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

const CartPage = () => {
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
            <p className="text-[11px] text-neutral-800">Item #1</p>
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
                src="https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                layout="fill"
                objectFit="cover"
                alt="image"
              />
            </div>

            <h1 className="text-sm mx-3 font-semibold">Double Cheeze burger</h1>
          </div>

          <h1 className="text-sm  font-bold">$24.12</h1>
        </div>

        <div className="flex w-full h-[1.5px] bg-neutral-200"></div>

        <div className="flex flex-col my-4 gap-y-4">
          <div className="flex flex-row w-full items-center justify-between">
            <p className="text-xs text-neutral-500">Subtotal</p>

            <h1 className="text-xs  font-bold">$24.12</h1>
          </div>

          <div className="flex flex-row w-full items-center justify-between">
            <p className="text-xs text-neutral-500">Gas Fees</p>

            <h1 className="text-xs  font-bold">$0.0023</h1>
          </div>
        </div>

        <div className="flex w-full h-[1.5px] bg-neutral-200 "></div>
      </div>

      <div className="h-32"></div>

      <Button
        className="w-full mt-4 bg-green-500 text-white h-11 font-semibold text-sm rounded-sm "
        onClick={() => alert("Payment")}
      >
        Pay $24.12
      </Button>
    </div>
  );
};

export default CartPage;
