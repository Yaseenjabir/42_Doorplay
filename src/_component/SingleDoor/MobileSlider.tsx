import React from "react";
import Slider from "react-slick";
import { DoorSchema, imageReplacement } from "../../utils/utils";

interface SingleDoorSchema {
  singleDoor: DoorSchema;
}

const MobileSlider: React.FC<SingleDoorSchema> = ({ singleDoor }) => {
  const settings = {
    dots: true,
    infinite: singleDoor?.media?.length > 1, // Disable infinite loop if only one image
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="slider-container w-[97%] lg:hidden mx-auto">
      {singleDoor && singleDoor.media && singleDoor.media.length > 0 ? (
        <Slider {...settings}>
          {singleDoor &&
            singleDoor.media.map((item) => {
              return (
                <div key={item._id} className="w-full outline-none">
                  <img
                    className="w-full rounded"
                    src={item.url}
                    alt="slider-img"
                  />
                </div>
              );
            })}
        </Slider>
      ) : (
        <img src={imageReplacement} />
      )}
    </div>
  );
};

export default MobileSlider;
