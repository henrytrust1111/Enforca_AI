import React from "react";

const ForgetPasswordRightLayout = ({
  children
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="rounded-t-[30px] sm:rounded-l-[60px] bg-[#F5F6FB] flex justify-center p-6">
      <div className="w-full max-w-sm flex flex-col sm:justify-center">{children}</div>
    </div>
  );
};

export default ForgetPasswordRightLayout;
