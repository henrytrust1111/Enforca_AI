"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import "react-phone-input-2/lib/style.css";
import { useRouter } from "next-nprogress-bar";
import { toast, ToastContainer } from "react-toastify";
import { BiLoaderCircle, BiEnvelope, BiLockAlt } from "react-icons/bi";
import AuthLeft from "@/components/auth/AuthLeft";
import SocialSignup from "@/components/auth/SocialSignup";
import axiosInstance from "@/lib/axiosInstance";
import { CheckCircle, XCircle } from "lucide-react";
// import Cookies from "js-cookie";
import ContinueWithEmail from "@/components/auth/ContinueWithEmail";
import { Logo2 } from "@/components/icons/Icons";
import PhoneNumberInput from "@/components/auth/PhoneNumberInput";
import CustomInput from "@/components/auth/CustomInput";

const Signup: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: ""
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  });

  const router = useRouter();

  // Validate input fields
  const validateInput = (name: string, value: string) => {
    let errorMessage = "";

    if (name === "firstName" || name === "lastName") {
      if (!/^[A-Za-z]+$/.test(value)) {
        errorMessage = "Only letters are allowed";
      }
    }

    if (name === "email") {
      if (!/^\S+@\S+\.\S+$/.test(value)) {
        errorMessage = "Enter a valid email address";
      }
    }

    setErrors((prev) => ({ ...prev, [name]: errorMessage }));
  };

  // Password validation checks
  const requirements = [
    { label: "At least 8 characters", regex: /.{8,}/ },
    { label: "At least one uppercase letter", regex: /[A-Z]/ },
    { label: "At least one lowercase letter", regex: /[a-z]/ },
    { label: "At least one number", regex: /[0-9]/ },
    { label: "At least one special character (!@#$%^&*)", regex: /[!@#$%^&*]/ }
  ];

  // Handle input change
  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    validateInput(name, value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axiosInstance.post("user/signup", formData);
      toast.success(response.data.message || "Signup successful!");
      localStorage.setItem("email", formData.email);

      // Cookies.set("email", formData.email, { expires: 1, path: "/" }); // expire in one day

      // Redirect to OTP verification page
      router.push("/otp-verification");
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Signup failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const validatePassword = (password: string) => {
    const errors = requirements.map((req) => ({
      label: req.label,
      isValid: req.regex.test(password)
    }));

    return errors.every((error) => error.isValid);
  };

  const isFormValid =
    formData.firstName &&
    formData.lastName &&
    formData.email &&
    formData.phoneNumber &&
    formData.password &&
    validatePassword(formData.password) &&
    Object.values(errors).every((err) => err === "");

  return (
    <div className="grid lg:grid-cols-2 min-h-screen">
      {/* Left Section (Image & Text) */}
      <AuthLeft />

      {/* Right Section (Signup Form) */}
      <div className="flex flex-col h-screen sm:h-full items-center sm:justify-center sm:p-6 md:bg-white">
        <div className="w-full max-w-sm bg-[#F4F8FD] sm:bg-transparent">
          <div className="sm:text-center flex flex-col sm:items-center text-black-100 gap-12 p-6 sm:p-0">
            {/* Logo */}
            <div
              onClick={() => router.push("/")}
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

            {/* Signup Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-6">
                {/* Email */}
                <div className="w-full mt-4">
                  <CustomInput
                    type="email"
                    placeholder="Enter your email"
                    className="pl-10"
                    value={formData.email}
                    onChange={(e: any) => handleChange("email", e.target.value)}
                    icon={<BiEnvelope size={20} />}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm">{errors.email}</p>
                  )}
                </div>

                {/* FirstName & LastName */}
                <div className="grid md:grid-cols-2 gap-4">
                  {/* firstName */}
                  <div className="w-full mt-4">
                    <CustomInput
                      type="text"
                      placeholder="First Name"
                      value={formData.firstName}
                      onChange={(e: any) =>
                        handleChange("firstName", e.target.value)
                      }
                    />
                    {errors.firstName && (
                      <p className="text-red-500 text-sm">{errors.firstName}</p>
                    )}
                  </div>

                  {/* lastName */}
                  <div className="w-full mt-4">
                    <CustomInput
                      type="text"
                      placeholder="Last Name"
                      value={formData.lastName}
                      onChange={(e: any) =>
                        handleChange("lastName", e.target.value)
                      }
                    />
                    {errors.lastName && (
                      <p className="text-red-500 text-sm">{errors.lastName}</p>
                    )}
                  </div>
                </div>

                {/* Phone Number */}
                <div className="mb-4">
                  <PhoneNumberInput
                    onPhoneChange={(value: string) =>
                      handleChange("phoneNumber", value)
                    }
                  />
                </div>

                {/* Password */}
                <div className="w-full mt-4 relative">
                  <CustomInput
                    type={showPassword ? "text" : "password"}
                    placeholder="Create Password"
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
              </div>

              {/* Create account button */}
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
                  "Create Account"
                )}
              </button>
              <p
                onClick={() => router.push("/login")}
                className="text-center text-sm mt-4 cursor-pointer"
              >
                Login Instead
              </p>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer role="alert" />
    </div>
  );
};

