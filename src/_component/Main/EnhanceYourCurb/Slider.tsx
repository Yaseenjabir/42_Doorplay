import React, { useState, useRef, useEffect } from "react";
import "./SwipeSlider.css"; // Ensure you have this CSS file
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import { apiClient } from "../../../apiClient/apiClient";
import { GET_ALL_DOORS } from "../../../constants/constant";
import { DoorSchema, imageReplacement } from "../../../utils/utils";
const Slider: React.FC = () => {
  const [doors, setDoors] = useState<DoorSchema[]>([]);

  const [loader, setLoader] = useState(true);

  useEffect(() => {
    const fetchDoors = async () => {
      setLoader(true);
      try {
        const res = await apiClient.get(GET_ALL_DOORS, {
          params: { skip: 0, limit: 3, category: "garage" },
        });
        if (res.data) {
          setLoader(false);
          setTimeout(() => {
            setDoors(res.data);
          }, 1000);
        }
      } catch (ex) {
        console.log(ex);
      } finally {
        setLoader(false);
      }
    };
    fetchDoors();
  }, []);

  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const isDragging = useRef(false);

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % doors.length);
  };

  const goToPrevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? doors.length - 1 : prevIndex - 1
    );
  };

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    handleSwipe();
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    touchStartX.current = e.clientX;
    isDragging.current = true;
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging.current) {
      touchEndX.current = e.clientX;
    }
  };

  const handleMouseUp = () => {
    if (isDragging.current) {
      handleSwipe();
      isDragging.current = false;
    }
  };

  const handleSwipe = () => {
    const threshold = 50; // Minimum distance to trigger a swipe
    if (touchStartX.current - touchEndX.current > threshold) {
      goToNextSlide();
    } else if (touchEndX.current - touchStartX.current > threshold) {
      goToPrevSlide();
    }
  };

  useEffect(() => {
    const slider = sliderRef.current;
    if (slider) {
      slider.style.transform = `translateX(-${currentIndex * 100}%)`;
    }
  }, [currentIndex]);

  return (
    <>
      {loader ? (
        <div className="flex justify-center items-center h-[70vh]">
          <div className="border-t-4 border-darkRed border-solid w-16 h-16 rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="slider">
          <div
            className="slides"
            ref={sliderRef}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            {doors.map((slide) => (
              <>
                <div
                  className="slide select-none flex flex-col w-full relative"
                  key={slide._id}
                >
                  <img
                    src={
                      slide && slide.media && slide.media[0]
                        ? slide.media[0].url
                        : imageReplacement
                    }
                    loading="lazy"
                    className="w-full"
                  />
                  <div className="text-start py-3 px-2 flex flex-col gap-7 border border-gray-300 bg-white h-full lg:max-w-[310px] lg:border-none">
                    <h1 className="text-gray-800 text-lg">{slide.title}</h1>
                    <p className="font-normal text-[16px]">
                      {slide.shortPreview}
                    </p>
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
              </>
            ))}
          </div>
          <div className="hidden lg:flex absolute bottom-[240px] right-0   gap-5 text-4xl">
            <FaArrowLeftLong onClick={goToPrevSlide} />
            <FaArrowRightLong onClick={goToNextSlide} />
          </div>
          <div className="dots">
            {doors.map((_, index) => (
              <div
                key={index}
                className={`dot ${currentIndex === index ? "active" : ""}`}
                onClick={() => handleDotClick(index)}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Slider;
