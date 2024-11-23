import { IoIosStar } from "react-icons/io";
import { LuHelpingHand } from "react-icons/lu";
import { SlBadge } from "react-icons/sl";

const WhyReplaceUs = () => {
  return (
    <div className="w-full flex flex-col text-center py-10 lg:py-16 bg-darkRed text-white">
      <h1 className="text-2xl font-bold px-16">
        Why Replace Your Garage Door?
      </h1>
      <div className="w-full py-5 flex flex-col gap-14 lg:flex-row lg:justify-evenly">
        <div className="flex flex-col items-center justify-center gap-3 lg:w-[200px]">
          <SlBadge className="w-[50px] h-[50px] text-yellow-300" />
          <h1 className="text-2xl font-bold">70%</h1>
          <p className="text-sm md:text-base">ROI at resale</p>
        </div>
        <div className="flex flex-col items-center justify-center gap-3 lg:w-[200px]">
          <LuHelpingHand className="w-[50px] h-[50px] text-yellow-300" />
          <h1 className="text-2xl font-bold">193%+</h1>
          <p className="text-sm max-w-[200px] md:text-base">
            Realtors agree a new garage door helps a home sell faster
          </p>
        </div>
        <div className="flex flex-col items-center justify-center gap-3 lg:w-[200px]">
          <IoIosStar className="w-[50px] h-[50px] text-yellow-300" />
          <h1 className="text-2xl font-bold">Show Off</h1>
          <p className="text-sm max-w-[200px] md:text-base">
            Your style with a new customized garage door
          </p>
        </div>
      </div>
      <button className="py-3 px-5 text-sm bg-warmBrown rounded-md w-min text-nowrap self-center border border-warmBrown hover:bg-transparent transition-all ease-in-out duration-200 mt-5 lg:mt-10">
        Explore Buying Guide
      </button>
    </div>
  );
};

export default WhyReplaceUs;
