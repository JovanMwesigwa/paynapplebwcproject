import LoadingPage from "@/components/Spinners/LoadingPage";
import useFetchLookUpAddress from "@/hooks/query/useFetchLookUpAddress";
import { Button } from "@headlessui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { ChevronLeft, HomeIcon, Link } from "lucide-react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAccount } from "wagmi";

const ConnectWalletPage = () => {
  const { isConnected } = useAccount();

  const { status } = useFetchLookUpAddress();

  const router = useRouter();

  useEffect(() => {
    if (isConnected) {
      router.back();
      // This will navigate the user to their most recent page
    }
  }, [isConnected]);

  if (status === "loading") {
    return <LoadingPage />;
  }

  return (
    <div className="flex flex-1 items-center justify-evenly flex-col py-32 bg-white">
      <div className="flex flex-col items-center justify-center my-5">
        <h1 className="text-3xl font-bold">Paynapple 🍏</h1>
        <p className="text-xs">Connect your wallet to continue</p>
      </div>

      <>
        {!isConnected && (
          <ConnectButton
            showBalance={{ smallScreen: false, largeScreen: false }}
          />
        )}

        {isConnected && (
          <div className="flex flex-col text-sm w-full items-center justify-center">
            <p>Wallet Connected!</p>

            <Button
              onClick={() => {
                router.push("/");
              }}
              className="flex items-center justify-center gap-1 text-blue-500 rounded-md  py-1.5 px-3 text-xs my-5 font-semibold  h-12"
            >
              <ChevronLeft className="w-5 h-5" />
              <p>Go back Home</p>
            </Button>
          </div>
        )}

        {/* {isConnected && (
          <div className="flex w-full items-center justify-center p-4">
            <Button
              onClick={() => {
                if (!session) {
                  signIn("github", {
                    callbackUrl: "/",
                  });
                } else {
                  signOut();
                }
              }}
              className="inline-flex w-full justify-center items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white h-12"
            >
              {!session ? (
                <>
                  <Image
                    src="/google.svg"
                    width={20}
                    height={20}
                    alt="Google Logo"
                  />
                  <p>Sign in with Social Connect</p>
                </>
              ) : (
                <p>Sign out</p>
              )}
            </Button>
          </div>
        )} */}
      </>
    </div>
  );
};

export default ConnectWalletPage;
