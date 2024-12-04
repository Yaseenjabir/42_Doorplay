import React, { Suspense, useEffect, useState } from "react";
import Animation from "../EntranceAnimation/Animation";

const HeroSection = React.lazy(() => import("./HeroSection/HeroSection"));
const EnhanceYourCurb = React.lazy(
  () => import("./EnhanceYourCurb/EnhanceYourCurb")
);
const FreeColorSample = React.lazy(
  () => import("./FreeColorSample/FreeColorSample")
);
const CommercialDoors = React.lazy(
  () => import("./CommercialDoors/CommercialDoors")
);
const ContactUs = React.lazy(() => import("./ContactUs/ContactUs"));
const DoorplayDifference = React.lazy(
  () => import("./DoorplayDifference/DoorplayDifference")
);
const FindInspiration = React.lazy(
  () => import("./FindInspiration/FindInspiration")
);
const Subscribe = React.lazy(() => import("./Subscribe/Subscribe"));

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
          <Suspense fallback={<Animation />}>
            <HeroSection />
            <EnhanceYourCurb />
            <FreeColorSample />
            <CommercialDoors />
            <ContactUs />
            <DoorplayDifference />
            <FindInspiration />
            <Subscribe />
          </Suspense>
        </>
      )}
    </>
  );
};

export default Main;
