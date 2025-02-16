"use client";

import AuthLeft from "@/components/auth/AuthLeft";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next-nprogress-bar";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BiLoaderCircle } from "react-icons/bi";
import axiosInstance from "@/lib/axiosInstance";
import axios from "axios";
import { z } from "zod";
// import Success from "@/components/auth/Success";
import { Logo2, Valid } from "@/components/icons/Icons";

const otpSchema = z
  .array(z.string().length(1, "Each digit must be 1 character"))
  .length(6, "OTP must be exactly 6 digits");

const maskEmail = (email: string) => {
  const [name, domain] = email.split("@");
  const maskedName = name.slice(0, 5) + "*****";
  return `${maskedName}@${domain}`;
};

const Verification = () => {
  const router = useRouter();
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState<boolean>(false);
  const [onSuccess, setOnSuccess] = useState<boolean>(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [myEmail, setMyEmail] = useState<string | null>(null);
  const [countdown, setCountdown] = useState<number>(120); // 2 minutes countdown

  console.log(onSuccess, myEmail, countdown)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const email = localStorage.getItem("email");
      setMyEmail(email);
    }
    inputRefs.current[0]?.focus();

    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleChange = (value: string, index: number) => {
    if (!/\d/.test(value) && value !== "") return;
    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);

    if (value && index < otp.length - 1) {
      inputRefs.current[index + 1]?.focus();
    } else if (index === otp.length - 1 && value) {
      handleVerify(updatedOtp); // Pass the updated array here
    }
  };

  const handleVerify = async (otpArray?: string[]) => {
    try {
      setLoading(true);
      const currentOtp = otpArray || otp; // Use the passed array or state
      otpSchema.parse(currentOtp);
      const otpCode = currentOtp.join("");
      const email = localStorage.getItem("email");

      if (!email) {
        toast.error("Email not found. Please try again.");
        setLoading(false);
        return;
      }

      const response = await axiosInstance.post("/verify-otp", {
        email,
        otp: otpCode
      });

      setOnSuccess(true);
      console.log(response);

      setTimeout(() => {
        router.push("/");
      }, 3000);
    } catch (error: unknown) {
      console.error("Verification error:", error);
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "OTP verification failed");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    try {
      setLoading(true);
      const email = localStorage.getItem("email");

      if (!email) {
        toast.error("Email not found. Please try again.");
        return;
      }

      const response = await axiosInstance.post("/resend-otp", {
        email
      });

      toast.success(
        response?.data?.message || "New OTP has been sent to your email/SMS"
      );
      setOtp(["", "", "", "", "", ""]); // Clear the OTP inputs
      setCountdown(120); // Reset the countdown timer
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "OTP resend failed");
      } else {
        toast.error("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  // handle logo click
  function handleClick() {
    router.push("/"); // Redirect to home page on logo click
  }

  return (
    <div className="grid lg:grid-cols-2 min-h-screen">
      {/* Left Section (Image & Text) */}
      <AuthLeft />

      {/* Right Section (Login Form) */}
      <div className="flex flex-col h-screen sm:h-full items-center sm:justify-center sm:p-6 md:bg-white">
        <div className="relativew-full max-w-sm bg-[#F4F8FD] sm:bg-transparent">
        <p className="font-medium absolute top-20 hidden sm:block py-4 sm:py-0 sm:right-12 cursor-pointer hover:underline hover:underline-offset-2 hover:text-primary">Go Back</p>
        <p className="font-medium absolute top-20 left-9 sm:hidden py-4 sm:py-0 sm:right-12 cursor-pointer hover:underline hover:underline-offset-2 hover:text-primary">Go Back</p>
          <div className="sm:text-center pb-16 flex flex-col sm:items-center text-black-100 gap-12 p-6 sm:p-0 mb-12">
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

          {/* OTP inputs */}
          <div className="rounded-t-[40px] sm:rounded-t-none p-4 sm:p-0 mt-3 sm:mt-0 bg-white space-y-12 ">
            {/* Description */}
            <div className="space-y-4 text-center">
              <h1 className="font-bold text-2xl sm:hidden">
                Verify your Account
              </h1>
              <div className="">
                <p className="font-medium">
                  We’ve sent a 6 digit code to your email
                </p>
                {/* This is the name of the person that tried signing Up */}
                <p className="font-bold">mike@example.com</p>
              </div>
            </div>
            <div className="space-y-4">
              {/* lablel */}
              <label className="font-medium">Enter OTP</label>
              <div className="grid grid-cols-6 gap-3 mb-4">
                {otp.map((value, index) => (
                  <input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    maxLength={1}
                    value={value}
                    onChange={(e) => handleChange(e.target.value, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    ref={(el) => {
                      inputRefs.current[index] = el;
                    }}
                    className="w-[46px] h-[46px] md:w-[55px] md:h-[55px] p-2 text-center text-xl border rounded-[10px] focus:ring-2 focus:ring-primary-300 focus:outline-none"
                  />
                ))}
              </div>

              {/* Valid tag that displays when all input field are filled */}
              <div className="flex items-center gap-2 text-xs text-primary-300 font-semibold">
                <Valid width={15} height={15} /> <span> Valid</span>
              </div>
              <button
                onClick={() => handleVerify()}
                disabled={loading}
                className="button_v1 w-full justify-center"
                id="verifyBtn"
              >
                {loading ? (
                  <BiLoaderCircle className="mr-2 animate-spin" size={22} />
                ) : (
                  "Proceed"
                )}
              </button>

              {/* Resend password timer */}
              <p className="text-center text-sm mt-4 cursor-pointer">
                Resend OTP in 40 secs
              </p>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Verification;

// "use client";

// import React, { useState, useEffect, useRef } from "react";
// import { useRouter } from "next-nprogress-bar";
// import { toast } from "react-toastify";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { BiLoaderCircle } from "react-icons/bi";
// import axiosInstance from "@/lib/axiosInstance";
// import axios from "axios";
// import { z } from "zod";
// import Success from "@/components/auth/Success";

// const otpSchema = z
//   .array(z.string().length(1, "Each digit must be 1 character"))
//   .length(6, "OTP must be exactly 6 digits");

// const maskEmail = (email: string) => {
//   const [name, domain] = email.split("@");
//   const maskedName = name.slice(0, 5) + "*****";
//   return `${maskedName}@${domain}`;
// };

// const Verification = () => {
//   const router = useRouter();
//   const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
//   const [loading, setLoading] = useState<boolean>(false);
//   const [onSuccess, setOnSuccess] = useState<boolean>(false);
//   const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
//   const [myEmail, setMyEmail] = useState<string | null>(null);
//   const [countdown, setCountdown] = useState<number>(120); // 2 minutes countdown

//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       const email = localStorage.getItem("email");
//       setMyEmail(email);
//     }
//     inputRefs.current[0]?.focus();

//     const timer = setInterval(() => {
//       setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
//     }, 1000);

//     return () => clearInterval(timer);
//   }, []);

//   const handleKeyDown = (
//     e: React.KeyboardEvent<HTMLInputElement>,
//     index: number
//   ) => {
//     if (e.key === "Backspace" && !otp[index] && index > 0) {
//       inputRefs.current[index - 1]?.focus();
//     }
//   };

//   const handleChange = (value: string, index: number) => {
//     if (!/\d/.test(value) && value !== "") return;
//     const updatedOtp = [...otp];
//     updatedOtp[index] = value;
//     setOtp(updatedOtp);

//     if (value && index < otp.length - 1) {
//       inputRefs.current[index + 1]?.focus();
//     } else if (index === otp.length - 1 && value) {
//       handleVerify(updatedOtp); // Pass the updated array here
//     }
//   };

//   const handleVerify = async (otpArray?: string[]) => {
//     try {
//       setLoading(true);
//       const currentOtp = otpArray || otp; // Use the passed array or state
//       otpSchema.parse(currentOtp);
//       const otpCode = currentOtp.join("");
//       const email = localStorage.getItem("email");

//       if (!email) {
//         toast.error("Email not found. Please try again.");
//         setLoading(false);
//         return;
//       }

//       const response = await axiosInstance.post("/verify-otp", {
//         email,
//         otp: otpCode,
//       });

//       setOnSuccess(true);
//       console.log(response);

//       setTimeout(() => {
//         router.push("/");
//       }, 3000);
//     } catch (error: unknown) {
//       console.error("Verification error:", error);
//       if (axios.isAxiosError(error)) {
//         toast.error(error.response?.data?.message || "OTP verification failed");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleResendCode = async () => {
//     try {
//       setLoading(true);
//       const email = localStorage.getItem("email");

//       if (!email) {
//         toast.error("Email not found. Please try again.");
//         return;
//       }

//       const response = await axiosInstance.post("/resend-otp", {
//         email
//       });

//       toast.success(response?.data?.message || "New OTP has been sent to your email/SMS");
//       setOtp(["", "", "", "", "", ""]); // Clear the OTP inputs
//       setCountdown(120); // Reset the countdown timer
//     } catch (error: unknown) {
//       if (axios.isAxiosError(error)) {
//         toast.error(error.response?.data?.message || "OTP resend failed");
//       }
//       else {
//         toast.error("An unexpected error occurred");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <ToastContainer />
//       <div className="min-h-screen flex flex-col items-center justify-center bg-[#F9FAFB] px-4">
//         {
//           !onSuccess && <div className="bg-white p-6 rounded-[24px]">
//             <div className="text-left mb-8">
//               <h1 className="text-xl md:text-2xl font-bold text-[#0D0E0D]">
//                 Enter verification code
//               </h1>
//               <p className="text-[#718096] font-normal mt-2">
//                 We have just sent a verification code to <br /> {myEmail && maskEmail(myEmail)}
//               </p>
//             </div>

//             <div className="w-full max-w-md ">
// <div className="grid grid-cols-6 gap-4 mb-4">
//   {otp.map((value, index) => (
//     <input
//       key={index}
//       id={`otp-${index}`}
//       type="text"
//       maxLength={1}
//       value={value}
//       onChange={(e) => handleChange(e.target.value, index)}
//       onKeyDown={(e) => handleKeyDown(e, index)}
//       ref={(el) => {
//         inputRefs.current[index] = el;
//       }}
//       className="w-[43px] h-[43px] md:w-[53px] md:h-[63px] text-center text-xl border rounded-[10px] focus:ring-2 focus:ring-primary focus:outline-none"
//     />
//   ))}
// </div>
//               <div className="flex justify-between items-center mb-6">
//                 <p className="text-xs text-[#43564B]">
//                   Resend code in{" "}
//                   <span className="text-primary font-medium">{countdown}</span>
//                 </p>
//                 <button
//                   onClick={handleResendCode}
//                   className="text-primary font-bold text-sm flex items-center hover:underline underline-offset-4 transition"
//                 >
//                   Send the code again
//                 </button>
//               </div>
// <button
//   // onClick={handleVerify}
//   onClick={() => handleVerify()}
//   disabled={loading}
//   className="button_v1"
// >
//   {loading ? (
//     <BiLoaderCircle className="mr-2 animate-spin" size={22} />
//   ) : (
//     "Verify to Continue"
//   )}
// </button>
//             </div>
//           </div>
//         }

//         {
//           onSuccess && <Success />
//         }

//       </div>
//     </>
//   );
// };

// export default Verification;
