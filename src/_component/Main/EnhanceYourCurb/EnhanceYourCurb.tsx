import React from "react";
import NewSlider from "./NewSlider";

const EnhanceYourCurb: React.FC = () => {
  return (
    <>
      <section className="mt-20 text-center w-full flex flex-col px-5 lg:flex-row items-center justify-center mx-auto gap-10 lg:mt-36">
        <div className="flex flex-col items-center justify-center lg:w-[40%]">
          <h1 className="text-2xl lg:text-2xl font-bold text-titleColor md:text-4xl lg:text-start">
            Enhance your curb appeal with our Garage Doors
          </h1>
          <div className="flex gap-4 items-center w-full justify-center mt-16 lg:justify-start">
            <button className="py-3 px-5 bg-darkRed border-[2px] border-darkRed rounded-md text-white hover:bg-transparent hover:text-darkRed transition-all ease-in-out duration-200">
              Customize Your Door
            </button>
            <a href="/garage-doors">
              <button className="border-[2px] border-darkRed px-5 py-3 rounded-md hover:text-white hover:bg-darkRed transition-all ease-in-out duration-300 ">
                Browse Doors
              </button>
            </a>
          </div>
        </div>
        {/* <Slider /> */}
        <NewSlider />
      </section>
    </>
  );
};

export default EnhanceYourCurb;
