// components/CV_Template1.tsx
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

export const CV_Template1: React.FC = () => {
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
    <>
      {/* Main CV Content */}
      <div className="bg-white rounded-lg shadow-lg p-6 overflow-auto no-scrollbar">
        {/* Candidate Profile */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 mb-8">
          <div className="flex items-center gap-4">
            <CVImage width={100} height={100} />
            <div>
              <h1 className="text-3xl font-bold text-white">John Doe</h1>
              <p className="text-lg text-indigo-200">Senior Product Manager</p>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-4">
            <div className="flex items-center text-indigo-200">
              <MailIcon className="w-5 h-5 mr-1 mt-1" />
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
    </>
  );
};
