import Link from "next/link";
import { useRouter } from "next/router";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import React from "react";
import { signOut } from "next-auth/react";
import useFetchLookUpAddress from "@/hooks/query/useFetchLookUpAddress";

const MainHeader = () => {
  const {
    data: odisRegistedAddresses,
    isLoading,
    error,
    session,
    status,
  } = useFetchLookUpAddress();

  if (isLoading || status === "loading") {
    return null;
  }

  return (
    <div className="flex flex-row h-12 border-b items-center justify-between fixed top-0 left-0 ring-0 w-full px-4">
      <Link href="/" className="flex flex-row items-center justify-center">
        <h1 className="text-sm font-medium">🍏 Paynapple</h1>
      </Link>

      <Popover className="relative ">
        <PopoverButton>
          <div className="w-6 h-6 bg-neutral-300 rounded-full"></div>
        </PopoverButton>
        <PopoverPanel
          anchor="bottom"
          className="flex  flex-col bg-white py-2 border rounded-md shadow-md "
        >
          <div className="flex border-b px-3 py-1 items-center justify-center">
            {odisRegistedAddresses && (
              <p className="text-[11px]">
                {odisRegistedAddresses.slice(0, 4)}...
                {odisRegistedAddresses.slice(-4)}
              </p>
            )}
          </div>
          {session && (
            <div className="flex px-3 py-1 border-b items-center justify-center">
              <p className="text-[11px]">
                {/* @ts-ignore */}
                {session.username.slice(0, 3)}...{session.username.slice(-3)}
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
            <p className="text-xs text-red-500">Revoke</p>
          </Link>
        </PopoverPanel>
      </Popover>
    </div>
  );
};

export default MainHeader;
