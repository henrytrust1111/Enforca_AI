"use client";
import React, { useEffect, useState } from "react";

/**
 * For a circle of radius 30, the circumference is ~188.5
 * strokeDasharray and strokeDashoffset use that to show progress.
 */
const CIRCUMFERENCE = 188.5;

const scoreMappings = {
  resumeScores: [
    {
      range: [90, 100],
      label: "Excellent",
      description: "Your resume is highly relevant to the job requirements. You have a strong chance of getting shortlisted! Consider tailoring your cover letter to highlight your skills.",
      recommendations: "Review your resume for any minor errors, and prepare for common interview questions."
    },
    {
      range: [80, 89],
      label: "Impressive",
      description: "Your resume shows strong relevance to the job requirements. You're close to being shortlisted! Focus on highlighting your achievements and skills.",
      recommendations: "Tailor your resume to the job description, and practice answering behavioral interview questions."
    },
    {
      range: [70, 79],
      label: "Decent",
      description: "Your resume shows some relevance to the job requirements. Consider highlighting your key skills and experiences! Emphasize achievements over responsibilities.",
      recommendations: "Tailor your resume to the job description, and practice answering behavioral interview questions."
    },
    {
      range: [50, 69],
      label: "Poor",
      description: "Your resume lacks relevance to the job requirements. Revise your resume to focus on the key skills and experiences required for the job! Use keywords from the job description.",
      recommendations: "Research the company and job requirements, and rewrite your resume with a focus on relevant skills and experiences."
    },
    {
      range: [0, 49],
      label: "Very Poor",
      description: "Your resume is not relevant to the job requirements. It's essential to rewrite your resume from scratch, focusing on the key skills and experiences required for the job! Consider seeking professional help.",
      recommendations: "Start by researching the job requirements and company, and then create a new resume that highlights relevant skills and experiences."
    }
  ],
  relevantScores: [
    {
      range: [90, 100],
      label: "Excellent",
      description: "Your resume is exceptionally well-crafted, demonstrating strong alignment with industry standards and best practices. You have a high chance of making a great impression!",
      recommendations: "Ensure your resume remains error-free and well-structured. Consider adding quantifiable achievements and preparing for the next step: interviews."
    },
    {
      range: [80, 89],
      label: "Impressive",
      description: "Your resume is well-structured and effectively presents your qualifications. A few refinements can make it even stronger!",
      recommendations: "Fine-tune your resume by optimizing formatting, refining bullet points, and emphasizing measurable achievements."
    },
    {
      range: [70, 79],
      label: "Decent",
      description: "Your resume is moderately well-structured but may require improvements in clarity, formatting, or content emphasis.",
      recommendations: "Refocus your resume on your most impactful skills and experiences, and ensure consistency in formatting."
    },
    {
      range: [50, 69],
      label: "Poor",
      description: "Your resume needs significant improvement in structure, clarity, or content alignment with industry standards.",
      recommendations: "Revise your resume to highlight accomplishments, use a professional format, and eliminate unnecessary details."
    },
    {
      range: [0, 49],
      label: "Very Poor",
      description: "Your resume lacks essential structure and key content, making it ineffective for job applications.",
      recommendations: "Consider rewriting your resume from scratch using a professional template. Focus on clarity, relevant skills, and measurable achievements."
    }
  ]
};

