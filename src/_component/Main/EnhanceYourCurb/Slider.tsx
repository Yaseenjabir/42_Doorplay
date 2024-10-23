import React, { useState, useRef, useEffect } from "react";
import "./SwipeSlider.css"; // Ensure you have this CSS file
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";

interface Slides {
  id: number;
  img: string;
  title: string;
  content: string;
  count: number;
}

const Slider: React.FC = () => {
  const slides: Slides[] = [
    {
      id: 1,
      img: "https://www.clopaydoor.com/images/default-source/product-images/showcase-images/modern-steel-plank-kona.tmb-medium.webp?Culture=en&sfvrsn=952e3bd4_8",
      title: "Modern Steel™ Ultra-Grain® Plank",
      content:
        "Rustic meets modern on this unique flush panel Modern Steel door design featuring digitally printed horizontal planks with a stained wood-look appearance. The planks vary in length for a woven look with no repeating grain pattern.",
      count: 4,
    },
    {
      id: 2,
      img: "https://www.clopaydoor.com/images/default-source/product-images/showcase-images/vertistackclear.tmb-medium.webp?Culture=en&sfvrsn=7b554cac_4",
      title: "VertiStack® Clear Door",
      content: `VertiStack® Clear allows you to bring the outside in. These
              compact, vertically stacked sections take up minimal ceiling space
              so it won’t interfere with mechanical, electrical or plumbing
              fixtures.`,
      count: 6,
    },
    {
      id: 3,
      img: "https://www.clopaydoor.com/images/default-source/product-images/showcase-images/cre-d12-rec13-01595.tmb-medium.webp?Culture=en&sfvrsn=a5326927_10",
      title: "Canyon Ridge® Elements",
      content: `A modern update to our traditional carriage house door, Canyon
              Ridge Elements pairs textured overlays with clean, square edges
              and durable insulated steel to give you the look of painted wood
              without the upkeep.`,
      count: 15,
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const isDragging = useRef(false);

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const goToPrevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
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
        {slides.map((slide) => (
          <>
            <div
              className="slide select-none flex flex-col w-full relative"
              key={slide.id}
            >
              <img src={slide.img} loading="lazy" className="w-full" />
              <div className="text-start py-3 px-2 flex flex-col gap-7 border border-gray-500 bg-white h-full lg:max-w-[310px] lg:border-none">
                <h1 className="text-gray-800 text-lg">{slide.title}</h1>
                <p className="font-normal text-[16px]">{slide.content}</p>
                <div className="font-normal text-[13px] flex items-center gap-2">
                  <p>Also in :</p>
                  <div className="flex gap-1">
                    <div className="w-3 h-3 rounded-full bg-warmBrown mt-1"></div>
                    <div className="w-3 h-3 rounded-full bg-darkRed mt-1"></div>
                  </div>
                  <span>+{slide.count}</span>
                </div>
              </div>
            </div>
          </>
        ))}
      </div>
      <div className="hidden lg:flex absolute bottom-[240px] right-0 bg-white  gap-5 text-4xl">
        <FaArrowLeftLong onClick={goToPrevSlide} />
        <FaArrowRightLong onClick={goToNextSlide} />
      </div>
      <div className="dots">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`dot ${currentIndex === index ? "active" : ""}`}
            onClick={() => handleDotClick(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Slider;
