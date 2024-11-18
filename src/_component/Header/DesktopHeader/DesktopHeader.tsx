import { PiMagicWand } from "react-icons/pi";
import { IoIosSearch } from "react-icons/io";
import { Input } from "../../../../src/components/ui/input";
import { RxCross2 } from "react-icons/rx";
import { useState } from "react";
const DesktopHeader = () => {
  const [showSearch, setShowSearch] = useState(false);

  return (
    <>
      <header className="hidden w-full lg:flex h-[76px] border-b py-4 px-7 justify-between sticky top-0 z-20 bg-white shadow-md">
        <div className="w-full flex">
          <a href={"/"}>
            <img
              className="w-[93px] mr-5 cursor-pointer"
              src="https://www.clopaydoor.com/images/clopay-logo@2x.jpg"
            />
          </a>
          <div className="flex flex-col w-full h-[41px] overflow-hidden relative ">
            <div
              className={`flex gap-5 items-center text-[18px] text-[#3f5b6d] w-full h-[41px] absolute ${
                showSearch ? "top-[41px]" : "top-[0px]"
              } left-0 transition-all ease-in-out duration-300`}
            >
              <a href="/garage-doors" className="h-min hover:underline">
                Garage Doors
              </a>
              <a href="/commercial-doors" className="h-min hover:underline">
                Commercial Doors
              </a>
              <a href="#" className="h-min hover:underline">
                Buying Guide
              </a>
              <a href="#" className="h-min hover:underline">
                Contact & Support
              </a>
              <IoIosSearch
                onClick={() => setShowSearch(true)}
                className="w-[28px] h-[28px] cursor-pointer absolute top-2 right-2"
              />
            </div>
            <div
              className={`flex items-center w-full justify-end h-[41px] absolute ${
                showSearch ? "top-[0px]" : "top-[41px]"
              } left-0 transition-all ease-in-out duration-300  border-green-500`}
            >
              <div className="bg-white flex items-center justify-center px-3 h-full">
                {/* <CiSearch className="text-2xl cursor-pointer" /> */}
              </div>
              <Input
                type="email"
                placeholder="Search for doors, designs, drawing etc..."
                className="bg-white border shadow-xl w-[580px]  rounded-none"
              />
              <div className="bg-white h-full flex items-center justify-center px-3">
                <RxCross2
                  onClick={() => setShowSearch(false)}
                  className="text-2xl cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <button className="py-[10px] flex items-center text-nowrap gap-2 px-4 bg-warmBrown hover:bg-mutedRed hover:bg text-white rounded-md transition-all ease-in-out duration-300">
            <PiMagicWand className="text-xl" />
            Design Your Door
          </button>
        </div>
      </header>
      {/* searched item div  */}
      {/* <div className="bg-white shadow-xl shadow-[#00000034] border border-gray-200 rounded hidden lg:flex py-5 fixed z-50 w-[580px] top-[60px] right-[260px] px-5 flex-col">
        <hr />
        <div className="border-b py-5 w-full cursor-pointer">
          Overhead sectional
        </div>
        <div className="border-b py-5 w-full cursor-pointer">
          Overhead sectional
        </div>
        <div className="border-b py-5 w-full cursor-pointer">
          Overhead sectional
        </div>
      </div> */}
    </>
  );
};

export default DesktopHeader;
