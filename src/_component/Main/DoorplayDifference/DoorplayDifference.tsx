import { AiOutlineDashboard } from "react-icons/ai";
import { PiPencilLine } from "react-icons/pi";
import { RiUserStarLine } from "react-icons/ri";

const DoorplayDifference = () => {
  return (
    <>
      <section className="mt-20 lg:mt-40 bg-lightGray py-20 text-center px-5 w-full lg:px-14 lg:py-48">
        <h1 className="text-2xl font-semibold lg:text-3xl text-gray-800">
          The Doorplay Difference
        </h1>
        <div className="flex flex-col w-full my-7 lg:my-10 gap-10 lg:flex-row lg:gap-8">
          <div className="flex flex-col items-center justify-center py-12 lg:w-[32%] pb-[100px] gap-8 bg-darkRed rounded-xl text-white px-8">
            <RiUserStarLine className="text-5xl text-[#f1ab92]" />
            <h1 className="text-3xl font-bold text-[#f1ab92]">
              Expert Guidance
            </h1>
            <p>
              Your dreams become reality as we provide the tailored expertise,
              tools and solutions that guide every step of designing and
              attaining the ideal garage door.
            </p>
          </div>
          <div className="flex flex-col items-center justify-center py-12 lg:w-[32%] pb-[100px] gap-8 bg-white rounded-xl px-8 text-gray-800">
            <AiOutlineDashboard className="text-5xl" />
            <h1 className="text-3xl font-bold">Enduring Performance</h1>
            <p>
              With excellence and integrity at the heart of what we value,
              passion and experience propelling us forward, our commitment to
              quality and attention to detail is influential and everlasting.
            </p>
          </div>
          <div className="flex flex-col items-center justify-center py-12 lg:w-[32%] pb-[100px] gap-8 bg-white rounded-xl px-8 text-gray-800">
            <PiPencilLine className="text-5xl" />
            <h1 className="text-3xl font-bold">Inspirational Design</h1>
            <p>
              We inspire homes that reflect the individuality of their owners
              through trend-setting styles, sharp innovation and customizable
              features to enhance the livability of your home.
            </p>
          </div>
        </div>
        <button className="py-3 px-5 bg-darkRed border-[2px] border-darkRed rounded-md text-white hover:bg-transparent hover:text-darkRed transition-all ease-in-out duration-200">
          Learn More
        </button>
      </section>
    </>
  );
};

export default DoorplayDifference;
