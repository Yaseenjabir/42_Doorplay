import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { IoIosSearch } from "react-icons/io";
import { PiMagicWand } from "react-icons/pi";
import { Input } from "../../../components/ui/input";
import { RxCross2 } from "react-icons/rx";

const MobileHeader: React.FC = () => {
  const [isSlided, setIsSlided] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [wrapSearchBar, setWrapSearchBar] = useState(true);

  function handleHamburger(): void {
    setIsOpen((prev) => !prev);
    setIsSlided((prev) => !prev);
  }

  return (
    <>
      <header className="w-full h-[56px] sticky top-0 flex items-center justify-between px-4 border-b z-30 lg:hidden bg-white">
        <img
          src="https://www.clopaydoor.com/images/clopay-logo@2x.jpg"
          className="w-[90px]"
        />
        {/* Wrap the hamburger in a div with other menus if needed  */}
        <div className="flex items-center gap-6">
          {/* <PiMagicWand className="text-2xl text-gray-600 cursor-pointer" /> */}
          <IoIosSearch
            onClick={() => setWrapSearchBar((prev) => !prev)}
            className="w-[28px] h-[28px] cursor-pointer mr-16"
          />
        </div>
      </header>
      {/* Hamburger Menu  */}
      <div
        className={`menu-btn ${
          isOpen ? "close" : ""
        } fixed lg:hidden top-5 right-5 z-50`}
        onClick={handleHamburger}
      >
        <div className="btn-line bg-black"></div>
        <div className="btn-line bg-black"></div>
        <div className="btn-line bg-black"></div>
      </div>

      {/* Slide menu  */}
      <div
        className={`fixed top-0 left-0 h-screen bg-white w-full p-5 px-7 flex flex-col justify-center z-30 transition-all ease-in-out duration-1000 ${
          isSlided ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <h1 className="text-2xl font-bold">Menu</h1>
        <ul className="mt-10 flex flex-col gap-7">
          <li className="text-2xl font-bold text-[#4f738a] hover:underline">
            <a href="/garage-doors">Garage Doors</a>
          </li>
          <li className="text-2xl font-bold text-[#4f738a] hover:underline">
            <a href="/commercial-doors">Commercial Doors</a>
          </li>
          {/* <li className="text-2xl font-bold text-[#4f738a] hover:underline">
            <a href="">Buying Guide</a>
          </li> */}
          <li className="text-2xl font-bold text-[#4f738a] hover:underline">
            <a href="">Contact & Support</a>
          </li>
          {/* <li className="text-2xl font-bold text-[#4f738a] hover:underline">
            <a href="">Where To Buy/Service</a>
          </li> */}
        </ul>
      </div>

      {/* Search bar  */}
      <div
        className={`fixed top-[58px] flex items-center left-1/2 transform -translate-x-1/2 w-[95%] bg-white rounded-md transition-all ease-in-out z-10 duration-300 border shadow ${
          wrapSearchBar ? "opacity-0 h-[0px]" : "opacity-100 h-[36px]"
        }`}
      >
        <div className="bg-white flex items-center justify-center px-3 h-full">
          <CiSearch className="text-2xl cursor-pointer h-full" />
        </div>
        <Input
          type="email"
          placeholder="Search for doors, designs, drawing etc..."
          className="bg-white border-none rounded-none h-full"
        />
        <div className="bg-white h-full flex items-center justify-center px-3">
          <RxCross2
            onClick={() => setWrapSearchBar(true)}
            className="text-2xl cursor-pointer h-full"
          />
        </div>
      </div>
    </>
  );
};

export default MobileHeader;
