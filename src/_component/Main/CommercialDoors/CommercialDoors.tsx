import React from "react";

const CommercialDoors: React.FC = () => {
  return (
    <>
      <section className="w-full flex flex-col px-5 lg:px-10 text-center mt-20 lg:mt-44">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 mb-5 lg:text-3xl">
            Clopay® has a commercial door for virtually any application
          </h1>
          <button className="py-3 px-5 bg-darkRed border-[2px] border-darkRed rounded-md text-white hover:bg-transparent hover:text-darkRed transition-all ease-in-out duration-200">
            Browse Doors
          </button>
        </div>
        <div className="w-full mt-10 lg:mt-12 flex flex-col gap-10 lg:flex-row">
          <div className="w-full">
            <img
              src="https://www.clopaydoor.com/images/default-source/home-page/home_rolling-doors2x.webp?sfvrsn=41f41d09_6"
              alt=""
              className="w-full rounded-md"
            />
            <div className="text-start py-3 flex flex-col gap-3 text-gray-800">
              <h1 className="font-bold text-xl ">Rolling Doors</h1>
              <p>
                Clopay’s rolling service and garage doors provide efficiency and
                flexibility for interior and exterior use.
              </p>
            </div>
          </div>
          <div className="w-full">
            <img
              src="https://www.clopaydoor.com/images/default-source/home-page/architectural-series-904-01.webp?sfvrsn=5a501123_4"
              alt=""
              className="w-full rounded-md"
            />
            <div className="text-start py-3 flex flex-col gap-3 text-gray-800">
              <h1 className="font-bold text-xl ">Sectional Doors</h1>
              <p>
                Clopay’s commercial-graded sectional doors meet the day-day
                needs of virtually any business application.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CommercialDoors;