export default Signup;

// "use client";

// import { useState } from "react";
// import { RxEyeClosed, RxEyeOpen } from "react-icons/rx";
// import { useRouter } from "next-nprogress-bar";
// import { toast, ToastContainer } from "react-toastify";
// import PhoneInput from "react-phone-input-2";
// import "react-phone-input-2/lib/style.css";
// import "react-toastify/dist/ReactToastify.css";
// import { BiEnvelope, BiLoaderCircle, BiLockAlt } from "react-icons/bi";
// import axiosInstance from "@/lib/axiosInstance";
// import SocialSignup from "@/components/auth/SocialSignup";
// import AuthLeft from "@/components/auth/AuthLeft";
// import { Logo2 } from "@/components/icons/Icons";
// import ContinueWithEmail from "@/components/auth/ContinueWithEmail";
// import CustomInput from "@/components/auth/CustomInput";

// const Signup: React.FC = () => {
//   const [showPassword, setShowPassword] = useState(false);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const router = useRouter();

//   const handleLogin = async () => {
//     if (!email || !password) {
//       toast.error("Email and password are required!");
//       return;
//     }

//     try {
//       setLoading(true);
//       const response = await axiosInstance.post("/login", { email, password });

//       toast.success("Login successful!");
//       localStorage.setItem("authToken", response.data.token);
//       // router.push("/dashboard");
//     } catch (error: any) {
//       if (error.response?.status === 403) {
//         localStorage.setItem("email", email);
//         toast.error(
//           error.response?.data?.message ||
//             "User not verified. Please verify OTP first"
//         );
//         setTimeout(() => {
//           router.push("/otp-verification");
//         }, 3000);
//       } else {
//         toast.error(
//           error.response?.data?.message || "Login failed. Try again."
//         );
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   function handleClick() {
//     router.push("/"); // Redirect to home page on logo click
//   }

//   return (
//     <div className="grid lg:grid-cols-2 min-h-screen">
//       {/* Left Section (Image & Text) */}
//       <AuthLeft />

//       {/* Right Section (Login Form) */}
//       <div className="flex flex-col h-screen sm:h-full items-center sm:justify-center sm:p-6 md:bg-white">
//         <div className="w-full max-w-sm bg-[#F4F8FD] sm:bg-transparent">
//           <div className="sm:text-center flex flex-col sm:items-center text-black-100 gap-12 p-6 sm:p-0">
//             {/* Logo */}
//             <div
//               onClick={handleClick}
//               className="flex items-center space-x-2 w-max cursor-pointer"
//             >
//               <Logo2 width={35} height={35} />
//               <span className="text-base md:text-xl mt-2 font-bold">
//                 GetreKruitd
//               </span>
//             </div>
//             <div className="">
//               <h2 className="text-xl font-bold">Create Account</h2>
//               <p className="text-gray-500 text-sm">
//                 Your Dream Job Awaits - Let&apos;s Get Started
//               </p>
//             </div>
//           </div>

//           {/* Social Signup Buttons */}
//           <div className="rounded-t-[40px] sm:rounded-t-none p-4 sm:p-0 mt-3 sm:mt-0 bg-white">
//             {/* Social Logins */}
//             <SocialSignup />

//             {/* Continue with email */}
//             <ContinueWithEmail />

//             {/* Login Form */}
//             <div className="space-y-4">
//               <div className="space-y-6">
//                 {/* Email */}
//                 <div className="w-full mt-4">
//                   {/* <div className="relative w-full ">
//                     <label className="absolute block text-gray-700 font-medium text-xs -top-2 left-2 bg-white px-1">
//                       Email Address
//                     </label>
//                     <BiEnvelope
//                       className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
//                       size={20}
//                     />
//                     <input
//                       type="email"
//                       className="w-full pl-10 p-3 border border-gray-300 focus:outline-blue-500 rounded-[8px]"
//                       placeholder="Enter your email"
//                       value={email}
//                       onChange={(e:any) => setEmail(e.target.value)}
//                     />
//                   </div> */}

//                   <CustomInput
//                     type="email"
//                     placeholder="Enter your email"
//                     value={email}
//                     onChange={(e:any) => setEmail(e.target.value)}
//                   />
//                 </div>

//                 {/* FirstName $ LastName */}
//                 <div className="grid md:grid-cols-2 gap-4">
//                   {/* firstName */}
//                   <div className="w-full mt-4">
//                     <div className="relative w-full ">
//                       <label className="absolute block text-gray-700 font-medium text-xs -top-2 left-2 bg-white px-1">
//                         First Name
//                       </label>
//                       <input
//                         type="text"
//                         name="firstName"
//                         id="firstName"
//                         className="w-full p-3 border border-gray-300 focus:outline-blue-500 rounded-[8px]"
//                         placeholder=" First Name"
//                         value={email}
//                         onChange={(e:any) => setEmail(e.target.value)}
//                       />
//                     </div>
//                   </div>

//                   {/* lastName */}
//                   <div className="w-full mt-4">
//                     <div className="relative w-full ">
//                       <label className="absolute block text-gray-700 font-medium text-xs -top-2 left-2 bg-white px-1">
//                         Last Name
//                       </label>
//                       <input
//                         type="text"
//                         name="lastName"
//                         id="lastName"
//                         className="w-full p-3 border border-gray-300 focus:outline-blue-500 rounded-[8px]"
//                         placeholder="Last Name"
//                         value={email}
//                         onChange={(e:any) => setEmail(e.target.value)}
//                       />
//                     </div>
//                   </div>
//                 </div>

//                 {/* Phone Number */}
//                 <div className="mb-4">
//                   <PhoneInput
//                     country={"ng"}
//                     inputClass="!w-full !py-6 !rounded-[12px] !border-gray-300 !focus:outline-none !focus:ring-2 !focus:ring-gray-300"
//                     buttonClass="!border-gray-300 !px-1 !rounded-l-[12px]"
//                   />
//                 </div>
//                 <div className="w-full mt-4">
//                   <div className="relative w-full">
//                     <label className="absolute block text-gray-700 font-medium text-xs -top-2 left-2 bg-white px-1">
//                       Password
//                     </label>
//                     <BiLockAlt
//                       className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
//                       size={20}
//                     />
//                     <input
//                       type={showPassword ? "text" : "password"}
//                       className="w-full pl-10 p-3 border border-gray-300 rounded-[8px] focus:outline-blue-500"
//                       placeholder="Create Password"
//                       value={password}
//                       onChange={(e:any) => setPassword(e.target.value)}
//                     />
//                     <button
//                       className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
//                       onClick={() => setShowPassword(!showPassword)}
//                     >
//                       {showPassword ? (
//                         <RxEyeOpen size={20} />
//                       ) : (
//                         <RxEyeClosed size={20} />
//                       )}
//                     </button>
//                   </div>
//                 </div>
//               </div>

//               {/* Create account button */}
//               <button
//                 className="!mt-6 button_v1 w-full flex justify-center items-center"
//                 onClick={handleLogin}
//                 // disabled={loading}
//                 disabled={true}
//               >
//                 {loading ? (
//                   <BiLoaderCircle className="animate-spin mr-2" size={22} />
//                 ) : (
//                   "Create Account"
//                 )}
//               </button>
//               <p
//                 onClick={() => router.push("/login")}
//                 className="text-center text-sm mt-4 cursor-pointer"
//               >
//                 Login Instead
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//       <ToastContainer />
//     </div>
//   );
// };

// export default Signup;
