import React, { useState } from "react";
import { ChevronUp, ChevronDown, Search, X } from "lucide-react";
import { industries, experiences, years } from "@/data/assist";

interface DropdownProps {
  label: string;
  dropdownName: string;
  items: string[];
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
  selectedItem: string;
  setSelectedItem: React.Dispatch<React.SetStateAction<string>>;
}

const NeedAssessment = () => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [industrySearch, setIndustrySearch] = useState("");
  const [experienceSearch, setExperienceSearch] = useState("");
  const [yearsSearch, setYearsSearch] = useState("");
  const [skills, setSkills] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("");
  const [selectedExperience, setSelectedExperience] = useState("");
  const [selectedYears, setSelectedYears] = useState("");

  // const industries = [
  //   "Technology",
  //   "Healthcare",
  //   "Finance",
  //   "Education",
  //   "Marketing",
  //   "Engineering",
  //   "Retail",
  //   "Hospitality"
  // ];
  // const experiences = [
  //   "Yes",
  //   "No",
  //   "Internship Experience",
  //   "Freelance Experience"
  // ];
  // const years = ["0-1 years", "2-5 years", "5-10 years", "10+ years"];

  const toggleDropdown = (dropdownName: string) => {
    setOpenDropdown((prev) => (prev === dropdownName ? null : dropdownName));
  };

  const filterItems = (items: string[], query: string) => {
    if (!query) return items;
    return items.filter((item) =>
      item.toLowerCase().includes(query.toLowerCase())
    );
  };

  const Dropdown: React.FC<DropdownProps> = ({
    label,
    dropdownName,
    items,
    searchValue,
    setSearchValue,
    selectedItem,
    setSelectedItem
  }) => {
    const isOpen = openDropdown === dropdownName;
    const filteredItems = filterItems(items, searchValue);

    const handleClick = (item: string) => {
      setOpenDropdown(null);
      setSelectedItem(item);
      setSearchValue(""); // Clear the search bar after selection
    };

    const handleClear = () => {
      setSearchValue("");
    };

    return (
      <div>
        <label className="block text-black font-medium mb-1">{label}</label>
        <div className="relative">
          <button
            className={`w-full p-3 flex justify-between items-center bg-white shadow-sm ${
              isOpen
                ? "border-t-[#36A1C5] rounded-b-md shadow-none border-t border-r border-r-[#36A1C5] rounded-t-[8px]"
                : "shadow-sm border rounded-[8px]"
            }`}
            onClick={() => toggleDropdown(dropdownName)}
            aria-expanded={isOpen}
            aria-haspopup="listbox"
          >
            {selectedItem || "Select an option"}
            {isOpen ? (
              <ChevronUp color="#153E4C" />
            ) : (
              <ChevronDown color="#153E4C" />
            )}
          </button>
          {isOpen && (
            <div
              className={`absolute w-full border-b rounded-b-[8px] bg-white z-10 px-2 border-b-[#36A1C5] border-r border-r-[#36A1C5]`}
            >
              {/* <input
                type="text"
                placeholder="Search..."
                className="pl-3 py-1 border-b focus:outline-none border max-w-2xl rounded-[25px] placeholder:text-sm"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                aria-label="Search dropdown options"
              /> */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 py-1 border-b focus:outline-none border max-w-2xl rounded-[25px] placeholder:text-sm w-full"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  aria-label="Search dropdown options"
                  autoFocus
                />
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={16}
                />
                {searchValue && (
                  <X
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
                    size={16}
                    onClick={handleClear}
                  />
                )}
              </div>
              <ul
                role="listbox"
                className="max-h-40 custom-scrollbar2 overflow-y-auto"
              >
                {filteredItems.length > 0 ? (
                  filteredItems.map((item) => (
                    <li
                      key={item}
                      role="option"
                      className="p-3 hover:bg-gray-100 hover:text-[#36A1C5] cursor-pointer font-medium"
                      onClick={() => handleClick(item)}
                      aria-selected={searchValue === item}
                    >
                      {item}
                    </li>
                  ))
                ) : (
                  <li className="p-3 text-gray-500 text-center">
                    No results found
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6 max-w-lg mx-auto">
      <Dropdown
        label="Which industry are you most interested in pursuing a career in?"
        dropdownName="industry"
        items={industries}
        searchValue={industrySearch}
        setSearchValue={setIndustrySearch}
        selectedItem={selectedIndustry}
        setSelectedItem={setSelectedIndustry}
      />

      <Dropdown
        label="Do you have any prior experience in this industry?"
        dropdownName="experience"
        items={experiences}
        searchValue={experienceSearch}
        setSearchValue={setExperienceSearch}
        selectedItem={selectedExperience}
        setSelectedItem={setSelectedExperience}
      />

      <Dropdown
        label="How many years of professional experience do you have?"
        dropdownName="years"
        items={years}
        searchValue={yearsSearch}
        setSearchValue={setYearsSearch}
        selectedItem={selectedYears}
        setSelectedItem={setSelectedYears}
      />

      {/* Skills Input */}
      <div>
        <label className="block text-gray-700 font-medium mb-1">
          What are your top 3-5 skills that are most relevant to your desired
          role(s)?
        </label>
        <textarea
          className="w-full p-3 border rounded-[8px] focus:ring focus:ring-[#36A1C5] outline-none"
          rows={3}
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
          aria-label="Enter your top skills"
        />
      </div>

      {/* Navigation Buttons */}
      <div className="grid grid-cols-2 gap-6 ">
        <button className="button_v3 ">Back</button>
        <button className="button_v1 w-full justify-center ">Proceed</button>
      </div>
    </div>
  );
};

export default NeedAssessment;
