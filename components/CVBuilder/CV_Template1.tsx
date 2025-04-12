"use client";

import React, { useEffect } from "react";
import { MapPinIcon } from "@heroicons/react/24/outline";
import { MailIcon, PhoneIcon } from "lucide-react";

const CV_Template1: React.FC = () => {
  useEffect(() => {
    const cvData = JSON.parse(localStorage.getItem("cvData") || "{}");
    const resumeData = cvData?.data?.analysisResult?.resumeData || {};
    const correctedResumeData = cvData?.data?.analysisResult?.correctedResumeData || {};
    console.log({ resumeData, correctedResumeData });
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white text-gray-900">
      {/* Header */}
      <header className="mb-6 border-b pb-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold uppercase">AYO MAKINDE</h1>
            <p className="text-lg uppercase text-gray-600">Relationship Manager</p>
          </div>
          <div className="mt-4 md:mt-0 space-y-2">
            <div className="flex items-center space-x-2">
              <PhoneIcon className="w-5 h-5" />
              <span>+2348136580221</span>
            </div>
            <div className="flex items-center space-x-2">
              <MailIcon className="w-5 h-5" />
              <span>makinde12@gmail.com</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPinIcon className="w-5 h-5" />
              <span>Lagos, NG</span>
            </div>
          </div>
        </div>
      </header>

      {/* Professional Summary */}
      <Section title="Professional Summary">
        <p className="leading-relaxed">
          Dynamic and accomplished fintech professional with extensive expertise in relationship management, customer retention analysis, customer acquisition, and operations management. Leveraging a deep understanding of Nigeria&apos;s fintech landscape, consistently driven revenue growth, and improved customer satisfaction across various roles. Proven ability to foster strong client relationships, analyse retention metrics, develop strategic acquisition plans, and optimise operational processes.
        </p>
      </Section>

      {/* Core Competencies */}
      <Section title="Core Competencies">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ul className="list-disc pl-5 space-y-2">
            <li>Project Management</li>
            <li>Quicker Grasp of Clientele Needs</li>
            <li>Product Ownership &amp; Management</li>
          </ul>
          <ul className="list-disc pl-5 space-y-2">
            <li>Market Research &amp; Analytics</li>
            <li>SaaS/BaaS Partnerships Management</li>
            <li>Operational Optimization</li>
          </ul>
        </div>
      </Section>

      {/* Experience */}
      <Section title="Experience">
        {/* GRUPP INC Experience */}
        <div className="mb-4">
          <div className="flex justify-between">
            <div>
              <h3 className="font-semibold">
                Relationship Manager (Microfinance &amp; Mortgage Banks)
              </h3>
              <p className="text-sm text-gray-600">GRUPP INC</p>
            </div>
            <div className="text-sm text-gray-600 text-right">
              <p>Aug &apos;24 - Present</p>
              <p>Lagos, NG</p>
            </div>
          </div>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Achieved 91.44% client satisfaction rate in Q4 2024</li>
            <li>Implemented strategies reducing client churn by 15%</li>
            <li>Identified revenue opportunities worth 9% annual increase</li>
          </ul>
        </div>

        {/* MIKRO SOFTWARE SOLUTIONS Experience */}
        <div className="mb-4">
          <div className="flex justify-between">
            <div>
              <h3 className="font-semibold">Zonal Associate Retention Analyst</h3>
              <p className="text-sm text-gray-600">MIKRO SOFTWARE SOLUTIONS</p>
            </div>
            <div className="text-sm text-gray-600 text-right">
              <p>May &apos;21 - Feb &apos;23</p>
              <p>South-West Nigeria</p>
            </div>
          </div>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Boosted CLV by 27% YoY through customer segmentation</li>
            <li>Increased retention rate by 10% QoQ</li>
            <li>Achieved 83% CSAT score through proactive outreach</li>
          </ul>
        </div>
      </Section>

      {/* Technical Skills */}
      <Section title="Technical Skills">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="font-medium">Data Visualization:</p>
            <p>Power BI, Tableau</p>
          </div>
          <div>
            <p className="font-medium">Database Management:</p>
            <p>PostgreSQL</p>
          </div>
          <div>
            <p className="font-medium">Project Management:</p>
            <p>Monday, Trello, Asana</p>
          </div>
          <div>
            <p className="font-medium">Productivity:</p>
            <p>Google Workspace, Microsoft 365</p>
          </div>
        </div>
      </Section>

      {/* Education */}
      <Section title="Education">
        <div className="flex justify-between items-center">
          <div>
            <p className="font-semibold">B.Sc. Economics Education</p>
            <p className="text-sm text-gray-600">Lagos State University</p>
          </div>
          <div className="text-sm text-gray-600 text-right">
            <p>Sep &apos;20 - Apr &apos;21</p>
            <p>Lagos, Nigeria</p>
          </div>
        </div>
      </Section>
    </div>
  );
};

interface SectionProps {
  title: string;
  children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ title, children }) => (
  <section className="mb-6">
    <h2 className="text-xl font-bold border-b pb-2 mb-3">{title}</h2>
    {children}
  </section>
);

