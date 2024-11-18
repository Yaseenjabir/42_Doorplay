import React from "react";
import Slider from "react-slick";

interface DoorSchema {
  _id: string;
  category: string;
  construction: {
    title: string | undefined;
    description: string | undefined;
  };
  customization: {
    title: string | undefined;
    description: string | undefined;
  };
  insulation: {
    title: string | undefined;
    description: string | undefined;
  };
  material: {
    title: string | undefined;
    description: string | undefined;
  };
  reinforcement: {
    title: string | undefined;
    description: string | undefined;
  };
  shortPreview: string;
  stockCount: number;
  subCategory: string;
  title: string;
  media: Array<{
    _id: string;
    public_id: string;
    url: string;
  }>;
}

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

  console.log(singleDoor && singleDoor.media.map((door) => console.log(door)));

  return (
    <div className="slider-container w-[97%] lg:hidden mx-auto">
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
    </div>
  );
};

export default MobileSlider;
