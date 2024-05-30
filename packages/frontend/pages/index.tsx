import MainHeader from "@/components/MainHeader";

export default function Home() {
  // useEffect(() => {
  //   if (session) {
  //     getLookupAddress();
  //   }
  // }, [session, odisRegistedAddresses]);

  // if (session && odisRegistedAddresses === "" && !loading) {
  //   // navigate to the register on social connect page
  //   router.push("/register");
  // }

  return (
    <main className="w-full flex flex-col items-center text-gray-800 p-4 flex-1 relative">
      <MainHeader />
    </main>
  );
}
