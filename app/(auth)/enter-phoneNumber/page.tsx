"use client";

import AuthLeft2 from "@/components/auth/AuthLeft2";
import ForgetPasswordRightLayout from "@/components/auth/layout/ForgetPasswordRightLayout";
import PhoneNumberInput from "@/components/auth/PhoneNumberInput";
import React, { useState } from "react";

const EnterPhoneNumber = () => {
  const [formData, setFormData] = useState({
    phoneNumber: ""
  });

  console.log(formData);

  // Handle input change
  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <div className="grid lg:grid-cols-2 min-h-screen">
      {/* Left Column */}
      <AuthLeft2 href="/forgot-password" />

      {/* Right Column */}
      <ForgetPasswordRightLayout>
        <p className="font-medium sm:mb-6">
          Enter the phone number associated with your account
        </p>

        <form className="w-full space-y-16 sm:space-y-6 mt-4 sm:mt-12">
          <PhoneNumberInput
            onPhoneChange={(value: string) =>
              handleChange("phoneNumber", value)
            }
          />

          <button className="w-full button_v1 justify-center">Proceed</button>
        </form>
      </ForgetPasswordRightLayout>
    </div>
  );
};

export default EnterPhoneNumber;
