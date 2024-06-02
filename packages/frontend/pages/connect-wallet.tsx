import LoadingPage from "@/components/Spinners/LoadingPage";
import useFetchLookUpAddress from "@/hooks/query/useFetchLookUpAddress";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { HomeIcon, Link } from "lucide-react";
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
    }
  }, [isConnected]);

  if (status === "loading") {
    return <LoadingPage />;
  }

  return (
    <div className="flex flex-1 items-center justify-evenly flex-col h-screen absolute top-0 bottom-0 left-0 right-0 bg-white">
      <div className="flex flex-col items-center justify-center">
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
          <div className="flex flex-col text-sm">
            <p>Wallet Connected!</p>
            <Link
              href="/"
              className="flex items-center gap-2 flex-row  text-black"
            >
              <HomeIcon size={20} />
            </Link>
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
