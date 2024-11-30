const Description = () => {
  return (
    <>
      <div className="w-full my-5 flex flex-col gap-5">
        <div className="w-full">
          <h1 className="font-bold text-xl text-titleColor md:text-2xl">
            Garage Doors Crafted for Every Home
          </h1>
          <p className="text-titleColor mt-4 md:text-xl lg:text-base">
            For more than 50 years, AR Doors has manufactured beautiful, durable
            and reliable garage doors. We are honored to be America’s favorite
            garage door brand, a distinction achieved through our unrelenting
            focus on delivering true performance. With all the styles of garage
            doors offered by AR Doors, the perfect look and design is ready to
            be crafted for you.
          </p>
        </div>
        <div className="w-full">
          <h1 className="font-bold text-xl text-titleColor md:text-2xl">
            Find Inspiration
          </h1>
          <p className="text-titleColor mt-4 md:text-xl lg:text-base">
            Be inspired by our{" "}
            <span className="text-slate-500 hover:underline cursor-pointer">
              latest Lookbook
            </span>
            , featuring projects from award-winning architects, builders, and
            influencers featuring garage doors from AR Doors.
          </p>
        </div>
        <div className="w-full">
          <h1 className="font-bold text-xl text-titleColor md:text-2xl">
            Build Your Own Beauty
          </h1>
          <p className="text-titleColor mt-4 md:text-xl lg:text-base">
            Tap into your vision and unlock the full craftsmanship of AR Doors
            in our{" "}
            <span className="text-slate-500 hover:underline cursor-pointer">
              Door Imagination System
            </span>
            . Upload a picture of your home, build your custom door, and preview
            it on your own home. Explore how each available design option
            changes and beautifies your curb appeal.
          </p>
        </div>
        <div className="w-full">
          <h1 className="font-bold text-xl text-titleColor md:text-2xl">
            Craftsmanship from Build to Install
          </h1>
          <p className="text-titleColor mt-4 md:text-xl lg:text-base">
            AR Doors has a network of more than 400 trusted and certified local
            dealers and service specialists. We trust our craftsmanship to them
            and so can you.{" "}
            <span className="text-slate-500 hover:underline cursor-pointer">
              Find an authorized garage door professional{" "}
            </span>
            near you to handle the delivery and installation of your garage
            door. Have peace of mind from start to finish.
          </p>
        </div>
      </div>
    </>
  );
};

export default Description;
