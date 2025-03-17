"use client";

import React, { useEffect } from "react";
import { MapPinIcon } from "@heroicons/react/24/outline";
import { MailIcon, PhoneIcon } from "lucide-react";

const CV_Template3: React.FC = () => {
  useEffect(() => {
    const cvData = JSON.parse(localStorage.getItem("cvData") || "{}");
    const resumeData = cvData?.data?.analysisResult?.resumeData || {};
    const correctedResumeData = cvData?.data?.analysisResult?.correctedResumeData || {};
    console.log({ resumeData, correctedResumeData });

  }, []);

  return (
    <div className="font-serif bg-gray-50 p-8 rounded-lg text-gray-800">
      <header className="bg-black py-11 px-6 text-white flex flex-col md:!flex-row-reverse md:items-center justify-between items-start gap-4">
        {/* Name and Role (on top in mobile, right in desktop) */}
        <div className="text-right space-y-2">
          <h1 className="text-2xl font-semibold uppercase">AYO MAKINDE</h1>
          <p className="text-base uppercase">RELATIONSHIP MANAGER</p>
        </div>

        {/* Contact Info (below in mobile, left in desktop) */}
        <div className="flex flex-col gap-2">
          <div className="flex !items-center gap-2">
            <PhoneIcon className="w-4" />
            <span>+2348136580221</span>
          </div>
          <div className="flex !items-center gap-2">
            <MailIcon className="w-4 h-4" />
            <span>makinde12@gmail.com</span>
          </div>
          <div className="flex !items-center gap-2">
            <MapPinIcon className="w-4 h-4" />
            <span>Lagos, NG</span>
          </div>
        </div>
      </header>

      {/* Professional Summary */}
      <Section title="PROFESSIONAL SUMMARY">
        <p className="text-justify leading-relaxed">
          Dynamic and accomplished fintech professional with extensive expertise
          in relationship management, customer retention analysis, customer
          acquisition, and operations management. Leveraging a deep understanding
          of Nigeria&apos;s fintech landscape, consistently driven revenue growth, and
          improved customer satisfaction across various roles. Proven ability to
          foster strong client relationships, analyse retention metrics, develop
          strategic acquisition plans, and optimise operational processes.
        </p>
      </Section>

      {/* Core Competencies */}
      <Section title="CORE COMPETENCIES">
        <div className="grid grid-cols-2 gap-4">
          <ul className="list-disc pl-5 space-y-2">
            <li>Project Management</li>
            <li>Quicker Grasp of Clientele Needs</li>
            <li>Product Ownership & Management</li>
          </ul>
          <ul className="list-disc pl-5 space-y-2">
            <li>Market Research & Analytics</li>
            <li>SaaS/BaaS Partnerships Management</li>
            <li>Operational Optimization</li>
          </ul>
        </div>
      </Section>

      {/* Experience Section */}
      <Section title="EXPERIENCE">
        {/* GRUPP INC Experience */}
        <div className="mb-6">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="font-bold">
                Relationship Manager (Microfinance & Mortgage Banks)
              </h3>
              <p className="text-gray-600">GRUPP INC</p>
            </div>
            <div className="text-right">
              <p className="font-medium">Aug &apos;24 - Present</p>
              <p className="text-gray-600">Lagos, NG</p>
            </div>
          </div>
          <ul className="list-disc pl-5 space-y-2">
            <li>Achieved 91.44% client satisfaction rate in Q4 2024</li>
            <li>Implemented strategies reducing client churn by 15%</li>
            <li>Identified revenue opportunities worth 9% annual increase</li>
          </ul>
        </div>

        {/* Mikro Software Solutions Experience */}
        <div className="mb-6">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="font-bold">Zonal Associate Retention Analyst</h3>
              <p className="text-gray-600">MIKRO SOFTWARE SOLUTIONS</p>
            </div>
            <div className="text-right">
              <p className="font-medium">May &apos;21 - Feb &apos;23</p>
              <p className="text-gray-600">South-West Nigeria</p>
            </div>
          </div>
          <ul className="list-disc pl-5 space-y-2">
            <li>Boosted CLV by 27% YoY through customer segmentation</li>
            <li>Increased retention rate by 10% QoQ</li>
            <li>Achieved 83% CSAT score through proactive outreach</li>
          </ul>
        </div>
      </Section>

      {/* Technical Skills */}
      <Section title="TECHNICAL SKILLS">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="font-semibold">Data Visualization:</p>
            <p>Power BI, Tableau</p>
          </div>
          <div>
            <p className="font-semibold">Database Management:</p>
            <p>PostgreSQL</p>
          </div>
          <div>
            <p className="font-semibold">Project Management:</p>
            <p>Monday, Trello, Asana</p>
          </div>
          <div>
            <p className="font-semibold">Productivity:</p>
            <p>Google Workspace, Microsoft 365</p>
          </div>
        </div>
      </Section>

      {/* Education */}
      <Section title="EDUCATION">
        <div className="flex justify-between items-center">
          <div>
            <p className="font-bold">B.Sc. Economics Education</p>
            <p className="text-gray-600">Lagos State University</p>
          </div>
          <div className="text-right">
            <p>Sep &apos;20 - Apr &apos;21</p>
            <p className="text-gray-600">Lagos, Nigeria</p>
          </div>
        </div>
      </Section>
    </div>
  );
};

// Reusable Section Component
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



























































