import React from "react";
import { Padlock } from "../icons/Icons";

interface AuthLeft2Props {
  href?: string;
  resetText?: string;
}

const AuthLeft2: React.FC<AuthLeft2Props> = ({
  href = "/login",
  resetText = "Reset your password",
}) => {
  return (
    <div className="relative flex flex-col p-6 bg-white">
      {/* Go Back */}
      <a
        href={href}
        className="absolute top-5 left-5 sm:top-10 sm:left-10 cursor-pointer hover:underline hover:underline-offset-2 hover:text-primary"
      >
        Go Back
      </a>

      {/* Lock Icon + Heading */}
      <div className="flex flex-col items-center justify-center flex-1">
        <div className="hidden sm:block">
          <Padlock width={300} height={300} />
        </div>
        <div className="sm:hidden">
          <Padlock width={100} height={100} />
        </div>
        <h1 className="font-bold text-2xl sm:text-4xl text-primary mb-2">
          Forgot Password?
        </h1>
        <p className="font-medium text-center">{resetText}</p>
      </div>
    </div>
  );
};

export default AuthLeft2;




















// import React from "react";
// import { Padlock } from "../icons/Icons";

// const AuthLeft2 = () => {
//   return (
//     <div className="relative flex flex-col p-6 bg-white">
//       {/* Go Back */}
//       <a href="" className="absolute top-5 left-5 sm:top-10 sm:left-10 cursor-pointer hover:underline hover:underline-offset-2 hover:text-primary">
//         Go Back
//       </a>

//       {/* Lock Icon + Heading */}
//       <div className="flex flex-col items-center justify-center flex-1">
//         <div className="hidden sm:block">
//           <Padlock width={300} height={300} />
//         </div>
//         <div className="sm:hidden">
//           <Padlock width={100} height={100} />
//         </div>
//         <h1 className="font-bold text-2xl sm:text-4xl text-primary mb-2">
//           Forgot Password?
//         </h1>
//         <p className="font-medium text-center">Reset your password</p>
//       </div>
//     </div>
//   );
// };

// export default AuthLeft2;
