"use client";

import { useState } from "react";
import { RxEyeClosed, RxEyeOpen } from "react-icons/rx";
import { useRouter } from "next-nprogress-bar";
import { toast, ToastContainer } from "react-toastify";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "react-toastify/dist/ReactToastify.css";
import { BiEnvelope, BiLoaderCircle, BiLockAlt } from "react-icons/bi";
import axiosInstance from "@/lib/axiosInstance";
import SocialSignup from "@/components/auth/SocialSignup";
import AuthLeft from "@/components/auth/AuthLeft";
import { Logo2 } from "@/components/icons/Icons";
import ContinueWithEmail from "@/components/auth/ContinueWithEmail";

const Signup: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("Email and password are required!");
      return;
    }

    try {
      setLoading(true);
      const response = await axiosInstance.post("/login", { email, password });

      toast.success("Login successful!");
      localStorage.setItem("authToken", response.data.token);
      // router.push("/dashboard");
    } catch (error: any) {
      if (error.response?.status === 403) {
        localStorage.setItem("email", email);
        toast.error(
          error.response?.data?.message ||
            "User not verified. Please verify OTP first"
        );
        setTimeout(() => {
          router.push("/otp-verification");
        }, 3000);
      } else {
        toast.error(
          error.response?.data?.message || "Login failed. Try again."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  function handleClick() {
    router.push("/"); // Redirect to home page on logo click
  }

  return (
    <div className="grid lg:grid-cols-2 min-h-screen">
      {/* Left Section (Image & Text) */}
      <AuthLeft />

      {/* Right Section (Login Form) */}
      <div className="flex flex-col h-screen sm:h-full items-center sm:justify-center sm:p-6 md:bg-white">
        <div className="w-full max-w-sm bg-[#F4F8FD] sm:bg-transparent">
          <div className="sm:text-center flex flex-col sm:items-center text-black-100 gap-12 p-6 sm:p-0">
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
            <div className="">
              <h2 className="text-xl font-bold">Create Account</h2>
              <p className="text-gray-500 text-sm">
              Your Dream Job Awaits - Let&apos;s Get Started
              </p>
            </div>
          </div>

          {/* Social Signup Buttons */}
          <div className="rounded-t-[40px] sm:rounded-t-none p-4 sm:p-0 mt-3 sm:mt-0 bg-white">
            {/* Social Logins */}
            <SocialSignup />

            {/* Continue with email */}
            <ContinueWithEmail />

            {/* Login Form */}
            <div className="space-y-4">
              <div className="space-y-6">
                {/* Email */}
                <div className="w-full mt-4">
                  <div className="relative w-full ">
                    <label className="absolute block text-gray-700 font-medium text-xs -top-2 left-2 bg-white px-1">
                      Email Address
                    </label>
                    <BiEnvelope
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      size={20}
                    />
                    <input
                      type="email"
                      className="w-full pl-10 p-3 border border-gray-300 focus:outline-blue-500 rounded-[8px]"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                {/* FirstName $ LastName */}
                <div className="grid md:grid-cols-2 gap-4">
                  {/* firstName */}
                  <div className="w-full mt-4">
                    <div className="relative w-full ">
                      <label className="absolute block text-gray-700 font-medium text-xs -top-2 left-2 bg-white px-1">
                        First Name
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        id="firstName"
                        className="w-full p-3 border border-gray-300 focus:outline-blue-500 rounded-[8px]"
                        placeholder=" First Name"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* lastName */}
                  <div className="w-full mt-4">
                    <div className="relative w-full ">
                      <label className="absolute block text-gray-700 font-medium text-xs -top-2 left-2 bg-white px-1">
                        Last Name
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        id="lastName"
                        className="w-full p-3 border border-gray-300 focus:outline-blue-500 rounded-[8px]"
                        placeholder="Last Name"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                {/* Phone Number */}
                <div className="mb-4">
                  <PhoneInput
                    country={"ng"}
                    inputClass="!w-full !py-6 !rounded-[12px] !border-gray-300 !focus:outline-none !focus:ring-2 !focus:ring-gray-300"
                    buttonClass="!border-gray-300 !px-1 !rounded-l-[12px]"
                  />
                </div>
                <div className="w-full mt-4">
                  <div className="relative w-full">
                    <label className="absolute block text-gray-700 font-medium text-xs -top-2 left-2 bg-white px-1">
                      Password
                    </label>
                    <BiLockAlt
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      size={20}
                    />
                    <input
                      type={showPassword ? "text" : "password"}
                      className="w-full pl-10 p-3 border border-gray-300 rounded-[8px] focus:outline-blue-500"
                      placeholder="Create Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <RxEyeOpen size={20} />
                      ) : (
                        <RxEyeClosed size={20} />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Create account button */}
              <button
                className="!mt-6 button_v1 w-full flex justify-center items-center"
                onClick={handleLogin}
                // disabled={loading}
                disabled={true}
              >
                {loading ? (
                  <BiLoaderCircle className="animate-spin mr-2" size={22} />
                ) : (
                  "Create Account"
                )}
              </button>
              <p onClick={()=>router.push("/login")} className="text-center text-sm mt-4 cursor-pointer">Login Instead</p>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>  
  );
};

export default Signup;

