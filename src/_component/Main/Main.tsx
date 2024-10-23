import React from "react";
import HeroSection from "./HeroSection/HeroSection";
import EnhanceYourCurb from "./EnhanceYourCurb/EnhanceYourCurb";
import FreeColorSample from "./FreeColorSample/FreeColorSample";
import CommercialDoors from "./CommercialDoors/CommercialDoors";
import ContactUs from "./ContactUs/ContactUs";
import DoorplayDifference from "./DoorplayDifference/DoorplayDifference";
import FindInspiration from "./FindInspiration/FindInspiration";
import Subscribe from "./Subscribe/Subscribe";

const Main: React.FC = () => {
  return (
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
  );
};

export default Main;
