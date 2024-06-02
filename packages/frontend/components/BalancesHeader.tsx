import { CONTRACT_ABI, CONTRACT_ADDRESS } from "@/constants";
import useFetchItems from "@/hooks/query/useFetchItems";
import { weiToCUSD } from "@/utils";
import { newKitFromWeb3 } from "@celo/contractkit";
import { Button } from "@headlessui/react";
import { useQueryClient } from "@tanstack/react-query";
import { Calculator, ChevronRight, CircleArrowUp, Loader } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { toast } from "sonner";
import Web3 from "web3";

const BalancesHeader = () => {
  const [loading, setLoading] = React.useState(false);

  const queryClient = useQueryClient();

  const { data, isLoading, error } = useFetchItems({
    functionName: "getBalance",
  });

  const balance = data ? weiToCUSD(Number(data.toString())) : "0.00";

  const onSubmit = async () => {
    setLoading(true);
    try {
      // Get the connected provider and signer
      const web3 = new Web3(window.ethereum);
      const kit = newKitFromWeb3(web3);

      const cUSDcontract = await kit.contracts.getStableToken();
      let accounts = await web3.eth.getAccounts();

      // @ts-ignore
      kit.defaultAccount = accounts[0];

      // Check to see if the transaction was successful

      const contract = new kit.connection.web3.eth.Contract(
        // @ts-ignore
        CONTRACT_ABI,
        CONTRACT_ADDRESS
      );

      const tx = await contract.methods.withdraw().send({
        from: kit.defaultAccount,
        feeCurrency: cUSDcontract.address,
      });

      if (!tx.status) {
        setLoading(false);
        toast.error("Transaction failed");
        return;
      }

      toast.success("Withdraw was successfull 🎉");
      setLoading(false);
      queryClient.invalidateQueries();
    } catch (error) {
      toast("An error occurred while processing your order");
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-row w-full items-center justify-between mb-3">
        <h1 className="text-[12px] font-medium">Total sales</h1>

        <Button
          onClick={onSubmit}
          disabled={loading}
          className={`flex flex-row items-center  bg-purple-500 text-white p-1 px-2 rounded-sm`}
        >
          {loading ? (
            <Loader size={15} className="animate-spin text-white" />
          ) : (
            <>
              <h1 className="text-[11px]  font-light ">Withdraw</h1>
              <ChevronRight size={18} className="text-white" />
            </>
          )}
        </Button>
      </div>
      <div className="flex mb-3 flex-col">
        <div className="flex flex-row items-center justify-between w-full">
          <div className="flex flex-row items-center ">
            {!isLoading && <h1 className="text-xl font-bold">${balance}</h1>}
            <div className="flex flex-row items-center px-1 py-[2px] ml-2 justify-center rounded-sm bg-green-100">
              <CircleArrowUp size={10} className="text-green-500" />
              <p className="text-[10px] text-green-500 font-bold ml-1">+1%</p>
            </div>
          </div>

          {/*  */}
          <Link
            href="/terminal"
            className="flex flex-row items-center bg-yellow-400 py-1 rounded-sm px-3"
          >
            <Calculator size={13} className="text-gray-800 mr-1" />
            <h1 className="text-[11px] text-gray-800">Terminal</h1>
          </Link>
        </div>

        {/*  */}
        <p className="text-[11px] font-thin">
          Yay! your sales have surged by $250 in the last month!
        </p>
      </div>

      <div className="flex w-full h-1 rounded-full gap-x-1 overflow-hidden mb-3">
        <div className="w-full h-full bg-blue-500 rounded-full"></div>
        <div className="w-2/3 h-full bg-orange-500 rounded-full"></div>
        <div className="w-1/4 h-full bg-red-500 rounded-full"></div>
      </div>
    </div>
  );
};

export default BalancesHeader;
