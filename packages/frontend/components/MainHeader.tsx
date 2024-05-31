import Link from "next/link";
import { useRouter } from "next/router";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import React from "react";
import { signOut } from "next-auth/react";
import useFetchLookUpAddress from "@/hooks/query/useFetchLookUpAddress";
import Image from "next/image";
import LoadingPage from "./Spinners/LoadingPage";
import { ArrowLeft } from "lucide-react";

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

  if (
    !odisRegistedAddresses &&
    !isLoading &&
    session &&
    status === "authenticated"
  ) {
    router.push("/register");
  }

  const isEmptyObject = (obj: any) => {
    if (obj === null || obj === undefined) return true;
    return Object.keys(obj).length === 0 && obj.constructor === Object;
  };

  const hasRegisteredAddress = !isEmptyObject(odisRegistedAddresses);

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
        <PopoverPanel
          anchor="bottom"
          className="flex flex-col bg-white py-2 border rounded-md shadow-md"
        >
          <div className="flex border-b px-3 py-1 items-center justify-center">
            {hasRegisteredAddress && (
              <p className="text-[11px]">
                {String(odisRegistedAddresses).slice(0, 4)}...
                {String(odisRegistedAddresses).slice(-4)}
              </p>
            )}
          </div>
          {session && (
            <div className="flex px-3 py-1 border-b items-center justify-center">
              <p className="text-[11px]">
                {/* @ts-ignore */}
                {session.username ? (
                  <>
                    {/* @ts-ignore */}
                    {session.username.slice(0, 3)}...
                    {/* @ts-ignore */}
                    {session.username.slice(-3)}
                  </>
                ) : (
                  <>
                    {session.user?.name?.slice(0, 3)}...
                    {session.user?.name?.slice(-3)}
                  </>
                )}
              </p>
            </div>
          )}
          <div
            onClick={() => signOut()}
            className="flex px-3 py-1 flex-row border-b items-center justify-center"
          >
            <p className="text-xs">Logout</p>
          </div>
          <Link
            href="/register"
            className="flex px-3 pt-1 items-center justify-center"
          >
            {hasRegisteredAddress ? (
              <p className="text-xs text-red-500">Revoke</p>
            ) : (
              <p className="text-xs text-green-500">Register</p>
            )}
          </Link>
        </PopoverPanel>
      </Popover>
    </div>
  );
};

export default MainHeader;
