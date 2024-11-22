import { RxHamburgerMenu } from "react-icons/rx";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../../components/ui/popover";
import React from "react";
import { IoIosSunny } from "react-icons/io";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../../../components/ui/hover-card";
import { IoMoon } from "react-icons/io5";
import { IoMdNotifications } from "react-icons/io";
import useStore from "../../../store/Store";
import Logo from "../../../../public/AR Garage - Logo.png";

interface MenuINT {
  darkTheme: boolean;
  setShowMenu: (val: boolean) => void;
}

const Header: React.FC<MenuINT> = ({ setShowMenu }) => {
  const { darkTheme, toggleDarkTheme } = useStore();

  return (
    <header
      className={`w-full h-[60px] border-b transition-all ease-in-out duration-500 border-b-gray-300 flex items-center justify-between px-5 ${
        darkTheme ? "shadow-none" : "shadow-md"
      } shadow-[#ececec] `}
    >
      <RxHamburgerMenu
        onClick={() => setShowMenu(true)}
        className="cursor-pointer text-3xl text-gray-500 lg:hidden"
      />
      <a href={`${import.meta.env.VITE_BASE_URL}`}>
        <img src={Logo} alt="AR-logo" className="w-20 cursor-pointer lg:w-24" />
      </a>
      <div className="flex items-center gap-2">
        <HoverCard>
          <HoverCardTrigger>
            <div className="w-[36px] h-[36px] flex items-center justify-center">
              {darkTheme ? (
                <IoIosSunny
                  onClick={() => toggleDarkTheme()}
                  className="text-4xl cursor-pointer bg-[#303030] p-2 rounded-full transition-all ease-in-out duration-500"
                />
              ) : (
                <IoMoon
                  onClick={() => toggleDarkTheme()}
                  className="text-2xl cursor-pointer transition-all ease-in-out duration-500"
                />
              )}
            </div>
          </HoverCardTrigger>
          <HoverCardContent className="w-min text-nowrap p-2 text-[12px]">
            {darkTheme ? "Light Mode" : "Dark Mode"}
          </HoverCardContent>
        </HoverCard>

        <Popover>
          <PopoverTrigger>
            <IoMdNotifications className="text-2xl" />
          </PopoverTrigger>
          <PopoverContent className="min-w-[350px] flex flex-col gap-5">
            <div className="w-full flex items-center justify-center gap-3">
              <div className="w-[70px] h-[42px] border border-green-500 rounded-full">
                <img
                  className="w-full h-full rounded-full"
                  src="https://picsum.photos/seed/bE9LtC/1024/768?blur=1"
                  alt=""
                />
              </div>
              <div className="text-sm">
                <strong className="text-sm">Yaseen Jabir</strong>
                <p>
                  This user has sent an email please check it out. Email is
                  stored in the database
                </p>
                <h3 className="text-gray-600">5 minute ago</h3>
              </div>
            </div>
            <div className="w-full flex items-center justify-center gap-3">
              <div className="w-[70px] h-[42px] border border-green-500 rounded-full">
                <img
                  className="w-full h-full rounded-full"
                  src="https://picsum.photos/seed/bE9LtC/1024/768?blur=1"
                  alt=""
                />
              </div>
              <div className="text-sm">
                <strong className="text-sm">Yaseen Jabir</strong>
                <p>
                  This user has sent an email please check it out. Email is
                  stored in the database
                </p>
                <h3 className="text-gray-600">5 minute ago</h3>
              </div>
            </div>
            <div className="w-full flex items-center justify-center gap-3">
              <div className="w-[70px] h-[42px] border border-green-500 rounded-full">
                <img
                  className="w-full h-full rounded-full"
                  src="https://picsum.photos/seed/bE9LtC/1024/768?blur=1"
                  alt=""
                />
              </div>
              <div className="text-sm">
                <strong className="text-sm">Yaseen Jabir</strong>
                <p>
                  This user has sent an email please check it out. Email is
                  stored in the database
                </p>
                <h3 className="text-gray-600">5 minute ago</h3>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </header>
  );
};

export default Header;
