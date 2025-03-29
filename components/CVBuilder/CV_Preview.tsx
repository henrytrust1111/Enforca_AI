

// components/CV_Preview.tsx
import React, { useState, useRef } from "react";
import { Download } from "../icons/Icons";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import CV_Template1 from "./CV_Template1";
import CV_Template3 from "./CV_Template3";

const CV_Preview: React.FC = () => {
  const [currentTemplate, setCurrentTemplate] = useState<
    "template1" | "template2"
  >("template1");
  const cvRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (!cvRef.current) return;

    const canvas = await html2canvas(cvRef.current, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const imgWidth = 210; // A4 width in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
    pdf.save("cv.pdf");
  };

  return (
    <div className="w-full mx-auto p-6 bg-[#F4F5FF] rounded-[20px]">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-[#4F52FF]">Preview</h2>
        <div className="flex flex-col md:flex-row items-center gap-4">
          <button
            onClick={() =>
              setCurrentTemplate((prev) =>
                prev === "template1" ? "template2" : "template1"
              )
            }
            className="text-[#036DF5] px-4 py-2 rounded hover:bg-indigo-100 transition-colors"
          >
            Change Resume (
            {currentTemplate === "template1" ? "Template 2" : "Template 1"})
          </button>
          <button
            onClick={handleDownload}
            className="text-[#036DF5] font-medium flex items-center gap-2 px-4 py-2 rounded hover:bg-indigo-100 transition-colors"
          >
            Download as PDF
            <Download width={20} height={20} />
          </button>
        </div>
      </div>

      <div ref={cvRef}>
        {currentTemplate === "template1" ? <CV_Template1 /> : <CV_Template3 />}
      </div>
    </div>
  );
};

export default CV_Preview;




// import React, { useState, useRef } from "react";
// import { CV_Template2 } from "./CV_Template2";
// import { Download } from "../icons/Icons";
// import html2canvas from "html2canvas";
// import jsPDF from "jspdf";
// import CV_Template3 from "./CV_Template3";
// import CV_Template1 from "./CV_Template1";

// const CV_Preview: React.FC = () => {
//   const [currentTemplate, setCurrentTemplate] = useState<
//     "template1" | "template2" | "template3"
//   >("template1");
//   const cvRef = useRef<HTMLDivElement>(null);

//   const generatePDF = async (openInNewTab: boolean = false) => {
//     if (!cvRef.current) return;
  
//     // Ensure full content is visible before rendering
//     const originalStyles = {
//       width: cvRef.current.style.width,
//       height: cvRef.current.style.height,
//       overflow: cvRef.current.style.overflow,
//     };
  
//     cvRef.current.style.width = "210mm";  // Match A4 width
//     cvRef.current.style.height = "auto"; // Allow full expansion
//     cvRef.current.style.overflow = "visible";
  
//     const canvas = await html2canvas(cvRef.current, {
//       scale: 2, // Higher scale for better quality
//       scrollY: -window.scrollY,
//       useCORS: true,
//       windowWidth: cvRef.current.scrollWidth, // Ensure full width is captured
//     });
  
//     // Restore original styles
//     cvRef.current.style.width = originalStyles.width;
//     cvRef.current.style.height = originalStyles.height;
//     cvRef.current.style.overflow = originalStyles.overflow;
  
//     const imgData = canvas.toDataURL("image/png");
//     const pdf = new jsPDF("a4");
//     // const pdf = new jsPDF("p", "mm", "a4");
//     const imgWidth = 210;
//     const pageHeight = 297;
//     const imgHeight = (canvas.height * imgWidth) / canvas.width;
  
//     let heightLeft = imgHeight;
//     let position = 0;
  
//     pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
//     heightLeft -= pageHeight;
  
//     while (heightLeft > 0) {
//       position -= pageHeight; // Move to the next page
//       pdf.addPage();
//       pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
//       heightLeft -= pageHeight;
//     }
  
//     if (openInNewTab) {
//       const pdfBlob = pdf.output("blob");
//       const pdfUrl = URL.createObjectURL(pdfBlob);
//       window.open(pdfUrl, "_blank");
//     } else {
//       pdf.save("cv.pdf");
//     }
//   };

  

//   const handleDownload = async () => {
//     await generatePDF();
//   };

//   const handlePreview = async () => {
//     await generatePDF(true);
//   };

//   return (
//     <div className="w-full mx-auto p-6 bg-[#F4F5FF] rounded-[20px]">
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-2xl font-bold text-[#4F52FF]">Preview</h2>
//         <div className="flex flex-col md:flex-row items-center gap-4">
//           <button
//             onClick={() =>
//               setCurrentTemplate((prev) =>
//                 prev === "template1"
//                   ? "template2"
//                   : prev === "template2"
//                   ? "template3"
//                   : "template1"
//               )
//             }
//             className="text-[#036DF5] px-4 py-2 rounded hover:bg-indigo-100 transition-colors"
//           >
//              Change Template ({currentTemplate === "template1" ? "2" : currentTemplate === "template2" ? "3" : "1"})
//           </button>
//           <button
//             onClick={handlePreview}
//             className="text-[#036DF5] px-4 py-2 rounded hover:bg-indigo-100 transition-colors"
//           >
//             Preview PDF
//           </button>
//           <button
//             onClick={handleDownload}
//             className="text-[#036DF5] font-medium flex items-center gap-2 px-4 py-2 rounded hover:bg-indigo-100 transition-colors"
//           >
//             Download PDF
//             <Download width={20} height={20} />
//           </button>
//         </div>
//       </div>

//       <div ref={cvRef} className="pdf-container">
//         {currentTemplate === "template1" ? <CV_Template1 /> : currentTemplate === "template2" ? <CV_Template2 /> : <CV_Template3 />}
//       </div>
//     </div>
//   );
// };

// export default CV_Preview;