"use client";

import { useState } from "react";
import { useRouter } from "next-nprogress-bar";
import AuthLeft from "@/components/auth/AuthLeft";
import { Logo2 } from "@/components/icons/Icons";
import { CheckCircle } from "lucide-react";
import NeedAssessment from "@/components/assist/NeedAssessment";
import CVUpload from "@/components/assist/CVUpload";
import axiosInstance from "@/lib/axiosInstance";
import toast from "react-hot-toast";
import { ToastContainer } from "react-toastify";

const Assessment: React.FC = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("Need Assessment");
  const [needAssessmentComplete, setNeedAssessmentComplete] = useState(false);
  const [industry, setIndustry] = useState('');
  const [priorExperience, setPriorExperience] = useState('');
  const [experienceYears, setExperienceYears] = useState('');
  const [skills, setSkills] = useState('');
  const [loading, setLoading] = useState(false);

  const handleProceedFromAssessment = (data: {
    industry: string;
    priorExperience: string;
    experienceYears: string;
    skills: string;
  }) => {
    setIndustry(data.industry);
    setPriorExperience(data.priorExperience);
    setExperienceYears(data.experienceYears);
    setSkills(data.skills);
    setNeedAssessmentComplete(true);
    setActiveTab("CV Upload");
  };

  // Handle CV upload
  const handleCVUploadProceed = async (file: File) => {
    const formData = new FormData();
    formData.append('industry', industry);
    formData.append('priorExperience', priorExperience);
    formData.append('experienceYears', experienceYears);
    formData.append('skills', skills);
    formData.append('resume', file);

    try {
      setLoading(true);
      await axiosInstance.post('/resumes/upload-analyze', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      // Handle success (e.g., redirect or show result)
      router.push('/cv-board');
    } catch (error: any) {
      console.error('Upload failed:', error);
     toast(error.response.data.message, { icon: '❌' });
    }finally{
      setLoading(false);
    }
  };

  function handleClick() {
    router.push("/"); // Redirect to home page on logo click
  }

  // When clicking on the CV Upload tab, check if assessment is complete
  const handleTabClick = (tab: string) => {
    if (tab === "CV Upload" && !needAssessmentComplete) {
      alert("Please complete the Need Assessment before proceeding.");
      return;
    }
    setActiveTab(tab);
  };

  return (
    <>
    <ToastContainer />
    <div className="grid lg:grid-cols-2 min-h-screen">
      {/* Left Section (Image & Text) */}
      <AuthLeft />

      {/* Right Section (Form Section) */}
      <div className="flex flex-col h-screen sm:h-full items-center sm:justify-center sm:p-6 md:bg-white">
        <div className="w-full max-w-sm bg-[#F4F8FD] sm:bg-transparent md:space-y-12">
          <div className="sm:text-center flex flex-col sm:items-center text-black-100 gap-6 p-4 sm:p-0">
            {/* Logo */}
            <div
              onClick={handleClick}
              className="flex items-center space-x-2 w-max cursor-pointer"
            >
              <Logo2 width={35} height={35} />
              <span className="text-base md:text-xl mt-2 font-bold">
                GetreKruitd
              </span>
            </div>
          </div>
          <div className="rounded-t-[40px] sm:rounded-t-none p-4 sm:p-0 mt-3 sm:mt-0 bg-white">
            {/* Tabs */}
            <div className="flex border-b mb-4 w-full">
              <button
                className={`flex-1 p-2 text-center text-sm flex items-center justify-center gap-3 font-medium ${
                  activeTab === "Need Assessment"
                    ? "border-b-2 border-[#9CB3D7] text-[#36A1C5] md:bg-[#F7FBFD]"
                    : "text-gray-500"
                }`}
                onClick={() => setActiveTab("Need Assessment")}
              >
                <CheckCircle /> <p>Need Assessment</p>
              </button>
              <button
                className={`flex-1 p-2 text-center text-sm flex items-center justify-center gap-3 font-medium ${
                  activeTab === "CV Upload"
                    ? "border-b-2 border-[#9CB3D7] text-[#36A1C5] md:bg-[#F7FBFD]"
                    : "text-gray-500"
                }`}
                onClick={() => handleTabClick("CV Upload")}
              >
                <CheckCircle size={20} /> <p>CV Upload</p>
              </button>
            </div>
            {activeTab === "Need Assessment" ? (
              <NeedAssessment onProceed={handleProceedFromAssessment} />
            ) : (
              <CVUpload
                onBack={() => setActiveTab("Need Assessment")}
                onProceed={handleCVUploadProceed}
                loading={loading}
              />
            )}
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Assessment;

// "use client";

// import { useState } from "react";
// import { useRouter } from "next-nprogress-bar";
// import AuthLeft from "@/components/auth/AuthLeft";
// import { Logo2 } from "@/components/icons/Icons";
// import { CheckCircle } from "lucide-react";
// import NeedAssessment from "@/components/assist/NeedAssessment";
// import CVUpload from "@/components/assist/CVUpload";
// import axiosInstance from "@/lib/axiosInstance";

// const Assessment: React.FC = () => {
//   const router = useRouter();
//   const [activeTab, setActiveTab] = useState("Need Assessment");
//   const [needAssessmentComplete, setNeedAssessmentComplete] = useState(false);

//   function handleClick() {
//     router.push("/"); // Redirect to home page on logo click
//   }

//   // Callback when NeedAssessment is complete
//   const handleProceedFromAssessment = () => {
//     setNeedAssessmentComplete(true);
//     setActiveTab("CV Upload");
//   };

//   // When clicking on the CV Upload tab, check if assessment is complete
//   const handleTabClick = (tab: string) => {
//     if (tab === "CV Upload" && !needAssessmentComplete) {
//       alert("Please complete the Need Assessment before proceeding.");
//       return;
//     }
//     setActiveTab(tab);
//   };

//   return (
//     <div className="grid lg:grid-cols-2 min-h-screen">
//       {/* Left Section (Image & Text) */}
//       <AuthLeft />

//       {/* Right Section (Form Section) */}
//       <div className="flex flex-col h-screen sm:h-full items-center sm:justify-center sm:p-6 md:bg-white">
//         <div className="w-full max-w-sm bg-[#F4F8FD] sm:bg-transparent md:space-y-12">
//           <div className="sm:text-center flex flex-col sm:items-center text-black-100 gap-6 p-4 sm:p-0">
//             {/* Logo */}
//             <div
//               onClick={handleClick}
//               className="flex items-center space-x-2 w-max cursor-pointer"
//             >
//               <Logo2 width={35} height={35} />
//               <span className="text-base md:text-xl mt-2 font-bold">
//                 GetreKruitd
//               </span>
//             </div>
//           </div>
//           <div className="rounded-t-[40px] sm:rounded-t-none p-4 sm:p-0 mt-3 sm:mt-0 bg-white">
//             {/* Tabs */}
//             <div className="flex border-b mb-4 w-full">
//               <button
//                 className={`flex-1 p-2 text-center text-sm flex items-center justify-center gap-3 font-medium ${
//                   activeTab === "Need Assessment"
//                     ? "border-b-2 border-[#9CB3D7] text-[#36A1C5] md:bg-[#F7FBFD]"
//                     : "text-gray-500"
//                 }`}
//                 onClick={() => setActiveTab("Need Assessment")}
//               >
//                 <CheckCircle /> <p>Need Assessment</p>
//               </button>
//               <button
//                 className={`flex-1 p-2 text-center text-sm flex items-center justify-center gap-3 font-medium ${
//                   activeTab === "CV Upload"
//                     ? "border-b-2 border-[#9CB3D7] text-[#36A1C5] md:bg-[#F7FBFD]"
//                     : "text-gray-500"
//                 }`}
//                 onClick={() => handleTabClick("CV Upload")}
//               >
//                 <CheckCircle size={20} /> <p>CV Upload</p>
//               </button>
//             </div>
//             {activeTab === "Need Assessment" ? (
//               <NeedAssessment onProceed={handleProceedFromAssessment} />
//             ) : (
//               <CVUpload onBack={() => setActiveTab("Need Assessment")} />
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Assessment;
