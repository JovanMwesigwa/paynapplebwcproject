import { Loader } from "lucide-react";
import React from "react";
import BackHeader from "../BackHeader";

const LoadingPage = ({ back }: { back?: boolean }) => {
  return (
    <div className="flex flex-1 h-full w-full items-center justify-center relative">
      {back && <BackHeader />}
      <Loader size={20} className="animate-spin text-neutral-500" />
    </div>
  );
};

export default LoadingPage;
