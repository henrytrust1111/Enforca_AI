import React, { useEffect, useState } from "react";
import { HiOutlineBan } from "react-icons/hi";
import { ArrowRight } from "../icons/Icons";
import { BiSolidLock } from "react-icons/bi";
import { FaCheck } from "react-icons/fa6";
import { useMyContext } from "@/context";

interface FeedbackItem {
  id: string;
  title: string;
  description: string;
  icon: React.ReactElement;
  marker?: string;
}

type CategoryKey = keyof typeof categoryDescriptions;

interface FeedbackSectionProps {
  activeCategory: CategoryKey; // Use the union type here
  onCategoryChange: (cat: CategoryKey) => void;
  showFixModal: () => void;
}

const categoryDescriptions = {
  Impact:
    "Your resume's impact score components. Click any section to improve.",
  Brevity: "Improve conciseness and focus in these areas.",
  Style: "Maintain consistent formatting and presentation.",
  Sections: "Organize content for better readability.",
  Skills: "Highlight relevant qualifications and expertise."
};

const FeedbackSection: React.FC<FeedbackSectionProps> = ({
  activeCategory,
  onCategoryChange,
  showFixModal
}) => {
  const { analysisResult, setAnalysisResult } = useMyContext();
  const [feedbackItems, setFeedbackItems] = useState<FeedbackItem[]>([]);

  const categoryMap = {
    Impact: "impactFeedback",
    Brevity: "brevityFeedback",
    Style: "styleFeedback",
    Sections: "sectionsFeedback",
    Skills: "skillsFeedback"
  };

  // Listen for localStorage changes
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "cvData") {
        const newData = JSON.parse(e.newValue || "{}");
        setAnalysisResult(newData?.data?.analysisResult || {});
      }
    };

    // Polling mechanism for same-tab updates
    const interval = setInterval(() => {
      const cvData = JSON.parse(localStorage.getItem("cvData") || "{}");
      if (
        JSON.stringify(cvData?.data?.analysisResult) !==
        JSON.stringify(analysisResult)
      ) {
        setAnalysisResult(cvData?.data?.analysisResult || {});
      }
    }, 1000);

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
      clearInterval(interval);
    };
  }, [analysisResult, setAnalysisResult]);

  // useEffect(() => {
  //   const loadFeedback = () => {
  //     const feedbackData = analysisResult?.feedbacks?.[
  //       categoryMap[activeCategory as keyof typeof categoryMap]
  //     ];

  //     const items = feedbackData
  //       ? Object.entries(feedbackData).map(([key, value]: [string, any]) => ({
  //           id: key,
  //           title: formatTitle(key),
  //           description: value.description,
  //           icon: getIcon(value.marker),
  //           marker: value.marker
  //         })
  //       : [];

  //     setFeedbackItems([...items, ...getLockedItems(activeCategory)]);
  //   };

  //   loadFeedback();
  // }, [activeCategory, analysisResult]);

  useEffect(() => {
    const loadFeedback = () => {
      const feedbackData =
        analysisResult?.feedbacks?.[
          categoryMap[activeCategory as keyof typeof categoryMap]
        ];

      const items = feedbackData
        ? Object.entries(feedbackData).map(([key, value]: [string, any]) => ({
            id: key,
            title: formatTitle(key),
            description: value.description,
            icon: getIcon(value.marker),
            marker: value.marker
          })) // Added missing closing parenthesis here
        : [];

      setFeedbackItems([...items, ...getLockedItems(activeCategory)]);
    };

    loadFeedback();
  }, [activeCategory, analysisResult]);

  const formatTitle = (key: string) => {
    return key
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (str) => str.toUpperCase())
      .replace("Cliches", "Clichés");
  };

  const getIcon = (marker: string) => {
    switch (marker) {
      case "needFix":
        return <HiOutlineBan className="text-xl text-red-500" />;
      case "checked":
        return <FaCheck className="text-xl text-[#53C272]" />;
      default:
        return <BiSolidLock className="text-xl text-[#A3B2C6]" />;
    }
  };

  const getLockedItems = (category: string): FeedbackItem[] => {
    const lockedItems = {
      Impact: [
        {
          id: "spell-check",
          title: "Spell Check",
          description:
            "Get rid of careless errors that can dramatically reduce your resume impact",
          icon: <BiSolidLock className="text-xl text-[#A3B2C6]" />
        }
      ],
      Brevity: [
        {
          id: "bullet-length",
          title: "Bullet Point length analysis",
          description: "Available for pro section only",
          icon: <BiSolidLock className="text-xl text-[#A3B2C6]" />
        }
      ],
      Style: [
        {
          id: "pronouns",
          title: "Personal pronouns analysis",
          description: "Available for pro sections only",
          icon: <BiSolidLock className="text-xl text-[#A3B2C6]" />
        }
      ]
    };

    return lockedItems[category as keyof typeof lockedItems] || [];
  };

  return (
    <div className="bg-[#F4F5FF] rounded-[20px] px-4 pt-6 sm:px-11 sm:pt-8">
      <h2 className="text-lg font-bold mb-2 text-[#4F52FF]">Feedback</h2>
      <p className="text-sm text-[#000316B2] mb-4 font-bold">
        Improve your resume in these key areas
      </p>

      {/* <div className="flex items-center overflow-x-auto no-scrollbar">
        {Object.keys(categoryMap).map((cat) => (
          <button
            key={cat}
            onClick={() => onCategoryChange(cat)}
            className={`relative py-2 text-sm whitespace-nowrap w-full border-b-2 px-6 md:px-2 transition-colors ${
              activeCategory === cat 
                ? "border-[#233BC9] text-[#233BC9] font-bold"
                : "border-[#8F919B33] text-[#A3B2C6] hover:text-[#233BC9] font-medium"
            }`}
          >
            {cat}
          </button>
        ))}
      </div> */}

      <div className="flex items-center overflow-x-auto no-scrollbar">
        {(Object.keys(categoryMap) as Array<keyof typeof categoryMap>).map(
          (cat) => (
            <button
              key={cat}
              onClick={() => onCategoryChange(cat)}
              className={`relative py-2 text-sm whitespace-nowrap w-full border-b-2 px-6 md:px-2 transition-colors ${
                activeCategory === cat
                  ? "border-[#233BC9] text-[#233BC9] font-bold"
                  : "border-[#8F919B33] text-[#A3B2C6] hover:text-[#233BC9] font-medium"
              }`}
            >
              {cat}
            </button>
          )
        )}
      </div>

      {categoryDescriptions[activeCategory] && (
        <p className="text-sm text-[#000316B2] pt-3 mb-4">
          {categoryDescriptions[activeCategory]}
        </p>
      )}

      <div className="space-y-4 overflow-y-auto no-scrollbar max-h-80">
        {feedbackItems.map((item) => (
          <div
            key={item.id}
            className="flex items-center bg-gray-50 p-4 rounded-[10px] border border-gray-200 hover:bg-gray-100 transition-colors"
          >
            <div className="mr-3">{item.icon}</div>
            <div className="flex-1">
              <h4 className="font-semibold text-sm">{item.title}</h4>
              <p className="text-xs text-gray-600">{item.description}</p>
            </div>
            {item.marker === "needFix" && (
              <button
                className="ml-4 p-2 flex items-center space-x-1 text-[#036DF5] gap-1 text-sm border border-[#036DF5] rounded-[10px]  transition-colors"
                onClick={showFixModal}
              >
                <span>Fix</span>
                <ArrowRight width={20} height={20} />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeedbackSection;










// import React, { useEffect, useState } from "react";
// import { HiOutlineBan } from "react-icons/hi";
// import { ArrowRight } from "../icons/Icons";
// import { BiSolidLock } from "react-icons/bi";
// import { FaCheck } from "react-icons/fa6";
// import { useMyContext } from "@/context";

// interface FeedbackItem {
//   id: string;
//   title: string;
//   description: string;
//   icon: React.ReactElement;
//   marker?: string;
// }

// interface FeedbackSectionProps {
//   activeCategory: string;
//   onCategoryChange: (cat: string) => void;
//   showFixModal: () => void;
// }

// const FeedbackSection: React.FC<FeedbackSectionProps> = ({
//   activeCategory,
//   onCategoryChange,
//   showFixModal
// }) => {
//   const { analysisResult } = useMyContext();
//   const [feedbackItems, setFeedbackItems] = useState<FeedbackItem[]>([]);

//   const categoryMap = {
//     Impact: 'impactFeedback',
//     Brevity: 'brevityFeedback',
//     Style: 'styleFeedback',
//     Sections: 'sectionsFeedback',
//     Skills: 'skillsFeedback'
//   };

//   useEffect(() => {
//     const loadFeedback = () => {
//       const feedbackData = analysisResult?.feedbacks?.[categoryMap[activeCategory as keyof typeof categoryMap]];
//       if (!feedbackData) return;

//       const items = Object.entries(feedbackData).map(([key, value]: [string, any]) => ({
//         id: key,
//         title: formatTitle(key),
//         description: value.description,
//         icon: getIcon(value.marker),
//         marker: value.marker
//       }));

//       // Add locked items for each category
//       const lockedItems = getLockedItems(activeCategory);
//       setFeedbackItems([...items, ...lockedItems]);
//     };

//     loadFeedback();
//   }, [activeCategory, analysisResult]);

//   const formatTitle = (key: string) => {
//     return key
//       .replace(/([A-Z])/g, ' $1')
//       .replace(/^./, str => str.toUpperCase())
//       .replace('Cliches', 'Clichés');
//   };

//   const getIcon = (marker: string) => {
//     switch(marker) {
//       case 'needFix':
//         return <HiOutlineBan className="text-xl text-red-500" />;
//       case 'checked':
//         return <FaCheck className="text-xl text-[#53C272]" />;
//       default:
//         return <BiSolidLock className="text-xl text-[#A3B2C6]" />;
//     }
//   };

//   const getLockedItems = (category: string): FeedbackItem[] => {
//     const lockedItems: Record<string, FeedbackItem[]> = {
//       Impact: [
//         {
//           id: 'spell-check',
//           title: 'Spell Check',
//           description: 'Get rid of careless errors that can dramatically reduce your resume impact',
//           icon: <BiSolidLock className="text-xl text-[#A3B2C6]" />
//         }
//       ],
//       Brevity: [
//         {
//           id: 'bullet-length',
//           title: 'Bullet Point length analysis',
//           description: 'Available for pro section only',
//           icon: <BiSolidLock className="text-xl text-[#A3B2C6]" />
//         }
//       ],
//       Style: [
//         {
//           id: 'pronouns',
//           title: 'Personal pronouns analysis',
//           description: 'Available for pro sections only',
//           icon: <BiSolidLock className="text-xl text-[#A3B2C6]" />
//         }
//       ]
//     };

//     return lockedItems[category] || [];
//   };

//   const categoryDescriptions: Record<string, string> = {
//     Impact: "Your resume's impact score is made up of the following components. Click any section to improve.",
//     Brevity: "Brevity helps make your resume concise and focused. Improve these areas to increase clarity.",
//     Style: "Style ensures consistency in formatting, fonts, and overall presentation.",
//     Sections: "Organize your resume into clear sections for better readability.",
//     Skills: "Showcase relevant skills to highlight your qualifications."
//   };

//   return (
//     <div className="bg-[#F4F5FF] rounded-[20px] px-4 pt-6 sm:px-11 sm:pt-8">
//       <h2 className="text-lg font-bold mb-2 text-[#4F52FF]">Feedback</h2>
//       <p className="text-sm text-[#000316B2] mb-4 font-bold">
//         You should improve your resume in the following areas
//       </p>

//       <div className="flex items-center overflow-x-auto no-scrollbar">
//         {Object.keys(categoryMap).map((cat) => (
//           <button
//             key={cat}
//             onClick={() => onCategoryChange(cat)}
//             className={`relative py-2 text-sm whitespace-nowrap w-full border-b-2 px-6 md:px-2
//               ${activeCategory === cat
//                 ? "border-[#233BC9] text-[#233BC9] font-bold"
//                 : "border-[#8F919B33] text-[#A3B2C6] hover:text-[#233BC9] font-medium"
//               }`}
//           >
//             {cat}
//           </button>
//         ))}
//       </div>

//       {categoryDescriptions[activeCategory] && (
//         <p className="text-sm text-[#000316B2] pt-3 mb-4">
//           {categoryDescriptions[activeCategory]}
//         </p>
//       )}

//       <div className="space-y-4 overflow-y-auto no-scrollbar max-h-80">
//         {feedbackItems.map((item) => (
//           <div
//             key={item.id}
//             className="flex items-center bg-gray-50 p-4 rounded-[10px] border border-gray-200"
//           >
//             <div className="mr-3">{item.icon}</div>
//             <div className="flex-1">
//               <h4 className="font-semibold text-sm">{item.title}</h4>
//               <p className="text-xs text-gray-600">{item.description}</p>
//             </div>
//             {item.marker === 'needFix' && (
//               <button
//                 className="ml-4 p-2 flex items-center space-x-1 text-[#036DF5] gap-1 text-sm border border-[#036DF5] rounded-[10px]"
//                 onClick={showFixModal}
//               >
//                 <span>Fix</span>
//                 <ArrowRight width={20} height={20} />
//               </button>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default FeedbackSection;
