"use client";

import AuthLeft2 from "@/components/auth/AuthLeft2";
import ForgetPasswordRightLayout from "@/components/auth/layout/ForgetPasswordRightLayout";
import { useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import "react-phone-input-2/lib/style.css";
import { toast, ToastContainer } from "react-toastify";
import { BiLoaderCircle, BiLockAlt } from "react-icons/bi";
import axiosInstance from "@/lib/axiosInstance";
import { CheckCircle, XCircle } from "lucide-react";
import CustomInput from "@/components/auth/CustomInput";
import SuccessModal from "@/components/modals/SuccessModal";

interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
}

const ResetPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({
    password: "",
    confirmPassword: ""
  });
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    confirmPassword: ""
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const email = localStorage.getItem("email");
      if (email) {
        setFormData((prevData) => ({ ...prevData, email }));
      }
    }
  }, []);

  // Validate input fields
  const validateInput = (name: string, value: string) => {
    let errorMessage = "";

    if (name === "password") {
      if (!/.{8,}/.test(value)) {
        errorMessage = "Password must be at least 8 characters long";
      }
    }

    if (name === "confirmPassword") {
      if (value !== formData.password) {
        errorMessage = "Passwords do not match";
      }
    }

    setErrors((prev) => ({ ...prev, [name]: errorMessage }));
  };

  // Handle input change
  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    validateInput(name, value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await axiosInstance.post("user/reset-password", formData);

      // Show Success Modal
      setIsSuccessModalVisible(true);
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ||
          "Password reset failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const requirements = [
    { label: "At least 8 characters", regex: /.{8,}/ },
    { label: "At least one uppercase letter", regex: /[A-Z]/ },
    { label: "At least one lowercase letter", regex: /[a-z]/ },
    { label: "At least one number", regex: /[0-9]/ },
    { label: "At least one special character (!@#$%^&*)", regex: /[!@#$%^&*]/ }
  ];

  const validatePassword = (password: string) => {
    const errors = requirements.map((req) => ({
      label: req.label,
      isValid: req.regex.test(password)
    }));

    return errors.every((error) => error.isValid);
  };

  const isFormValid =
    formData.password &&
    formData.confirmPassword &&
    validatePassword(formData.password) &&
    formData.password === formData.confirmPassword &&
    Object.values(errors).every((err) => err === "");

  return (
    <>
      <div className="grid lg:grid-cols-2 min-h-screen relative">
        {/* Left Column */}
        <AuthLeft2 href="/forgotPassword-verification" />

        {/* Right Column */}
        <ForgetPasswordRightLayout>
          <p className="font-bold mb-6 sm:mb-6">Reset your Password</p>

          <form onSubmit={handleSubmit} className="space-y-4 w-full">
            <div className="space-y-6">
              {/* Enter New Password */}
              <div className="w-full mt-4 relative">
                <CustomInput
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter New Password"
                  value={formData.password}
                  onChange={(e: any) =>
                    handleChange("password", e.target.value)
                  }
                  icon={<BiLockAlt size={20} />}
                  className="pl-10"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              {/* Password Requirements */}
              {formData.password && (
                <ul className="mt-2 text-sm">
                  {requirements.map((req, index) => {
                    const isValid = req.regex.test(formData.password);
                    return (
                      <li
                        key={index}
                        className={`flex text-xs items-center gap-2 ${
                          isValid ? "text-green-600" : "text-gray-500"
                        }`}
                      >
                        {isValid ? (
                          <CheckCircle size={14} />
                        ) : (
                          <XCircle size={14} />
                        )}{" "}
                        {req.label}
                      </li>
                    );
                  })}
                </ul>
              )}

              {/* Confirm New Password */}
              <div className="w-full mt-4 relative">
                <CustomInput
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={(e: any) =>
                    handleChange("confirmPassword", e.target.value)
                  }
                  icon={<BiLockAlt size={20} />}
                  className="pl-10"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Reset Password button */}
            <button
              id="submit"
              type="submit"
              className={`button_v1 mb-4 w-full flex justify-center items-center ${
                !isFormValid ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={!isFormValid || isLoading}
              aria-disabled={!isFormValid || isLoading}
            >
              {isLoading ? (
                <BiLoaderCircle
                  className="animate-spin h-6 w-6"
                  aria-hidden="true"
                />
              ) : (
                "Reset Password"
              )}
            </button>
          </form>
        </ForgetPasswordRightLayout>
      </div>

      {/* Success Modal */}
      <SuccessModal
        onClose={() => setIsSuccessModalVisible(false)}
        isVisible={isSuccessModalVisible}
        title="Password has been reset successfully"
        subtitle="You can now proceed to login"
        buttonText="Login"
        route="/login"
      />

      <ToastContainer />
    </>
  );
};

export default ResetPassword;

// "use client";

// import AuthLeft2 from "@/components/auth/AuthLeft2";
// import ForgetPasswordRightLayout from "@/components/auth/layout/ForgetPasswordRightLayout";
// import { useEffect, useState } from "react";
// import { Eye, EyeOff } from "lucide-react";
// import "react-phone-input-2/lib/style.css";
// import { useRouter } from "next-nprogress-bar";
// import { toast, ToastContainer } from "react-toastify";
// import { BiLoaderCircle, BiLockAlt } from "react-icons/bi";
// import axiosInstance from "@/lib/axiosInstance";
// import { CheckCircle, XCircle } from "lucide-react";
// import CustomInput from "@/components/auth/CustomInput";
// import SuccessModal from "@/components/modals/SuccessModal";

// interface FormData {
//   email: string;
//   password: string;
//   confirmPassword: string;
// }
// const ResetPassword = () => {
//   const [showPassword, setShowPassword] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   // const [formData, setFormData] = useState({
//   //   password: "",
//   //   confirmPassword: ""
//   // });

//   const [errors, setErrors] = useState({
//     password: "",
//     confirmPassword: ""
//   });

//   const [formData, setFormData] = useState<FormData>({
//     email:  "",
//     password: "",
//     confirmPassword: "",
//   });

//   const router = useRouter();

//     useEffect(() => {
//       if (typeof window !== "undefined") {
//         const email = localStorage.getItem("email");
//         setFormData.email(email);
//       }

//     }, []);

//   // Validate input fields
//   const validateInput = (name: string, value: string) => {
//     let errorMessage = "";

//     if (name === "password") {
//       if (!/.{8,}/.test(value)) {
//         errorMessage = "Password must be at least 8 characters long";
//       }
//     }

//     if (name === "confirmPassword") {
//       if (value !== formData.password) {
//         errorMessage = "Passwords do not match";
//       }
//     }

//     setErrors((prev) => ({ ...prev, [name]: errorMessage }));
//   };

//   // Password validation checks
//   const requirements = [
//     { label: "At least 8 characters", regex: /.{8,}/ },
//     { label: "At least one uppercase letter", regex: /[A-Z]/ },
//     { label: "At least one lowercase letter", regex: /[a-z]/ },
//     { label: "At least one number", regex: /[0-9]/ },
//     { label: "At least one special character (!@#$%^&*)", regex: /[!@#$%^&*]/ }
//   ];

//   // Handle input change
//   const handleChange = (name: string, value: string) => {
//     setFormData((prev) => ({ ...prev, [name]: value }));
//     validateInput(name, value);
//   };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setIsLoading(true);

//     try {
//       const response = await axiosInstance.post("/reset-password", formData);
//       toast.success(response.data.message || "Password reset successful!");

//       // Redirect to login page
//       router.push("/login");
//     } catch (error: any) {
//       toast.error(
//         error.response?.data?.message ||
//           "Password reset failed. Please try again."
//       );
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const validatePassword = (password: string) => {
//     const errors = requirements.map((req) => ({
//       label: req.label,
//       isValid: req.regex.test(password)
//     }));

//     return errors.every((error) => error.isValid);
//   };

//   const isFormValid =
//     formData.password &&
//     formData.confirmPassword &&
//     validatePassword(formData.password) &&
//     formData.password === formData.confirmPassword &&
//     Object.values(errors).every((err) => err === "");

//   return (
//     <>
//       <div className="grid lg:grid-cols-2 min-h-screen relative">
//         {/* Left Column */}
//         <AuthLeft2 href="/forgotPassword-verification" />

//         {/* Right Column */}
//         <ForgetPasswordRightLayout>
//           <p className="font-bold mb-6 sm:mb-6">Reset your Password</p>

//           <form onSubmit={handleSubmit} className="space-y-4 w-full">
//             <div className="space-y-6">
//               {/* Enter New Password */}
//               <div className="w-full mt-4 relative">
//                 <CustomInput
//                   type={showPassword ? "text" : "password"}
//                   placeholder="Enter New Password"
//                   value={formData.password}
//                   onChange={(e: any) =>
//                     handleChange("password", e.target.value)
//                   }
//                   icon={<BiLockAlt size={20} />}
//                   className="pl-10"
//                 />
//                 <button
//                   type="button"
//                   className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
//                   onClick={() => setShowPassword(!showPassword)}
//                 >
//                   {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//                 </button>
//               </div>

//               {/* Password Requirements */}
//               {(formData.password) && (
//                 <ul className="mt-2 text-sm">
//                   {requirements.map((req, index) => {
//                     const isValid = req.regex.test(formData.password);
//                     return (
//                       <li
//                         key={index}
//                         className={`flex text-xs items-center gap-2 ${
//                           isValid ? "text-green-600" : "text-gray-500"
//                         }`}
//                       >
//                         {isValid ? (
//                           <CheckCircle size={14} />
//                         ) : (
//                           <XCircle size={14} />
//                         )}{" "}
//                         {req.label}
//                       </li>
//                     );
//                   })}
//                 </ul>
//               )}

//               {/* Confirm New Password */}
//               <div className="w-full mt-4 relative">
//                 <CustomInput
//                   type={showPassword ? "text" : "password"}
//                   placeholder="Confirm Password"
//                   value={formData.confirmPassword}
//                   onChange={(e: any) =>
//                     handleChange("confirmPassword", e.target.value)
//                   }
//                   icon={<BiLockAlt size={20} />}
//                   className="pl-10"
//                 />
//                 <button
//                   type="button"
//                   className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
//                   onClick={() => setShowPassword(!showPassword)}
//                 >
//                   {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//                 </button>
//               </div>
//             </div>

//             {/* Reset Password button */}
//             <button
//               id="submit"
//               type="submit"
//               className={`button_v1 mb-4 w-full flex justify-center items-center ${
//                 !isFormValid ? "opacity-50 cursor-not-allowed" : ""
//               }`}
//               disabled={!isFormValid || isLoading}
//               aria-disabled={!isFormValid || isLoading}
//             >
//               {isLoading ? (
//                 <BiLoaderCircle
//                   className="animate-spin h-6 w-6"
//                   aria-hidden="true"
//                 />
//               ) : (
//                 "Reset Password"
//               )}
//             </button>
//           </form>
//         </ForgetPasswordRightLayout>
//         <SuccessModal />
//       </div>
//       <ToastContainer />
//     </>
//   );
// };

// export default ResetPassword;
