import React, { useState } from "react";
import { PiMagicWand } from "react-icons/pi";

const MobileHeader: React.FC = () => {
  const [isSlided, setIsSlided] = useState<boolean>(false);

  return (
    <>
      <header className="w-full h-[56px] flex items-center justify-between px-4 border-b lg:hidden">
        <img
          src="https://www.clopaydoor.com/images/clopay-logo@2x.jpg"
          className="w-[90px]"
        />
        {/* Wrap the hamburger in a div with other menus if needed  */}
        <div className="flex items-center gap-6">
          <PiMagicWand className="text-2xl text-gray-600" />
          <div onClick={() => setIsSlided(true)} className="w-[24px]">
            <hr className="border border-gray-500 w-full my-[5px]" />
            <hr className="border border-gray-500 w-full my-[5px]" />
            <hr className="border border-gray-500 w-full my-[5px]" />
          </div>
        </div>
      </header>

      {/* Slide menu  */}
      <div
        className={`fixed top-0 left-0 h-screen bg-white w-full p-5 px-7 flex flex-col justify-center z-50 transition-all ease-in-out duration-300 ${
          isSlided ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <h1 className="text-2xl font-bold">Menu</h1>
        <ul className="mt-10 flex flex-col gap-7">
          <li className="text-2xl font-bold text-[#4f738a] hover:underline">
            <a href="">Garage Doors</a>
          </li>
          <li className="text-2xl font-bold text-[#4f738a] hover:underline">
            <a href="">Commercial Doors</a>
          </li>
          <li className="text-2xl font-bold text-[#4f738a] hover:underline">
            <a href="">Buying Guide</a>
          </li>
          <li className="text-2xl font-bold text-[#4f738a] hover:underline">
            <a href="">Contact & Support</a>
          </li>
          <li className="text-2xl font-bold text-[#4f738a] hover:underline">
            <a href="">Where To Buy/Service</a>
          </li>
        </ul>
        <span
          onClick={() => setIsSlided(false)}
          className="text-2xl font-bold fixed top-4 right-4"
        >
          X
        </span>
      </div>
    </>
  );
};

export default MobileHeader;
