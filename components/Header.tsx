"use client";

import { Logo } from "./icons/Icons";
import { HiMenuAlt4 } from "react-icons/hi";
import { usePathname, useRouter } from "next/navigation";
import { TfiClose } from "react-icons/tfi";
import { useEffect, useState } from "react";
import { LiaArrowRightSolid } from "react-icons/lia";

const Header: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter()
  const isTransparentBg = pathname === "/" || pathname === "/signup";
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function handleDashboardClick () {
    router.push("/login")
  }

  return (
    <header
      className={`w-full font-sharpsans py-4 px-6 md:px-8 lg:px-20 fixed right-0 top-0 z-10 transition-colors
        ${isTransparentBg ? "bg-transparent" : "bg-white shadow-md text-black"}
        ${isScrolled ? "bg-white shadow-lg text-black" : ""}
      `}
    >
      <div className="container mx-auto grid grid-cols-2 md:grid-cols-3 items-center">
        {/* Logo Section */}
        <div className="flex items-center space-x-2 w-max">
          <Logo width={40} height={40} />
          <span className={`text-base md:text-xl font-bold ${isScrolled ? "text-black" : "text-white"}`}>
            GetreKruitd
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className={`hidden md:flex justify-end space-x-8 font-medium ${isTransparentBg ? "lg:text-white" : "text-black"} ${isScrolled ? "!text-black" : ""}`}>
          <a href="#" className="hover:text-gray-900 transition whitespace-nowrap">Schedule Consultation</a>
          <a href="#" className="hover:text-gray-900 transition">Internship/Mentorship</a>
        </nav>

        {/* My Dashboard (Desktop) */}
        <div className="hidden md:flex justify-end">
          <button onClick={handleDashboardClick} className="button_v1">My Dashboard</button>
        </div>

        {/* Mobile Menu Icon */}
        <div className="flex justify-end md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`${isScrolled ? "text-black" : "text-white"}`}
          >
            {isMobileMenuOpen ? <TfiClose  /> : <HiMenuAlt4 size={32} />}
          </button>
        </div>
      </div>

      {/* Mobile Full-Screen Overlay Menu */}
      <div
        className={`fixed inset-0 z-50 bg-[#036DF5] text-white md:hidden transform transition-transform ease-in-out duration-300
          ${isMobileMenuOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}
        `}
      >
        {/* Close Button */}
        <button
          onClick={() => setIsMobileMenuOpen(false)}
          className="absolute top-5 right-5 text-white text-2xl"
        >
          <TfiClose />
        </button>

        <nav className="mt-20 px-6 flex flex-col space-y-6 transition-opacity duration-300">
          {/* Menu Items */}
          <a href="#" className="text-2xl flex items-center justify-between py-6 border-b">
            <span>Review Resume</span>
            <span className="ml-2"><LiaArrowRightSolid /></span>
          </a>
          <a href="#" className="text-2xl flex items-center justify-between py-6 border-b">
            <span>Schedule Consultation</span>
            <span className="ml-2"><LiaArrowRightSolid /></span>
          </a>

          {/* My Dashboard */}
          <a href="/login" className="text-base font-bold text-[#9AC5FB] pt-8">My Dashboard</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;













// "use client";

// import { Logo } from "./icons/Icons";
// import { FaTimes } from "react-icons/fa";
// import { HiMenuAlt4 } from "react-icons/hi";
// import { usePathname } from "next/navigation";
// import { useEffect, useState } from "react";

// const Header: React.FC = () => {
//   const pathname = usePathname();
//   const isTransparentBg = pathname === '/' || pathname === '/signup';
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       if (window.scrollY > 30) {
//         setIsScrolled(true);
//       } else {
//         setIsScrolled(false);
//       }
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const toggleMobileMenu = () => {
//     setIsMobileMenuOpen(!isMobileMenuOpen);
//   };

//   return (
//     <header className={`w-full font-sharpsans py-4 px-6 md:px-8 lg:px-20 fixed right-0 top-0 z-10  ${isTransparentBg ? 'bg-transparent' : 'bg-white shadow-md'} ${isScrolled ? "bg-white shadow-lg text-black" : "bg-transparent"}`}>
//       <div className="container mx-auto grid grid-cols-2 md:grid-cols-3 items-center">
//         {/* Logo Section */}
//         <div className="flex items-center space-x-2 w-max">
//           <Logo width={40} height={40} />
//           <span className={`text-base md:text-xl font-bold  ${isScrolled ? "text-black-100" : "text-white"} `}>GetreKruitd</span>
//         </div>

//         {/* Navigation Links (hidden on small screens) */}
//         <nav className={`hidden md:flex  justify-end space-x-8 font-medium ${isTransparentBg ? 'lg:text-white' : 'text-black-100'} ${isScrolled ? "!text-black-100" : "bg-transparent"}`}>
//           <a href="#" className="hover:text-gray-900 transition whitespace-nowrap">Schedule Consultation</a>
//           <a href="#" className="hover:text-gray-900 transition">Internship/Mentorship</a>
//         </nav>

//         {/* My Dashboard */}
//         <div className="hidden justify-end md:flex">
//           <a href="#" className="button_v1">My Dashboard</a>
//         </div>

//         {/* Mobile Menu Icon */}
//         <div className="flex justify-end md:hidden">
//           <button className={`${isScrolled ? "text-black-100" : "text-white"}`} onClick={toggleMobileMenu}>
//             {isMobileMenuOpen ? <FaTimes size={24} /> : <HiMenuAlt4 size={32} />}
//           </button>
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       {isMobileMenuOpen && (
//         <div className="md:hidden bg-white shadow-md absolute top-15 right-0 w-full z-10">
//           <nav className="flex flex-col items-center space-y-4 py-4">
//           <a href="#" className="hover:text-gray-900 transition whitespace-nowrap">Schedule Consultation</a>
//           <a href="#" className="hover:text-gray-900 transition">Internship/Mentorship</a>
//           <a href="#" className="button_v1">My Dashboard</a>
//           </nav>
//         </div>
//       )}
//     </header>
//   );
// };

// export default Header;