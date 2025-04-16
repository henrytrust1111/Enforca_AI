"use client";

import React, { useEffect } from "react";
import { MapPinIcon } from "@heroicons/react/24/outline";
import { MailIcon, PhoneIcon } from "lucide-react";
import { useMyContext } from "@/context";

type SectionState = {
  [key: string]: "original" | "corrected";
};

const CV_Template3: React.FC = () => {
  const { 
    autoFixVersion,
    sectionChoices,
    setSectionChoices,
    originalData,
    correctedData,
    setOriginalData,
    setCorrectedData
  } = useMyContext();


  useEffect(() => {
    const cvData = JSON.parse(localStorage.getItem("cvData") || "{}");
    const savedChoices = JSON.parse(localStorage.getItem("sectionChoices") || "{}");
    
    setOriginalData(cvData?.data?.resumeData || {});
    setCorrectedData(cvData?.data?.analysisResult?.correctedResumeData || {});
    setSectionChoices(savedChoices);
  }, []);

  // Persist section choices to localStorage
  useEffect(() => {
    localStorage.setItem("sectionChoices", JSON.stringify(sectionChoices));
  }, [sectionChoices]);


  useEffect(() => {
    if (autoFixVersion > 0) {
      const initialSectionChoices: SectionState = {};

      // Apply corrections to all sections
      Object.keys(correctedData).forEach((section) => {
        if (section === "experience") {
          correctedData.experience?.forEach((_: any, index: number) => {
            initialSectionChoices[`experience-${index}`] = "corrected";
          });
        } else if (correctedData[section]) {
          initialSectionChoices[section] = "corrected";
        }
      });

      setSectionChoices(initialSectionChoices);
    }
  }, [autoFixVersion, correctedData]);

  const handleSectionChoice = (section: string, useCorrected: boolean) => {
    setSectionChoices((prev) => ({
      ...prev,
      [section]: useCorrected ? "corrected" : "original"
    }));
  };

  const renderSectionContent = (
    section: string,
    original: any,
    corrected: any
  ) => {
    const choice = sectionChoices[section];
    const showOriginal = choice ? choice === "original" : !corrected;

    // Return final chosen version
    if (choice) return <span>{showOriginal ? original : corrected}</span>;

    // Show comparison if no choice made
    return (
      <div className="group relative">
        <span className="text-red-500">{original}</span>
        {corrected && (
          <>
            <span className="ml-2 text-green-500">{corrected}</span>
            <div className="absolute right-0 top-0 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
              <button
                onClick={() => handleSectionChoice(section, true)}
                className="text-xs bg-green-500 text-white px-2 py-1 rounded"
              >
                Accept
              </button>
              <button
                onClick={() => handleSectionChoice(section, false)}
                className="text-xs bg-red-500 text-white px-2 py-1 rounded"
              >
                Keep
              </button>
            </div>
          </>
        )}
      </div>
    );
  };

  const renderExperience = (exp: any, correctedExp: any, index: number) => {
    const sectionKey = `experience-${index}`;
    const choice = sectionChoices[sectionKey];
    const showOriginal = choice ? choice === "original" : !correctedExp;

    if (choice) {
      return (
        <div className="mb-6">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="font-bold">
                {showOriginal ? exp.title : correctedExp?.title}
              </h3>
              <p className="text-gray-600">
                {showOriginal ? exp.location : correctedExp?.location}
              </p>
            </div>
            <div className="text-right">
              <p className="font-medium">
                {showOriginal ? exp.duration : correctedExp?.duration}
              </p>
              <p className="text-gray-600">
                {showOriginal ? exp.location : correctedExp?.location}
              </p>
            </div>
          </div>
          <ul className="list-disc pl-5 space-y-2">
            {(showOriginal ? exp.details : correctedExp?.details)?.map(
              (detail: string, i: number) => (
                <li key={i}>{detail}</li>
              )
            )}
          </ul>
        </div>
      );
    }

    return (
      <div className="mb-6 group relative">
        {/* Original Experience */}
        <div className="text-red-500">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="font-bold">{exp.title}</h3>
              <p className="text-gray-600">{exp.location}</p>
            </div>
            <div className="text-right">
              <p className="font-medium">{exp.duration}</p>
              <p className="text-gray-600">{exp.location}</p>
            </div>
          </div>
          <ul className="list-disc pl-5 space-y-2">
            {exp.details.map((detail: string, i: number) => (
              <li key={i}>{detail}</li>
            ))}
          </ul>
        </div>

        {/* Corrected Experience */}
        {correctedExp && (
          <div className="mt-4 p-4 bg-green-50 rounded">
            <div className="text-green-600">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-bold">{correctedExp.title}</h3>
                  <p className="text-gray-600">{correctedExp.location}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">{correctedExp.duration}</p>
                  <p className="text-gray-600">{correctedExp.location}</p>
                </div>
              </div>
              <ul className="list-disc pl-5 space-y-2">
                {correctedExp.details.map((detail: string, i: number) => (
                  <li key={i}>{detail}</li>
                ))}
              </ul>
            </div>
            <div className="flex gap-2 mt-4">
              <button
                onClick={() => handleSectionChoice(sectionKey, true)}
                className="text-xs bg-green-500 text-white px-2 py-1 rounded"
              >
                Accept All
              </button>
              <button
                onClick={() => handleSectionChoice(sectionKey, false)}
                className="text-xs bg-red-500 text-white px-2 py-1 rounded"
              >
                Keep Original
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderSkills = () => {
    const sectionKey = "skills";
    const choice = sectionChoices[sectionKey];
    const originalSkills = originalData.skills?.split(",") || [];
    const correctedSkills = correctedData.skills?.split(",") || [];
    const showOriginal = choice
      ? choice === "original"
      : !correctedSkills.length;

    if (choice) {
      return (
        <div className="grid grid-cols-2 gap-4">
          {(showOriginal ? originalSkills : correctedSkills).map(
            (skill: string, i: number) => (
              <span key={i}>{skill.trim()}</span>
            )
          )}
        </div>
      );
    }

    return (
      <div className="group relative">
        <div className="grid grid-cols-2 gap-4 text-red-500">
          {originalSkills.map((skill: string, i: number) => (
            <span key={i}>{skill.trim()}</span>
          ))}
        </div>
        {correctedSkills.length > 0 && (
          <div className="mt-4 p-4 bg-green-50 rounded">
            <div className="grid grid-cols-2 gap-4 text-green-600">
              {correctedSkills.map((skill: string, i: number) => (
                <span key={i}>{skill.trim()}</span>
              ))}
            </div>
            <div className="flex gap-2 mt-4">
              <button
                onClick={() => handleSectionChoice(sectionKey, true)}
                className="text-xs bg-green-500 text-white px-2 py-1 rounded"
              >
                Accept All
              </button>
              <button
                onClick={() => handleSectionChoice(sectionKey, false)}
                className="text-xs bg-red-500 text-white px-2 py-1 rounded"
              >
                Keep Original
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="font-serif bg-gray-50 p-8 rounded-lg text-gray-800">
      <header className="bg-black py-11 px-6 text-white flex flex-col md:!flex-row-reverse md:items-center justify-between items-start gap-4">
        <div className="text-right space-y-2">
          <h1 className="text-2xl font-semibold uppercase">
            {renderSectionContent(
              "name",
              originalData.name,
              correctedData.name
            )}
          </h1>
        </div>

        <div className="flex flex-col gap-2">
          {originalData.contact?.split(", ").map((info: string, i: number) => (
            <div key={i} className="flex items-center gap-2">
              {i === 0 && <PhoneIcon className="w-4" />}
              {i === 1 && <MailIcon className="w-4 h-4" />}
              {i === 2 && <MapPinIcon className="w-4 h-4" />}
              <span>{info}</span>
            </div>
          ))}
        </div>
      </header>

      <Section title="PROFESSIONAL SUMMARY">
        <div className="text-justify leading-relaxed">
          {renderSectionContent(
            "summary",
            originalData.summary,
            correctedData.summary
          )}
        </div>
      </Section>

      <Section title="TECHNICAL SKILLS">{renderSkills()}</Section>

      <Section title="EXPERIENCE">
        {originalData.experience?.map((exp: any, i: number) => (
          <React.Fragment key={i}>
            {renderExperience(exp, correctedData.experience?.[i], i)}
          </React.Fragment>
        ))}
      </Section>

      <Section title="EDUCATION">
        {renderSectionContent(
          "education",
          originalData.education,
          correctedData.education
        )}
      </Section>
    </div>
  );
};

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({
  title,
  children
}) => (
  <div className="mb-8">
    <h2 className="text-xl font-bold uppercase border-b-2 border-black pb-2 mb-4">
      {title}
    </h2>
    {children}
  </div>
);

export default CV_Template3;


// "use client";

// import React, { useEffect, useState } from "react";
// import { MapPinIcon } from "@heroicons/react/24/outline";
// import { MailIcon, PhoneIcon } from "lucide-react";
// import { useMyContext } from "@/context";

// type SectionState = {
//   [key: string]: "original" | "corrected";
// };

// const CV_Template3: React.FC = () => {
//   const { 
//     autoFixVersion,
//     sectionChoices,
//     setSectionChoices,
//     originalData,
//     correctedData,
//     setOriginalData,
//     setCorrectedData
//   } = useMyContext();


//   useEffect(() => {
//     const cvData = JSON.parse(localStorage.getItem("cvData") || "{}");
//     setOriginalData(cvData?.data?.resumeData || {});
//     setCorrectedData(cvData?.data?.analysisResult?.correctedResumeData || {});
//   }, []);


//   useEffect(() => {
//     if (autoFixVersion > 0) {
//       const initialSectionChoices: SectionState = {};

//       // Apply corrections to all sections
//       Object.keys(correctedData).forEach((section) => {
//         if (section === "experience") {
//           correctedData.experience?.forEach((_: any, index: number) => {
//             initialSectionChoices[`experience-${index}`] = "corrected";
//           });
//         } else if (correctedData[section]) {
//           initialSectionChoices[section] = "corrected";
//         }
//       });

//       setSectionChoices(initialSectionChoices);
//     }
//   }, [autoFixVersion, correctedData]);

//   const handleSectionChoice = (section: string, useCorrected: boolean) => {
//     setSectionChoices((prev) => ({
//       ...prev,
//       [section]: useCorrected ? "corrected" : "original"
//     }));
//   };

//   const renderSectionContent = (
//     section: string,
//     original: any,
//     corrected: any
//   ) => {
//     const choice = sectionChoices[section];
//     const showOriginal = choice ? choice === "original" : !corrected;

//     // Return final chosen version
//     if (choice) return <span>{showOriginal ? original : corrected}</span>;

//     // Show comparison if no choice made
//     return (
//       <div className="group relative">
//         <span className="text-red-500">{original}</span>
//         {corrected && (
//           <>
//             <span className="ml-2 text-green-500">{corrected}</span>
//             <div className="absolute right-0 top-0 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
//               <button
//                 onClick={() => handleSectionChoice(section, true)}
//                 className="text-xs bg-green-500 text-white px-2 py-1 rounded"
//               >
//                 Accept
//               </button>
//               <button
//                 onClick={() => handleSectionChoice(section, false)}
//                 className="text-xs bg-red-500 text-white px-2 py-1 rounded"
//               >
//                 Keep
//               </button>
//             </div>
//           </>
//         )}
//       </div>
//     );
//   };

//   const renderExperience = (exp: any, correctedExp: any, index: number) => {
//     const sectionKey = `experience-${index}`;
//     const choice = sectionChoices[sectionKey];
//     const showOriginal = choice ? choice === "original" : !correctedExp;

//     if (choice) {
//       return (
//         <div className="mb-6">
//           <div className="flex justify-between items-start mb-2">
//             <div>
//               <h3 className="font-bold">
//                 {showOriginal ? exp.title : correctedExp?.title}
//               </h3>
//               <p className="text-gray-600">
//                 {showOriginal ? exp.location : correctedExp?.location}
//               </p>
//             </div>
//             <div className="text-right">
//               <p className="font-medium">
//                 {showOriginal ? exp.duration : correctedExp?.duration}
//               </p>
//               <p className="text-gray-600">
//                 {showOriginal ? exp.location : correctedExp?.location}
//               </p>
//             </div>
//           </div>
//           <ul className="list-disc pl-5 space-y-2">
//             {(showOriginal ? exp.details : correctedExp?.details)?.map(
//               (detail: string, i: number) => (
//                 <li key={i}>{detail}</li>
//               )
//             )}
//           </ul>
//         </div>
//       );
//     }

//     return (
//       <div className="mb-6 group relative">
//         {/* Original Experience */}
//         <div className="text-red-500">
//           <div className="flex justify-between items-start mb-2">
//             <div>
//               <h3 className="font-bold">{exp.title}</h3>
//               <p className="text-gray-600">{exp.location}</p>
//             </div>
//             <div className="text-right">
//               <p className="font-medium">{exp.duration}</p>
//               <p className="text-gray-600">{exp.location}</p>
//             </div>
//           </div>
//           <ul className="list-disc pl-5 space-y-2">
//             {exp.details.map((detail: string, i: number) => (
//               <li key={i}>{detail}</li>
//             ))}
//           </ul>
//         </div>

//         {/* Corrected Experience */}
//         {correctedExp && (
//           <div className="mt-4 p-4 bg-green-50 rounded">
//             <div className="text-green-600">
//               <div className="flex justify-between items-start mb-2">
//                 <div>
//                   <h3 className="font-bold">{correctedExp.title}</h3>
//                   <p className="text-gray-600">{correctedExp.location}</p>
//                 </div>
//                 <div className="text-right">
//                   <p className="font-medium">{correctedExp.duration}</p>
//                   <p className="text-gray-600">{correctedExp.location}</p>
//                 </div>
//               </div>
//               <ul className="list-disc pl-5 space-y-2">
//                 {correctedExp.details.map((detail: string, i: number) => (
//                   <li key={i}>{detail}</li>
//                 ))}
//               </ul>
//             </div>
//             <div className="flex gap-2 mt-4">
//               <button
//                 onClick={() => handleSectionChoice(sectionKey, true)}
//                 className="text-xs bg-green-500 text-white px-2 py-1 rounded"
//               >
//                 Accept All
//               </button>
//               <button
//                 onClick={() => handleSectionChoice(sectionKey, false)}
//                 className="text-xs bg-red-500 text-white px-2 py-1 rounded"
//               >
//                 Keep Original
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     );
//   };

//   const renderSkills = () => {
//     const sectionKey = "skills";
//     const choice = sectionChoices[sectionKey];
//     const originalSkills = originalData.skills?.split(",") || [];
//     const correctedSkills = correctedData.skills?.split(",") || [];
//     const showOriginal = choice
//       ? choice === "original"
//       : !correctedSkills.length;

//     if (choice) {
//       return (
//         <div className="grid grid-cols-2 gap-4">
//           {(showOriginal ? originalSkills : correctedSkills).map(
//             (skill: string, i: number) => (
//               <span key={i}>{skill.trim()}</span>
//             )
//           )}
//         </div>
//       );
//     }

//     return (
//       <div className="group relative">
//         <div className="grid grid-cols-2 gap-4 text-red-500">
//           {originalSkills.map((skill: string, i: number) => (
//             <span key={i}>{skill.trim()}</span>
//           ))}
//         </div>
//         {correctedSkills.length > 0 && (
//           <div className="mt-4 p-4 bg-green-50 rounded">
//             <div className="grid grid-cols-2 gap-4 text-green-600">
//               {correctedSkills.map((skill: string, i: number) => (
//                 <span key={i}>{skill.trim()}</span>
//               ))}
//             </div>
//             <div className="flex gap-2 mt-4">
//               <button
//                 onClick={() => handleSectionChoice(sectionKey, true)}
//                 className="text-xs bg-green-500 text-white px-2 py-1 rounded"
//               >
//                 Accept All
//               </button>
//               <button
//                 onClick={() => handleSectionChoice(sectionKey, false)}
//                 className="text-xs bg-red-500 text-white px-2 py-1 rounded"
//               >
//                 Keep Original
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     );
//   };

//   return (
//     <div className="font-serif bg-gray-50 p-8 rounded-lg text-gray-800">
//       <header className="bg-black py-11 px-6 text-white flex flex-col md:!flex-row-reverse md:items-center justify-between items-start gap-4">
//         <div className="text-right space-y-2">
//           <h1 className="text-2xl font-semibold uppercase">
//             {renderSectionContent(
//               "name",
//               originalData.name,
//               correctedData.name
//             )}
//           </h1>
//         </div>

//         <div className="flex flex-col gap-2">
//           {originalData.contact?.split(", ").map((info: string, i: number) => (
//             <div key={i} className="flex items-center gap-2">
//               {i === 0 && <PhoneIcon className="w-4" />}
//               {i === 1 && <MailIcon className="w-4 h-4" />}
//               {i === 2 && <MapPinIcon className="w-4 h-4" />}
//               <span>{info}</span>
//             </div>
//           ))}
//         </div>
//       </header>

//       <Section title="PROFESSIONAL SUMMARY">
//         <div className="text-justify leading-relaxed">
//           {renderSectionContent(
//             "summary",
//             originalData.summary,
//             correctedData.summary
//           )}
//         </div>
//       </Section>

//       <Section title="TECHNICAL SKILLS">{renderSkills()}</Section>

//       <Section title="EXPERIENCE">
//         {originalData.experience?.map((exp: any, i: number) => (
//           <React.Fragment key={i}>
//             {renderExperience(exp, correctedData.experience?.[i], i)}
//           </React.Fragment>
//         ))}
//       </Section>

//       <Section title="EDUCATION">
//         {renderSectionContent(
//           "education",
//           originalData.education,
//           correctedData.education
//         )}
//       </Section>
//     </div>
//   );
// };

// const Section: React.FC<{ title: string; children: React.ReactNode }> = ({
//   title,
//   children
// }) => (
//   <div className="mb-8">
//     <h2 className="text-xl font-bold uppercase border-b-2 border-black pb-2 mb-4">
//       {title}
//     </h2>
//     {children}
//   </div>
// );

// export default CV_Template3;