export default CV_Template1;
















// // components/CV_Template1.tsx
// import {
//   MapPinIcon,
//   CalendarDaysIcon,
//   BriefcaseIcon,
//   CheckCircleIcon,
//   PhoneIcon,
//   GlobeAltIcon
// } from "@heroicons/react/24/outline";
// import { MailIcon } from "lucide-react";
// import { CVImage } from "../icons/Icons";

// export const CV_Template1: React.FC = () => {
//   const skills = [
//     "Agile Thinking",
//     "Data Interpretation",
//     "Project Management (Jira, Trello, Miro)",
//     "UI/UX Design",
//     "Technical Writing",
//     "Wireframing",
//     "Prototyping",
//     "Cross-Functional Teams",
//     "UX Research",
//     "Usability Testing",
//     "Design Thinking"
//   ];
//   return (
//     <>
//       {/* Main CV Content */}
//       <div className="bg-white rounded-lg shadow-lg p-6 overflow-auto no-scrollbar">
//         {/* Candidate Profile */}
//         <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 mb-8">
//           <div className="flex items-center gap-4">
//             <CVImage width={100} height={100} />
//             <div>
//               <h1 className="text-3xl font-bold text-white">John Doe</h1>
//               <p className="text-lg text-indigo-200">Senior Product Manager</p>
//             </div>
//           </div>
//           <div className="mt-4 flex flex-wrap gap-4">
//             <div className="flex items-center text-indigo-200">
//               <MailIcon className="w-5 h-5 mr-1 mt-1" />
//               <span className="text-wrap">john.doe@example.com</span>
//             </div>
//             <div className="flex items-center text-indigo-200">
//               <PhoneIcon className="w-5 h-5 mr-1" />
//               <span>(123) 456-7890</span>
//             </div>
//             <div className="flex items-center text-indigo-200">
//               <GlobeAltIcon className="w-5 h-5 mr-1" />
//               <span>linkedin.com/in/johndoe</span>
//             </div>
//           </div>
//         </div>
//         {/* Technical Skills Section */}
//         <section className="mb-8 ">
//           <h2 className="text-xl font-semibold text-gray-800 border-b-2 border-indigo-600 pb-2 mb-4">
//             Technical Skills
//           </h2>
//           <div className="flex flex-wrap gap-3">
//             {skills.map((skill, index) => (
//               <span
//                 key={index}
//                 className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium shadow-sm"
//               >
//                 {skill}
//               </span>
//             ))}
//           </div>
//         </section>

