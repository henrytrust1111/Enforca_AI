import React from "react";
import { ArrowRightBlack } from "../icons/Icons";
import Image from "next/image";

const CTA = () => {
  return (
    <div className="bg-[#1E57A0] rounded-[20px] shadow flex items-center justify-between p-6">
      <div className="flex items-center space-x-6">
        <Image
          src="/images/3d-rendering.png"
          alt="Job suggestion"
          className="w-16 h-16 object-cover rounded-md"
          width={100}
          height={100}
        />
        <div className="space-y-2">
          <p className="text-base font-medium text-[#fff]">
            There are over 5000 jobs that suites your resume
          </p>
          <button className="bg-[#F2F7FF] flex gap-2 text-[#1F303F] text-sm font-medium px-4 py-2 rounded-[60px] transition-colors">
            <span> Check it out</span>
            <ArrowRightBlack width={20} height={15} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CTA;
