// Updated SubHeading component
import React from "react";
import LoadingState from "@/components/modals/LoadingState";
import { useMyContext } from "@/context";

const SubHeading = () => {
  const { triggerAutoFix, isLoading } = useMyContext();

  return (
    <div className="px-6 md:px-8 lg:px-20 py-3 flex items-center justify-between">
      <h1 className="text-xl font-semibold">My CV Board</h1>
      <div className="grid sm:grid-cols-2 gap-6">
        <button className="button_v3">My Tailored Job</button>
        <button 
          className="button_v4 justify-center" 
          onClick={triggerAutoFix}
        >
          Auto Fix All
        </button>
      </div>
      {isLoading && <LoadingState />}
    </div>
  );
};

export default SubHeading;








// import React from "react";

// const   SubHeading = () => {
//   return (
//     <div className="px-6 md:px-8 lg:px-20 py-3 flex items-center justify-between">
//       <h1 className="text-xl font-semibold">My CV Board</h1>
//       {/* Navigation Buttons */}
//       <div className="grid sm:grid-cols-2 gap-6">
//         <button className="button_v3">My Tailored Job</button>
//         <button className={`button_v4 justify-center`}>
//           Auto Fix All
//         </button>
//       </div>
//     </div>
//   );
// };

// export default SubHeading;
