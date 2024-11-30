import React, { useEffect, useState } from "react";
import HeroSection from "./HeroSection/HeroSection";
import EnhanceYourCurb from "./EnhanceYourCurb/EnhanceYourCurb";
import FreeColorSample from "./FreeColorSample/FreeColorSample";
import CommercialDoors from "./CommercialDoors/CommercialDoors";
import ContactUs from "./ContactUs/ContactUs";
import DoorplayDifference from "./DoorplayDifference/DoorplayDifference";
import FindInspiration from "./FindInspiration/FindInspiration";
import Subscribe from "./Subscribe/Subscribe";
import Animation from "../EntranceAnimation/Animation";

const Main: React.FC = () => {
  const [lottie, setLottie] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLottie(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {lottie ? (
        <Animation />
      ) : (
        <>
          <HeroSection />
          <EnhanceYourCurb />
          <FreeColorSample />
          <CommercialDoors />
          <ContactUs />
          <DoorplayDifference />
          <FindInspiration />
          <Subscribe />
        </>
      )}
    </>
  );
};

export default Main;
