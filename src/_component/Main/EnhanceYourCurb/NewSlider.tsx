import { useEffect, useState } from "react";
import { DoorSchema, imageReplacement } from "../../../utils/utils";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import {
  Navigation,
  Pagination,
  Mousewheel,
  Keyboard,
  Autoplay,
} from "swiper/modules";
import useStore from "../../../store/Store";
import { useNavigateToSingleDoor } from "../../../utils/useNavigateToSingleDoor";

const NewSlider = () => {
  const [doors, setDoors] = useState<DoorSchema[]>([]);

  const [loader, setLoader] = useState(true);
  const navigateToSingleDoor = useNavigateToSingleDoor();
  const { globalData } = useStore();

  useEffect(() => {
    const fetchDoors = async () => {
      setLoader(true);
      try {
        const filteredData = globalData.filter(
          (item) => item.category === "garage"
        );

        if (filteredData) {
          setLoader(false);
          setTimeout(() => {
            setDoors([filteredData[0], filteredData[1], filteredData[2]]);
          }, 1000);
        }
      } catch (ex) {
        console.log(ex);
      } finally {
        setLoader(false);
      }
    };
    fetchDoors();
  }, [globalData]);

  return loader ? (
    <div className="flex justify-center items-center h-[70vh] flex-1">
      <div className="border-t-4 border-darkRed border-solid w-16 h-16 rounded-full animate-spin"></div>
    </div>
  ) : (
    <Swiper
      cssMode={true}
      navigation={true}
      pagination={true}
      mousewheel={true}
      keyboard={true}
      autoplay={true}
      modules={[Navigation, Pagination, Mousewheel, Keyboard, Autoplay]}
      className="mySwiper"
    >
      {doors[0] !== undefined &&
        doors.length > 0 &&
        doors.map((slide) => (
          <SwiperSlide key={slide._id}>
            <div
              onClick={() => navigateToSingleDoor(slide)}
              className="slide select-none flex flex-1 flex-col w-full relative cursor-pointer"
              key={slide._id}
            >
              <img
                src={
                  slide && slide.media && slide.media[0]
                    ? slide.media[0].url
                    : imageReplacement
                }
                loading="lazy"
                className="w-full max-h-[520px]"
              />
              <div className="text-start py-3 px-2 flex flex-col gap-7 border border-gray-300 bg-white h-full lg:max-w-[310px] lg:border-none">
                <h1 className="text-titleColor font-bold text-lg lg:text-2xl">
                  {slide.title}
                </h1>
                <p className="font-normal text-[16px]">{slide.shortPreview}</p>
                <div className="font-normal text-[13px] flex items-center gap-2">
                  <p>Also in :</p>
                  <div className="flex gap-1">
                    <div className="w-3 h-3 rounded-full bg-warmBrown mt-1"></div>
                    <div className="w-3 h-3 rounded-full bg-darkRed mt-1"></div>
                  </div>
                  <span>+{slide.stockCount}</span>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
    </Swiper>
  );
};

export default NewSlider;
