import Image from "next/image";
import people from "@/public/images/people/people.png";

const People = () => {
    return (
        <div className="bg-white">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                {/* Text Section */}
                <div className="px-4 md:px-0 md:pl-20 text-center md:text-left flex flex-col items-center md:items-start justify-center mt-14 mb:mt-0 mb-12">
                    <h4 className="text-lg font-semibold text-[#9CB3D7]">Interview Prep Consultation</h4>
                    <h1 className="text-2xl md:text-5xl max-w-lg font-bold text-black mt-2 leading-tight">
                    Schedule an interview Prep Consultation on behavioral and technical interviews
                    </h1>
                    <p className="text-[#8F919B] max-w-lg">
                    Our professional human resource and career professionals are ready to guide you through.
                    </p>
                    <button className="button_v1 mt-6">
                        Schedule Appointment
                    </button>
                </div>

                {/* Image Section */}
                <div className="flex justify-center md:justify-end">
                    <Image src={people} alt="People in an Interview" layout="responsive" width={100} height={100} className="rounded-lg shadow-lg" />
                </div>
            </div>
        </div>
    );
};

export default People;
