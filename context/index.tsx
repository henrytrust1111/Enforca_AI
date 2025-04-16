"use client";

import React, { useState, useContext, createContext, Dispatch, SetStateAction, useEffect } from "react";
import axiosInstance from "@/lib/axiosInstance";
import { toast } from "react-toastify";

type SectionState = {
  [key: string]: "original" | "corrected";
};

interface MyContextType {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  autoFixVersion: number;
  triggerAutoFix: () => Promise<void>;
  isLoading: boolean;
  sectionChoices: SectionState;
  originalData: any;
  correctedData: any;
  setSectionChoices: Dispatch<SetStateAction<SectionState>>;
  setOriginalData: Dispatch<SetStateAction<any>>;
  setCorrectedData: Dispatch<SetStateAction<any>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  analysisResult: any; 
  setAnalysisResult: Dispatch<SetStateAction<any>>;
}

const MyContext = createContext<MyContextType | null>(null);

export const AppWrapper: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [autoFixVersion, setAutoFixVersion] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [sectionChoices, setSectionChoices] = useState<SectionState>({});
  const [originalData, setOriginalData] = useState<any>({});
  const [correctedData, setCorrectedData] = useState<any>({});
  const [analysisResult, setAnalysisResult] = useState<any>({});

  useEffect(() => {
    const cvData = JSON.parse(localStorage.getItem("cvData") || "{}");
    setAnalysisResult(cvData?.data?.analysisResult || {});
  }, []);


  const triggerAutoFix = async () => {
    setIsLoading(true);
    try {
      const cvData = JSON.parse(localStorage.getItem("cvData") || "{}");
      const resumeId = cvData?.data?._id;
      const correctedResumeData = cvData?.data?.analysisResult?.correctedResumeData;

      if (!resumeId) {
        throw new Error("Missing resume ID");
      }
      if (!correctedResumeData) {
        throw new Error("No corrections available");
      }

      // Call update-resume endpoint
      const response = await axiosInstance.get(`/resumes/fix-all/${resumeId}`);

      // Update localStorage with new data
      const updatedData = response.data.data;
      localStorage.setItem("cvData", JSON.stringify(response.data));

      // Update context state
      setOriginalData(updatedData.resumeData);
      setCorrectedData(updatedData.analysisResult?.correctedResumeData || {});

      // Mark all sections as corrected
      const newChoices: SectionState = {};
      Object.keys(correctedResumeData).forEach(section => {
        if (section === 'experience') {
          correctedResumeData.experience.forEach((_: any, index: number) => {
            newChoices[`experience-${index}`] = "corrected";
          });
        } else {
          newChoices[section] = "corrected";
        }
      });
      setSectionChoices(newChoices);

      setAutoFixVersion(prev => prev + 1);
      toast.success("All fixes applied successfully!");
    } catch (error) {
      console.error("Auto fix failed:", error);
      toast.error("Failed to apply automatic fixes");
    } finally {
      setIsLoading(false);
      localStorage.removeItem("autoFixAll");
    }
  };

  return (
    <MyContext.Provider
      value={{
        isOpen,
        setIsOpen,
        autoFixVersion,
        triggerAutoFix,
        isLoading,
        sectionChoices,
        originalData, 
        correctedData,
        setSectionChoices,
        setOriginalData,
        setCorrectedData,
        setIsLoading,
        analysisResult,
        setAnalysisResult
      }}
    >
      {children}
    </MyContext.Provider>
  );
};

export function useMyContext(): MyContextType {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error("useMyContext must be used within a Context provider");
  }
  return context;
}
// "use client";

// import React, { useState, useContext, createContext, Dispatch, SetStateAction, useEffect } from "react";
// import axiosInstance from "@/lib/axiosInstance";
// import { toast } from "react-toastify";

// type SectionState = {
//   [key: string]: "original" | "corrected";
// };

// interface MyContextType {
//   isOpen: boolean;
//   setIsOpen: Dispatch<SetStateAction<boolean>>;
//   autoFixVersion: number;
//   triggerAutoFix: () => Promise<void>;
//   isLoading: boolean;
//   sectionChoices: SectionState;
//   originalData: any;
//   correctedData: any;
//   setSectionChoices: Dispatch<SetStateAction<SectionState>>;
//   setOriginalData: Dispatch<SetStateAction<any>>;
//   setCorrectedData: Dispatch<SetStateAction<any>>;
//   setIsLoading: Dispatch<SetStateAction<boolean>>;
//   analysisResult: any; 
//   setAnalysisResult: Dispatch<SetStateAction<any>>;
// }

// const MyContext = createContext<MyContextType | null>(null);

// export const AppWrapper: React.FC<{ children: React.ReactNode }> = ({
//   children
// }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [autoFixVersion, setAutoFixVersion] = useState(0);
//   const [isLoading, setIsLoading] = useState(false);
//   const [sectionChoices, setSectionChoices] = useState<SectionState>({});
//   const [originalData, setOriginalData] = useState<any>({});
//   const [correctedData, setCorrectedData] = useState<any>({});
//   const [analysisResult, setAnalysisResult] = useState<any>({});

//   useEffect(() => {
//     const cvData = JSON.parse(localStorage.getItem("cvData") || "{}");
//     setAnalysisResult(cvData?.data?.analysisResult || {});
//   }, []);


//   const triggerAutoFix = async () => {
//     setIsLoading(true);
//     try {
//       const cvData = JSON.parse(localStorage.getItem("cvData") || "{}");
//       const resumeId = cvData?.data?._id;
//       const correctedResumeData = cvData?.data?.analysisResult?.correctedResumeData;

//       if (!resumeId) {
//         throw new Error("Missing resume ID");
//       }
//       if (!correctedResumeData) {
//         throw new Error("No corrections available");
//       }

//       // Call update-resume endpoint
//       const response = await axiosInstance.put("/resumes/update-resume", {
//         resumeId,
//         updates: correctedResumeData
//       });

//       // Update localStorage with new data
//       const updatedData = response.data.data;
//       localStorage.setItem("cvData", JSON.stringify(response.data));

//       // Update context state
//       setOriginalData(updatedData.resumeData);
//       setCorrectedData(updatedData.analysisResult?.correctedResumeData || {});

//       // Mark all sections as corrected
//       const newChoices: SectionState = {};
//       Object.keys(correctedResumeData).forEach(section => {
//         if (section === 'experience') {
//           correctedResumeData.experience.forEach((_: any, index: number) => {
//             newChoices[`experience-${index}`] = "corrected";
//           });
//         } else {
//           newChoices[section] = "corrected";
//         }
//       });
//       setSectionChoices(newChoices);

//       setAutoFixVersion(prev => prev + 1);
//       toast.success("All fixes applied successfully!");
//     } catch (error) {
//       console.error("Auto fix failed:", error);
//       toast.error("Failed to apply automatic fixes");
//     } finally {
//       setIsLoading(false);
//       localStorage.removeItem("autoFixAll");
//     }
//   };

//   return (
//     <MyContext.Provider
//       value={{
//         isOpen,
//         setIsOpen,
//         autoFixVersion,
//         triggerAutoFix,
//         isLoading,
//         sectionChoices,
//         originalData, 
//         correctedData,
//         setSectionChoices,
//         setOriginalData,
//         setCorrectedData,
//         setIsLoading,
//         analysisResult,
//         setAnalysisResult
//       }}
//     >
//       {children}
//     </MyContext.Provider>
//   );
// };

// export function useMyContext(): MyContextType {
//   const context = useContext(MyContext);
//   if (!context) {
//     throw new Error("useMyContext must be used within a Context provider");
//   }
//   return context;
// }
