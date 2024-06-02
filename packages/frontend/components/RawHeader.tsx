import { ArrowLeft, BotIcon, Sparkles } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";

const RawHeader = ({ back, ai }: { back?: boolean; ai?: boolean }) => {
  const router = useRouter();
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
        <Link
          href="/menu"
          className="flex flex-row items-center justify-center"
        >
          <h1 className="text-base font-bold">🍏 Paynapple</h1>
        </Link>
      )}

      {ai && (
        <div className="flex flex-row items-center justify-center text-white bg-purple-500 px-3 py-2 rounded-full">
          <p className="text-xs mr-1 font-medium">AI Chef</p>
          <Sparkles size={12} />
        </div>
      )}
    </div>
  );
};

export default RawHeader;
