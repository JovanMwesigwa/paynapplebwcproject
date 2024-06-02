import { useSocialConnect } from "@/SocialConnect/useSocialConnect";
import BackHeader from "@/components/BackHeader";
import MainHeader from "@/components/MainHeader";
import RawHeader from "@/components/RawHeader";
import LoadingPage from "@/components/Spinners/LoadingPage";
import useFetchLookUpAddress from "@/hooks/query/useFetchLookUpAddress";
import { Button } from "@headlessui/react";
import { useQueryClient } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { toast } from "sonner";
import { useAccount } from "wagmi";

const RegisterPage = () => {
  const [loading, setLoading] = React.useState(false);

  const { register, revoke } = useSocialConnect();

  const [ActionError, setActionError] = React.useState<string | null>("");

  const {
    data: odisRegistedAddresses,
    isLoading,
    error,
    session,
    status,
  } = useFetchLookUpAddress();

  const router = useRouter();

  const { address } = useAccount();

  const queryClient = useQueryClient();

  useEffect(() => {
    if (error) {
      toast.error("Failed to fetch address data");
    }
  }, [error]);

  const handleRevoke = async () => {
    setLoading(true);
    const response = await revoke((session as any)?.user.name);

    if (response && !response.success) {
      setActionError(response.error);
      setLoading(false);
      return;
    }
    toast("Revoked successfully");
    // queryClient.invalidateQueries();
    signOut();
  };

  const handleRegister = async () => {
    setLoading(true);
    const response = await register((session as any)?.user.name);

    if (response && !response.success) {
      toast("Registration failed. Attestation already exists.");
      setLoading(false);
      return;
    }
    queryClient.invalidateQueries();

    toast("Registered successfully");
    setTimeout(() => {
      router.push("/");
    }, 6000);
  };

  if (isLoading || status === "loading") {
    return <LoadingPage back />;
  }

  const isEmptyObject = (obj: any) => {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
  };

  const hasRegisteredAddress = !isEmptyObject(odisRegistedAddresses);

  return (
    <div className="flex flex-1 items-center justify-center flex-col mt-16 relative">
      {/* <MainHeader back /> */}
      <RawHeader back />

      <div className="flex items-center justify-center flex-col">
        <div className="flex flex-col items-center justify-center">
          <div className="flex flex-row">
            <h1 className="text-4xl font-bold">Social</h1>
            <h1 className="text-4xl font-bold text-green-500">Connect</h1>
          </div>
          <p className="text-xs">Connect your address to your google account</p>
        </div>

        <div className="flex flex-row items-center justify-between w-full my-8 px-4">
          {address && (
            <Button className="bg-red-300 font-medium p-3 w-full text-red-500 rounded-sm text-xs">
              {address.slice(0, 5)}...{address.slice(-5)}
            </Button>
          )}
          {hasRegisteredAddress ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8 mx-3"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8 mx-3"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5L21 12m0 0-7.5 7.5M21 12H3"
              />
            </svg>
          )}

          {session && (
            <Button className="bg-green-300 font-medium p-3 w-full text-green-500 rounded-sm text-xs">
              {/* @ts-ignore */}
              {session.username ? (
                <>
                  {/* @ts-ignore */}
                  {session.username.slice(0, 3)}...{session.username.slice(-3)}
                </>
              ) : (
                <>
                  {session.user?.name?.slice(0, 3)}...
                  {session.user?.name?.slice(-3)}
                </>
              )}
            </Button>
          )}
        </div>
      </div>

      <div className="flex w-full px-4">
        {hasRegisteredAddress ? (
          <Button
            onClick={handleRevoke}
            disabled={loading || isLoading}
            className="inline-flex w-full justify-center items-center gap-2 rounded-md bg-red-500 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white h-9"
          >
            {loading ? (
              <Loader size={18} className="mr-3 animate-spin" />
            ) : (
              <p>Revoke</p>
            )}
          </Button>
        ) : (
          <Button
            onClick={handleRegister}
            disabled={loading || isLoading}
            className="inline-flex w-full justify-center items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white h-9"
          >
            {loading ? (
              <Loader size={18} className="mr-3 animate-spin" />
            ) : (
              <p>Register with Social Connect</p>
            )}
          </Button>
        )}
      </div>
      {/* <Button
        onClick={handleRevoke}
        disabled={loading || isLoading}
        className="inline-flex w-full justify-center items-center gap-2 rounded-md bg-red-500 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white h-9"
      >
        {loading ? (
          <Loader size={18} className="mr-3 animate-spin" />
        ) : (
          <p>Revoke</p>
        )}
      </Button>
      <Button
        onClick={() => signOut()}
        disabled={loading || isLoading}
        className="inline-flex w-full justify-center items-center gap-2 rounded-md bg-red-500 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white h-9"
      >
        {loading ? (
          <Loader size={18} className="mr-3 animate-spin" />
        ) : (
          <p>LogOut</p>
        )}
      </Button> */}
    </div>
  );
};

export default RegisterPage;
