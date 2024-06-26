import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { useRouter } from "next/router";

export default function Footer() {
  const { isConnected, isReconnecting, isConnecting, isDisconnected } =
    useAccount();

  const router = useRouter();

  if (isReconnecting || isConnecting) {
    return null;
  }

  if (!isConnected || isDisconnected) {
    // return <ConnectWalletPage />;
    router.push("/connect-wallet");
  }

  return (
    <footer className="bg-gypsum mt-auto border-t flex items-center justify-center h-16">
      {isConnected && <ConnectButton />}
    </footer>
  );
}
