import { useEffect } from "react";

const About = () => {
  const garageName = "A&R Doors";
  const address = "2202 Woodview Dr, Ypsilanti Charter Twp, MI 48198";

  useEffect(() => {
    document.title = "A&R | About";
  }, []);

  return (
    <section className="w-full py-10 px-7 text-titleColor max-w-[850px] mx-auto">
      {/* About A&R Doors  */}
      <div className="w-full flex flex-col gap-3">
        <h1 className="text-4xl font-light">About {garageName}</h1>
        <h4 className="font-bold text-sm">Quality Garage Doors</h4>
      </div>
      {/* ........text........ */}
      <div className="my-8 flex flex-col gap-5">
        <p>
          For more than 50 years, {garageName} has manufactured beautiful,
          durable and reliable garage doors. We are honored to be America's
          favorite garage door brand, a distinction achieved through our
          unrelenting focus on delivering true performance.
        </p>
        <p>
          To further reinforce our commitment to providing the best products and
          services, {garageName} is an active member of the International Door
          Association and the Door and Access Systems Manufacturer's Association
          (DASMA).
        </p>
      </div>
      {/* Beautiful and Durable Doors */}
      <div className="w-full flex flex-col gap-5 md:flex-row items-center justify-center">
        <div className="w-full">
          <img
            className="w-full"
            src="https://www.clopaydoor.com/images/default-source/about-us/coachman-double-door-narrow-lot-desk.webp?sfvrsn=16f24930_1"
            alt=""
          />
        </div>
        <div className="flex flex-col gap-3">
          <h1 className="font-semibold text-xl">Beautiful and Durable Doors</h1>
          <p className="text-lg mt-2">
            To match your style and performance requirements
          </p>
          <a href="/commercial-doors">
            <button className="border-[2px] w-min border-darkRed px-5 py-3 rounded-md hover:text-white hover:bg-darkRed transition-all ease-in-out duration-300 text-nowrap">
              Browse Doors
            </button>
          </a>
        </div>
      </div>
      {/* ........text........ */}
      <div className="w-full mt-10 flex flex-col gap-5">
        <p>
          {garageName} provides a wide selection of residential and commercial{" "}
          <a
            href="/garage-doors"
            className="underline text-gray-600 cursor-pointer"
          >
            garage doors
          </a>{" "}
          made from a variety of materials, finish, and performance insulation
          options. These doors have the ability to completely transform a home's
          curb appeal. Our products can be customized to help achieve the vision
          you've always held for your home's exterior, or your commercial
          facility's performance.
        </p>
        <p>
          Research also shows that an investment in new garage door is often
          recouped during resale. This means you have an opportunity to
          dramatically redefine your home's appearance, while also making a
          strong investment for the future.
        </p>
      </div>
      {/* Made in America  */}
      <div className="w-full mt-10 flex flex-col gap-5 md:flex-row md:gap-12">
        <div className="w-full md:w-[20%] md:flex md:items-center">
          <img
            src="https://www.clopaydoor.com/images/default-source/about-us/workers.webp?sfvrsn=6847007e_1"
            alt="image-door"
          />
        </div>
        <div className="w-full flex flex-col gap-5">
          <h1 className="text-2xl font-bold">Made in America</h1>
          <p>
            {garageName} Corporation is headquartered in {address}. We operate
            as North America’s largest overhead door manufacturer, including
            four manufacturing plants and over 50 distribution centers
            throughout the United States and Canada. We're a preferred supplier
            of residential garage doors and overhead commercial and industrial
            doors. When customers search for the best garage door company, they
            find {garageName}®.
          </p>
          <a href="/garage-doors">
            <button className="border-[2px] w-min border-darkRed px-5 py-3 rounded-md hover:text-white hover:bg-darkRed transition-all ease-in-out duration-300 text-nowrap">
              Browse Doors
            </button>
          </a>
        </div>
      </div>
      {/* Pride behind every door */}
      <div className="flex flex-col gap-7 mt-10">
        <div className="w-full relative">
          <img
            className="w-full"
            src="https://www.clopaydoor.com/images/default-source/about-us/pride-behind-every-door-lg.webp?sfvrsn=b328a906_1"
          />
          <h1 className="absolute bottom-10 left-5 text-white text-2xl font-light md:bottom-0 md:top-10 md:left-10 md:text-3xl">
            Pride behind
            <br />
            every door
          </h1>
        </div>
        <p>
          The true secret to our strong reputation as a garage and overhead door
          manufacturer is the people behind our products. {garageName} is far
          more than just the doors we sell — from design to installation, we are
          proud to work with employees and dealers that place great value in
          innovation, service, and quality. Our products are made in the United
          States by skilled tradespeople who combine time-honored techniques
          with modern-day technology. They emphasize handcrafted quality and
          attention to detail. The results are garage doors that provide
          unmatched style and will stand the test of time
        </p>
      </div>
      {/* Clopay difference  */}
      <div className="mt-10 flex flex-col gap-5">
        <h1 className="font-bold text-2xl">The {garageName} Difference</h1>
        <p>
          {garageName} is often recognized as the best among a vast selection of
          garage door companies. What is it that makes us stand out? Here are
          just a few of the characteristics that set us apart from other garage
          door brands:
        </p>
        <p>
          {garageName} is known for design innovation and uncompromising product
          performance standards, a recognition that comes from achieving many
          residential garage door manufacturing industry firsts.
        </p>
        <p>
          Each {garageName} garage door is built to order, which means that it
          perfectly matches your specific design and performance requirements —
          all while remaining within your budget. Our residential and commercial
          garage doors feature traditional raised panel, contemporary and
          carriage house and industrial ribbed styles, and are constructed with
          steel, wood, composite or aluminum. {garageName}'s overhead garage
          doors are available in many insulation and R-value options, providing
          R-values up to 27.2. Customers can enhance any of our standard garage
          doors with windows and high performance hardware options. Finish your
          custom design with one of our factory paint colors or stain options to
          create a one-of-a-kind look that will transform your home and
          building's exterior.
        </p>
        <p>
          {garageName} has the most extensive independent dealer network for
          sales, service and installation of our residential and commercial
          overhead garage doors.
        </p>
      </div>
    </section>
  );
};

export default About;
