"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next-nprogress-bar";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BiEnvelope, BiLoaderCircle, BiLockAlt } from "react-icons/bi";
import axiosInstance from "@/lib/axiosInstance";
import SocialSignup from "@/components/auth/SocialSignup";
import AuthLeft from "@/components/auth/AuthLeft";
import { Logo2 } from "@/components/icons/Icons";
import ContinueWithEmail from "@/components/auth/ContinueWithEmail";
import CustomInput from "@/components/auth/CustomInput";
import SuccessModal from "@/components/modals/SuccessModal";

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);


  const validateInput = (name: string, value: string) => {
    let errorMessage = "";

    if (name === "email") {
      if (!/^\S+@\S+\.\S+$/.test(value)) {
        errorMessage = "Enter a valid email address";
      }
    }

    setErrors((prev) => ({ ...prev, [name]: errorMessage }));
  };

  const handleChange = (name: string, value: string) => {
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
    validateInput(name, value);
  };

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
      router.push("/");
    } catch (error: any) {
      if (
        error.response?.data?.message ===
        "User not verified. Please verify OTP first"
      ) {
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

  const isFormValid =
    email && password && Object.values(errors).every((err) => err === "");

  return (
    <>
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
                <h2 className="text-xl font-bold">Log in to your Account</h2>
                <p className="text-gray-500 text-sm">
                  Welcome Back! Let’s Get You Back on Track.
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
                    <CustomInput
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      icon={<BiEnvelope size={20} />}
                      className="pl-10"
                    />
                    {errors.email && (
                      <p
                        id="email-desc"
                        className="text-red-500 text-sm"
                        role="alert"
                      >
                        {errors.email}
                      </p>
                    )}
                  </div>
                  <div className="w-full mt-4">
                    <div className="relative w-full">
                      <CustomInput
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        icon={<BiLockAlt size={20} />}
                        className="pl-10"
                      />
                      <button
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff size={20} />
                        ) : (
                          <Eye size={20} />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Remember Me and Forgot Password */}
                <div className="flex justify-between text-xs text-[#505959] font-semibold">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" /> Remember Me
                  </label>
                  <a href="/forgot-password" className="">
                    Forgot Password?
                  </a>
                </div>
                <button
                  className={`!mt-6 button_v1 w-full flex justify-center items-center ${
                    !isFormValid ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  onClick={handleLogin}
                  disabled={!isFormValid || loading}
                  aria-disabled={!isFormValid || loading}
                >
                  {loading ? (
                    <BiLoaderCircle className="animate-spin mr-2" size={22} />
                  ) : (
                    "Login"
                  )}
                </button>
                <p
                  onClick={() => router.push("/signup")}
                  className="text-center text-sm mt-4 cursor-pointer"
                >
                  Create Account Instead
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
      <SuccessModal
        onClose={() => setIsSuccessModalVisible(false)}
        isVisible={isSuccessModalVisible}
        title="Password has been reset successfully"
        subtitle="You can now proceed to login"
        buttonText="Dashboard"
        route="/"
      />
    </>
  );
};

export default Login;
