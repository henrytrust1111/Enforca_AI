import React from "react";
import {
  MapPinIcon,
  StarIcon,
  PhoneIcon,
  AcademicCapIcon
} from "@heroicons/react/24/outline";
import { MailIcon } from "lucide-react";
import { CVImage } from "../icons/Icons";

export const CV_Template2: React.FC = () => {
  const technicalSkills = [
    "Data Visualization (Power BI, Tableau)",
    "Database Management (PostgreSQL)",
    "Project Management Tools",
    "Google Workspace",
    "Microsoft 365",
    "SaaS/BaaS Partnerships",
    "Market Research & Analytics"
  ];

  const coreCompetencies = [
    "Client Relationship Management",
    "Operational Optimization",
    "Customer Retention Strategies",
    "Revenue Growth Management",
    "Cross-functional Leadership",
    "Market Expansion",
    "Process Improvement"
  ];
  return (
    <div className="bg-white rounded-lg shadow-lg p-6  overflow-auto no-scrollbar">
      {/* Profile Header */}
      <div className="flex flex-col md:flex-row gap-6 items-start mb-8 border-b-2 border-green-200 pb-8">
        <CVImage width={120} height={120} />
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-gray-800">Ayo Makinde</h1>
          <p className="text-xl text-[#2e7d32] font-medium">
            Relationship Manager
          </p>
          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
            <div className="flex items-center">
              <PhoneIcon className="w-4 h-4 mr-2 text-green-600" />
              +2348103680221
            </div>
            <div className="flex items-center">
              <MailIcon className="w-4 h-4 mr-2 text-green-600" />
              mankhind12@gmail.com
            </div>
            <div className="flex items-center">
              <MapPinIcon className="w-4 h-4 mr-2 text-green-600" />
              Lagos, Nigeria
            </div>
          </div>
        </div>
      </div>

      {/* Professional Summary */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 border-l-4 border-green-600 pl-3 mb-4">
          Professional Summary
        </h2>
        <p className="text-gray-600 leading-relaxed">
          Dynamic fintech professional with 5+ years experience in relationship
          management and operational excellence. Proven track record in driving
          revenue growth (9% annual increase), improving client retention (15%
          QoQ improvement), and optimizing operational processes. Skilled in
          cross-functional leadership, market research, and strategic customer
          acquisition initiatives.
        </p>
      </section>

      {/* Core Competencies */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 border-l-4 border-green-600 pl-3 mb-4">
          Core Competencies
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {coreCompetencies.map((skill, index) => (
            <div key={index} className="flex items-center">
              <StarIcon className="w-4 h-4 text-green-600 mr-2" />
              <span className="text-gray-600">{skill}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Experience Section */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 border-l-4 border-green-600 pl-3 mb-6">
          Professional Experience
        </h2>

        {/* GRUPP INC Experience */}
        <div className="mb-6">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="text-lg font-bold text-gray-800">GRUPP INC</h3>
              <p className="text-green-600 font-medium">Relationship Manager</p>
            </div>
            <div className="text-sm text-gray-500">
              <p>Mar &apos;23 - Present</p>
              <p className="flex items-center">
                <MapPinIcon className="w-4 h-4 mr-1" />
                Lagos, NG
              </p>
            </div>
          </div>
          <ul className="list-disc pl-6 space-y-2 text-gray-600">
            <li>Achieved 91.44% client satisfaction rate in Q4 2023</li>
            <li>Implemented strategies reducing client churn by 15%</li>
            <li>Identified revenue opportunities worth 9% annual increase</li>
            <li>Trained 10+ new clients with 100% onboarding success</li>
          </ul>
        </div>

        {/* Mikro Software Solutions Experience */}
        <div className="mb-6">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="text-lg font-bold text-gray-800">
                Mikro Software Solutions
              </h3>
              <p className="text-green-600 font-medium">
                Zonal Associate Retention Analyst
              </p>
            </div>
            <div className="text-sm text-gray-500">
              <p>May &apos;21 - Feb &apos;23</p>
              <p className="flex items-center">
                <MapPinIcon className="w-4 h-4 mr-1" />
                South-West Nigeria
              </p>
            </div>
          </div>
          <ul className="list-disc pl-6 space-y-2 text-gray-600">
            <li>Boosted CLV by 27% YoY through customer segmentation</li>
            <li>Increased retention rate by 10% QoQ</li>
            <li>Achieved 83% CSAT score through proactive outreach</li>
          </ul>
        </div>
      </section>

      {/* Technical Skills */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 border-l-4 border-green-600 pl-3 mb-4">
          Technical Skills
        </h2>
        <div className="flex flex-wrap gap-3">
          {technicalSkills.map((skill, index) => (
            <span
              key={index}
              className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium"
            >
              {skill}
            </span>
          ))}
        </div>
      </section>

      {/* Education */}
      <section>
        <h2 className="text-xl font-semibold text-gray-800 border-l-4 border-green-600 pl-3 mb-4">
          Education
        </h2>
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-bold text-gray-800">
              B.Sc. Economics Education
            </h3>
            <p className="text-green-600">Lagos State University</p>
          </div>
          <div className="text-sm text-gray-500">
            <p>Sep &apos;20 - Apr &apos;21</p>
            <div className="flex items-center">
              <AcademicCapIcon className="w-4 h-4 mr-1" />
              <span>Lagos, NG</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};



































// import React from "react";
// import {
//   MapPinIcon,
//   StarIcon,
//   PhoneIcon,
//   AcademicCapIcon
// } from "@heroicons/react/24/outline";
// import { MailIcon } from "lucide-react";
// import { CVImage } from "../icons/Icons";

// export const CV_Template2: React.FC = () => {
//   const technicalSkills = [
//     "Data Visualization (Power BI, Tableau)",
//     "Database Management (PostgreSQL)",
//     "Project Management Tools",
//     "Google Workspace",
//     "Microsoft 365",
//     "SaaS/BaaS Partnerships",
//     "Market Research & Analytics"
//   ];

//   const coreCompetencies = [
//     "Client Relationship Management",
//     "Operational Optimization",
//     "Customer Retention Strategies",
//     "Revenue Growth Management",
//     "Cross-functional Leadership",
//     "Market Expansion",
//     "Process Improvement"
//   ];
//   return (
//     <div className="bg-white rounded-lg shadow-lg p-6  overflow-auto no-scrollbar">
//       {/* Profile Header */}
//       <div className="flex flex-col md:flex-row gap-6 items-start mb-8 border-b-2 border-green-200 pb-8">
//         <CVImage width={120} height={120} />
//         <div className="space-y-2">
//           <h1 className="text-3xl font-bold text-gray-800">Ayo Makinde</h1>
//           <p className="text-xl text-[#2e7d32] font-medium">
//             Relationship Manager
//           </p>
//           <div className="flex flex-wrap gap-4 text-sm text-gray-600">
//             <div className="flex items-center">
//               <PhoneIcon className="w-4 h-4 mr-2 text-green-600" />
//               +2348103680221
//             </div>
//             <div className="flex items-center">
//               <MailIcon className="w-4 h-4 mr-2 text-green-600" />
//               mankhind12@gmail.com
//             </div>
//             <div className="flex items-center">
//               <MapPinIcon className="w-4 h-4 mr-2 text-green-600" />
//               Lagos, Nigeria
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Professional Summary */}
//       <section className="mb-8">
//         <h2 className="text-xl font-semibold text-gray-800 border-l-4 border-green-600 pl-3 mb-4">
//           Professional Summary
//         </h2>
//         <p className="text-gray-600 leading-relaxed">
//           Dynamic fintech professional with 5+ years experience in relationship
//           management and operational excellence. Proven track record in driving
//           revenue growth (9% annual increase), improving client retention (15%
//           QoQ improvement), and optimizing operational processes. Skilled in
//           cross-functional leadership, market research, and strategic customer
//           acquisition initiatives.
//         </p>
//       </section>

//       {/* Core Competencies */}
//       <section className="mb-8">
//         <h2 className="text-xl font-semibold text-gray-800 border-l-4 border-green-600 pl-3 mb-4">
//           Core Competencies
//         </h2>
//         <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
//           {coreCompetencies.map((skill, index) => (
//             <div key={index} className="flex items-center">
//               <StarIcon className="w-4 h-4 text-green-600 mr-2" />
//               <span className="text-gray-600">{skill}</span>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Experience Section */}
//       <section className="mb-8">
//         <h2 className="text-xl font-semibold text-gray-800 border-l-4 border-green-600 pl-3 mb-6">
//           Professional Experience
//         </h2>

//         {/* GRUPP INC Experience */}
//         <div className="mb-6">
//           <div className="flex justify-between items-start mb-2">
//             <div>
//               <h3 className="text-lg font-bold text-gray-800">GRUPP INC</h3>
//               <p className="text-green-600 font-medium">Relationship Manager</p>
//             </div>
//             <div className="text-sm text-gray-500">
//               <p>Mar '23 - Present</p>
//               <p className="flex items-center">
//                 <MapPinIcon className="w-4 h-4 mr-1" />
//                 Lagos, NG
//               </p>
//             </div>
//           </div>
//           <ul className="list-disc pl-6 space-y-2 text-gray-600">
//             <li>Achieved 91.44% client satisfaction rate in Q4 2023</li>
//             <li>Implemented strategies reducing client churn by 15%</li>
//             <li>Identified revenue opportunities worth 9% annual increase</li>
//             <li>Trained 10+ new clients with 100% onboarding success</li>
//           </ul>
//         </div>

//         {/* Mikro Software Solutions Experience */}
//         <div className="mb-6">
//           <div className="flex justify-between items-start mb-2">
//             <div>
//               <h3 className="text-lg font-bold text-gray-800">
//                 Mikro Software Solutions
//               </h3>
//               <p className="text-green-600 font-medium">
//                 Zonal Associate Retention Analyst
//               </p>
//             </div>
//             <div className="text-sm text-gray-500">
//               <p>May '21 - Feb '23</p>
//               <p className="flex items-center">
//                 <MapPinIcon className="w-4 h-4 mr-1" />
//                 South-West Nigeria
//               </p>
//             </div>
//           </div>
//           <ul className="list-disc pl-6 space-y-2 text-gray-600">
//             <li>Boosted CLV by 27% YoY through customer segmentation</li>
//             <li>Increased retention rate by 10% QoQ</li>
//             <li>Achieved 83% CSAT score through proactive outreach</li>
//           </ul>
//         </div>
//       </section>

//       {/* Technical Skills */}
//       <section className="mb-8">
//         <h2 className="text-xl font-semibold text-gray-800 border-l-4 border-green-600 pl-3 mb-4">
//           Technical Skills
//         </h2>
//         <div className="flex flex-wrap gap-3">
//           {technicalSkills.map((skill, index) => (
//             <span
//               key={index}
//               className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium"
//             >
//               {skill}
//             </span>
//           ))}
//         </div>
//       </section>

//       {/* Education */}
//       <section>
//         <h2 className="text-xl font-semibold text-gray-800 border-l-4 border-green-600 pl-3 mb-4">
//           Education
//         </h2>
//         <div className="flex justify-between items-start">
//           <div>
//             <h3 className="font-bold text-gray-800">
//               B.Sc. Economics Education
//             </h3>
//             <p className="text-green-600">Lagos State University</p>
//           </div>
//           <div className="text-sm text-gray-500">
//             <p>Sep '20 - Apr '21</p>
//             <div className="flex items-center">
//               <AcademicCapIcon className="w-4 h-4 mr-1" />
//               <span>Lagos, NG</span>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };
