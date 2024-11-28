import React from "react";

const FindInspiration: React.FC = () => {
  return (
    <>
      <section className="w-full mt-20 flex flex-col xl:flex-row xl:items-end xl:mt-40">
        <div className="w-full">
          <img
            src="https://www.clopaydoor.com/images/default-source/home-page/homepagelookbook-mobile.jpg?sfvrsn=75d096ba_5"
            alt="lookbook"
            className="w-full max-w-[740px] mx-auto xl:hidden"
          />
          <img
            className="w-full hidden xl:block"
            src="https://www.clopaydoor.com/images/default-source/home-page/homepagelookbook-alt.jpg"
            alt="lookbook"
          />
        </div>
        <div className="py-12 bg-[#F6F8FA] px-5 flex flex-col items-center justify-center xl:h-[470px]">
          <div className="xl:w-[330px] flex flex-col gap-7">
            <h1 className="font-bold text-2xl md:text-4xl text-titleColor xl:text-2xl">
              Find Inspiration With AR Doors's® Lookbook
            </h1>
            <p>
              Projects from award-winning architects, builders and influencers
              featuring garage doors from AR Doors
            </p>
            <a href="/lookbook">
              <button className="py-3 w-min px-5 bg-darkRed border-[2px] border-darkRed rounded-md text-white hover:bg-transparent hover:text-darkRed transition-all ease-in-out duration-200 text-nowrap">
                Experience Lookbook
              </button>
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default FindInspiration;
