// components/CV_Preview.tsx
import React, { useState, useRef } from "react";
import { CV_Template1 } from "./CV_Template1";
import { CV_Template2 } from "./CV_Template2";
import { Download } from "../icons/Icons";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import CV_Template3 from "./CV_Template3";

const CV_Preview: React.FC = () => {
  const [currentTemplate, setCurrentTemplate] = useState<
    "template1" | "template2" | "template3"
  >("template1");
  const cvRef = useRef<HTMLDivElement>(null);

  const generatePDF = async (openInNewTab: boolean = false) => {
    if (!cvRef.current) return;
  
    // Ensure full content is visible before rendering
    const originalStyles = {
      width: cvRef.current.style.width,
      height: cvRef.current.style.height,
      overflow: cvRef.current.style.overflow,
    };
  
    cvRef.current.style.width = "210mm";  // Match A4 width
    cvRef.current.style.height = "auto"; // Allow full expansion
    cvRef.current.style.overflow = "visible";
  
    const canvas = await html2canvas(cvRef.current, {
      scale: 2, // Higher scale for better quality
      scrollY: -window.scrollY,
      useCORS: true,
      windowWidth: cvRef.current.scrollWidth, // Ensure full width is captured
    });
  
    // Restore original styles
    cvRef.current.style.width = originalStyles.width;
    cvRef.current.style.height = originalStyles.height;
    cvRef.current.style.overflow = originalStyles.overflow;
  
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("a4");
    // const pdf = new jsPDF("p", "mm", "a4");
    const imgWidth = 210;
    const pageHeight = 297;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
  
    let heightLeft = imgHeight;
    let position = 0;
  
    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;
  
    while (heightLeft > 0) {
      position -= pageHeight; // Move to the next page
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }
  
    if (openInNewTab) {
      const pdfBlob = pdf.output("blob");
      const pdfUrl = URL.createObjectURL(pdfBlob);
      window.open(pdfUrl, "_blank");
    } else {
      pdf.save("cv.pdf");
    }
  };
  

  // const generatePDF = async (openInNewTab: boolean = false) => {
  //   if (!cvRef.current) return;
  
  //   // Ensure full content is visible before rendering
  //   const originalStyles = {
  //     width: cvRef.current.style.width,
  //     height: cvRef.current.style.height,
  //     overflow: cvRef.current.style.overflow,
  //   };
  
  //   cvRef.current.style.width = "210mm";  // Match A4 width
  //   cvRef.current.style.height = "auto"; // Allow full expansion
  //   cvRef.current.style.overflow = "visible";
  
  //   const canvas = await html2canvas(cvRef.current, {
  //     scale: 2, // Higher scale for better quality
  //     scrollY: -window.scrollY,
  //     useCORS: true,
  //     windowWidth: cvRef.current.scrollWidth, // Ensure full width is captured
  //   });
  
  //   // Restore original styles
  //   cvRef.current.style.width = originalStyles.width;
  //   cvRef.current.style.height = originalStyles.height;
  //   cvRef.current.style.overflow = originalStyles.overflow;
  
  //   const imgData = canvas.toDataURL("image/png");
  //   const pdf = new jsPDF("p", "mm", "a4");
  //   const imgWidth = 210;
  //   const pageHeight = 297;
  //   const imgHeight = (canvas.height * imgWidth) / canvas.width;
  
  //   let heightLeft = imgHeight;
  //   let position = 0;
  
  //   pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
  //   heightLeft -= pageHeight;
  
  //   while (heightLeft > 0) {
  //     position -= pageHeight; // Move to the next page
  //     pdf.addPage();
  //     pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
  //     heightLeft -= pageHeight;
  //   }
  
  //   if (openInNewTab) {
  //     const pdfBlob = pdf.output("blob");
  //     const pdfUrl = URL.createObjectURL(pdfBlob);
  //     window.open(pdfUrl, "_blank");
  //   } else {
  //     pdf.save("cv.pdf");
  //   }
  // };
  

  const handleDownload = async () => {
    await generatePDF();
  };

  const handlePreview = async () => {
    await generatePDF(true);
  };

  return (
    <div className="w-full mx-auto p-6 bg-[#F4F5FF] rounded-[20px]">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-[#4F52FF]">Preview</h2>
        <div className="flex flex-col md:flex-row items-center gap-4">
          <button
            onClick={() =>
              setCurrentTemplate((prev) =>
                prev === "template1"
                  ? "template2"
                  : prev === "template2"
                  ? "template3"
                  : "template1"
              )
            }
            className="text-[#036DF5] px-4 py-2 rounded hover:bg-indigo-100 transition-colors"
          >
             Change Template ({currentTemplate === "template1" ? "2" : currentTemplate === "template2" ? "3" : "1"})
          </button>
          <button
            onClick={handlePreview}
            className="text-[#036DF5] px-4 py-2 rounded hover:bg-indigo-100 transition-colors"
          >
            Preview PDF
          </button>
          <button
            onClick={handleDownload}
            className="text-[#036DF5] font-medium flex items-center gap-2 px-4 py-2 rounded hover:bg-indigo-100 transition-colors"
          >
            Download PDF
            <Download width={20} height={20} />
          </button>
        </div>
      </div>

      <div ref={cvRef} className="pdf-container">
        {currentTemplate === "template1" ? <CV_Template1 /> : currentTemplate === "template2" ? <CV_Template2 /> : <CV_Template3 />}
      </div>
    </div>
  );
};

export default CV_Preview;

// // components/CV_Preview.tsx
// import React, { useState, useRef } from "react";
// import { CV_Template1 } from "./CV_Template1";
// import { CV_Template2 } from "./CV_Template2";
// import { Download } from "../icons/Icons";
// import html2canvas from "html2canvas";
// import jsPDF from "jspdf";

// const CV_Preview: React.FC = () => {
//   const [currentTemplate, setCurrentTemplate] = useState<
//     "template1" | "template2"
//   >("template1");
//   const cvRef = useRef<HTMLDivElement>(null);

//   const handleDownload = async () => {
//     if (!cvRef.current) return;

//     const canvas = await html2canvas(cvRef.current, { scale: 2 });
//     const imgData = canvas.toDataURL("image/png");
//     const pdf = new jsPDF("p", "mm", "a4");
//     const imgWidth = 210; // A4 width in mm
//     const imgHeight = (canvas.height * imgWidth) / canvas.width;

//     pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
//     pdf.save("cv.pdf");
//   };

//   return (
//     <div className="w-full mx-auto p-6 bg-[#F4F5FF] rounded-[20px]">
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-2xl font-bold text-[#4F52FF]">Preview</h2>
//         <div className="flex flex-col md:flex-row items-center gap-4">
//           <button
//             onClick={() =>
//               setCurrentTemplate((prev) =>
//                 prev === "template1" ? "template2" : "template1"
//               )
//             }
//             className="text-[#036DF5] px-4 py-2 rounded hover:bg-indigo-100 transition-colors"
//           >
//             Change Resume (
//             {currentTemplate === "template1" ? "Template 2" : "Template 1"})
//           </button>
//           <button
//             onClick={handleDownload}
//             className="text-[#036DF5] font-medium flex items-center gap-2 px-4 py-2 rounded hover:bg-indigo-100 transition-colors"
//           >
//             Download as PDF
//             <Download width={20} height={20} />
//           </button>
//         </div>
//       </div>

//       <div ref={cvRef}>
//         {currentTemplate === "template1" ? <CV_Template1 /> : <CV_Template2 />}
//       </div>
//     </div>
//   );
// };

// export default CV_Preview;

// import React from "react";
// import {
//   MapPinIcon,
//   CalendarDaysIcon,
//   BriefcaseIcon,
//   CheckCircleIcon,
//   PhoneIcon,
//   GlobeAltIcon
// } from "@heroicons/react/24/outline";
// import { MailIcon } from "lucide-react";
// import { CVImage, Download } from "../icons/Icons";

// const CV_Preview: React.FC = () => {
//   // Sample list of technical skills displayed as pills.
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
//     <div className="w-full mx-auto p-6 bg-[#F4F5FF] rounded-[20px]">
//       {/* Candidate Header */}
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-2xl font-bold text-[#4F52FF]">Preview</h2>
//         <div className="flex flex-col md:flex-row items-center">
//           <button className="text-[#036DF5] px-4 py-2 rounded  transition-colors">
//             Change Resume
//           </button>
//           <div className="bg-[#D9D9D9] w-2 h-2 rounded-full hidden md:block"></div>
//           <button className="text-[#036DF5] font-medium flex items-center gap-2 px-4 py-2 rounded hover:bg-indigo-700 transition-colors">
//             Download
//             <Download width={20} height={20} />
//           </button>
//         </div>
//       </div>

//       {/* Main CV Content */}
//       <div className="bg-white rounded-lg shadow-lg p-6 h-[800px] overflow-auto no-scrollbar">
//         {/* Candidate Profile */}
//         <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 mb-8 w-max sm:w-full">
//           <div className="flex items-center gap-4">
//             <CVImage width={100} height={100} />
//             <div>
//               <h1 className="text-3xl font-bold text-white">John Doe</h1>
//               <p className="text-lg text-indigo-200">Senior Product Manager</p>
//             </div>
//           </div>
//           <div className="mt-4 flex flex-wrap gap-4">
//             <div className="flex items-center text-indigo-200">
//               <MailIcon className="w-5 h-5 mr-1" />
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
//     </div>
//   );
// };

// export default CV_Preview;

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
