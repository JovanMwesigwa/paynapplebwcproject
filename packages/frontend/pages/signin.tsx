import useConnectWallet from "@/hooks/useConnectWallet";
import { Button } from "@headlessui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

const SignInPage = () => {
  const { hideConnectBtn, isConnected } = useConnectWallet();
  const { data: session, status } = useSession();
  const [clientSideRendered, setClientSideRendered] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setClientSideRendered(true);

    if (session) {
      router.push("/");
    }
  }, [session, router]);

  if (status === "loading" || (clientSideRendered && session)) {
    return (
      <div className="flex flex-1 items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex flex-1 items-center justify-evenly flex-col h-screen">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold">Paynapple 🍏</h1>
        <p className="text-xs">Manage your kiosk with web3</p>
      </div>

      {clientSideRendered && (
        <>
          {!isConnected && (
            <ConnectButton
              showBalance={{ smallScreen: false, largeScreen: false }}
            />
          )}

          {isConnected && (
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
          )}
        </>
      )}
    </div>
  );
};

export default SignInPage;
