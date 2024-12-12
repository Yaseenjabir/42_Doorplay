import React from "react";
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
import { imageReplacement } from "../../utils/utils";

interface SingleImageModel {
  _id: string;
  url: string;
  public_id: string;
}

interface SliderModel {
  images: SingleImageModel[];
}

const Slider: React.FC<SliderModel> = ({ images }) => {
  return (
    <div id="slider-2" className="w-full ">
      <Swiper
        cssMode={true}
        navigation={true}
        pagination={false}
        mousewheel={true}
        keyboard={true}
        autoplay={true}
        modules={[Navigation, Pagination, Mousewheel, Keyboard, Autoplay]}
        className="mySwiper"
      >
        {images.length > 0 ? (
          images.map((slide) => (
            <SwiperSlide key={slide._id}>
              <div
                className="slide rounded select-none h-full flex flex-1 flex-col w-full relative cursor-pointer"
                key={slide._id}
              >
                <img
                  src={slide.url ? slide.url : imageReplacement}
                  loading="lazy"
                  className="w-full h-full rounded"
                />
              </div>
            </SwiperSlide>
          ))
        ) : (
          <SwiperSlide>
            <div className="slide rounded select-none h-full flex flex-1 flex-col w-full relative cursor-pointer">
              <img
                src={imageReplacement}
                loading="lazy"
                className="w-full max-h-[330px] rounded"
              />
            </div>
          </SwiperSlide>
        )}
      </Swiper>
    </div>
  );
};

export default Slider;
