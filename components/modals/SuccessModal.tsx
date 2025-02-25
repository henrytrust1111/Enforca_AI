import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useRouter } from "next-nprogress-bar";
import { SuccessIcon } from "../icons/Icons";

const SuccessModal = () => {
  const router = useRouter();
  return (
    <div className="fixed p-4 w-screen inset-0  overflow-y-auto  bg-[#00000098] h-screen left-0 top-0 z-30 flex items-center justify-center md:justify-center px-2">
      {/* Modal Card */}
      <div className="relative w-full max-w-sm bg-white shadow-lg rounded-[12px] p-6">
        {/* Close Button */}
        <button
          className="absolute bg-white-100 top-0 -right-12 rounded-full p-1 text-gray-400 hover:text-gray-600"
          aria-label="Close Modal"
        >
          <AiOutlineClose size={20} />
        </button>

        {/* Success Icon */}
        <div className="flex items-center justify-center mb-4">
          <SuccessIcon width={100} height={100} />
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-center text-primary mb-2">
          Password has reset been successfully
        </h2>

        {/* Subtitle */}
        <p className="text-center text-gray-600 mb-6">
          You can now proceed to login
        </p>

        {/* Button */}
        <div className="flex justify-center">
          <button
            className="w-full button_v1 flex justify-center"
            onClick={() => router.push("/login")}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
