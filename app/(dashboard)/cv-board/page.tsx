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
  const [activeFeedbackCategory, setActiveFeedbackCategory] =
    useState<string>("Impact");

  // Modal state
  const [showFixModal, setShowFixModal] = useState<boolean>(false);


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

// import React, { useState } from "react";
// import Head from "next/head";
// import {
//   HiArrowLeft,
//   HiChevronDown,
//   HiUser,
//   HiOutlineLightBulb,
//   HiOutlineCheckCircle,
//   HiOutlineLightningBolt,
//   HiOutlineExclamationCircle,
//   HiOutlineBadgeCheck,
//   HiOutlineArrowNarrowLeft
// } from "react-icons/hi";
// import Nav from "@/components/CVBuilder/Nav";
// import SubHeading from "@/components/CVBuilder/SubHeading";
// import ScoreSection from "@/components/CVBuilder/ScoreSection";

// interface FeedbackItem {
//   id: number;
//   title: string;
//   description: string;
//   icon: JSX.Element;
// }

// // Dummy data for feedback
// const feedbackCategories = {
//   Impact: [
//     {
//       id: 1,
//       title: "Quarterly Impact",
//       description:
//         "You repeated the same metric multiple times; consider condensing.",
//       icon: <HiOutlineLightBulb className="text-xl text-indigo-600" />
//     },
//     {
//       id: 2,
//       title: "Achievement Statement",
//       description: "Describe measurable achievements for better impact.",
//       icon: <HiOutlineCheckCircle className="text-xl text-indigo-600" />
//     }
//   ],
//   Repetition: [
//     {
//       id: 1,
//       title: "Word Repetition",
//       description:
//         'You used "designed" 7 times. Try synonyms like "crafted" or "developed."',
//       icon: <HiOutlineLightningBolt className="text-xl text-indigo-600" />
//     }
//   ],
//   "Action Verbs": [
//     {
//       id: 1,
//       title: "Strong Verbs",
//       description: "Try using stronger action verbs for your accomplishments.",
//       icon: <HiOutlineExclamationCircle className="text-xl text-indigo-600" />
//     }
//   ],
//   Skills: [
//     {
//       id: 1,
//       title: "Skill Placement",
//       description:
//         "Your top skills are hidden in the last section of your resume.",
//       icon: <HiOutlineBadgeCheck className="text-xl text-indigo-600" />
//     }
//   ],
//   Style: [
//     {
//       id: 1,
//       title: "Formatting Consistency",
//       description:
//         "Ensure consistent bullet points and font sizes across sections.",
//       icon: <HiOutlineBadgeCheck className="text-xl text-indigo-600" />
//     }
//   ]
// };

// const CvBoardPage: React.FC = () => {
//   const [activeScoreTab, setActiveScoreTab] = useState<"relevancy" | "overall">(
//     "relevancy"
//   );
//   const [scoreValue, setScoreValue] = useState<number>(95); // Dummy score
//   const [scoreText, setScoreText] = useState<string>("Great"); // e.g., 'Great', 'Decent', etc.

//   const [activeFeedbackCategory, setActiveFeedbackCategory] =
//     useState<string>("Impact");

//   // Modal state
//   const [showFixModal, setShowFixModal] = useState<boolean>(false);

//   // Dummy content for "fix" text area
//   const [fixText, setFixText] = useState<string>(
//     "Led the creation of precise wireframes, user journey, user flow and interactive prototypes for NextJs WebApp. Facilitating effective communication of design concepts and product requirements."
//   );

//   // Toggle Relevancy vs Overall Score
//   const handleScoreTabClick = (tab: "relevancy" | "overall") => {
//     setActiveScoreTab(tab);
//     if (tab === "relevancy") {
//       setScoreValue(95);
//       setScoreText("Great");
//     } else {
//       setScoreValue(71);
//       setScoreText("Decent");
//     }
//   };

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
//         <main className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6 p-4 lg:p-8">
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
//             <div className="bg-white rounded-md shadow flex items-center justify-between p-4">
//               <div className="flex items-center space-x-4">
//                 <img
//                   src="/images/dummy-job-img.png"
//                   alt="Job suggestion"
//                   className="w-16 h-16 object-cover rounded-md"
//                 />
//                 <div>
//                   <h3 className="text-lg font-semibold">
//                     There are over 5000 jobs that suits your resume
//                   </h3>
//                   <p className="text-gray-600 text-sm">
//                     Check out recommended jobs tailored to your skillset.
//                   </p>
//                 </div>
//               </div>
//               <button className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition-colors">
//                 Check it out
//               </button>
//             </div>
//           </div>

