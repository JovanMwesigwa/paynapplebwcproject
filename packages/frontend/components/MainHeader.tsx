import Link from "next/link";
import { useRouter } from "next/router";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import React from "react";
import { signOut } from "next-auth/react";
import useFetchLookUpAddress from "@/hooks/query/useFetchLookUpAddress";
import Image from "next/image";
import LoadingPage from "./Spinners/LoadingPage";
import { ArrowLeft, CircleX, LogOut, X } from "lucide-react";

const MainHeader = ({ back }: { back?: boolean }) => {
  const {
    data: odisRegistedAddresses,
    isLoading,
    error,
    session,
    status,
  } = useFetchLookUpAddress();

  const router = useRouter();

  if (isLoading || status === "loading") {
    return <LoadingPage />;
  }

  const isEmptyObject = (obj: any) => {
    if (obj === null || obj === undefined) return true;
    return Object.keys(obj).length === 0 && obj.constructor === Object;
  };

  const hasRegisteredAddress = !isEmptyObject(odisRegistedAddresses);

  if (
    !hasRegisteredAddress &&
    !isLoading &&
    session &&
    status === "authenticated"
  ) {
    router.push("/register");
  }

  return (
    <div className="flex flex-row h-12 border-b bg-white z-10 items-center justify-between fixed top-0 left-0 ring-0 w-full px-4">
      {back ? (
        <div
          onClick={() => router.back()}
          className="flex flex-row items-center justify-center"
        >
          <ArrowLeft className="w-4 h-4 mr-3" />
          <h1 className="text-sm font-medium">Back</h1>
        </div>
      ) : (
        <Link href="/" className="flex flex-row items-center justify-center">
          <h1 className="text-base font-bold">🍏 Paynapple</h1>
        </Link>
      )}

      <Popover className="relative">
        <PopoverButton>
          <div className="w-6 h-6 bg-neutral-300 rounded-full relative overflow-hidden">
            {session && session.user?.image && (
              <Image
                src={session.user?.image}
                layout="fill"
                alt="User Profile Picture"
              />
            )}
          </div>
        </PopoverButton>
        <PopoverPanel className="fixed inset-0 flex flex-col bg-white py-2 border rounded-md shadow-md md:absolute md:top-full md:left-0 md:w-36 md:rounded-lg md:inset-auto">
          {({ close }) => (
            <>
              <div className="flex justify-end p-2">
                <X className="w-6 h-6 cursor-pointer" onClick={() => close()} />
              </div>
              <div className="flex flex-col items-center space-y-4 px-4">
                {hasRegisteredAddress && (
                  <div className="flex border-b w-full justify-center py-2">
                    <p className="text-sm">
                      {String(odisRegistedAddresses).slice(0, 4)}...
                      {String(odisRegistedAddresses).slice(-4)}
                    </p>
                  </div>
                )}
                {session && (
                  <div className="flex border-b w-full justify-center py-2 gap-x-2">
                    <Image
                      src="/google.svg"
                      width={20}
                      height={20}
                      alt="google"
                    />
                    <p className="text-sm">
                      {/* @ts-ignore */}
                      {session.username ? (
                        <>
                          {/* @ts-ignore */}
                          {session.username}
                        </>
                      ) : (
                        <>{session.user?.name}</>
                      )}
                    </p>
                  </div>
                )}
                <div
                  onClick={() => signOut()}
                  className="flex border-b w-full justify-center py-2 cursor-pointer flex-row items-center gap-x-2"
                >
                  <p className="text-sm">Logout</p>
                  <LogOut size={18} />
                </div>
                <Link
                  href="/register"
                  className="flex w-full justify-center py-2 gap-x-2"
                >
                  {hasRegisteredAddress ? (
                    <>
                      <p className="text-sm text-red-500">Revoke</p>
                      <CircleX size={18} className="text-red-500" />
                    </>
                  ) : (
                    <p className="text-sm text-green-500">Register</p>
                  )}
                </Link>
              </div>
            </>
          )}
        </PopoverPanel>
      </Popover>
    </div>
  );
};

export default MainHeader;
