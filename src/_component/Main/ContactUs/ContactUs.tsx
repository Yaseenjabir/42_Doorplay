const ContactUs = () => {
  return (
    <>
      <section className="w-full flex flex-col mt-20 px-5 lg:flex-row">
        <div className="py-20 px-10 bg-lightGray flex flex-col gap-3 lg:w-[50%]">
          <h1 className="text-2xl md:text-3xl">Wanna design your door?</h1>
          <p>Our talented Design Support team has you covered!</p>
        </div>
        <div className="bg-darkRed py-20 px-10 text-white flex flex-col md:flex-row items-center lg:w-[50%]">
          <p className="md:text-xl md:pr-20 lg:text-base">
            Engage with our team of qualified professionals to address all of
            your door needs.
          </p>
          <button className="bg-warmBrown px-4 py-2 rounded-md mt-5 md:mt-0 hover:bg-[#7c4936] transition-all ease-in-out duration-300 self-start text-nowrap md:self-auto">
            Send Design
          </button>
        </div>
      </section>
    </>
  );
};

export default ContactUs;