//           {/* Right Side - CV Preview */}
//           <div className="bg-white rounded-md shadow p-4">
//             <h2 className="text-lg font-semibold mb-4">Preview</h2>
//             {/* Buttons: Change Resume, Download */}
//             <div className="flex space-x-2 mb-4">
//               <button className="bg-indigo-50 text-indigo-600 px-4 py-2 rounded hover:bg-indigo-100 transition-colors">
//                 Change Resume
//               </button>
//               <button className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition-colors">
//                 Download
//               </button>
//             </div>

//             {/* CV Content Preview */}
//             <div className="overflow-auto h-[600px] border p-4 rounded-md text-sm leading-6 text-gray-700">
//               <h3 className="font-semibold text-lg">Technical Skills</h3>
//               <p className="mb-4">
//                 <span className="bg-green-100 text-green-600 px-1">NextJS</span>
//                 ,
//                 <span className="bg-green-100 text-green-600 px-1">
//                   TypeScript
//                 </span>
//                 ,
//                 <span className="bg-green-100 text-green-600 px-1">
//                   TailwindCSS
//                 </span>
//               </p>

//               <h3 className="font-semibold text-lg mt-4">Work Experience</h3>
//               <div className="space-y-4">
//                 <div>
//                   <h4 className="font-semibold">Chekear Health</h4>
//                   <p className="text-sm text-gray-500 mb-1">
//                     Jan 2021 - Present | Product Management
//                   </p>
//                   <p>
//                     Lorem ipsum{" "}
//                     <span className="bg-green-100 text-green-600 px-1">
//                       product management
//                     </span>
//                     dolor sit amet, consectetur adipiscing elit.
//                     <span className="bg-red-100 text-red-600 px-1">
//                       Sed do eiusmod tempor
//                     </span>
//                     incididunt ut labore et dolore magna aliqua.
//                   </p>
//                 </div>
//                 <div>
//                   <h4 className="font-semibold">Freelancers Guild</h4>
//                   <p className="text-sm text-gray-500 mb-1">
//                     Mar 2019 - Dec 2020 | Product Designer
//                   </p>
//                   <p>
//                     Directed the creation of precise wireframes, user journey,
//                     user flow and interactive prototypes for NextJs WebApp.
//                     <span className="bg-red-100 text-red-600 px-1">
//                       Facilitating effective communication
//                     </span>
//                     of design concepts and product requirements.
//                   </p>
//                 </div>
//                 <div>
//                   <h4 className="font-semibold">Skills Inc</h4>
//                   <p className="text-sm text-gray-500 mb-1">
//                     Jan 2018 - Mar 2019
//                   </p>
//                   <p>
//                     <span className="bg-green-100 text-green-600 px-1">
//                       UI/UX Design
//                     </span>
//                     ,
//                     <span className="bg-red-100 text-red-600 px-1">
//                       Front-End Development
//                     </span>
//                     ,
//                     <span className="bg-green-100 text-green-600 px-1">
//                       Prototyping
//                     </span>
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </main>

//         {/* Fix Modal */}
//         {showFixModal && (
//           <div
//             className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30"
//             role="dialog"
//             aria-modal="true"
//           >
//             <div className="bg-white rounded-md shadow-md w-full max-w-md p-6 relative">
//               <button
//                 onClick={() => setShowFixModal(false)}
//                 className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
//               >
//                 &times;
//               </button>
//               <h3 className="text-lg font-semibold mb-4">Fix your resume</h3>
//               <p className="text-sm text-gray-600 mb-2">
//                 Get professional with AI-generated fix in seconds
//               </p>

