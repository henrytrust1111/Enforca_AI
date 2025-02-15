"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import ornament1 from "@/public/images/reviews/ornament1.png";
import ornament2 from "@/public/images/reviews/ornament2.png";

const carouselData = [
  {
    img: "/images/reviews/profile.png",
    name: "Hannah Schmitt",
    content:
      "I was feeling lost in my job search, unsure how to tailor my skills and experience for the roles I truly wanted. This app completely changed the game! Getting matched with a mentor who understood my industry was a huge help. They reviewed my CV and provided actionable feedback, and the interview simulations were incredibly realistic.",
    date: "May 8, 2020",
  },
  {
    img: "/images/reviews/profile.png",
    name: "John Doe",
    content:
      "This platform made job searching so much easier! I received tailored recommendations and valuable career advice that helped me land my dream role.",
    date: "June 15, 2021",
  },
  {
    img: "/images/reviews/profile.png",
    name: "Sarah Lee",
    content:
      "Fantastic service! The interview coaching and resume review gave me the confidence I needed to ace my job search.",
    date: "March 10, 2022",
  },
];

const Review: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-slide every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselData.length);
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative bg-[#DEE5FF] py-24 px-6 md:px-16 lg:px-20">
      {/* Background Decorations */}
       <Image
        src={ornament1}
        alt="Ornament"
        className="absolute top-5 right-10 hidden lg:block"
        width={100}
        height={100}
      />
      <Image
        src={ornament2}
        alt="Ornament"
        className="absolute bottom-5 left-10 hidden lg:block"
        width={100}
        height={100}
      /> 

      {/* Heading */}
      <h2 className="text-center text-2xl md:text-3xl font-bold text-[#001E6C] mb-8">
        Here is what our applicants are saying about us
      </h2>

      {/* Review Card */}
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-6 md:p-10 grid grid-cols-1 md:grid-cols-3 gap-2 items-center z-20">
        {/* Profile Image */}
        <div className="flex justify-center">
          <Image
            src={carouselData[currentSlide].img}
            alt="Profile"
            width={120}
            height={120}
            className="rounded-full border-4 border-gray-200 shadow-md"
          />
        </div>

        {/* Review Content */}
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="col-span-2 text-center md:text-left"
        >
          <p className="text-lg md:text-base font-semibold * md:font-medium text-[#3D3D3D]">
            {carouselData[currentSlide].name}
          </p>
          <p className="text-[#3D3D3D] mt-2 font-medium">{carouselData[currentSlide].content}</p>
          <p className="text-[#525252] mt-6 font-medium">{carouselData[currentSlide].date}</p>
        </motion.div>
      </div>

      {/* Carousel Dots */}
      <div className="flex justify-center mt-6 space-x-2">
        {carouselData.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 w-2 rounded-full transition-all ${
              currentSlide === index ? "bg-[#001E6C]" : "bg-white"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Review;
