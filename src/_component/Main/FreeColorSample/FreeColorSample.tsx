const FreeColorSample = () => {
  return (
    <>
      <section className="mt-10 flex flex-col lg:flex-row w-full lg:mt-48">
        <img
          src="https://www.clopaydoor.com/images/default-source/home-page/color-chips.webp?sfvrsn=adccf276_2"
          alt="color-sample"
          className="w-full lg:w-[50%]"
        />
        <div className="text-center px-10 py-16 flex flex-col gap-5 items-center justify-center lg:w-[50%] lg:items-start lg:text-start">
          <h1 className="font-bold text-2xl text-gray-800 lg:text-3xl">
            Free Color Samples
          </h1>
          <p>
            Don't let online or indoor variations deceive you. Try before you
            buy!
          </p>
          <button className="py-3 px-5 bg-darkRed border-[2px] border-darkRed rounded-md text-white hover:bg-transparent hover:text-darkRed w-min text-nowrap mt-10 transition-all ease-in-out duration-200">
            Order Now
          </button>
        </div>
      </section>
    </>
  );
};

export default FreeColorSample;
