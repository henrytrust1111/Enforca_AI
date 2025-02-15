import { Logo } from "./icons/Icons";

const Footer = () => {
  return (
    <footer className="bg-black text-[#8F919B] py-12 md:py-20 px-6 md:px-16 lg:px-20">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        {/* Logo Section */}
        <div className="flex justify-center  md:justify-start space-x-2 ">
          <div className="flex items-center">
          <Logo width={40} height={40} />
          <span className="text-lg text-[#8F919B] font-medium">GetreKruitd</span>
          </div>
        </div>

        {/* Support Section */}
        <div className="flex flex-col space-y-2">
          <h3 className="text-white font-semibold">SUPPORT</h3>
          <a href="#" className="hover:text-gray-300">About Us</a>
          <a href="#" className="hover:text-gray-300">Privacy Policy</a>
          <a href="#" className="hover:text-gray-300">Terms of Service</a>
        </div>

        {/* Get Started Section */}
        <div className="flex flex-col space-y-2">
          <h3 className="text-white font-semibold">GET STARTED</h3>
          <a href="#" className="hover:text-gray-300">Review your Resume</a>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm text-white">
        © 2024 GetreKruitd. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
