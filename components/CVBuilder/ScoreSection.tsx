"use client";
import React, { useEffect, useState } from "react";

/**
 * For a circle of radius 30, the circumference is ~188.5
 * strokeDasharray and strokeDashoffset use that to show progress.
 */
const CIRCUMFERENCE = 188.5;

const ScoreSection = () => {
  const [activeScoreTab, setActiveScoreTab] = useState<"relevancy" | "overall">(
    "relevancy"
  );
  const [scoreValue, setScoreValue] = useState<number>(0); // Initialize with 0
  const [scoreText, setScoreText] = useState<string>(""); // Initialize with empty string
  const [resumeScores, setResumeScores] = useState<number>(0);
  const [relevantScores, setRelevantScores] = useState<number>(0);

  useEffect(() => {
    const cvData = JSON.parse(localStorage.getItem("cvData") || "{}");
    const scores = cvData.resumeScores || {};
    setResumeScores(scores.overallResumeScore || 0);
    setRelevantScores(scores.relevancyScore || 0);

    // Set initial score values based on the active tab
    if (activeScoreTab === "relevancy") {
      setScoreValue(scores.relevancyScore || 0);
      setScoreText(getScoreText(scores.relevancyScore || 0));
    } else {
      setScoreValue(scores.overallResumeScore || 0);
      setScoreText(getScoreText(scores.overallResumeScore || 0));
    }
  }, [activeScoreTab]);

  // Toggle Relevancy vs Overall Score
  const handleScoreTabClick = (tab: "relevancy" | "overall") => {
    setActiveScoreTab(tab);
    if (tab === "relevancy") {
      setScoreValue(relevantScores);
      setScoreText(getScoreText(relevantScores));
    } else {
      setScoreValue(resumeScores);
      setScoreText(getScoreText(resumeScores));
    }
  };

  // Dynamically pick color for the circular progress
  const getProgressColor = () => {
    if (scoreValue >= 80) {
      return "text-[#11E8D4]"; // Great
    } else if (scoreValue >= 60) {
      return "text-[#E8AC11]"; // Decent
    } else if (scoreValue >= 40) {
      return "text-[#E81111]"; // Poor
    } else if (scoreValue >= 20) {
      return "text-[#FF5733]"; // Very Poor
    }
    return "text-[#C70039]"; // Default to Very Poor
  };

  // Get score text based on the score value
  const getScoreText = (score: number) => {
    if (score >= 80) {
      return "Great";
    } else if (score >= 60) {
      return "Decent";
    } else if (score >= 40) {
      return "Poor";
    } else if (score >= 20) {
      return "Very Poor";
    }
    return "Very Poor";
  };

  return (
    <div className="w-full overflow-hidden">
      {/* Score Tabs */}
      <div className="flex space-x-4">
        <button
          onClick={() => handleScoreTabClick("relevancy")}
          className={`rounded-t-[10px] px-6 py-3 text-sm font-bold outline-none
            ${
              activeScoreTab === "relevancy"
                ? "text-[#4042E2] bg-white border-t border-x border-[#8F919B33]"
                : "border-none text-[#A3B2C6] bg-[#E6EDFF]"
            } transition-colors`}
        >
          Relevancy Score
        </button>

        <button
          onClick={() => handleScoreTabClick("overall")}
          className={`rounded-t-[10px] px-6 py-3 text-sm font-bold outline-none
            ${
              activeScoreTab === "overall"
                ? "text-[#4042E2] bg-white border-t border-x border-[#8F919B33]"
                : "border-none text-[#A3B2C6] bg-[#E6EDFF]"
            } transition-colors`}
        >
          Overall Resume Score
        </button>
      </div>

      {/* Main Body */}
      <div className="p-4 bg-white border-b border-x rounded-b-[20px] rounded-tr-[20px] border-[#8F919B33]">
        {/* Circular Progress + Score Text */}
        <div className="flex items-center space-x-4">
          {/* SVG Circular Progress */}
          <div className="relative w-20 h-20">
            <svg className="w-full h-full transform -rotate-90">
              {/* Background circle (gray) */}
              <circle
                cx="50%"
                cy="50%"
                r="30"
                strokeWidth="6"
                className="text-gray-200"
                stroke="currentColor"
                fill="transparent"
              />
              {/* Progress circle (colored) */}
              <circle
                cx="50%"
                cy="50%"
                r="30"
                strokeWidth="6"
                strokeDasharray={CIRCUMFERENCE}
                strokeDashoffset={
                  CIRCUMFERENCE - (CIRCUMFERENCE * scoreValue) / 100
                }
                className={getProgressColor() + " transition-all duration-300"}
                stroke="currentColor"
                fill="transparent"
              />
            </svg>
            {/* Center text */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xl font-semibold text-gray-700">
                {scoreValue}%
              </span>
            </div>
          </div>

          {/* Score Label & Description */}
          <div className="flex-1">
            {scoreText === "Great" && (
              <>
                <p className="text-xl font-bold text-black mb-2">Great!</p>
                <p className="text-sm text-[#000316B2] mb-1">
                  Your resume contains most of the important keywords and hard
                  skills for your industry.
                </p>
                <p className="text-sm text-[#000316B2]">
                  This means your resume is well targeted and relevant. This
                  will increase your chances of getting an interview.
                </p>
              </>
            )}

            {scoreText === "Decent" && (
              <>
                <p className="text-lg font-semibold text-yellow-600 mb-2">
                  Decent
                </p>
                <p className="text-sm text-gray-700 mb-1">
                  There is clear room for improvement. Some areas need refining
                  to make your resume stand out.
                </p>
                <p className="text-sm text-gray-700">
                  Consider tailoring your resume more closely to the roles
                  you&apos;re applying for.
                </p>
              </>
            )}

            {scoreText === "Poor" && (
              <>
                <p className="text-lg font-semibold text-red-600 mb-2">Poor</p>
                <p className="text-sm text-gray-700 mb-1">
                  Your resume lacks many important keywords and hard skills for
                  your industry.
                </p>
                <p className="text-sm text-gray-700">
                  Consider revising your resume to better match the job
                  descriptions you&apos;re applying for.
                </p>
              </>
            )}

            {scoreText === "Very Poor" && (
              <>
                <p className="text-lg font-semibold text-red-800 mb-2">
                  Very Poor
                </p>
                <p className="text-sm text-gray-700 mb-1">
                  Your resume is missing most of the important keywords and hard
                  skills for your industry.
                </p>
                <p className="text-sm text-gray-700">
                  Significant improvements are needed to make your resume
                  competitive.
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScoreSection;






















// "use client";
// import React, { useEffect, useState } from "react";

// /**
//  * For a circle of radius 30, the circumference is ~188.5
//  * strokeDasharray and strokeDashoffset use that to show progress.
//  */
// const CIRCUMFERENCE = 188.5;

// const ScoreSection = () => {
//   const [activeScoreTab, setActiveScoreTab] = useState<"relevancy" | "overall">(
//     "relevancy"
//   );
//   const [scoreValue, setScoreValue] = useState<number>(95); // e.g., 95% or 71%
//   const [scoreText, setScoreText] = useState<string>("Great"); // 'Great' or 'Decent'
//   const [resumeScores, setResumeScores] = useState<number>(0);
//   const [relevantScores, setRelevantScores] = useState<number>(0);

//   useEffect(() => {
//     const resumeScores = JSON.parse(localStorage.getItem("cvData") || "{}");
//     const scores = resumeScores.resumeScores;
//     setResumeScores(scores.overallResumeScore);
//     setRelevantScores(scores.relevancyScore);
//   }, []);

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

//   // Dynamically pick color for the circular progress
//   const getProgressColor = () => {
//     if (scoreValue >= 80) {
//       return "text-[#11E8D4]"; // Great
//     } else if (scoreValue >= 60) {
//       return "text-[#E8AC11]"; // Decent
//     } else if (scoreValue >= 40) {
//       return "text-[#E81111]"; // Poor
//     } else if (scoreValue >= 20) {
//       return "text-[#FF5733]"; // Very Poor
//     }
//     return "text-[#C70039]"; // Default to Very Poor
//   };

//   return (
//     <div className="w-full overflow-hidden">
//       {/* Score Tabs */}
//       <div className="flex space-x-4">
//         <button
//           onClick={() => handleScoreTabClick("relevancy")}
//           className={`rounded-t-[10px] px-6 py-3 text-sm font-bold outline-none
//             ${
//               activeScoreTab === "relevancy"
//                 ? "text-[#4042E2] bg-white border-t border-x border-[#8F919B33]"
//                 : "border-none text-[#A3B2C6] bg-[#E6EDFF]"
//             } transition-colors`}
//         >
//           Relevancy Score
//         </button>

//         <button
//           onClick={() => handleScoreTabClick("overall")}
//           className={`rounded-t-[10px] px-6 py-3 text-sm font-bold outline-none
//             ${
//               activeScoreTab === "overall"
//                 ? "text-[#4042E2] bg-white border-t border-x border-[#8F919B33]"
//                 : "border-none text-[#A3B2C6] bg-[#E6EDFF]"
//             } transition-colors`}
//         >
//           Overall Resume Score
//         </button>
//       </div>

//       {/* Main Body */}
//       <div className="p-4 bg-white border-b border-x rounded-b-[20px] rounded-tr-[20px] border-[#8F919B33]">
//         {/* Circular Progress + Score Text */}
//         <div className="flex items-center space-x-4">
//           {/* SVG Circular Progress */}
//           <div className="relative w-20 h-20">
//             <svg className="w-full h-full transform -rotate-90">
//               {/* Background circle (gray) */}
//               <circle
//                 cx="50%"
//                 cy="50%"
//                 r="30"
//                 strokeWidth="6"
//                 className="text-gray-200"
//                 stroke="currentColor"
//                 fill="transparent"
//               />
//               {/* Progress circle (colored) */}
//               <circle
//                 cx="50%"
//                 cy="50%"
//                 r="30"
//                 strokeWidth="6"
//                 strokeDasharray={CIRCUMFERENCE}
//                 strokeDashoffset={
//                   CIRCUMFERENCE - (CIRCUMFERENCE * scoreValue) / 100
//                 }
//                 className={getProgressColor() + " transition-all duration-300"}
//                 stroke="currentColor"
//                 fill="transparent"
//               />
//             </svg>
//             {/* Center text */}
//             <div className="absolute inset-0 flex items-center justify-center">
//               <span className="text-xl font-semibold text-gray-700">
//                 {scoreValue}%
//               </span>
//             </div>
//           </div>

//           {/* Score Label & Description */}
//           <div className="flex-1">
//             {scoreText === "Great" && (
//               <>
//                 <p className="text-xl font-bold text-black mb-2">Great!</p>
//                 <p className="text-sm text-[#000316B2] mb-1">
//                   Your resume contains most of the important keywords and hard
//                   skills for your industry.
//                 </p>
//                 <p className="text-sm text-[#000316B2]">
//                   This means your resume is well targeted and relevant. This
//                   will increase your chances of getting an interview.
//                 </p>
//               </>
//             )}

//             {scoreText === "Decent" && (
//               <>
//                 <p className="text-lg font-semibold text-yellow-600 mb-2">
//                   Decent
//                 </p>
//                 <p className="text-sm text-gray-700 mb-1">
//                   There is clear room for improvement. Some areas need refining
//                   to make your resume stand out.
//                 </p>
//                 <p className="text-sm text-gray-700">
//                   Consider tailoring your resume more closely to the roles
//                   you&apos;re applying for.
//                 </p>
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ScoreSection;





















// "use client";
// import React, { useState } from "react";

// const ScoreSection = () => {
//   const [activeScoreTab, setActiveScoreTab] = useState<"relevancy" | "overall">(
//     "relevancy"
//   );
//   const [scoreValue, setScoreValue] = useState<number>(95); // Dummy score
//   const [scoreText, setScoreText] = useState<string>("Great"); // e.g., 'Great', 'Decent', etc.

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
//     <div className="bg-white rounded-md shadow p-4">
//       {/* Tabs for Score */}
//       <div className="flex space-x-4 mb-4">
//         <button
//           onClick={() => handleScoreTabClick("relevancy")}
//           className={`bg-fuchsia-600 rounded-[10px] border border-[#8F919B33] ${
//             activeScoreTab === "relevancy"
//               ? "text-[#4042E2] font-bold text-sm border-indigo-600"
//               : "text-gray-500"
//           } pb-2 transition-colors`}
//         >
//           Relevancy Score
//         </button>
//         <button
//           onClick={() => handleScoreTabClick("overall")}
//           className={`${
//             activeScoreTab === "overall"
//               ? "text-indigo-600 border-b-2 border-indigo-600"
//               : "text-gray-500"
//           } pb-2 transition-colors`}
//         >
//           Overall Resume Score
//         </button>
//       </div>
//       {/* Score & Label */}
//       <div className="flex items-center">
//         <div className="relative w-16 h-16 flex items-center justify-center rounded-full bg-gray-100 mr-4">
//           <span className="text-2xl font-semibold text-indigo-600">
//             {scoreValue}%
//           </span>
//         </div>
//         <div className="text-lg font-medium">
//           {scoreText === "Great" && (
//             <p className="text-green-600">
//               Great{" "}
//               <span className="text-gray-600 text-sm ml-2">
//                 Your resume contains most of the important keywords and matches
//                 well for your industry
//               </span>
//             </p>
//           )}
//           {scoreText === "Decent" && (
//             <p className="text-yellow-600">
//               Decent{" "}
//               <span className="text-gray-600 text-sm ml-2">
//                 There is a clear room for improvement. Some areas need refining
//                 to make your resume stand out
//               </span>
//             </p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ScoreSection;
