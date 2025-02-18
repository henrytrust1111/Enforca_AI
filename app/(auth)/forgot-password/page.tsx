"use client";

import React from "react";
import { Envelope, Phone } from "@/components/icons/Icons";
import AuthLeft2 from "@/components/auth/AuthLeft2";
import ForgetPasswordRightLayout from "@/components/auth/layout/ForgetPasswordRightLayout";
import { useRouter } from "next-nprogress-bar";

// Forgot Password page
// This page allows users to reset their password if they have forgotten it
// either by sending a link to their email or by sending an OTP to their phone number
const ForgotPassword: React.FC = () => {
  const router = useRouter();
  const handleResetViaEmail = () => {
    router.push("/enter-email");
  };
  const handleResetViaPhone = () => {
    router.push("/enter-phoneNumber");
  };
  return (
    <div className="grid lg:grid-cols-2 min-h-screen">
      {/* Left Column */}
      <AuthLeft2 resetText="Reset your password with any of the reset options" />

      {/* Right Column */}
      <ForgetPasswordRightLayout>
        <p className="font-medium mb-6 text-center">
          Choose your reset option preference
        </p>

        {/* Option Cards */}
        <div className="space-y-4">
          {/* Reset Via Email */}
          <div
            onClick={handleResetViaEmail}
            className="bg-white rounded-[20px] border p-4 flex items-center space-x-4 cursor-pointer"
          >
            <div className="bg-[#3FA3EC33] p-3 flex items-center justify-center rounded-full">
              <Envelope width={30} height={30} />
            </div>
            <div>
              <h3 className="text-[#000F1B] font-medium mb-1">
                Reset Via Email Address
              </h3>
              <p className="text-[#00000080] text-sm leading-relaxed">
                You will be required to enter the email address associated with
                your account
              </p>
            </div>
          </div>

          {/* Reset Via Phone */}
          <div
            onClick={handleResetViaPhone}
            className="bg-white rounded-[20px] border p-4 flex items-center space-x-4 cursor-pointer"
          >
            <div className="bg-[#3FA3EC33] p-3 flex items-center justify-center rounded-full">
              <Phone width={30} height={30} />
            </div>
            <div>
              <h3 className="text-[#000F1B] font-medium mb-1">
                Reset Via Phone Number
              </h3>
              <p className="text-[#00000080] text-sm leading-relaxed">
                You will be required to enter the phone number associated with
                your account
              </p>
            </div>
          </div>
        </div>
      </ForgetPasswordRightLayout>
    </div>
  );
};

export default ForgotPassword;

// import { Envelop, Padlock, Phone } from "@/components/icons/Icons";
// import React from "react";

// // Forgot Password page
// // This page allows users to reset their password if they have forgotten it
// // either by sending a link to their email or by sending an OTP to their phone number
// const ForgotPassword = () => {
//   return (
//     <div className="grid lg:grid-cols-2 min-h-screen">
//       {/* Left side of the container */}
//       <div className="">
//         <p>Go Back</p>
//         <Padlock width={100} height={100} />
//         <h1 className="font-bold text-2xl sm:text-4xl text-primary">
//           Forgot Password?
//         </h1>
//         <p className="font-medium">Reset your password</p>
//       </div>

//       {/* Right side of the container */}
//       <div className="border-t-[30px] sm:border-l-[60px] bg-[#F5F6FB]">
//         <p className="font-medium">Choose your reset option preference</p>
//         <div className="">
//           <div className="bg-[#3FA3EC33]">
//             <Envelop width={100} height={100} />
//           </div>
//           <h3 className="text-[#000F1B] font-medium">
//             Reset Via Email Address
//           </h3>
//           <p className="text-[#00000080] text-sm">
//             You will be required to enter the email address associated with your
//             account
//           </p>
//         </div>
//         <div className="">
//           <div className="bg-[#3FA3EC33]">
//             <Phone width={100} height={100} />
//           </div>
//           <h3 className="text-[#000F1B] font-medium">
//             Reset Via Email Address
//           </h3>
//           <p className="text-[#00000080] text-sm">
//             You will be required to enter the email address associated with your
//             account
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ForgotPassword;