// import React from "react";
// import { MapPinIcon } from "@heroicons/react/24/outline";
// import { MailIcon, PhoneIcon } from "lucide-react";

// const CV_Template3: React.FC = () => (
//   <div className="font-serif bg-gray-50 p-8 rounded-lg text-gray-800">
//     <header className="bg-black py-11 px-6 text-white flex flex-col md:!flex-row-reverse md:items-center justify-between items-start gap-4">
//       {/* Name and Role (on top in mobile, right in desktop) */}
//       <div className="text-right space-y-2">
//         <h1 className="text-2xl font-semibold uppercase">AYO MAKINDE</h1>
//         <p className="text-base uppercase">RELATIONSHIP MANAGER</p>
//       </div>

//       {/* Contact Info (below in mobile, left in desktop) */}
//       <div className="flex flex-col gap-2">
//         <div className="flex !items-center gap-2">
//           <PhoneIcon className="w-4" />
//           <span>+2348136580221</span>
//         </div>
//         <div className="flex !items-center gap-2">
//           <MailIcon className="w-4 h-4" />
//           <span>makinde12@gmail.com</span>
//         </div>
//         <div className="flex !items-center gap-2">
//           <MapPinIcon className="w-4 h-4" />
//           <span>Lagos, NG</span>
//         </div>
//       </div>
//     </header>

//     {/* Professional Summary */}
//     <Section title="PROFESSIONAL SUMMARY">
//       <p className="text-justify leading-relaxed">
//         Dynamic and accomplished fintech professional with extensive expertise
//         in relationship management, customer retention analysis, customer
//         acquisition, and operations management. Leveraging a deep understanding
//         of Nigeria's fintech landscape, consistently driven revenue growth, and
//         improved customer satisfaction across various roles. Proven ability to
//         foster strong client relationships, analyse retention metrics, develop
//         strategic acquisition plans, and optimise operational processes.
//       </p>
//     </Section>

//     {/* Core Competencies */}
//     <Section title="CORE COMPETENCIES">
//       <div className="grid grid-cols-2 gap-4">
//         <ul className="list-disc pl-5 space-y-2">
//           <li>Project Management</li>
//           <li>Quicker Grasp of Clientele Needs</li>
//           <li>Product Ownership & Management</li>
//         </ul>
//         <ul className="list-disc pl-5 space-y-2">
//           <li>Market Research & Analytics</li>
//           <li>SaaS/BaaS Partnerships Management</li>
//           <li>Operational Optimization</li>
//         </ul>
//       </div>
//     </Section>

//     {/* Experience Section */}
//     <Section title="EXPERIENCE">
//       {/* GRUPP INC Experience */}
//       <div className="mb-6">
//         <div className="flex justify-between items-start mb-2">
//           <div>
//             <h3 className="font-bold">
//               Relationship Manager (Microfinance & Mortgage Banks)
//             </h3>
//             <p className="text-gray-600">GRUPP INC</p>
//           </div>
//           <div className="text-right">
//             <p className="font-medium">Aug '24 - Present</p>
//             <p className="text-gray-600">Lagos, NG</p>
//           </div>
//         </div>
//         <ul className="list-disc pl-5 space-y-2">
//           <li>Achieved 91.44% client satisfaction rate in Q4 2024</li>
//           <li>Implemented strategies reducing client churn by 15%</li>
//           <li>Identified revenue opportunities worth 9% annual increase</li>
//         </ul>
//       </div>

//       {/* Mikro Software Solutions Experience */}
//       <div className="mb-6">
//         <div className="flex justify-between items-start mb-2">
//           <div>
//             <h3 className="font-bold">Zonal Associate Retention Analyst</h3>
//             <p className="text-gray-600">MIKRO SOFTWARE SOLUTIONS</p>
//           </div>
//           <div className="text-right">
//             <p className="font-medium">May '21 - Feb '23</p>
//             <p className="text-gray-600">South-West Nigeria</p>
//           </div>
//         </div>
//         <ul className="list-disc pl-5 space-y-2">
//           <li>Boosted CLV by 27% YoY through customer segmentation</li>
//           <li>Increased retention rate by 10% QoQ</li>
//           <li>Achieved 83% CSAT score through proactive outreach</li>
//         </ul>
//       </div>
//     </Section>

//     {/* Technical Skills */}
//     <Section title="TECHNICAL SKILLS">
//       <div className="grid grid-cols-2 gap-4">
//         <div>
//           <p className="font-semibold">Data Visualization:</p>
//           <p>Power BI, Tableau</p>
//         </div>
//         <div>
//           <p className="font-semibold">Database Management:</p>
//           <p>PostgreSQL</p>
//         </div>
//         <div>
//           <p className="font-semibold">Project Management:</p>
//           <p>Monday, Trello, Asana</p>
//         </div>
//         <div>
//           <p className="font-semibold">Productivity:</p>
//           <p>Google Workspace, Microsoft 365</p>
//         </div>
//       </div>
//     </Section>

//     {/* Education */}
//     <Section title="EDUCATION">
//       <div className="flex justify-between items-center">
//         <div>
//           <p className="font-bold">B.Sc. Economics Education</p>
//           <p className="text-gray-600">Lagos State University</p>
//         </div>
//         <div className="text-right">
//           <p>Sep '20 - Apr '21</p>
//           <p className="text-gray-600">Lagos, Nigeria</p>
//         </div>
//       </div>
//     </Section>
//   </div>
// );

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
