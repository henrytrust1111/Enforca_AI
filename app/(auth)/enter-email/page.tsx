"use client";

import AuthLeft2 from "@/components/auth/AuthLeft2";
import ForgetPasswordRightLayout from "@/components/auth/layout/ForgetPasswordRightLayout";
import React, { useState } from "react";
import { useRouter } from "next-nprogress-bar";
import { toast, ToastContainer } from "react-toastify";
import axiosInstance from "@/lib/axiosInstance";
import { BiEnvelope, BiLoaderCircle } from "react-icons/bi";
import CustomInput from "@/components/auth/CustomInput";

const EnterMail = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const router = useRouter();

  const validateEmail = (email: string) => {
    const emailRegex = /^\S+@\S+\.\S+$/;
    return emailRegex.test(email);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const emailValue = e.target.value;
    setEmail(emailValue);
    if (!validateEmail(emailValue)) {
      setError("Please enter a valid email address");
      setIsEmailValid(false);
    } else {
      setError("");
      setIsEmailValid(true);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setIsLoading(true);

    try {
      const response = await axiosInstance.post("user/forgot-password", { email });
      toast.success(response.data.message || "Email sent successfully!");

      // Redirect to forgotPassword-verification page
      router.push("/forgotPassword-verification");
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Failed to send email. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid lg:grid-cols-2 min-h-screen">
      {/* Left Column */}
      <AuthLeft2 href="/forgot-password" />

      {/* Right Column */}
      <ForgetPasswordRightLayout>
        <p className="font-medium mb-6 sm:mb-6">
          Enter the email associated with your account
        </p>

        <form
          onSubmit={handleSubmit}
          className="w-full space-y-16 sm:space-y-6 mt-4 sm:mt-12"
        >
          <CustomInput
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={handleChange}
            icon={<BiEnvelope size={20} />}
            className="pl-10"
            classNameLabel="!bg-[F5F6FB]"
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className={`w-full button_v1 justify-center ${
              isLoading || !isEmailValid ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isLoading || !isEmailValid}
            aria-disabled={isLoading || !isEmailValid}
          >
            {isLoading ? (
              <BiLoaderCircle
                className="animate-spin h-6 w-6"
                aria-hidden="true"
              />
            ) : (
              "Proceed"
            )}
          </button>
        </form>
        <ToastContainer />
      </ForgetPasswordRightLayout>
    </div>
  );
};

export default EnterMail;













// import AuthLeft2 from "@/components/auth/AuthLeft2";
// import ForgetPasswordRightLayout from "@/components/auth/layout/ForgetPasswordRightLayout";
// import React from "react";

// const EnterMail = () => {
//   return (
//     <div className="grid lg:grid-cols-2 min-h-screen">
//       {/* Left Column */}
//       <AuthLeft2 href="/forgot-password" />

//       {/* Right Column */}
//       <ForgetPasswordRightLayout>
//         <p className="font-medium mb-6 sm:mb-6">
//           Enter the email associated with your account
//         </p>

//         <form className="w-full space-y-16 sm:space-y-6 mt-4 sm:mt-12">
//           <input
//             type="email"
//             className="w-full p-3 border border-gray-300 focus:outline-blue-500 rounded-[8px]"
//             placeholder="Email Address"
//           />

//           <button className="w-full button_v1 justify-center">Proceed</button>
//         </form>
//       </ForgetPasswordRightLayout>
//     </div>
//   );
// };

// export default EnterMail;
