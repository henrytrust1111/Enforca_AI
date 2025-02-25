"use client";

import { HiChevronDown, HiMenuAlt4, HiUser } from "react-icons/hi";
import { TfiClose } from "react-icons/tfi";
import { useEffect, useState } from "react";
import { LiaArrowRightSolid } from "react-icons/lia";
import { Logo } from "../icons/Icons";

const Nav: React.FC = () => {
  // const pathname = usePathname();
  // const router = useRouter();
  //   const isTransparentBg = pathname === "/" || pathname === "/signup";
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isLoggedIn = true;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // function handleDashboardClick() {
  //   router.push("/login");
  // }

  return (
    <header
      className={`w-full font-sharpsans py-4 px-6 md:px-8 lg:px-20 fixed right-0 top-0 z-10 transition-colors
        ${isScrolled ? "bg-white shadow-lg text-black" : ""}
      `}
    >
      <div className="container mx-auto grid grid-cols-2 md:grid-cols-3 items-center">
        {/* Logo Section */}
        <div className="flex items-center space-x-2 w-max">
          <Logo width={40} height={40} />
          <span
            className={`text-base md:text-xl font-bold ${
              isScrolled ? "text-black" : "text-black"
            }`}
          >
            GetreKruitd
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className={`hidden md:flex justify-end space-x-8 font-medium `}>
          <a
            href="#"
            className="flex items-center space-x-1 hover:text-gray-900 "
          >
            <span>Resume</span>
            <HiChevronDown />
          </a>
          <a
            href="#"
            className="hover:text-gray-900 transition whitespace-nowrap"
          >
            Interview Prep
          </a>
          <a href="#" className="hover:text-gray-900 transition">
            Jobs
          </a>
        </nav>

        {/* My Dashboard (Desktop) */}
        <div className="hidden md:flex justify-end">
          {/* Right: User Profile */}
          {isLoggedIn ? (
            <div className="flex items-center space-x-2">
              <HiUser className="text-2xl text-gray-700" />
              <span className="hidden md:inline text-black-100 uppercase font-bold mt-1">Hi Mike</span>
            </div>
          ) : (
            //   My Dashboard
            <a
              href="/login"
              className="text-base font-bold text-[#9AC5FB] pt-8"
            >
              My Dashboard
            </a>
          )}
        </div>

        {/* Mobile Menu Icon */}
        <div className="flex justify-end md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`${isScrolled ? "text-black" : "text-black"}`}
          >
            {isMobileMenuOpen ? <TfiClose /> : <HiMenuAlt4 size={32} />}
          </button>
        </div>
      </div>

      {/* Mobile Full-Screen Overlay Menu */}
      <div
        className={`fixed inset-0 z-50 bg-[#036DF5] text-white md:hidden transform transition-transform ease-in-out duration-300
          ${
            isMobileMenuOpen
              ? "translate-x-0 opacity-100"
              : "translate-x-full opacity-0"
          }
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
          <a
            href="#"
            className="text-2xl flex items-center justify-between py-6 border-b"
          >
            <span className="flex items-center gap-2">
              Resume <HiChevronDown />
            </span>
            <span className="ml-2">
              <LiaArrowRightSolid />
            </span>
          </a>
          <a
            href="#"
            className="text-2xl flex items-center justify-between py-6 border-b"
          >
            <span> Interview Prep</span>
            <span className="ml-2">
              <LiaArrowRightSolid />
            </span>
          </a>
          <a
            href="#"
            className="text-2xl flex items-center justify-between py-6 border-b"
          >
            <span> Jobs </span>
            <span className="ml-2">
              <LiaArrowRightSolid />
            </span>
          </a>

          {/* Right: User Profile */}
          {isLoggedIn ? (
            <div className="flex items-center space-x-2">
              <HiUser className="text-2xl text-gray-700" />
              <span className="inline md:hidden text-black-100 uppercase font-bold">Hi Mike</span>
            </div>
          ) : (
            //   My Dashboard
            <a
              href="/login"
              className="text-base font-bold text-[#9AC5FB] pt-8"
            >
              My Dashboard
            </a>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Nav;
