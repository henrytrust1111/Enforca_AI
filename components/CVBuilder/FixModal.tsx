"use client";

import React from "react";
import { ArrowLeft, ArrowRight, Close, MagicWand } from "../icons/Icons";

interface FixModalProps {
  closeModal: () => void; // Add a prop to handle closing the modal
}

const FixModal: React.FC<FixModalProps> = ({ closeModal }) => {
  return (
    // Fullscreen overlay
    <div className="fixed h-screen w-screen inset-0 overflow-y-auto z-50 flex items-center justify-center bg-black/50 p-3">
      {/* Modal container */}
      <div className="">
        {/* Grid layout: single column on small screens, two columns on medium+ */}
        <div className="bg-white w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8 rounded-[20px]">
          {/* Left Column */}
          <div className="px-12 pb-8 pt-11">
            <h2 className="text-xl font-bold text-[#4F52FF]">
              Fix your resume
            </h2>
            <p className="text-sm font-light text-[#000316B2] mt-1">
              Get professional with AI-generated fix in 5 seconds
            </p>

            {/* "From your Resume" TextArea */}
            <div className="mt-6">
              <div className="flex items-center justify-between gap-2 py-4 border-b-2 border-[#8F919B1A]">
                <label className="block text-base font-bold text-[#233BC9] mb-2">
                  From your Resume
                </label>
                <div className="flex items-center gap-2">
                  <button className="outline-none">
                    <ArrowLeft width={30} height={30} />
                  </button>
                  <button className="outline-none">
                    <ArrowRight width={30} height={30} />
                  </button>
                </div>
              </div>
              <textarea
                className="w-full h-32 border border-gray-300 rounded-[10px] p-6 no-scrollbar text-sm focus:outline-none focus:border-[#233BC9] mt-4 "
                defaultValue="Led the creation of precise wireframes, user journey, user flow and interactive prototypes for Next's Website, facilitating effective communication of design concepts and product requirements."
              />
            </div>

            {/* Buttons: Modify & Modification History */}
            <div className="flex items-center justify-between mt-4">
              <button className="bg-[#111D63] text-white px-4 md:px-8 lg:px-11 py-2 text-center rounded-[52px] text-sm">
                Modify
              </button>
              <button className="text-[#233BC9] text-sm hover:underline">
                Modification History
              </button>
            </div>
          </div>

          {/* Right Column */}
          <div className="relative sm:rounded-l-[20px] bg-[#F5F6FB] px-12 pb-8 pt-16">
            {/* Close Button */}
            <button
              className="absolute top-6 right-10 outline-none"
              onClick={closeModal} // Call the closeModal function
            >
              <Close width={20} height={20} />
            </button>
            <h3 className="text-base text-[#233BC9] font-bold">
              Suggested Points
            </h3>

            {/* Suggested bullet points */}
            <div className="">
              {/* Bullet 1 */}
              <div className="bg-transparent pr-3 sm:pr-4 py-3 rounded-md border-b-2 border-[#8F919B1A]">
                <p className="text-xs sm:text-sm font-medium text-[#64687C] mb-2">
                  Directed the creation of precise wireframes, user flows, and
                  interactive prototypes for NextX Website, fostering clear
                  communication of design concepts and product needs;
                  instrumental in ensuring effective collaboration among design
                  and development teams.
                </p>
                <button className="flex item-center gap-2 text-[#A3B2C6] hover:text-[#233BC9] text-xs hover:underline">
                  <MagicWand width={15} height={15} /> <span>Use this</span>
                </button>
              </div>

              {/* Bullet 2 */}
              <div className="bg-transparent pr-3 sm:pr-5 py-3 rounded-md border-b-2 border-[#8F919B1A]">
                <p className="text-xs sm:text-sm font-medium text-[#64687C] mb-2">
                  Orchestrated the development of detailed wireframes, user
                  flows, and interactive prototypes for Chekker&apos;s Website,
                  enhancing design communication and aligning with product
                  requirements; facilitated seamless understanding of design
                  concepts and product specifications.
                </p>
                <button className="flex item-center gap-2 text-[#A3B2C6] hover:text-[#233BC9] text-xs hover:underline">
                  <MagicWand width={15} height={15} /> <span>Use this</span>
                </button>
              </div>
            </div>

            {/* Pro-only bullet points message */}
            <p className="text-xs sm:text-sm text-gray-500 mt-4 pr-6 sm:pr-20">
              2 more strong resume bullet points were generated. But they&apos;re for
              Pro users only.{" "}
              <span className="font-bold text-[#233BC9]">
                Unlock them instantly.
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FixModal;


















// "use client";

// import React from "react";
// import { ArrowLeft, ArrowRight, Close, MagicWand } from "../icons/Icons";

// const FixModal: React.FC = () => {
//   return (
//     // Fullscreen overlay
//     <div className="fixed h-screen w-screen inset-0 overflow-y-auto z-50 flex items-center justify-center bg-black/50 p-3">
//       {/* Modal container */}
//       <div className="">
//         {/* Grid layout: single column on small screens, two columns on medium+ */}
//         <div className="bg-white w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8 rounded-[20px]">
//           {/* Left Column */}
//           <div className="px-12 pb-8 pt-11">
//             <h2 className="text-xl font-bold text-[#4F52FF]">
//               Fix your resume
//             </h2>
//             <p className="text-sm font-light text-[#000316B2] mt-1">
//               Get professional with AI-generated fix in 5 seconds
//             </p>

//             {/* "From your Resume" TextArea */}
//             <div className="mt-6">
//               <div className="flex items-center justify-between gap-2 py-4 border-b-2 border-[#8F919B1A]">
//                 <label className="block text-base font-bold text-[#233BC9] mb-2">
//                   From your Resume
//                 </label>
//                 <div className="flex items-center gap-2">
//                   <button className="outline-none">
//                     <ArrowLeft width={30} height={30} />
//                   </button>
//                   <button className="outline-none">
//                     <ArrowRight width={30} height={30} />
//                   </button>
//                 </div>
//               </div>
//               <textarea
//                 className="w-full h-32 border border-gray-300 rounded-[10px] p-6 no-scrollbar text-sm focus:outline-none focus:border-[#233BC9] mt-4 "
//                 defaultValue="Led the creation of precise wireframes, user journey, user flow and interactive prototypes for Next's Website, facilitating effective communication of design concepts and product requirements."
//               />
//             </div>

//             {/* Buttons: Modify & Modification History */}
//             <div className="flex items-center justify-between mt-4">
//               <button className="bg-[#111D63] text-white px-4 md:px-8 lg:px-11 py-2 text-center rounded-[52px] text-sm">
//                 Modify
//               </button>
//               <button className="text-[#233BC9] text-sm hover:underline">
//                 Modification History
//               </button>
//             </div>
//           </div>

//           {/* Right Column */}
//           <div className="relative sm:rounded-l-[20px] bg-[#F5F6FB] px-12 pb-8 pt-16">
//             <button className="absolute top-6 right-10 outline-none">
//               <Close width={20} height={20} />
//             </button>
//             <h3 className="text-base text-[#233BC9] font-bold">
//               Suggested Points
//             </h3>

//             {/* Suggested bullet points */}
//             <div className="">
//               {/* Bullet 1 */}
//               <div className="bg-transparent pr-3 sm:pr-4 py-3 rounded-md border-b-2 border-[#8F919B1A]">
//                 <p className="text-xs sm:text-sm font-medium text-[#64687C] mb-2">
//                   Directed the creation of precise wireframes, user flows, and
//                   interactive prototypes for NextX Website, fostering clear
//                   communication of design concepts and product needs;
//                   instrumental in ensuring effective collaboration among design
//                   and development teams.
//                 </p>
//                 <button className="flex item-center gap-2 text-[#A3B2C6] hover:text-[#233BC9] text-xs hover:underline">
//                   <MagicWand width={15} height={15} /> <span>Use this</span>
//                 </button>
//               </div>

//               {/* Bullet 2 */}
//               <div className="bg-transparent pr-3 sm:pr-5 py-3 rounded-md border-b-2 border-[#8F919B1A]">
//                 <p className="text-xs sm:text-sm font-medium text-[#64687C] mb-2">
//                   Orchestrated the development of detailed wireframes, user
//                   flows, and interactive prototypes for Chekker&apos;s Website,
//                   enhancing design communication and aligning with product
//                   requirements; facilitated seamless understanding of design
//                   concepts and product specifications.
//                 </p>
//                 <button className="flex item-center gap-2 text-[#A3B2C6] hover:text-[#233BC9] text-xs hover:underline">
//                   <MagicWand width={15} height={15} /> <span>Use this</span>
//                 </button>
//               </div>
//             </div>

//             {/* Pro-only bullet points message */}
//             <p className="text-xs sm:text-sm text-gray-500 mt-4 pr-6 sm:pr-20">
//               2 more strong resume bullet points were generated. But they&apos;re for
//               Pro users only.{" "}
//               <span className="font-bold text-[#233BC9]">
//                 Unlock them instantly.
//               </span>
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FixModal;
