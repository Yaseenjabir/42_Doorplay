import React, { useEffect, useRef, useState } from "react";
import MobileSlider from "./MobileSlider";
import { IoMdStar } from "react-icons/io";
import DesktopHeader from "./DesktopSlider";
import AccordionComponent from "./Accordian";
import ContactUs from "../Main/ContactUs/ContactUs";
import { useLocation, useNavigate } from "react-router";
import { DoorSchema, ReviewModel } from "../../utils/utils";
import Loader from "../../utils/Loader";
import useStore from "../../store/Store";
import Review from "./Review";

const SingleDoor: React.FC = () => {
  const [singleDoor, setSingleDoor] = useState<DoorSchema>();
  const [availablity, setAvailability] = useState(true);

  const navigate = useNavigate();

  const [reviews, setReviews] = useState<ReviewModel[]>();

  const totalRatings =
    reviews && reviews.reduce((acc, review) => acc + review.rating, 0);
  const averageRating = totalRatings && totalRatings / reviews.length;

  const generateStars = (average: any) => {
    const stars = [];
    const fullStars = Math.floor(average);
    const hasHalfStar = average % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    for (let i = 0; i < fullStars; i++) stars.push("full");
    if (hasHalfStar) stars.push("half");
    for (let i = 0; i < emptyStars; i++) stars.push("empty");

    return stars;
  };

  const stars = generateStars(averageRating);

  const { globalData, val } = useStore();

  useEffect(() => {
    document.title = singleDoor?.title ? singleDoor.title : "A&R Doors";
  }, [singleDoor]);

  const [loader, setLoader] = useState(true);
  const location = useLocation();

  const pathName = `${import.meta.env.VITE_BASE_URL.replace(/\/$/, "")}${location.pathname}${location.search}`;

  const [doorId, setDoorId] = useState<string | null>(null);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    setDoorId(queryParams.get("id"));
  }, [location]);

  const scrollIntoViewRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (scrollIntoViewRef.current) {
        scrollIntoViewRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [location]);

  const fetchSingleDoorData = async (id: any) => {
    try {
      if (doorId) {
        setLoader(true);
        const singleDoor = globalData.find((item) => item._id === id);
        if (singleDoor) {
          setSingleDoor(singleDoor);
          setAvailability(true);
        }
      }
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    fetchSingleDoorData(doorId);
  }, [val, doorId, globalData]);

  return loader ? (
    <Loader />
  ) : !availablity ? (
    <div className="w-full h-[calc(100vh-56px)] flex items-center justify-center flex-col gap-2">
      <h1 className="text-4xl font-bold italic lg:text-5xl">404 not found</h1>
      <p className="text-lg italic lg:text-xl">
        No page available with the provided link
      </p>
    </div>
  ) : (
    singleDoor && (
      <>
        <div ref={scrollIntoViewRef} className="" id="scrollIntoView"></div>
        <section className="py-10 w-full px-5 flex flex-col">
          {/* Bread Crumbs  */}
          <div className="w-full flex gap-2 md:text-lg">
            <a
              className="text-gray-600"
              href={`${
                singleDoor.category === "garage"
                  ? "/garage-doors"
                  : "/commercial-doors"
              }`}
            >
              {singleDoor.category.charAt(0).toUpperCase() +
                singleDoor.category.slice(1)}
            </a>
            <span className="text-gray-600">/</span>
            <h1>{singleDoor.title}</h1>
          </div>
          {/* Slider and Request a quote section  */}
          <div className="w-full flex flex-col gap-16 lg:flex-row lg:gap-5 mt-5">
            <MobileSlider singleDoor={singleDoor} />
            <DesktopHeader singleDoor={singleDoor} />
            <div className="w-full flex flex-col gap-4">
              <h1 className="text-2xl font-semibold md:text-4xl text-titleColor lg:text-3xl">
                {singleDoor.title}
              </h1>
              <p className="text-titleColor md:text-xl lg:text-base">
                {singleDoor.shortPreview}
              </p>
              <div className="flex flex-col mt-3 gap-5">
                <div className="flex gap-3">
                  {/* Display stars */}
                  <div className="flex text-2xl text-yellow-400 gap-1">
                    {stars.map((star, index) => (
                      <IoMdStar
                        key={index}
                        className={`${star === "full" ? "text-yellow-400" : "text-gray-300"} ${
                          star === "half" ? "opacity-50" : ""
                        }`}
                      />
                    ))}
                  </div>
                  {/* Display rating and number of reviews */}
                  <div className="flex gap-1 text-sm items-center text-titleColor">
                    <h1>{averageRating && averageRating.toFixed(1)}</h1>{" "}
                    {/* Show average rating with one decimal place */}
                    <span>|</span>
                    <p>{reviews && reviews.length} reviews</p>{" "}
                    {/* Number of reviews */}
                  </div>
                </div>
                <div className="flex gap-2 flex-wrap">
                  <button
                    onClick={() =>
                      navigate(`/contact`, { state: { pathName } })
                    }
                    className="py-2 px-4 bg-darkRed border-[2px] border-darkRed rounded-md text-white hover:bg-transparent hover:text-darkRed transition-all ease-in-out duration-200 w-[155px] h-[44px] text-nowrap"
                  >
                    Request A Quote
                  </button>
                  {/* <button className="py-2 px-4 bg-darkRed border-[2px] border-darkRed rounded-md text-white hover:bg-transparent hover:text-darkRed transition-all ease-in-out duration-200 w-[186px] h-[44px] text-nowrap">
                  Costumize Your Door
                </button> */}
                </div>
              </div>
            </div>
          </div>
          {/* decription  */}
          <div className="mt-10 md:text-xl lg:w-[70%] lg:text-base">
            {singleDoor.description && singleDoor.description}
          </div>
          {/* Accordian section  */}
          <div className="w-full mt-10 lg:w-[70%]">
            <hr />
            <AccordionComponent singleDoor={singleDoor} />
          </div>
          {/* Stars review section  */}
          <Review
            reviews={reviews}
            setReviews={setReviews}
            singleDoor={singleDoor}
          />
          <ContactUs />
        </section>
      </>
    )
  );
};

export default SingleDoor;
