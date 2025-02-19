"use client"

import { useRouter } from "next-nprogress-bar";



const Hero = () => {
    const router = useRouter()
    return (
        <section className="relative h-[1008px] md:h-[798px] text-white bg-hero-mobile md:bg-hero-desktop bg-cover bg-center font-sharpsans"
        >
            <div className="w-full h-full max-w-7xl mx-auto px-4 md:px-20 py-16 grid gap-8 items-start md:items-center">
                {/* Text Section */}
                <div className="space-y-6 text-white  flex flex-col items-center md:items-start justify-center mt-4 mb:mt-0 mb-20">
                    <h1 className="text-4xl md:text-5xl max-w-xl text-center md:text-left font-bold !leading-tight">
                        First AI Job application and support platform
                    </h1>
                    <p className="text-base md:text-xl max-w-xl text-center md:text-left">
                        Land your dream job with personalized preparation and expert
                        guidance aided with our AI-powered job processing platform.
                    </p>
                    <div className="flex flex-wrap gap-4  items-center justify-center">
                        <button onClick={()=>router.push("/need-assessment")} className="button_v1">
                            <span>Start your Job Search</span>
                        </button>
                        <button className="button_v2">
                            <span>Free CV Review</span>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;












// "use client"
// import backgroundDesktop from "../../public/images/Background.png"
// import backgroundMobile from "../../public/images/Background2.png"

// const Hero = () => {
//   return (
//     <div>
//       Hero
//     </div>
//   )
// }

// export default Hero