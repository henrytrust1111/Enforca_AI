import { Logo } from "./icons/Icons";

const Footer = () => {
  return (
    <footer className="bg-black text-[#8F919B] py-12 md:py-20 px-6 md:px-16 lg:px-20">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 md:text-left">
        {/* Logo Section */}
        <div className="flex items-start space-x-2">
          <div className="w-max flex items-center gap-2">
            <Logo width={40} height={40} />
            <span className="text-lg text-[#8F919B] font-medium">GetreKruitd</span>
          </div>
        </div>

        {/* Support Section */}
        <div className="flex flex-col space-y-2 items-start md:items-center ">
          <div className="w-max tex-left flex flex-col space-y-3">
            <h3 className="text-white font-semibold">SUPPORT</h3>
            <a href="#" className="hover:text-gray-300">About Us</a>
            <a href="#" className="hover:text-gray-300">Privacy Policy</a>
            <a href="#" className="hover:text-gray-300">Terms of Service</a>
          </div>
        </div>

        {/* Get Started Section */}
        <div className="flex flex-col items-start md:items-end">
          <div className="w-max tex-left flex flex-col space-y-3">
            <h3 className="text-white font-semibold">GET STARTED</h3>
            <a href="#" className="hover:text-gray-300">Review your Resume</a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-[#8F919B] mt-8 pt-8 text-left md:text-center text-sm text-white">
        © 2024 GetreKruitd. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
