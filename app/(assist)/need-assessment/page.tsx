"use client";

import { useState } from "react";
import { useRouter } from "next-nprogress-bar";
import AuthLeft from "@/components/auth/AuthLeft";
import { Logo2 } from "@/components/icons/Icons";
import { CheckCircle } from "lucide-react";
import NeedAssessment from "@/components/assist/NeedAssessment";
import CVUpload from "@/components/assist/CVUpload";

const Assessment: React.FC = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("Need Assessment");

  function handleClick() {
    router.push("/"); // Redirect to home page on logo click
  }

  return (
    <div className="grid lg:grid-cols-2 min-h-screen">
      {/* Left Section (Image & Text) */}
      <AuthLeft />

      {/* Right Section (Login Form) */}
      <div className="flex flex-col h-screen sm:h-full items-center sm:justify-center  sm:p-6 md:bg-white">
        <div className="w-full max-w-sm bg-[#F4F8FD] sm:bg-transparent md:space-y-12">
          <div className="sm:text-center flex flex-col sm:items-center text-black-100 gap-6 p-4 sm:p-0">
            {/* Logo */}
            <div
              onClick={handleClick}
              className="flex items-center space-x-2 w-max cursor-pointer"
            >
              <Logo2 width={35} height={35} />
              <span className="text-base md:text-xl mt-2 font-bold">
                GetreKruitd
              </span>
            </div>
          </div>
          <div className="rounded-t-[40px] sm:rounded-t-none p-4 sm:p-0 mt-3 sm:mt-0 bg-white">
            {/* Section */}
            <div className="flex border-b mb-4 w-full">
              <button
                className={`flex-1 p-2 text-center text-sm flex items-center justify-center gap-3 font-medium ${
                  activeTab === "Need Assessment"
                    ? "border-b-2 border-[#9CB3D7] text-[#36A1C5] md:bg-[#F7FBFD]"
                    : "text-gray-500"
                }`}
                onClick={() => setActiveTab("Need Assessment")}
              >
                <CheckCircle /> <p className="">Need Assessment</p>
              </button>
              <button
                className={`flex-1 p-2 text-center text-sm flex items-center justify-center gap-3 font-medium ${
                  activeTab === "CV Upload"
                    ? "border-b-2 border-[#9CB3D7] text-[#36A1C5] md:bg-[#F7FBFD]"
                    : "text-gray-500"
                }`}
                onClick={() => setActiveTab("CV Upload")}
              >
                <CheckCircle size={20} /> <p className="">CV Upload</p>
              </button>
            </div>
            {activeTab === "Need Assessment" ? (
              <NeedAssessment />
            ) : (
              <CVUpload />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Assessment;