const ScoreSection = () => {
  const [activeScoreTab, setActiveScoreTab] = useState<"relevancy" | "overall">(
    "relevancy"
  );
  const [scoreValue, setScoreValue] = useState<number>(0); // Initialize with 0
  const [scoreText, setScoreText] = useState<string>(""); // Initialize with empty string
  const [resumeScores, setResumeScores] = useState<number>(0);
  const [relevantScores, setRelevantScores] = useState<number>(0);

  // useEffect(() => {
  //   const cvData = JSON.parse(localStorage.getItem("cvData") || "{}");
  //   const scores = cvData?.data?.analysisResult?.resumeScores || {};

  //   // Remove percentage sign and convert to number
  //   const overallResumeScore = parseInt(scores.overallResumeScore.replace('%', ''), 10) || 0;
  //   const relevancyScore = parseInt(scores.relevancyScore.replace('%', ''), 10) || 0;

  //   console.log({ overallResumeScore, relevancyScore });
  //   // console.log(cvData);
    

  //   setResumeScores(overallResumeScore);
  //   setRelevantScores(relevancyScore);

  //   // Set initial score values based on the active tab
  //   if (activeScoreTab === "relevancy") {
  //     setScoreValue(relevancyScore);
  //     setScoreText(getScoreText(relevancyScore, "relevantScores"));
  //   } else {
  //     setScoreValue(overallResumeScore);
  //     setScoreText(getScoreText(overallResumeScore, "resumeScores"));
  //   }
  // }, [activeScoreTab]);


  useEffect(() => {
    const cvData = JSON.parse(localStorage.getItem("cvData") || "{}");
    const scores = cvData?.data?.analysisResult?.resumeScores || {};
  
    // Safely handle undefined or non-string values
    const overallResumeScore = parseInt(
      (scores.overallResumeScore || "0").toString().replace('%', ''), 
      10
    ) || 0;
  
    const relevancyScore = parseInt(
      (scores.relevancyScore || "0").toString().replace('%', ''), 
      10
    ) || 0;
  
    console.log({ overallResumeScore, relevancyScore });
  
    setResumeScores(overallResumeScore);
    setRelevantScores(relevancyScore);
  
    // Set initial score values based on the active tab
    if (activeScoreTab === "relevancy") {
      setScoreValue(relevancyScore);
      setScoreText(getScoreText(relevancyScore, "relevantScores"));
    } else {
      setScoreValue(overallResumeScore);
      setScoreText(getScoreText(overallResumeScore, "resumeScores"));
    }
  }, [activeScoreTab]); 

  // Toggle Relevancy vs Overall Score
  const handleScoreTabClick = (tab: "relevancy" | "overall") => {
    setActiveScoreTab(tab);
    if (tab === "relevancy") {
      setScoreValue(relevantScores);
      setScoreText(getScoreText(relevantScores, "relevantScores"));
    } else {
      setScoreValue(resumeScores);
      setScoreText(getScoreText(resumeScores, "resumeScores"));
    }
  };

  // Get score text based on the score value
  const getScoreText = (score: number, type: "resumeScores" | "relevantScores") => {
    const mapping = scoreMappings[type].find(
      (item) => score >= item.range[0] && score <= item.range[1]
    );
    return mapping ? mapping.label : "Very Poor";
  };

  // Get score description based on the score value
  const getScoreDescription = (score: number, type: "resumeScores" | "relevantScores") => {
    const mapping = scoreMappings[type].find(
      (item) => score >= item.range[0] && score <= item.range[1]
    );
    return mapping ? mapping.description : "";
  };

  // Get score recommendations based on the score value
  const getScoreRecommendations = (score: number, type: "resumeScores" | "relevantScores") => {
    const mapping = scoreMappings[type].find(
      (item) => score >= item.range[0] && score <= item.range[1]
    );
    return mapping ? mapping.recommendations : "";
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
            <p className="text-xl font-bold text-black mb-2">{scoreText}</p>
            <p className="text-sm text-[#000316B2] mb-1">
              {getScoreDescription(scoreValue, activeScoreTab === "relevancy" ? "relevantScores" : "resumeScores")}
            </p>
            <p className="text-sm text-[#000316B2]">
              {getScoreRecommendations(scoreValue, activeScoreTab === "relevancy" ? "relevantScores" : "resumeScores")}
            </p>
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
//   const [scoreValue, setScoreValue] = useState<number>(0); // Initialize with 0
//   const [scoreText, setScoreText] = useState<string>(""); // Initialize with empty string
//   const [resumeScores, setResumeScores] = useState<number>(0);
//   const [relevantScores, setRelevantScores] = useState<number>(0);

//   useEffect(() => {
//     const cvData = JSON.parse(localStorage.getItem("cvData") || "{}");
//     const scores = cvData?.data?.analysisResult?.resumeScores || {};

//   // Remove percentage sign and convert to number
//     const overallResumeScore = parseInt(scores.overallResumeScore.replace('%', ''), 10) || 0;
//     const relevancyScore = parseInt(scores.relevancyScore.replace('%', ''), 10) || 0;

//     console.log({ overallResumeScore, relevancyScore });

//     setResumeScores(overallResumeScore);
//     setRelevantScores(relevancyScore);

//     // Set initial score values based on the active tab
//     if (activeScoreTab === "relevancy") {
//       setScoreValue(scores.relevancyScore || 0);
//       setScoreText(getScoreText(scores.relevancyScore || 0));
//     } else {
//       setScoreValue(scores.overallResumeScore || 0);
//       setScoreText(getScoreText(scores.overallResumeScore || 0));
//     }
//   }, [activeScoreTab]);

//   // Toggle Relevancy vs Overall Score
//   const handleScoreTabClick = (tab: "relevancy" | "overall") => {
//     setActiveScoreTab(tab);
//     if (tab === "relevancy") {
//       setScoreValue(relevantScores);
//       setScoreText(getScoreText(relevantScores));
//     } else {
//       setScoreValue(resumeScores);
//       setScoreText(getScoreText(resumeScores));
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

//   // Get score text based on the score value
//   const getScoreText = (score: number) => {
//     if (score >= 80) {
//       return "Great";
//     } else if (score >= 60) {
//       return "Decent";
//     } else if (score >= 40) {
//       return "Poor";
//     } else if (score >= 20) {
//       return "Very Poor";
//     }
//     return "Very Poor";
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
//                 {/* Description */}
//                 <p className="text-sm text-[#000316B2] mb-1">
//                   Your resume contains most of the important keywords and hard
//                   skills for your industry.
//                 </p>
//                 {/* Recommendations */}
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
//                 {/* description */}
//                 <p className="text-sm text-gray-700 mb-1">
//                   There is clear room for improvement. Some areas need refining
//                   to make your resume stand out.
//                 </p>
//                 {/* Recommendations */}
//                 <p className="text-sm text-gray-700">
//                   Consider tailoring your resume more closely to the roles
//                   you&apos;re applying for.
//                 </p>
//               </>
//             )}

//             {scoreText === "Poor" && (
//               <>
//                 <p className="text-lg font-semibold text-red-600 mb-2">Poor</p>
//                 {/* description */}
//                 <p className="text-sm text-gray-700 mb-1">
//                   Your resume lacks many important keywords and hard skills for
//                   your industry.
//                 </p>
//                 {/* Recommendations */}
//                 <p className="text-sm text-gray-700">
//                   Consider revising your resume to better match the job
//                   descriptions you&apos;re applying for.
//                 </p>
//               </>
//             )}

//             {scoreText === "Very Poor" && (
//               <>
//                 <p className="text-lg font-semibold text-red-800 mb-2">
//                   Very Poor
//                 </p>
//                 {/* description */}
//                 <p className="text-sm text-gray-700 mb-1">
//                   Your resume is missing most of the important keywords and hard
//                   skills for your industry.
//                 </p>
//                 {/* Recommendations */}
//                 <p className="text-sm text-gray-700">
//                   Significant improvements are needed to make your resume
//                   competitive.
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
