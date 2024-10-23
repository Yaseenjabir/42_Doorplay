import React from "react";
import Slider from "./Slider";

const EnhanceYourCurb: React.FC = () => {
  return (
    <>
      <section className="mt-20 text-center flex flex-col px-5 lg:flex-row items-center justify-center mx-auto gap-10">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 lg:w-[400px]">
            Enhance your curb appeal with our Garage Doors
          </h1>
          <div className="flex gap-4 items-center justify-center mt-16">
            <button className="py-3 px-5 bg-darkRed border-[2px] border-darkRed rounded-md text-white hover:bg-transparent hover:text-darkRed transition-all ease-in-out duration-200">
              Customize Your Door
            </button>
            <button className="border-[2px] border-darkRed px-5 py-3 rounded-md hover:text-white hover:bg-darkRed transition-all ease-in-out duration-300 ">
              Browse Doors
            </button>
          </div>
        </div>
        <Slider />
      </section>
    </>
  );
};

export default EnhanceYourCurb;
