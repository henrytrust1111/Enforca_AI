import Image from "next/image";
import bag from "@/public/images/process/bag.png";
import hand from "@/public/images/process/hand.png";
import note from "@/public/images/process/note.png";
import per from "@/public/images/process/per.png";

const processDetails = [
    {
        image: note,
        title: "Get Career Roadmap",
        content: "Upload your CV for review analysis and initial feedback on key skills and experience",
    },
    {
        image: hand,
        title: "Get real experience with expert guidance",
        content: "We take you into the real world of how to do in your chosen career beyond the theory knowledge",
    },
    {
        image: per,
        title: "Simulated Interview Sessions",
        content: "Practice answering both behavioral and technical interview questions in a safe and supportive environment.",
    },
    {
        image: bag,
        title: "Land the Job",
        content: "Track your job applications and schedule interviews with ease using our automated and streamlined platform",
    },
];

const Process = () => {
    return (
        <div className="px-4 md:px-20 py-12 md:py-24 mt-20 bg-[#F3F8FF] text-center flex flex-col items-center font-sharpsans">
            <h1 className="text-2xl md:text-3xl max-w-xl text-center font-bold text-black-100 mb-8">
                Unleash your full potential and land your dream job in 4 easy steps
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {processDetails.map((process, index) => (
                    <div key={index} className="flex flex-col items-center text-center p-6 rounded-lg">
                        <div className="bg-[#177DFF]  rounded-full flex items-center justify-center w-16 h-16">
                            <Image src={process.image} alt={process.title} width={100} height={100} />
                        </div>
                        <h2 className="text-lg font-bold text-black mt-4">{process.title}</h2>
                        <p className="text-[#788087] mt-2 ">{process.content}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Process;
