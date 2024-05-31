import {
  Button,
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { Copy, X } from "lucide-react";
import { useState } from "react";
import { useAccount } from "wagmi";
import QRCode from "react-qr-code";

export default function PayTerminal({
  handleEnter,
  amount,
}: {
  handleEnter: any;
  amount: number;
}) {
  let [isOpen, setIsOpen] = useState(false);

  const { address } = useAccount();

  function open() {
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
  }

  const handleSubmit = () => {
    handleEnter();
    open();
  };

  return (
    <>
      <button
        onClick={handleSubmit}
        className="col-span-3 p-4 bg-green-500 text-white text-xl rounded-lg"
      >
        Submit
      </button>

      <Transition appear show={isOpen}>
        <Dialog
          as="div"
          className="relative z-10 focus:outline-none"
          onClose={close}
          __demoMode
        >
          <div className="fixed inset-0 z-10 w-screen h-screen  overflow-y-auto">
            <div className="flex h-full items-center justify-center">
              <TransitionChild
                enter="ease-out duration-300"
                enterFrom="opacity-0 transform scale-95"
                enterTo="opacity-100 transform scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 transform scale-100"
                leaveTo="opacity-0 transform scale-95"
              >
                <DialogPanel className="w-full p-4 h-full rounded-none bg-white backdrop-blur-2xl flex flex-col items-center">
                  <div className="flex flex-row items-center justify-between w-full mb-4">
                    <div className=""></div>
                    <DialogTitle
                      as="h3"
                      className="text-xl font-medium text-gray-900 "
                    >
                      Order Info
                    </DialogTitle>

                    <div onClick={close} className="flex cursor-pointer">
                      <X className="" />
                    </div>
                  </div>

                  <div className="flex flex-col flex-1 w-full h-full ">
                    <h1 className="text-xs mb-1 ">Order Amount</h1>
                    <div className="flex flex-row mb-4 w-full items-center">
                      <div className="w-6 h-6 mr-2 rounded-full bg-neutral-200"></div>
                      <h1 className="text-base font-medium">${amount}</h1>
                    </div>

                    <h1 className="text-xs mt-2">To Address</h1>
                    <div className="flex flex-row mb-4 w-full items-center">
                      <div className="flex flex-row items-center">
                        {address && (
                          <h1 className="text-base font-medium cursor-pointer ">
                            {address.slice(0, 6)}...{address.slice(-4)}
                          </h1>
                        )}
                        <Copy className="w-3 h-3 ml-2 text-gray-800 cursor-pointer" />
                      </div>
                    </div>

                    <h1 className="text-xs mb-2">Scan with wallet to pay</h1>
                    <div className="h-60 rounded-md w-60 self-center border flex items-center justify-center my-5 p-4 ">
                      <div className="flex w-full h-full  rounded-md items-center justify-center">
                        <QRCode
                          value={`celo://wallet/pay?address=${address}&displayName=Paynapple&amount=${amount}&comment=Order%to%20Paynapple%20store&token=cUSD&currencyCode=USD`}
                          className="w-full h-full"
                        />
                      </div>
                    </div>

                    <div className="mt-4 w-full">
                      <Button
                        className="inline-flex items-center gap-2 rounded-md bg-green-500 py-2 w-full  justify-center px-4 text-base font-medium text-white shadow-inner shadow-white/10 focus:outline-none hover:bg-gray-600"
                        onClick={close}
                      >
                        Pay with Valora
                      </Button>
                    </div>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
