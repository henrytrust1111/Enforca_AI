"use client";

import AuthLeft from "@/components/auth/AuthLeft";
import { useRouter } from "next-nprogress-bar";
import { Done, Logo2 } from "@/components/icons/Icons";

// This is the page that displays when a user successfully creates an account
const AccountCreated = () => {
  const router = useRouter();

  // handle proceed click
  function handleClick() {
    router.push("/login"); // Redirect to login page on button click
  }

  return (
    <div className="grid lg:grid-cols-2 min-h-screen">
      {/* Left Section (Image & Text) */}
      <AuthLeft />

      {/* Right Section (Login Form) */}
      <div className="flex flex-col h-screen sm:h-full items-center sm:justify-center sm:p-6 md:bg-white">
        <div className="relativew-full max-w-sm bg-[#F4F8FD] sm:bg-transparent">
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

          {/* Display */}
          <div className="rounded-t-[40px] sm:rounded-t-none flex flex-col items-center p-4 sm:p-0 mt-3 sm:mt-0 bg-white space-y-12 gap-12">
            {/* The Gif image that shows done */}
            <div className="">
              <Done width={100} height={100} />
            </div>
            <div className="space-y-6 w-full flex flex-col items-center">
              {/* Congratulatory messaege */}
              <div className="text-black-100 text-lg sm:text-2xl text-center font-bold">
                Congratulations, your account has been created successfully!
              </div>
              <p className="text-xm text-[#8F919B] text-center">
                Kickstart Your Dream Career Journey
              </p>

              {/* button that takes the users to the login page */}
              <button
                onClick={() => handleClick()}
                className="button_v1 w-full justify-center"
              >
                Proceed
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountCreated;
