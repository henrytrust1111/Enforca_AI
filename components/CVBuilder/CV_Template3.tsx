"use client";

import React, { useEffect, useState } from "react";
import { MapPinIcon } from "@heroicons/react/24/outline";
import { MailIcon, PhoneIcon } from "lucide-react";
import { useMyContext } from "@/context";

type SectionState = {
  [key: string]: "original" | "corrected";
};

const CV_Template3: React.FC = () => {
  // const {  } = useMyContext();
  const { 
    autoFixVersion,
    sectionChoices,
    setSectionChoices,
    originalData,
    correctedData,
    setOriginalData,
    setCorrectedData
  } = useMyContext();
  // const [originalData, setOriginalData] = useState<any>({});
  // const [correctedData, setCorrectedData] = useState<any>({});
  // const [sectionChoices, setSectionChoices] = useState<SectionState>({});

  useEffect(() => {
    const cvData = JSON.parse(localStorage.getItem("cvData") || "{}");
    setOriginalData(cvData?.data?.resumeData || {});
    setCorrectedData(cvData?.data?.analysisResult?.correctedResumeData || {});
  }, []);

  // useEffect(() => {
  //   const cvData = JSON.parse(localStorage.getItem("cvData") || "{}");
  //   setOriginalData(cvData?.data?.resumeData || {});
  //   setCorrectedData(cvData?.data?.analysisResult?.correctedResumeData || {});
  // }, [])

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

// type SectionState = {
//   [key: string]: boolean;
// };

// const CV_Template3: React.FC = () => {
//   const [resumeData, setResumeData] = useState<any>({});
//   const [correctedResumeData, setCorrectedResumeData] = useState<any>({});
//   const [replacedSections, setReplacedSections] = useState<SectionState>({});

//   useEffect(() => {
//     const cvData = JSON.parse(localStorage.getItem("cvData") || "{}");
//     const analysisResult = cvData?.data?.analysisResult || {};
//     setResumeData(analysisResult.resumeData || {});
//     setCorrectedResumeData(analysisResult.correctedResumeData || {});
//   }, []);

//   const handleReplace = (section: string) => {
//     setReplacedSections(prev => ({ ...prev, [section]: true }));
//   };

//   const renderContent = (section: string, original: any, corrected: any) => {
//     if (replacedSections[section]) return <span>{corrected}</span>;

//     return (
//       <div className="relative group">
//         <span className="text-red-500">{original}</span>
//         {corrected && corrected !== original && (
//           <>
//             <span className="text-green-500 ml-2">{corrected}</span>
//             <button
//               onClick={() => handleReplace(section)}
//               className="absolute -right-8 top-0 opacity-0 group-hover:opacity-100 transition-opacity text-xs bg-green-100 px-2 py-1 rounded"
//             >
//               Replace
//             </button>
//           </>
//         )}
//       </div>
//     );
//   };

//   const renderExperience = (exp: any, correctedExp: any, index: number) => {
//     const sectionKey = `experience-${index}`;

//     if (replacedSections[sectionKey]) {
//       return (
//         <div className="mb-6" key={index}>
//           <div className="flex justify-between items-start mb-2">
//             <div>
//               <h3 className="font-bold">{correctedExp.title}</h3>
//               <p className="text-gray-600">{correctedExp.location}</p>
//             </div>
//             <div className="text-right">
//               <p className="font-medium">{correctedExp.duration}</p>
//               <p className="text-gray-600">{correctedExp.location}</p>
//             </div>
//           </div>
//           <ul className="list-disc pl-5 space-y-2">
//             {correctedExp.details.map((detail: string, i: number) => (
//               <li key={i}>{detail}</li>
//             ))}
//           </ul>
//         </div>
//       );
//     }

//     return (
//       <div className="mb-6 group relative" key={index}>
//         <div className="flex justify-between items-start mb-2">
//           <div>
//             <h3 className="font-bold text-red-500">{exp.title}</h3>
//             <p className="text-gray-600">{exp.location}</p>
//           </div>
//           <div className="text-right">
//             <p className="font-medium text-red-500">{exp.duration}</p>
//             <p className="text-gray-600">{exp.location}</p>
//           </div>
//         </div>
//         <ul className="list-disc pl-5 space-y-2 text-red-500">
//           {exp.details.map((detail: string, i: number) => (
//             <li key={i}>{detail}</li>
//           ))}
//         </ul>

//         {correctedExp && (
//           <div className="mt-4 p-4 bg-green-50 rounded relative">
//             <button
//               onClick={() => handleReplace(sectionKey)}
//               className="absolute top-2 right-2 text-xs bg-green-500 text-white px-2 py-1 rounded"
//             >
//               Replace All
//             </button>
//             <h3 className="font-bold text-green-600">{correctedExp.title}</h3>
//             <p className="text-gray-600">{correctedExp.duration}</p>
//             <ul className="list-disc pl-5 space-y-2 text-green-600 mt-2">
//               {correctedExp.details.map((detail: string, i: number) => (
//                 <li key={i}>{detail}</li>
//               ))}
//             </ul>
//           </div>
//         )}
//       </div>
//     );
//   };

//   const renderSkills = () => {
//     const sectionKey = "skills";
//     if (replacedSections[sectionKey]) {
//       return (
//         <div className="grid grid-cols-2 gap-4">
//           {correctedResumeData.skills?.split(",").map((skill: string, i: number) => (
//             <span key={i}>{skill.trim()}</span>
//           ))}
//         </div>
//       );
//     }

//     return (
//       <div className="relative group">
//         <div className="grid grid-cols-2 gap-4 text-red-500">
//           {resumeData.skills?.split(",").map((skill: string, i: number) => (
//             <span key={i}>{skill.trim()}</span>
//           ))}
//         </div>
//         {correctedResumeData.skills && (
//           <>
//             <div className="mt-4 p-4 bg-green-50 rounded relative">
//               <button
//                 onClick={() => handleReplace(sectionKey)}
//                 className="absolute top-2 right-2 text-xs bg-green-500 text-white px-2 py-1 rounded"
//               >
//                 Replace All
//               </button>
//               <div className="grid grid-cols-2 gap-4 text-green-600">
//                 {correctedResumeData.skills.split(",").map((skill: string, i: number) => (
//                   <span key={i}>{skill.trim()}</span>
//                 ))}
//               </div>
//             </div>
//           </>
//         )}
//       </div>
//     );
//   };

//   return (
//     <div className="font-serif bg-gray-50 p-8 rounded-lg text-gray-800">
//       <header className="bg-black py-11 px-6 text-white flex flex-col md:!flex-row-reverse md:items-center justify-between items-start gap-4">
//         <div className="text-right space-y-2">
//           <h1 className="text-2xl font-semibold uppercase">
//             {renderContent("name", resumeData.name, correctedResumeData.name)}
//           </h1>
//         </div>

//         <div className="flex flex-col gap-2">
//           {resumeData.contact?.split(", ").map((info: string, i: number) => (
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
//         <p className="text-justify leading-relaxed">
//           {renderContent("summary", resumeData.summary, correctedResumeData.summary)}
//         </p>
//       </Section>

//       <Section title="TECHNICAL SKILLS">
//         {renderSkills()}
//       </Section>

//       <Section title="EXPERIENCE">
//         {resumeData.experience?.map((exp: any, i: number) => {
//           const correctedExp = correctedResumeData.experience?.[i];
//           return renderExperience(exp, correctedExp, i);
//         })}
//       </Section>

//       <Section title="EDUCATION">
//         {renderContent("education", resumeData.education, correctedResumeData.education)}
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

// "use client";

// import React, { useEffect } from "react";
// import { MapPinIcon } from "@heroicons/react/24/outline";
// import { MailIcon, PhoneIcon } from "lucide-react";

// const CV_Template3: React.FC = () => {
//   useEffect(() => {
//     const cvData = JSON.parse(localStorage.getItem("cvData") || "{}");
//     const resumeData = cvData?.data?.analysisResult?.resumeData || {};
//     const correctedResumeData = cvData?.data?.analysisResult?.correctedResumeData || {};
//     console.log({ resumeData, correctedResumeData });

//   }, []);

//   return (
//     <div className="font-serif bg-gray-50 p-8 rounded-lg text-gray-800">
//       <header className="bg-black py-11 px-6 text-white flex flex-col md:!flex-row-reverse md:items-center justify-between items-start gap-4">
//         {/* Name and Role (on top in mobile, right in desktop) */}
//         <div className="text-right space-y-2">
//           <h1 className="text-2xl font-semibold uppercase">AYO MAKINDE</h1>
//           <p className="text-base uppercase">RELATIONSHIP MANAGER</p>
//         </div>

//         {/* Contact Info (below in mobile, left in desktop) */}
//         <div className="flex flex-col gap-2">
//           <div className="flex !items-center gap-2">
//             <PhoneIcon className="w-4" />
//             <span>+2348136580221</span>
//           </div>
//           <div className="flex !items-center gap-2">
//             <MailIcon className="w-4 h-4" />
//             <span>makinde12@gmail.com</span>
//           </div>
//           <div className="flex !items-center gap-2">
//             <MapPinIcon className="w-4 h-4" />
//             <span>Lagos, NG</span>
//           </div>
//         </div>
//       </header>

//       {/* Professional Summary */}
//       <Section title="PROFESSIONAL SUMMARY">
//         <p className="text-justify leading-relaxed">
//           Dynamic and accomplished fintech professional with extensive expertise
//           in relationship management, customer retention analysis, customer
//           acquisition, and operations management. Leveraging a deep understanding
//           of Nigeria&apos;s fintech landscape, consistently driven revenue growth, and
//           improved customer satisfaction across various roles. Proven ability to
//           foster strong client relationships, analyse retention metrics, develop
//           strategic acquisition plans, and optimise operational processes.
//         </p>
//       </Section>

//       {/* Core Competencies */}
//       <Section title="CORE COMPETENCIES">
//         <div className="grid grid-cols-2 gap-4">
//           <ul className="list-disc pl-5 space-y-2">
//             <li>Project Management</li>
//             <li>Quicker Grasp of Clientele Needs</li>
//             <li>Product Ownership & Management</li>
//           </ul>
//           <ul className="list-disc pl-5 space-y-2">
//             <li>Market Research & Analytics</li>
//             <li>SaaS/BaaS Partnerships Management</li>
//             <li>Operational Optimization</li>
//           </ul>
//         </div>
//       </Section>

//       {/* Experience Section */}
//       <Section title="EXPERIENCE">
//         {/* GRUPP INC Experience */}
//         <div className="mb-6">
//           <div className="flex justify-between items-start mb-2">
//             <div>
//               <h3 className="font-bold">
//                 Relationship Manager (Microfinance & Mortgage Banks)
//               </h3>
//               <p className="text-gray-600">GRUPP INC</p>
//             </div>
//             <div className="text-right">
//               <p className="font-medium">Aug &apos;24 - Present</p>
//               <p className="text-gray-600">Lagos, NG</p>
//             </div>
//           </div>
//           <ul className="list-disc pl-5 space-y-2">
//             <li>Achieved 91.44% client satisfaction rate in Q4 2024</li>
//             <li>Implemented strategies reducing client churn by 15%</li>
//             <li>Identified revenue opportunities worth 9% annual increase</li>
//           </ul>
//         </div>

//         {/* Mikro Software Solutions Experience */}
//         <div className="mb-6">
//           <div className="flex justify-between items-start mb-2">
//             <div>
//               <h3 className="font-bold">Zonal Associate Retention Analyst</h3>
//               <p className="text-gray-600">MIKRO SOFTWARE SOLUTIONS</p>
//             </div>
//             <div className="text-right">
//               <p className="font-medium">May &apos;21 - Feb &apos;23</p>
//               <p className="text-gray-600">South-West Nigeria</p>
//             </div>
//           </div>
//           <ul className="list-disc pl-5 space-y-2">
//             <li>Boosted CLV by 27% YoY through customer segmentation</li>
//             <li>Increased retention rate by 10% QoQ</li>
//             <li>Achieved 83% CSAT score through proactive outreach</li>
//           </ul>
//         </div>
//       </Section>

//       {/* Technical Skills */}
//       <Section title="TECHNICAL SKILLS">
//         <div className="grid grid-cols-2 gap-4">
//           <div>
//             <p className="font-semibold">Data Visualization:</p>
//             <p>Power BI, Tableau</p>
//           </div>
//           <div>
//             <p className="font-semibold">Database Management:</p>
//             <p>PostgreSQL</p>
//           </div>
//           <div>
//             <p className="font-semibold">Project Management:</p>
//             <p>Monday, Trello, Asana</p>
//           </div>
//           <div>
//             <p className="font-semibold">Productivity:</p>
//             <p>Google Workspace, Microsoft 365</p>
//           </div>
//         </div>
//       </Section>

//       {/* Education */}
//       <Section title="EDUCATION">
//         <div className="flex justify-between items-center">
//           <div>
//             <p className="font-bold">B.Sc. Economics Education</p>
//             <p className="text-gray-600">Lagos State University</p>
//           </div>
//           <div className="text-right">
//             <p>Sep &apos;20 - Apr &apos;21</p>
//             <p className="text-gray-600">Lagos, Nigeria</p>
//           </div>
//         </div>
//       </Section>
//     </div>
//   );
// };

// // Reusable Section Component
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
