"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next-nprogress-bar";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BiLoaderCircle } from "react-icons/bi";
import axiosInstance from "@/lib/axiosInstance";
import axios from "axios";
import { z } from "zod";
import { Valid } from "@/components/icons/Icons";

const otpSchema = z
  .array(z.string().length(1, "Each digit must be 1 character"))
  .length(6, "OTP must be exactly 6 digits");

const OtpInputSection2 = () => {
  const router = useRouter();
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState<boolean>(false);
  const [onSuccess, setOnSuccess] = useState<boolean>(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [myEmail, setMyEmail] = useState<string | null>(null);
  const [countdown, setCountdown] = useState<number>(0); // 2 minutes countdown

  console.log(onSuccess, myEmail, countdown);

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

      const response = await axiosInstance.post("user/verify-otp", {
        email,
        otp: otpCode
      });

      setOnSuccess(true);
      console.log(response);
      toast.success(response?.data?.message);

      setTimeout(() => {
        router.push("/reset-password");
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

      const response = await axiosInstance.post("user/resend-otp", {
        email
      });

      toast.success(
        response?.data?.message || "New OTP has been sent to your email/SMS"
      );
      setOtp(["", "", "", "", "", ""]); // Clear the OTP inputs
      setCountdown(60); // Reset the countdown timer
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



  return (
    <>
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

        {countdown > 0 ? (
          <p
            onClick={handleResendCode}
            className="text-center text-sm mt-4 cursor-pointer"
          >
            Resend OTP in {countdown} secs
          </p>
        ) : (
          <button
            onClick={handleResendCode}
            disabled={countdown > 0}
            className={`${
              countdown > 0 ? "text-primary" : "text-primary"
            }    w-full text-sm flex items-center justify-center hover:underline underline-offset-4 transition `}
            aria-disabled={countdown > 0}
          >
            Send the code again
          </button>
        )}
      
      </div>
      <ToastContainer />
    </>
  );
};


export default OtpInputSection2;