//               <textarea
//                 className="w-full border rounded-md p-2 mb-4"
//                 rows={5}
//                 value={fixText}
//                 onChange={(e) => setFixText(e.target.value)}
//               />

//               <div className="bg-gray-100 p-3 rounded-md mb-4">
//                 <h4 className="font-semibold text-sm">Suggested Points</h4>
//                 <ul className="list-disc ml-5 text-sm text-gray-600">
//                   <li>
//                     Directed the creation of precise wireframes, user journey,
//                     user flow and interactive prototypes for NextJs WebApp,
//                     fostering clear communication of design concepts and product
//                     requirements.
//                   </li>
//                   <li>
//                     2 more strong resume bullet points are only for Pro users!{" "}
//                     <button className="text-indigo-600 underline">
//                       Unlock them instantly.
//                     </button>
//                   </li>
//                 </ul>
//               </div>

//               <button
//                 className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition-colors"
//                 onClick={() => setShowFixModal(false)}
//               >
//                 Modify
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default CvBoardPage;

// /* -------------- COMPONENTS -------------- */

// // Header Component
// // const Header: React.FC = () => {
// //   return (
// //     <header className="w-full bg-white shadow-sm px-4 py-3 flex items-center justify-between">
// //       {/* Left: Logo */}
// //       <div className="flex items-center space-x-2">
// //         <div className="w-8 h-8 bg-indigo-600 rounded-full" />
// //         <span className="font-bold text-lg">GetreKrutad</span>
// //       </div>
// //       {/* Center: Nav Links */}
// //       <nav className="hidden md:flex space-x-6">
// //         <button className="flex items-center space-x-1 text-gray-700 hover:text-indigo-600">
// //           <span>Resume</span>
// //           <HiChevronDown />
// //         </button>
// //         <button className="text-gray-700 hover:text-indigo-600">Interview Prep</button>
// //         <button className="text-gray-700 hover:text-indigo-600">Jobs</button>
// //       </nav>
// //       {/* Right: User Profile */}
// //       <div className="flex items-center space-x-2">
// //         <HiUser className="text-2xl text-gray-700" />
// //         <span className="hidden md:inline text-gray-700">Hi Mike</span>
// //       </div>
// //     </header>
// //   );
// // };

// interface FeedbackSectionProps {
//   activeCategory: string;
//   onCategoryChange: (cat: string) => void;
//   showFixModal: () => void;
// }

// const FeedbackSection: React.FC<FeedbackSectionProps> = ({
//   activeCategory,
//   onCategoryChange,
//   showFixModal
// }) => {
//   // We can read from the dummy data
//   const categories = Object.keys(feedbackCategories);

//   return (
//     <div className="bg-white rounded-md shadow p-4">
//       <h2 className="text-lg font-semibold mb-2">Feedback</h2>
//       <p className="text-sm text-gray-600 mb-4">
//         Your resume can improve in the following areas
//       </p>

//       {/* Category Tabs */}
//       <div className="flex flex-wrap space-x-2 mb-4">
//         {categories.map((cat) => (
//           <button
//             key={cat}
//             onClick={() => onCategoryChange(cat)}
//             className={`px-3 py-1 rounded border text-sm ${
//               activeCategory === cat
//                 ? "bg-indigo-600 text-white border-indigo-600"
//                 : "bg-white text-gray-600 border-gray-300 hover:bg-indigo-50"
//             }`}
//           >
//             {cat}
//           </button>
//         ))}
//       </div>

//       {/* Category Content */}
//       <div className="space-y-4">
//         {feedbackCategories[activeCategory]?.map((item: FeedbackItem) => (
//           <div
//             key={item.id}
//             className="flex items-start bg-gray-50 p-3 rounded-md border border-gray-200"
//           >
//             <div className="mr-3">{item.icon}</div>
//             <div className="flex-1">
//               <h4 className="font-semibold text-sm">{item.title}</h4>
//               <p className="text-xs text-gray-600">{item.description}</p>
//             </div>
//             <button
//               className="ml-4 flex items-center space-x-1 text-indigo-600 text-sm hover:text-indigo-800"
//               onClick={showFixModal}
//             >
//               <span>Fix</span>
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };
