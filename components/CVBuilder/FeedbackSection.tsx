import React from "react";
import { HiOutlineBan } from "react-icons/hi";
import { ArrowRight } from "../icons/Icons";

interface FeedbackItem {
  id: number;
  title: string;
  description: string;
  icon: React.ReactElement;
}

// Updated feedback categories with more items
const feedbackCategories: Record<string, FeedbackItem[]> = {
  Impact: [
    {
      id: 1,
      title: "Quantify Impact",
      description: "Add more numbers and metrics",
      icon: <HiOutlineBan className="text-xl text-red-500" />
    },
    {
      id: 2,
      title: "Repetition",
      description: "Avoid repeating action verbs and phrases on your resume",
      icon: <HiOutlineBan className="text-xl text-red-500" />
    },
    {
      id: 3,
      title: "Action Verbs",
      description:
        "We found weak action verbs that you should remove from your resume",
      icon: <HiOutlineBan className="text-xl text-red-500" />
    },
    {
      id: 4,
      title: "Industry Keywords",
      description:
        "Include relevant industry keywords to showcase your expertise",
      icon: <HiOutlineBan className="text-xl text-red-500" />
    },
    {
      id: 5,
      title: "Passive Voice",
      description:
        "Using passive voice weakens the impact. Consider using active voice for clarity",
      icon: <HiOutlineBan className="text-xl text-red-500" />
    },
    {
      id: 6,
      title: "Outdated Metrics",
      description:
        "Your metrics are from 2018; update them to reflect recent accomplishments",
      icon: <HiOutlineBan className="text-xl text-red-500" />
    },
    {
      id: 7,
      title: "Conflicting Tenses",
      description:
        "Ensure your bullet points use consistent verb tenses throughout",
      icon: <HiOutlineBan className="text-xl text-red-500" />
    }
  ],
  Brevity: [
    {
      id: 1,
      title: "Concise Sentences",
      description:
        "Shorten your bullet points to quickly highlight achievements and responsibilities",
      icon: <HiOutlineBan className="text-xl text-red-500" />
    },
    {
      id: 2,
      title: "Remove Fillers",
      description:
        "Words like 'very' or 'really' can dilute the impact of your statements",
      icon: <HiOutlineBan className="text-xl text-red-500" />
    },
    {
      id: 3,
      title: "Simplify Language",
      description:
        "Use direct, simple language to maintain clarity and readability",
      icon: <HiOutlineBan className="text-xl text-red-500" />
    }
  ],
  Style: [
    {
      id: 1,
      title: "Consistent Formatting",
      description:
        "Align headers, bullet points, and spacing across all sections",
      icon: <HiOutlineBan className="text-xl text-red-500" />
    },
    {
      id: 2,
      title: "Font Choice",
      description: "Use a professional, easy-to-read font style and size",
      icon: <HiOutlineBan className="text-xl text-red-500" />
    },
    {
      id: 3,
      title: "Appropriate Colors",
      description:
        "Ensure any color highlights or headings are subtle and not distracting",
      icon: <HiOutlineBan className="text-xl text-red-500" />
    }
  ],
  Sections: [
    {
      id: 1,
      title: "Clear Headings",
      description:
        "Label sections like 'Experience,' 'Education,' and 'Skills' clearly",
      icon: <HiOutlineBan className="text-xl text-red-500" />
    },
    {
      id: 2,
      title: "Section Order",
      description: "Prioritize your most relevant sections at the top",
      icon: <HiOutlineBan className="text-xl text-red-500" />
    },
    {
      id: 3,
      title: "Combine Redundant Sections",
      description:
        "Merge overlapping sections (e.g., 'Projects' and 'Experience') to avoid confusion",
      icon: <HiOutlineBan className="text-xl text-red-500" />
    }
  ],
  Skills: [
    {
      id: 1,
      title: "Technical Skills Highlight",
      description: "Showcase your most marketable technical skills first",
      icon: <HiOutlineBan className="text-xl text-red-500" />
    },
    {
      id: 2,
      title: "Soft Skills",
      description:
        "Highlight collaboration, leadership, or communication if relevant to the role",
      icon: <HiOutlineBan className="text-xl text-red-500" />
    },
    {
      id: 3,
      title: "Certifications",
      description:
        "List relevant certifications under your skills or a separate section",
      icon: <HiOutlineBan className="text-xl text-red-500" />
    }
  ]
};

// Descriptions for each category
const categoryDescriptions: Record<string, string> = {
  Impact:
    "Your resume's impact score is made up of the following components. You can click on any section to see where you went wrong and steps to improve.",
  Brevity:
    "Brevity is about making your resume concise and to the point. Avoid unnecessary filler words and long-winded sentences.",
  Style:
    "Style ensures consistency in your resume's appearance, including formatting, fonts, and colors.",
  Sections:
    "Organizing your resume into clear sections helps employers find key information quickly.",
  Skills:
    "Showcase both your technical and soft skills so employers see the breadth of your expertise."
};

interface FeedbackSectionProps {
  activeCategory: string;
  onCategoryChange: (cat: string) => void;
  showFixModal: () => void;
}

const FeedbackSection: React.FC<FeedbackSectionProps> = ({
  activeCategory,
  onCategoryChange,
  showFixModal
}) => {
  const categories = Object.keys(feedbackCategories);

  return (
    <div className="bg-[#F4F5FF] rounded-[20px] px-4 pt-6 sm:px-11 sm:pt-8">
      {/* Title and Subheading */}
      <h2 className="text-lg font-bold mb-2 text-[#4F52FF]">Feedback</h2>
      <p className="text-sm text-[#000316B2] mb-4 font-bold">
        You should improve your resume in the following areas
      </p>

      {/* Category Tabs */}
      <div className="flex items-center  overflow-x-auto no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => onCategoryChange(cat)}
            className={`
        relative py-2 text-sm whitespace-nowrap w-full border-b-2 border-[#8F919B33] px-6 md:px-2
        ${
          activeCategory === cat
            // ? "text-[#233BC9] text-sm font-bold after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-[#233BC9] "
            ? "border-[#233BC9] text-[#233BC9] text-sm font-bold"
            : "text-[#A3B2C6] hover:text-[#233BC9] font-medium"
        }
      `}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Additional text under the "Impact" tab */}
      {/* Category Description */}
      {categoryDescriptions[activeCategory] && (
        <p className="text-sm text-[#000316B2] pt-3 mb-4">
          {categoryDescriptions[activeCategory]}
        </p>
      )}

      {/* Category Content with vertical scroll */}
      <div className="space-y-4  overflow-y-auto no-scrollbar max-h-80">
        {feedbackCategories[activeCategory]?.map((item: FeedbackItem) => (
          <div
            key={item.id}
            className="flex items-center bg-gray-50 p-4 rounded-[10px] border border-gray-200"
          >
            <div className="mr-3">{item.icon}</div>
            <div className="flex-1">
              <h4 className="font-semibold text-sm">{item.title}</h4>
              <p className="text-xs text-gray-600">{item.description}</p>
            </div>
            <button
              className="ml-4 p-2 flex items-center space-x-1 text-[#036DF5] gap-1 text-sm  border border-[#036DF5] rounded-[10px]"
              onClick={showFixModal}
            >
              <span>Fix</span>
              <ArrowRight width={20} height={20} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeedbackSection;
