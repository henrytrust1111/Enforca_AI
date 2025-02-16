"use client";

import { useState } from "react";
import { RxEyeClosed, RxEyeOpen } from "react-icons/rx";
import { useRouter } from "next-nprogress-bar";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BiEnvelope, BiLoaderCircle, BiLockAlt } from "react-icons/bi";
import axiosInstance from "@/lib/axiosInstance";
import SocialSignup from "@/components/auth/SocialSignup";
import AuthLeft from "@/components/auth/AuthLeft";
import { Logo2 } from "@/components/icons/Icons";
import ContinueWithEmail from "@/components/auth/ContinueWithEmail";

const Login: React.FC = () => {
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
            <div onClick={handleClick} className="flex items-center space-x-2 w-max cursor-pointer">
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
                      placeholder="Enter your password"
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

              {/* Remember Me and Forgot Password */}
              <div className="flex justify-between text-xs text-[#505959] font-semibold">
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" /> Remember Me
                </label>
                <a href="#" className="">
                  Forgot Password?
                </a>
              </div>
              <button
                className="!mt-6 button_v1 w-full flex justify-center items-center"
                onClick={handleLogin}
                // disabled={loading}
                disabled={true}
              >
                {loading ? (
                  <BiLoaderCircle className="animate-spin mr-2" size={22} />
                ) : (
                  "Login"
                )}
              </button>
              <p className="text-center text-sm mt-4">Create Account Instead</p>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;

// "use client";

// import { useState } from "react";
// import { RxEyeClosed, RxEyeOpen } from "react-icons/rx";
// import { BiEnvelope, BiLockAlt, BiLoaderCircle } from "react-icons/bi";
// import { useRouter } from "next/navigation";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import axiosInstance from "@/lib/axiosInstance";
// import SocialSignup from "@/components/auth/SocialSignup";
// import AuthLeft from "@/components/auth/AuthLeft";

// const Login: React.FC = () => {
//     const [showPassword, setShowPassword] = useState(false);
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [loading, setLoading] = useState(false);
//     const router = useRouter();

//     const handleLogin = async () => {
//         if (!email || !password) {
//             toast.error("Email and password are required!");
//             return;
//         }

//         try {
//             setLoading(true);
//             const response = await axiosInstance.post("/login", { email, password });
//             toast.success("Login successful!");
//             localStorage.setItem("authToken", response.data.token);
//             // router.push("/dashboard");
//         } catch (error: any) {
//             if (error.response?.status === 403) {
//                 localStorage.setItem("email", email);
//                 toast.error(error.response?.data?.message || "User not verified. Please verify OTP first");
//                 setTimeout(() => {
//                     router.push("/otp-verification");
//                 }, 3000);
//             } else {
//                 toast.error(error.response?.data?.message || "Login failed. Try again.");
//             }
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="grid lg:grid-cols-2 min-h-screen">
//             <AuthLeft />
//             <div className="flex flex-col justify-center items-center p-6 w-full max-w-md mx-auto">
//                 <h2 className="text-2xl font-bold mb-2">Log in to your Account</h2>
//                 <p className="text-gray-500 mb-6">Welcome Back! Let’s Get You Back on Track.</p>
//                 <SocialSignup />

// <div className="w-full mt-4">
//     <label className="block text-gray-700 font-medium mb-1">Email Address</label>
//     <div className="relative w-full">
//         <BiEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
//         <input
//             type="email"
//             className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:outline-blue-500"
//             placeholder="Enter your email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//         />
//     </div>
//                 </div>

//                 <div className="w-full mt-4">
//                     <label className="block text-gray-700 font-medium mb-1">Password</label>
//                     <div className="relative w-full">
//                         <BiLockAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
//                         <input
//                             type={showPassword ? "text" : "password"}
//                             className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:outline-blue-500"
//                             placeholder="Enter your password"
//                             value={password}
//                             onChange={(e) => setPassword(e.target.value)}
//                         />
//                         <button
//                             className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
//                             onClick={() => setShowPassword(!showPassword)}
//                         >
//                             {showPassword ? <RxEyeOpen size={20} /> : <RxEyeClosed size={20} />}
//                         </button>
//                     </div>
//                 </div>

//                 <div className="flex justify-between items-center w-full mt-4">
//                     <label className="flex items-center text-gray-600">
//                         <input type="checkbox" className="mr-2" /> Remember Me
//                     </label>
//                     <a href="#" className="text-blue-500 hover:underline">Forgot Password?</a>
//                 </div>

//                 <button
//                     className="mt-6 w-full p-3 bg-blue-600 text-white rounded-lg flex justify-center items-center gap-2 hover:bg-blue-700 transition"
//                     onClick={handleLogin}
//                     disabled={loading}
//                 >
//                     {loading ? <BiLoaderCircle className="animate-spin" size={22} /> : "Login"}
//                 </button>

//                 <p className="mt-4 text-center text-gray-600">
//                     Don’t have an account? <a href="#" className="text-blue-500 hover:underline">Create Account</a>
//                 </p>
//             </div>
//             <ToastContainer />
//         </div>
//     );
// };

// export default Login;
