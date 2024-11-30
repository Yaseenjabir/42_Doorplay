import Lottie from "lottie-react";
import animationData from "../../../public/animationData.json";
const Animation = () => {
  return (
    <div
      style={{ zIndex: 100 }}
      className="w-full fixed top-0 pr-16 left-0 h-screen flex bg-white items-center justify-center"
    >
      <Lottie
        className="w-[200px] lg:w-[250px]"
        animationData={animationData}
        loop={true}
      />{" "}
    </div>
  );
};
export default Animation;
