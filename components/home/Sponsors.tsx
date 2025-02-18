"use client";
import google from "@/public/images/sponsors/google.png";
import canva from "@/public/images/sponsors/canva.png";
import slack from "@/public/images/sponsors/slack.png";
import zoom from "@/public/images/sponsors/zoom.png";
import coin from "@/public/images/sponsors/vectorr.png";
import web from "@/public/images/sponsors/webflow.png";
import mail from "@/public/images/sponsors/mailchimp.png";
import micro from "@/public/images/sponsors/microsoft.png";
import Marquee from "react-fast-marquee";
import Image from "next/image";

const Sponsors: React.FC = () => {
  return (
    <>
      {/* Brands */}
      <div className="py-16 pl-4 md:px-20">
        <p className="text-center text-sm font-normal font-sharpsans">
          We are trusted by these brands
        </p>
        <div className="mt-3">
          <Marquee pauseOnHover autoFill>
            <div className="flex items-center justify-center gap-4" id="brands">
              <Image src={google} alt="" width={100} height={38} />
              <Image src={canva} alt="" width={100} height={38} />
              <Image src={slack} alt="" width={96} height={38} />
              <Image src={zoom} alt="" width={100} height={38} />
              <Image src={coin} alt="" width={100} height={38} />
              <Image src={web} alt="" width={100} height={38} />
              <Image src={mail} alt="" width={100} height={38} />
              <Image src={micro} alt="" width={100} height={38} />
            </div>
          </Marquee>
        </div>
      </div>

      {/* Slogan */}
      <div className="w-full flex flex-col items-center justify-center py-16 px-4 md:px-20 gap-4 font-sharpsans">
        <p className="text-2xl md:text-4xl font-bold text-center max-w-2xl font-sharpsans">
          <span className="text-primary">Land your dream job faster</span> with
          personalized support every step of the way.
        </p>
        <p className="text-[#788087] max-w-3xl text-center">
          Never face the job search alone. Our app connects you with a dedicated
          mentor, personalizes your CV for success, and equips you with
          interview skills through realistic simulations and expert feedback.
          Land your dream job faster with all-in-one support.
        </p>
      </div>
    </>
  );
};

export default Sponsors;
