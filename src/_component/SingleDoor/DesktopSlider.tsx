import React, { useEffect, useRef } from "react";
import Slider from "react-slick";
import { DoorSchema } from "../../utils/utils";

interface SingleDoorSchema {
  singleDoor: DoorSchema;
}

const DesktopHeader: React.FC<SingleDoorSchema> = ({ singleDoor }) => {
  const sliderRef1 = useRef<Slider | null>(null);
  const sliderRef2 = useRef<Slider | null>(null);

  useEffect(() => {}, []);

  return (
    <div
      className={`slider-container hidden lg:block border-none ${
        singleDoor.media.length === 1 ? "w-[250%]" : "w-[70%]"
      } out`}
    >
      {singleDoor && singleDoor.media && singleDoor.media.length > 0 ? (
        <>
          <Slider
            infinite={singleDoor?.media?.length > 1}
            arrows={false}
            // Check if sliderRef2.current is defined
            asNavFor={sliderRef2.current || undefined} // Use conditional chaining or undefined fallback
            ref={sliderRef1} // Assign the ref directly
          >
            {singleDoor.media.map((item) => {
              return (
                <div className="w-full" key={item._id}>
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
              // Check if sliderRef1.current is defined
              asNavFor={sliderRef1.current || undefined} // Use conditional chaining or undefined fallback
              ref={sliderRef2} // Assign the ref directly
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
                  <div
                    className="w-full mt-7 flex items-center justify-center"
                    key={item._id}
                  >
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
        </>
      ) : (
        <img
          className="w-full"
          src="https://media.istockphoto.com/id/1409329028/vector/no-picture-available-placeholder-thumbnail-icon-illustration-design.webp?s=1024x1024&w=is&k=20&c=Bs1RdueQnaAcO888WBIQsC6NvA7aVTzeRVzSd8sJfUg="
        />
      )}
    </div>
  );
};

export default DesktopHeader;
