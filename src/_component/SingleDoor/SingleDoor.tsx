import React, { useEffect, useState } from "react";
import MobileSlider from "./MobileSlider";
import { IoMdStar } from "react-icons/io";
import DesktopHeader from "./DesktopSlider";
import AccordionComponent from "./Accordian";
import ContactUs from "../Main/ContactUs/ContactUs";
import { apiClient } from "../../apiClient/apiClient";
import { GET_SINGLE_DOOR } from "../../constants/constant";
import { useLocation } from "react-router";
import { DoorSchema } from "../../utils/utils";
import { AxiosError } from "axios";
import { toast } from "sonner";
import Loader from "../../utils/Loader";

const SingleDoor: React.FC = () => {
  const [singleDoor, setSingleDoor] = useState<DoorSchema | undefined>(
    undefined
  );

  const [loader, setLoader] = useState(true);
  const location = useLocation();
  const doorId = location.state?.id; // Get the door ID from the state (passed via navigate)

  const fetchSingleDoorData = async (id: any) => {
    try {
      setLoader(true);
      const url = GET_SINGLE_DOOR.replace(":id", id);
      const res = await apiClient.get(url);
      if (res.data) {
        setSingleDoor(res.data);
      }
    } catch (ex: unknown) {
      if (ex instanceof AxiosError) {
        if (ex.response && ex.response.data && ex.response.data.error) {
          toast.error(ex.response.data.error);
        } else {
          toast.error("An unexpected error occurred.");
        }
      } else {
        toast.error("An unexpected error occurred.");
      }
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    fetchSingleDoorData(doorId);
  }, []);

  return loader ? (
    <Loader />
  ) : !singleDoor ? (
    <div className="w-full h-[calc(100vh-56px)] flex items-center justify-center flex-col gap-2">
      <h1 className="text-4xl font-bold italic lg:text-5xl">404 not found</h1>
      <p className="text-lg italic lg:text-xl">
        No page available with the provided link
      </p>
    </div>
  ) : (
    singleDoor && (
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
            <h1 className="text-2xl font-semibold md:text-4xl text-gray-800 lg:text-3xl">
              {singleDoor.title}
            </h1>
            <p className="text-gray-800 md:text-xl lg:text-base">
              {singleDoor.shortPreview}
            </p>
            <div className="flex flex-col mt-3 gap-5">
              <div className="flex gap-3">
                <div className="flex text-2xl text-yellow-400 gap-1">
                  <IoMdStar />
                  <IoMdStar />
                  <IoMdStar />
                  <IoMdStar />
                  <IoMdStar />
                </div>
                <div className="flex gap-1 text-sm items-center text-gray-800">
                  <h1>5.0</h1>
                  <span>|</span>
                  <p>3 reviews</p>
                </div>
              </div>
              <div className="flex gap-2 flex-wrap">
                <button className="py-2 px-4 bg-darkRed border-[2px] border-darkRed rounded-md text-white hover:bg-transparent hover:text-darkRed transition-all ease-in-out duration-200 w-[155px] h-[44px] text-nowrap">
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
        <div className="w-full mt-10 lg:w-[70%]">
          <div className="w-full flex justify-between items-center">
            <h1 className="text-xl font-semibold">Reviews(39)</h1>
            <button className="py-2 px-4 bg-darkRed border-[2px] border-darkRed rounded-md text-white hover:bg-transparent hover:text-darkRed transition-all ease-in-out duration-200 text-nowrap">
              Write a review
            </button>
          </div>
          <div className="w-full flex flex-col mt-5 gap-12  lg:grid lg:grid-cols-2 lg:mt-10">
            <div className="w-full flex flex-col gap-2">
              <div className="flex text-3xl text-yellow-400 gap-1">
                <IoMdStar />
                <IoMdStar />
                <IoMdStar />
                <IoMdStar />
                <IoMdStar />
              </div>
              <h1 className="text-gray-800 font-bold md:text-lg">
                "Exceeded Expectations"
              </h1>
              <p className="text-gray-500 md:text-xl">
                Our new door was installed this morning. It is STUNNING.
                Exceeded our expectations. This facelift to...{" "}
                <span className="text-gray-700 cursor-pointer hover:underline">
                  Read More
                </span>
              </p>
              <img
                className="w-[70px] h-[48px] rounded mt-3"
                src="https://photos-us.bazaarvoice.com/photo/2/cGhvdG86Y2xvcGF5Z2FyYWdlZG9vcnM/dbf8e755-388f-5e53-96a9-dd1af1444fbf"
                alt="review-image"
              />
              <div className="flex gap-1 text-gray-600 text-sm mt-4 md:text-lg">
                <span className="font-semibold text-gray-800">SleepyGypsy</span>
                <span>-</span>
                <span>1 month ago</span>
              </div>
            </div>
            <div className="w-full flex flex-col gap-2">
              <div className="flex text-3xl text-yellow-400 gap-1">
                <IoMdStar />
                <IoMdStar />
                <IoMdStar />
                <IoMdStar />
                <IoMdStar />
              </div>
              <h1 className="text-gray-800 font-bold md:text-lg">
                "Exceeded Expectations"
              </h1>
              <p className="text-gray-500 md:text-xl">
                Our new door was installed this morning. It is STUNNING.
                Exceeded our expectations. This facelift to...{" "}
                <span className="text-gray-700 cursor-pointer hover:underline">
                  Read More
                </span>
              </p>
              <img
                className="w-[70px] h-[48px] rounded mt-3"
                src="https://photos-us.bazaarvoice.com/photo/2/cGhvdG86Y2xvcGF5Z2FyYWdlZG9vcnM/dbf8e755-388f-5e53-96a9-dd1af1444fbf"
                alt="review-image"
              />
              <div className="flex gap-1 text-gray-600 text-sm mt-4 md:text-lg">
                <span className="font-semibold text-gray-800">SleepyGypsy</span>
                <span>-</span>
                <span>1 month ago</span>
              </div>
            </div>
            <div className="w-full flex flex-col gap-2">
              <div className="flex text-3xl text-yellow-400 gap-1">
                <IoMdStar />
                <IoMdStar />
                <IoMdStar />
                <IoMdStar />
                <IoMdStar />
              </div>
              <h1 className="text-gray-800 font-bold md:text-lg">
                "Exceeded Expectations"
              </h1>
              <p className="text-gray-500 md:text-xl">
                Our new door was installed this morning. It is STUNNING.
                Exceeded our expectations. This facelift to...{" "}
                <span className="text-gray-700 cursor-pointer hover:underline">
                  Read More
                </span>
              </p>
              <img
                className="w-[70px] h-[48px] rounded mt-3"
                src="https://photos-us.bazaarvoice.com/photo/2/cGhvdG86Y2xvcGF5Z2FyYWdlZG9vcnM/dbf8e755-388f-5e53-96a9-dd1af1444fbf"
                alt="review-image"
              />
              <div className="flex gap-1 text-gray-600 text-sm mt-4 md:text-lg">
                <span className="font-semibold text-gray-800">SleepyGypsy</span>
                <span>-</span>
                <span>1 month ago</span>
              </div>
            </div>
            <div className="w-full flex flex-col gap-2">
              <div className="flex text-3xl text-yellow-400 gap-1">
                <IoMdStar />
                <IoMdStar />
                <IoMdStar />
                <IoMdStar />
                <IoMdStar />
              </div>
              <h1 className="text-gray-800 font-bold md:text-lg">
                "Exceeded Expectations"
              </h1>
              <p className="text-gray-500 md:text-xl">
                Our new door was installed this morning. It is STUNNING.
                Exceeded our expectations. This facelift to...{" "}
                <span className="text-gray-700 cursor-pointer hover:underline">
                  Read More
                </span>
              </p>
              <img
                className="w-[70px] h-[48px] rounded mt-3"
                src="https://photos-us.bazaarvoice.com/photo/2/cGhvdG86Y2xvcGF5Z2FyYWdlZG9vcnM/dbf8e755-388f-5e53-96a9-dd1af1444fbf"
                alt="review-image"
              />
              <div className="flex gap-1 text-gray-600 text-sm mt-4 md:text-lg">
                <span className="font-semibold text-gray-800">SleepyGypsy</span>
                <span>-</span>
                <span>1 month ago</span>
              </div>
            </div>
          </div>
        </div>
        <ContactUs />
      </section>
    )
  );
};

export default SingleDoor;
