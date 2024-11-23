const HeroSection = () => {
  return (
    <>
      <section
        id="heroSection"
        className="h-[calc(100vh-56px)] flex items-center px-5 lg:px-8 text-white relative w-full before:content-[''] before:absolute before:w-full before:h-full before:top-0 before:left-0 before:bg-[#00000070]"
      >
        <div className="relative z-10 max-w-[250px] flex flex-col gap-9">
          <h1 className="font-bold text-[40px] leading-[45px]">
            Find the Door You'll Adore
          </h1>
          <a href={`${import.meta.env.VITE_BASE_URL}/commercial-doors`}>
            <button className="w-min text-nowrap bg-white text-black border-[2px] border-warmBrown hover:text-white py-2 font-medium px-7 rounded-md hover:bg-warmBrown transition-all ease-in-out duration-200 ">
              View Models
            </button>
          </a>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
