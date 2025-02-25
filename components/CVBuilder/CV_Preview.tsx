import React from "react";
import {
  MapPinIcon,
  CalendarDaysIcon,
  BriefcaseIcon,
  CheckCircleIcon,
  PhoneIcon,
  GlobeAltIcon
} from "@heroicons/react/24/outline";
import { MailIcon } from "lucide-react";
import { CVImage, Download } from "../icons/Icons";

const CV_Preview: React.FC = () => {
  // Sample list of technical skills displayed as pills.
  const skills = [
    "Agile Thinking",
    "Data Interpretation",
    "Project Management (Jira, Trello, Miro)",
    "UI/UX Design",
    "Technical Writing",
    "Wireframing",
    "Prototyping",
    "Cross-Functional Teams",
    "UX Research",
    "Usability Testing",
    "Design Thinking"
  ];

  return (
    <div className="w-full mx-auto p-6 bg-[#F4F5FF] rounded-[20px]">
      {/* Candidate Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-[#4F52FF]">Preview</h2>
        <div className="flex flex-col md:flex-row items-center">
          <button className="text-[#036DF5] px-4 py-2 rounded  transition-colors">
            Change Resume
          </button>
          <div className="bg-[#D9D9D9] w-2 h-2 rounded-full hidden md:block"></div>
          <button className="text-[#036DF5] font-medium flex items-center gap-2 px-4 py-2 rounded hover:bg-indigo-700 transition-colors">
            Download
            <Download width={20} height={20} />
          </button>
        </div>
      </div>

      {/* Main CV Content */}
      <div className="bg-white rounded-lg shadow-lg p-6 h-[800px] overflow-auto no-scrollbar">
        {/* Candidate Profile */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 mb-8 w-max sm:w-full">
          <div className="flex items-center gap-4">
            <CVImage width={100} height={100} />
            <div>
              <h1 className="text-3xl font-bold text-white">John Doe</h1>
              <p className="text-lg text-indigo-200">Senior Product Manager</p>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-4">
            <div className="flex items-center text-indigo-200">
              <MailIcon className="w-5 h-5 mr-1" />
              <span className="text-wrap">john.doe@example.com</span>
            </div>
            <div className="flex items-center text-indigo-200">
              <PhoneIcon className="w-5 h-5 mr-1" />
              <span>(123) 456-7890</span>
            </div>
            <div className="flex items-center text-indigo-200">
              <GlobeAltIcon className="w-5 h-5 mr-1" />
              <span>linkedin.com/in/johndoe</span>
            </div>
          </div>
        </div>
        {/* Technical Skills Section */}
        <section className="mb-8 ">
          <h2 className="text-xl font-semibold text-gray-800 border-b-2 border-indigo-600 pb-2 mb-4">
            Technical Skills
          </h2>
          <div className="flex flex-wrap gap-3">
            {skills.map((skill, index) => (
              <span
                key={index}
                className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium shadow-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>

        {/* Work Experience Section */}
        <section className="w-max md:w-full">
          <h2 className="text-xl font-semibold text-gray-800 border-b-2 border-indigo-600 pb-2 mb-6">
            Work Experience
          </h2>
          <div className="space-y-8">
            {/* Work Experience Card: Coven Labs */}
            <div className="relative pl-8 border-l-4 border-indigo-600">
              <div className="absolute -left-4 top-0 bg-white rounded-full border-4 border-indigo-600 w-8 h-8 flex items-center justify-center">
                <BriefcaseIcon className="w-4 h-4 text-indigo-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-800">Coven Labs</h3>
              <div className="flex items-center text-sm text-gray-500 mt-1 gap-4">
                <div className="flex items-center">
                  <MapPinIcon className="w-4 h-4 mr-1" />
                  <span>Lagos</span>
                </div>
                <div className="flex items-center">
                  <CalendarDaysIcon className="w-4 h-4 mr-1" />
                  <span>Nov 2021 - Present</span>
                </div>
                <div className="flex items-center">
                  <BriefcaseIcon className="w-4 h-4 mr-1" />
                  <span>Product Management</span>
                </div>
              </div>
              <ul className="mt-4 space-y-3">
                <li className="flex items-start">
                  <CheckCircleIcon className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-1" />
                  <p className="ml-3 text-gray-700">
                    Supervised the mobile-first design approach for a Trivia
                    app, ensuring a seamless user experience that improved
                    engagement by 40%.
                  </p>
                </li>
                <li className="flex items-start">
                  <CheckCircleIcon className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-1" />
                  <p className="ml-3 text-gray-700">
                    Introduced an iterative design process, ensuring feedback
                    loops between design, development, and QA.
                  </p>
                </li>
                <li className="flex items-start">
                  <CheckCircleIcon className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-1" />
                  <p className="ml-3 text-gray-700">
                    Implemented user-centered design for an in-house product
                    that led to a 15% reduction in user drop-off.
                  </p>
                </li>
                <li className="flex items-start">
                  <CheckCircleIcon className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-1" />
                  <p className="ml-3 text-gray-700">
                    Led cross-functional teams to adopt design thinking,
                    resulting in a 40% increase in user engagement and a 25%
                    increase in revenue.
                  </p>
                </li>
              </ul>
            </div>

            {/* Work Experience Card: Chekher Health */}
            <div className="relative pl-8 border-l-4 border-indigo-600">
              <div className="absolute -left-4 top-0 bg-white rounded-full border-4 border-indigo-600 w-8 h-8 flex items-center justify-center">
                <BriefcaseIcon className="w-4 h-4 text-indigo-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-800">
                Chekher Health
              </h3>
              <div className="flex items-center text-sm text-gray-500 mt-1 gap-4">
                <div className="flex items-center">
                  <MapPinIcon className="w-4 h-4 mr-1" />
                  <span>Lagos</span>
                </div>
                <div className="flex items-center">
                  <CalendarDaysIcon className="w-4 h-4 mr-1" />
                  <span>Apr 2022 - Jan 2024</span>
                </div>
                <div className="flex items-center">
                  <BriefcaseIcon className="w-4 h-4 mr-1" />
                  <span>Product Management</span>
                </div>
              </div>
              <ul className="mt-4 space-y-3">
                <li className="flex items-start">
                  <CheckCircleIcon className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-1" />
                  <p className="ml-3 text-gray-700">
                    Collaborated with the marketing team to tap into the
                    existing user base, conceptualizing user-centric features
                    that led to a 30% increase in user retention.
                  </p>
                </li>
                <li className="flex items-start">
                  <CheckCircleIcon className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-1" />
                  <p className="ml-3 text-gray-700">
                    Oversaw the product lifecycle from ideation to launch,
                    facilitating cross-functional synergy among design,
                    engineering, and QA.
                  </p>
                </li>
                <li className="flex items-start">
                  <CheckCircleIcon className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-1" />
                  <p className="ml-3 text-gray-700">
                    Pioneered data-driven approaches to measure user engagement,
                    leading to a 50% boost in adoption rates.
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CV_Preview;

// import React from "react";
// import {
//   MapPinIcon,
//   CalendarDaysIcon,
//   BriefcaseIcon,
//   CheckCircleIcon,
// } from "@heroicons/react/24/outline";

// const CV_Preview: React.FC = () => {
//   // Convert the big string of technical skills into an array
//   // for a nicer "tag" display. If you want to keep them in a paragraph,
//   // you can remove this array approach.
//   const skills = [
//     "Agile Thinking",
//     "Data Interpretation",
//     "Project Management Tools like Jira, Trello, Miro and other Atlassian products",
//     "UI Design",
//     "GA Principles",
//     "Technical Writing",
//     "Power BI",
//     "CRM",
//     "Wireframing",
//     "Prototyping",
//     "UX Design",
//     "Figma",
//     "Notion",
//     "Cross-Functional Teams",
//     "Information Architecture",
//     "UX Research",
//     "Usability Testing",
//     "Human Centered Design",
//     "Design Thinking",
//     "Customer Journey Mapping",
//     "Creative Thinking",
//   ];

//   return (
//     <div className="max-w-3xl mx-auto mt-8">
//       <div className="bg-white rounded-lg shadow-lg p-6 relative">
//         {/* Header: Title + Buttons */}
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-2xl font-bold text-gray-800">Preview</h2>
//           <div className="flex space-x-3">
//             <button className="bg-indigo-50 text-indigo-600 px-4 py-2 rounded hover:bg-indigo-100 transition-colors">
//               Change Resume
//             </button>
//             <button className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition-colors">
//               Download
//             </button>
//           </div>
//         </div>

//         {/* Main CV Content (scrollable if too long) */}
//         <div className="overflow-auto h-[700px] pr-4 mr-[-16px]">
//           {/* TECHNICAL SKILLS */}
//           <section className="mb-8">
//             <h3 className="text-xl font-semibold text-gray-700 border-l-4 border-indigo-600 pl-3 mb-4 uppercase tracking-wider">
//               Technical Skills
//             </h3>
//             <div className="flex flex-wrap gap-2">
//               {skills.map((skill, idx) => (
//                 <span
//                   key={idx}
//                   className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full text-sm"
//                 >
//                   {skill}
//                 </span>
//               ))}
//             </div>
//           </section>

//           {/* WORK EXPERIENCE */}
//           <section>
//             <h3 className="text-xl font-semibold text-gray-700 border-l-4 border-indigo-600 pl-3 mb-6 uppercase tracking-wider">
//               Work Experience
//             </h3>

//             {/* COVEN LABS */}
//             <div className="mb-8 pl-4 border-l-2 border-gray-200">
//               <div className="flex items-center mb-2 space-x-2">
//                 <h4 className="text-lg font-semibold">Coven Labs</h4>
//                 <div className="text-sm text-gray-500 flex items-center space-x-1">
//                   <MapPinIcon className="w-4 h-4" />
//                   <span>Lagos</span>
//                 </div>
//               </div>
//               <div className="flex flex-wrap items-center text-sm text-gray-500 space-x-4 mb-2">
//                 <div className="flex items-center space-x-1">
//                   <CalendarDaysIcon className="w-4 h-4" />
//                   <span>Nov 2021 - Present</span>
//                 </div>
//                 <div className="flex items-center space-x-1">
//                   <BriefcaseIcon className="w-4 h-4" />
//                   <span>Product Management</span>
//                 </div>
//               </div>
//               <ul className="list-none ml-0 mt-2 space-y-2">
//                 <li className="flex items-start space-x-2">
//                   <CheckCircleIcon className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
//                   <span>
//                     Supervised the mobile-first design approach for a Trivia
//                     app, ensuring a seamless user experience that improved
//                     engagement by 40%.
//                   </span>
//                 </li>
//                 <li className="flex items-start space-x-2">
//                   <CheckCircleIcon className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
//                   <span>
//                     Introduced an iterative design process, ensuring feedback
//                     loops between design, development, and QA.
//                   </span>
//                 </li>
//                 <li className="flex items-start space-x-2">
//                   <CheckCircleIcon className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
//                   <span>
//                     Implemented user-centered design for an in-house product
//                     that led to a 15% reduction in user drop-off.
//                   </span>
//                 </li>
//                 <li className="flex items-start space-x-2">
//                   <CheckCircleIcon className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
//                   <span>
//                     Led cross-functional teams to adopt design thinking,
//                     resulting in a 40% increase in user engagement and a 25%
//                     increase in revenue.
//                   </span>
//                 </li>
//               </ul>
//             </div>

//             {/* CHEKHER HEALTH */}
//             <div className="mb-8 pl-4 border-l-2 border-gray-200">
//               <div className="flex items-center mb-2 space-x-2">
//                 <h4 className="text-lg font-semibold">Chekher Health</h4>
//                 <div className="text-sm text-gray-500 flex items-center space-x-1">
//                   <MapPinIcon className="w-4 h-4" />
//                   <span>Lagos</span>
//                 </div>
//               </div>
//               <div className="flex flex-wrap items-center text-sm text-gray-500 space-x-4 mb-2">
//                 <div className="flex items-center space-x-1">
//                   <CalendarDaysIcon className="w-4 h-4" />
//                   <span>Apr 2022 - Jan 2024</span>
//                 </div>
//                 <div className="flex items-center space-x-1">
//                   <BriefcaseIcon className="w-4 h-4" />
//                   <span>Product Management</span>
//                 </div>
//               </div>
//               <ul className="list-none ml-0 mt-2 space-y-2">
//                 <li className="flex items-start space-x-2">
//                   <CheckCircleIcon className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
//                   <span>
//                     Collaborated with the marketing team to tap into existing
//                     user base, conceptualizing user-centric features that led to
//                     a 30% increase in user retention.
//                   </span>
//                 </li>
//                 <li className="flex items-start space-x-2">
//                   <CheckCircleIcon className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
//                   <span>
//                     Oversaw the product lifecycle from ideation to launch,
//                     facilitating cross-functional synergy among design,
//                     engineering, and QA.
//                   </span>
//                 </li>
//                 <li className="flex items-start space-x-2">
//                   <CheckCircleIcon className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
//                   <span>
//                     Pioneered data-driven approaches to measure user engagement,
//                     leading to a 50% boost in adoption rates.
//                   </span>
//                 </li>
//               </ul>
//             </div>

//             {/* FRESHSTREAMS DIGITAL */}
//             <div className="mb-8 pl-4 border-l-2 border-gray-200">
//               <div className="flex items-center mb-2 space-x-2">
//                 <h4 className="text-lg font-semibold">Freshstreams Digital</h4>
//                 <div className="text-sm text-gray-500 flex items-center space-x-1">
//                   <MapPinIcon className="w-4 h-4" />
//                   <span>Lagos</span>
//                 </div>
//               </div>
//               <div className="flex flex-wrap items-center text-sm text-gray-500 space-x-4 mb-2">
//                 <div className="flex items-center space-x-1">
//                   <CalendarDaysIcon className="w-4 h-4" />
//                   <span>Jan 2021 - Sep 2022</span>
//                 </div>
//                 <div className="flex items-center space-x-1">
//                   <BriefcaseIcon className="w-4 h-4" />
//                   <span>Product Design</span>
//                 </div>
//               </div>
//               <ul className="list-none ml-0 mt-2 space-y-2">
//                 <li className="flex items-start space-x-2">
//                   <CheckCircleIcon className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
//                   <span>
//                     Led the creation of precise wireframes, user journey, user
//                     flow, and interactive prototypes for a Next.js WebApp,
//                     ensuring an enhanced user experience.
//                   </span>
//                 </li>
//                 <li className="flex items-start space-x-2">
//                   <CheckCircleIcon className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
//                   <span>
//                     Facilitated effective communication of design concepts and
//                     product requirements across cross-functional teams.
//                   </span>
//                 </li>
//               </ul>
//             </div>

//             {/* SEFIT INC. */}
//             <div className="mb-8 pl-4 border-l-2 border-gray-200">
//               <div className="flex items-center mb-2 space-x-2">
//                 <h4 className="text-lg font-semibold">Sefit Inc.</h4>
//               </div>
//               <div className="flex flex-wrap items-center text-sm text-gray-500 space-x-4 mb-2">
//                 <div className="flex items-center space-x-1">
//                   <CalendarDaysIcon className="w-4 h-4" />
//                   <span>Sept. 2020 - Mar. 2021</span>
//                 </div>
//                 <div className="flex items-center space-x-1">
//                   <BriefcaseIcon className="w-4 h-4" />
//                   <span>UI Design</span>
//                 </div>
//               </div>
//               <ul className="list-none ml-0 mt-2 space-y-2">
//                 <li className="flex items-start space-x-2">
//                   <CheckCircleIcon className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
//                   <span>
//                     Collaborated with a design team to create comprehensive user
//                     flows and wireframes, ensuring consistent design patterns
//                     and brand identity.
//                   </span>
//                 </li>
//                 <li className="flex items-start space-x-2">
//                   <CheckCircleIcon className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
//                   <span>
//                     Utilized prototyping tools to develop interactive mockups,
//                     accelerating stakeholder buy-in and product iteration cycles.
//                   </span>
//                 </li>
//               </ul>
//             </div>
//           </section>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CV_Preview;
