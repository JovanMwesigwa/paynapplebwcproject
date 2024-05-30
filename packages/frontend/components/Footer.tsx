import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import ConnectWalletPage from "./WalletConnectComponents/ConnectWalletPage";

export default function Footer() {
  const { isConnected, isReconnecting, isConnecting, isDisconnected } =
    useAccount();

  if (isReconnecting || isConnecting) {
    return null;
  }

  if (!isConnected || isDisconnected) {
    return <ConnectWalletPage />;
  }

  return (
    <footer className="bg-gypsum mt-auto border-t flex items-center justify-center h-16">
      <ConnectButton />
    </footer>
  );
}