//         {/* Work Experience Section */}
//         <section className="w-max md:w-full">
//           <h2 className="text-xl font-semibold text-gray-800 border-b-2 border-indigo-600 pb-2 mb-6">
//             Work Experience
//           </h2>
//           <div className="space-y-8">
//             {/* Work Experience Card: Coven Labs */}
//             <div className="relative pl-8 border-l-4 border-indigo-600">
//               <div className="absolute -left-4 top-0 bg-white rounded-full border-4 border-indigo-600 w-8 h-8 flex items-center justify-center">
//                 <BriefcaseIcon className="w-4 h-4 text-indigo-600" />
//               </div>
//               <h3 className="text-lg font-bold text-gray-800">Coven Labs</h3>
//               <div className="flex items-center text-sm text-gray-500 mt-1 gap-4">
//                 <div className="flex items-center">
//                   <MapPinIcon className="w-4 h-4 mr-1" />
//                   <span>Lagos</span>
//                 </div>
//                 <div className="flex items-center">
//                   <CalendarDaysIcon className="w-4 h-4 mr-1" />
//                   <span>Nov 2021 - Present</span>
//                 </div>
//                 <div className="flex items-center">
//                   <BriefcaseIcon className="w-4 h-4 mr-1" />
//                   <span>Product Management</span>
//                 </div>
//               </div>
//               <ul className="mt-4 space-y-3">
//                 <li className="flex items-start">
//                   <CheckCircleIcon className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-1" />
//                   <p className="ml-3 text-gray-700">
//                     Supervised the mobile-first design approach for a Trivia
//                     app, ensuring a seamless user experience that improved
//                     engagement by 40%.
//                   </p>
//                 </li>
//                 <li className="flex items-start">
//                   <CheckCircleIcon className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-1" />
//                   <p className="ml-3 text-gray-700">
//                     Introduced an iterative design process, ensuring feedback
//                     loops between design, development, and QA.
//                   </p>
//                 </li>
//                 <li className="flex items-start">
//                   <CheckCircleIcon className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-1" />
//                   <p className="ml-3 text-gray-700">
//                     Implemented user-centered design for an in-house product
//                     that led to a 15% reduction in user drop-off.
//                   </p>
//                 </li>
//                 <li className="flex items-start">
//                   <CheckCircleIcon className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-1" />
//                   <p className="ml-3 text-gray-700">
//                     Led cross-functional teams to adopt design thinking,
//                     resulting in a 40% increase in user engagement and a 25%
//                     increase in revenue.
//                   </p>
//                 </li>
//               </ul>
//             </div>

//             {/* Work Experience Card: Chekher Health */}
//             <div className="relative pl-8 border-l-4 border-indigo-600">
//               <div className="absolute -left-4 top-0 bg-white rounded-full border-4 border-indigo-600 w-8 h-8 flex items-center justify-center">
//                 <BriefcaseIcon className="w-4 h-4 text-indigo-600" />
//               </div>
//               <h3 className="text-lg font-bold text-gray-800">
//                 Chekher Health
//               </h3>
//               <div className="flex items-center text-sm text-gray-500 mt-1 gap-4">
//                 <div className="flex items-center">
//                   <MapPinIcon className="w-4 h-4 mr-1" />
//                   <span>Lagos</span>
//                 </div>
//                 <div className="flex items-center">
//                   <CalendarDaysIcon className="w-4 h-4 mr-1" />
//                   <span>Apr 2022 - Jan 2024</span>
//                 </div>
//                 <div className="flex items-center">
//                   <BriefcaseIcon className="w-4 h-4 mr-1" />
//                   <span>Product Management</span>
//                 </div>
//               </div>
//               <ul className="mt-4 space-y-3">
//                 <li className="flex items-start">
//                   <CheckCircleIcon className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-1" />
//                   <p className="ml-3 text-gray-700">
//                     Collaborated with the marketing team to tap into the
//                     existing user base, conceptualizing user-centric features
//                     that led to a 30% increase in user retention.
//                   </p>
//                 </li>
//                 <li className="flex items-start">
//                   <CheckCircleIcon className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-1" />
//                   <p className="ml-3 text-gray-700">
//                     Oversaw the product lifecycle from ideation to launch,
//                     facilitating cross-functional synergy among design,
//                     engineering, and QA.
//                   </p>
//                 </li>
//                 <li className="flex items-start">
//                   <CheckCircleIcon className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-1" />
//                   <p className="ml-3 text-gray-700">
//                     Pioneered data-driven approaches to measure user engagement,
//                     leading to a 50% boost in adoption rates.
//                   </p>
//                 </li>
//               </ul>
//             </div>
//           </div>
//         </section>
//       </div>
//     </>
//   );
// };
