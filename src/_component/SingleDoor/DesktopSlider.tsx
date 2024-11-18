import React, { useState, useEffect, useRef } from "react";
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

const DesktopHeader: React.FC<SingleDoorSchema> = ({ singleDoor }) => {
  const [nav1, setNav1] = useState<React.MutableRefObject<any>>(useRef(null));
  const [nav2, setNav2] = useState<React.MutableRefObject<any>>(useRef(null));

  let sliderRef1 = useRef<any>(null);
  let sliderRef2 = useRef<any>(null);

  useEffect(() => {
    setNav1(sliderRef1);
    setNav2(sliderRef2);
  }, []);

  interface Data {
    id: number;
    imgURL: string;
  }

  const data: Data[] = [
    {
      id: 1,
      imgURL:
        "https://www.clopaydoor.com/images/default-source/product-images/garage-doors/canyonridgeelements/normal/elements-normal-03.tmb-medium.webp?Culture=en&sfvrsn=8a76dbc2_4",
    },
    {
      id: 2,
      imgURL:
        "https://www.clopaydoor.com/images/default-source/product-images/garage-doors/canyonridgeelements/normal/elements-normal-04.tmb-medium.webp?Culture=en&sfvrsn=dc9a41a7_2",
    },
    {
      id: 3,
      imgURL:
        "https://www.clopaydoor.com/images/default-source/product-images/garage-doors/canyonridgeelements/normal/cr-elements-d11-plain-long-02.tmb-medium.webp?Culture=en&sfvrsn=3bee997_2",
    },
    {
      id: 4,
      imgURL:
        "https://www.clopaydoor.com/images/default-source/product-images/garage-doors/canyonridgeelements/normal/cr-elements-d11-plain-long-01.tmb-medium.webp?Culture=en&sfvrsn=68bbee9e_3",
    },
  ];

  return (
    <div
      className={`slider-container hidden lg:block border-none ${
        singleDoor.media.length === 1 ? "w-[250%]" : "w-[70%]"
      } out`}
    >
      <Slider
        infinite={singleDoor?.media?.length > 1}
        arrows={false}
        asNavFor={nav2}
        ref={(slider) => (sliderRef1 = slider)}
      >
        {singleDoor.media.map((item) => {
          return (
            <div className="w-full">
              <img
                className="w-full rounded"
                src={item.url}
                alt="slider-images"
              />
            </div>
          );
        })}
      </Slider>
      {singleDoor.media.length > 1 && (
        <Slider
          asNavFor={nav1}
          ref={(slider) => (sliderRef2 = slider)}
          slidesToShow={
            singleDoor.media.length && singleDoor.media.length < 4
              ? singleDoor.media.length
              : 4
          }
          swipeToSlide={true}
          focusOnSelect={true}
        >
          {singleDoor.media.map((item) => {
            return (
              <div className="w-full mt-7 flex items-center justify-center">
                <img
                  className="w-[94%] mx-auto rounded-md h-[110px]"
                  src={item.url}
                  alt="slider-images"
                />
              </div>
            );
          })}
        </Slider>
      )}
    </div>
  );
};

export default DesktopHeader;
