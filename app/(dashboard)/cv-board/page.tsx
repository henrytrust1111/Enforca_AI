"use client";

import React, { useState } from "react";
import Head from "next/head";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import Nav from "@/components/CVBuilder/Nav";
import SubHeading from "@/components/CVBuilder/SubHeading";
import FeedbackSection from "@/components/CVBuilder/FeedbackSection";
import ScoreSection from "@/components/CVBuilder/ScoreSection";
import FixModal from "@/components/CVBuilder/FixModal";
import CTA from "@/components/CVBuilder/CTA";
import CV_Preview from "@/components/CVBuilder/CV_Preview";

const CvBoardPage: React.FC = () => {
  // const router = useRouter();
  const [activeFeedbackCategory, setActiveFeedbackCategory] = useState<string>("Impact");

  // Modal state
  const [showFixModal, setShowFixModal] = useState<boolean>(false);

  // useEffect(() => {
  //   const cvData = localStorage.getItem("cvData");
  //   if (!cvData) {
  //     router.push("/need-assessment");
  //   }
  // }, [router]);

  return (
    <>
      <Head>
        <title>My CV Board - GetreKrutad</title>
        <meta
          name="description"
          content="CV Board page to review and improve your resume."
        />
      </Head>

      {/* Main Container */}
      <div className="min-h-screen flex flex-col">
        {/* Header */}
        <Nav />

        {/* SubHeader with Back Button */}
        <div className="px-6 md:px-8 lg:px-20 py-3 flex items-center justify-between mt-24">
          <button className="flex items-center space-x-2 text-[#111D63] transition-colors">
            <HiOutlineArrowNarrowLeft className="text-2xl" />
            <span>Back</span>
          </button>
        </div>

        {/* Another subHeader: My CV Board, My Tailored Job, Auto Fix All */}
        <SubHeading />

        {/* Main Body */}
        <main className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6 p-4 lg:p-8 px-6 md:px-8 lg:px-20 gap-11">
          {/* Left Side */}
          <div className="space-y-6">
            {/* Score Section */}
            <ScoreSection />

            {/* Feedback Section */}
            <FeedbackSection
              activeCategory={activeFeedbackCategory}
              onCategoryChange={(cat) => setActiveFeedbackCategory(cat)}
              showFixModal={() => setShowFixModal(true)}
            />

            {/* CTA / Jobs Section */}
            <CTA />
          </div>

          {/* Right Side - CV Preview */}
          <CV_Preview />
        </main>

        {/* Fix Modal */}
        {showFixModal && <FixModal />}
      </div>
    </>
  );
};

export default CvBoardPage;































// "use client";

// import React, { useEffect, useState } from "react";
// import Head from "next/head";
// import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
// import Nav from "@/components/CVBuilder/Nav";
// import SubHeading from "@/components/CVBuilder/SubHeading";
// import FeedbackSection from "@/components/CVBuilder/FeedbackSection";
// import ScoreSection from "@/components/CVBuilder/ScoreSection";
// import FixModal from "@/components/CVBuilder/FixModal";
// import CTA from "@/components/CVBuilder/CTA";
// import CV_Preview from "@/components/CVBuilder/CV_Preview";

// const CvBoardPage: React.FC = () => {
//   const [activeFeedbackCategory, setActiveFeedbackCategory] = useState<string>("Impact");

//   // Modal state
//   const [showFixModal, setShowFixModal] = useState<boolean>(false);

//   useEffect(() => {
    
//   }, []);


//   return (
//     <>
//       <Head>
//         <title>My CV Board - GetreKrutad</title>
//         <meta
//           name="description"
//           content="CV Board page to review and improve your resume."
//         />
//       </Head>

//       {/* Main Container */}
//       <div className="min-h-screen flex flex-col">
//         {/* Header */}
//         <Nav />

//         {/* SubHeader with Back Button */}
//         <div className="px-6 md:px-8 lg:px-20 py-3 flex items-center justify-between mt-24">
//           <button className="flex items-center space-x-2 text-[#111D63] transition-colors">
//             <HiOutlineArrowNarrowLeft className="text-2xl" />
//             <span>Back</span>
//           </button>
//         </div>

//         {/* Another subHeader: My CV Board, My Tailored Job, Auto Fix All */}
//         <SubHeading />

//         {/* Main Body */}
//         <main className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6 p-4 lg:p-8 px-6 md:px-8 lg:px-20 gap-11">
//           {/* Left Side */}
//           <div className="space-y-6">
//             {/* Score Section */}
//             <ScoreSection />

//             {/* Feedback Section */}
//             <FeedbackSection
//               activeCategory={activeFeedbackCategory}
//               onCategoryChange={(cat) => setActiveFeedbackCategory(cat)}
//               showFixModal={() => setShowFixModal(true)}
//             />

//             {/* CTA / Jobs Section */}
//             <CTA />
//           </div>

//           {/* Right Side - CV Preview */}
//           <CV_Preview />  
//         </main>

//         {/* Fix Modal */}
//         {showFixModal && <FixModal />}
//       </div>
//     </>
//   );
// };

// export default CvBoardPage;
