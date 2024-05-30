import { useSocialConnect } from "@/SocialConnect/useSocialConnect";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import useLookUpAddress from "@/hooks/useLookUpAddress";
import { useRouter } from "next/router";
import MainHeader from "@/components/MainHeader";

export default function Home() {
  const { account, lookupAddress } = useSocialConnect();
  const { data: session } = useSession();
  const { odisRegistedAddresses, loading, error, getLookupAddress } =
    useLookUpAddress(lookupAddress, session);

  const router = useRouter();

  useEffect(() => {
    if (session) {
      getLookupAddress();
    }
  }, [session, odisRegistedAddresses]);

  // if (session && odisRegistedAddresses === "" && !loading) {
  //   // navigate to the register on social connect page
  //   router.push("/register");
  // }

  return (
    <main className="w-full flex flex-col items-center text-gray-800 p-4 flex-1 relative">
      <MainHeader />
      {!account ? (
        "Connect your wallet to use SocialConnect"
      ) : (
        <>
          <p>Click on SocialConnect to get started</p>
          {loading && <p>Loading address info...</p>}
          {error && <p>Error: {error}</p>}
          {odisRegistedAddresses && (
            <div className="text-sm mt-4">
              <h2>Address Info:</h2>
              <pre>{JSON.stringify(odisRegistedAddresses, null, 2)}</pre>
            </div>
          )}
        </>
      )}
    </main>
  );
}
