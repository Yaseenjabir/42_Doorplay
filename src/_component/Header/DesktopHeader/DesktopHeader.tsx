import { PiMagicWand } from "react-icons/pi";

const DesktopHeader = () => {
  return (
    <>
      <header className="hidden lg:flex h-[76px] border-b py-4 px-7 justify-between sticky top-0 z-20 bg-white">
        <div className="flex gap-5 items-center text-[18px] text-[#3f5b6d]">
          <img
            className="w-[90px]"
            src="https://www.clopaydoor.com/images/clopay-logo@2x.jpg"
          />

          <a href="#" className="h-min hover:underline">
            Garage Doors
          </a>
          <a href="#" className="h-min hover:underline">
            Commercial Doors
          </a>
          <a href="#" className="h-min hover:underline">
            Buying Guide
          </a>
          <a href="#" className="h-min hover:underline">
            Contact & Support
          </a>
        </div>
        <div className="flex items-center">
          <button className="py-[10px] flex items-center gap-2 px-4 bg-warmBrown hover:bg-mutedRed hover:bg text-white rounded-md transition-all ease-in-out duration-300">
            <PiMagicWand className="text-xl" />
            Design Your Door
          </button>
        </div>
      </header>
    </>
  );
};

export default DesktopHeader;
