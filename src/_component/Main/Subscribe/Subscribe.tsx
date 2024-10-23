const Subscribe = () => {
  return (
    <>
      <section className="w-full mt-10 lg:mt-20 py-14 lg:py-16 bg-darkRed text-white px-5 flex flex-col gap-10 items-center justify-center lg:flex-row max-w-[1150px] mx-auto lg:justify-evenly lg:w-[85%] lg:gap-64">
        <div className="w-full max-w-[400px] sm:text-center lg:text-start lg:max-w-full lg:w-[30%]">
          <h1 className="font-bold text-3xl sm:text-5xl lg:text-4xl">
            Stay up to date with Doorplay!
          </h1>
          <p className="mt-5 text-[#ffffffa6] sm:text-lg lg:text-base">
            Subscribe to stay up to date with our latest models, news and
            updates.
          </p>
        </div>
        <form className="flex flex-col gap-2 w-full max-w-[570px] lg:max-w-full lg:w-[30%]">
          <input
            type="text"
            className="w-full bg-transparent border border-white py-3 rounded-lg px-3 placeholder:text-white"
            placeholder="Enter email"
          />
          <button className="w-full bg-warmBrown py-[10px] rounded-lg border border-warmBrown hover:bg-transparent hover:border-white transition-all ease-in-out duration-200">
            Notify Me
          </button>
        </form>
      </section>
    </>
  );
};

export default Subscribe;
