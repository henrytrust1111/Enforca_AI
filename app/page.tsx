import Hero from "@/components/home/Hero";
import People from "@/components/home/People";
import Process from "@/components/home/Process";
import Review from "@/components/home/Review";
import Sponsors from "@/components/home/Sponsors";

const page = () => {
  return <div className="">
    <Hero />
    <Sponsors />
    <Process />
    <People />
    <Review />
  </div>;
};

export default page;
