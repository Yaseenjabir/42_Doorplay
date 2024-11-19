import React from "react";
import Slider from "react-slick";
import { DoorSchema } from "../../utils/utils";

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
        <img src="https://media.istockphoto.com/id/1409329028/vector/no-picture-available-placeholder-thumbnail-icon-illustration-design.webp?s=1024x1024&w=is&k=20&c=Bs1RdueQnaAcO888WBIQsC6NvA7aVTzeRVzSd8sJfUg=" />
      )}
    </div>
  );
};

export default MobileSlider;
