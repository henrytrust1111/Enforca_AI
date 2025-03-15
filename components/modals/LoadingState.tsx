import React from "react";
import { LoadingAnimation } from "../icons/Icons";

const LoadingState = () => {
  return (
    <div className="fixed p-4 w-screen inset-0 overflow-y-auto bg-[#00000098] h-screen left-0 top-0 z-30 flex items-center justify-center md:justify-center px-2">
      {/* Modal Card */}
      <div className="relative w-max bg-white shadow-lg rounded-[12px] p-6">
        <LoadingAnimation width={100} height={100} />
      </div>
    </div>
  );
};

export default LoadingState;
