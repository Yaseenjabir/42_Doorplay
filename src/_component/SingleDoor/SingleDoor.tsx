import React, { useEffect, useRef, useState } from "react";
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
import useStore from "../../store/Store";
import Review from "./Review";

const SingleDoor: React.FC = () => {
  const [singleDoor, setSingleDoor] = useState<DoorSchema | undefined>(
    undefined
  );

  const [loader, setLoader] = useState(true);
  const location = useLocation();
  const doorId = location.state?.id;

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

  const { val } = useStore();

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
  }, [val]);

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
                  <div className="flex text-2xl text-yellow-400 gap-1">
                    <IoMdStar />
                    <IoMdStar />
                    <IoMdStar />
                    <IoMdStar />
                    <IoMdStar />
                  </div>
                  <div className="flex gap-1 text-sm items-center text-titleColor">
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
          <Review singleDoor={singleDoor} />
          <ContactUs />
        </section>
      </>
    )
  );
};

export default SingleDoor;
