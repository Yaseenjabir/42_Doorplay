import React from "react";
import { RxCross2 } from "react-icons/rx";
import { IoMdAdd } from "react-icons/io";
import { RxUpdate } from "react-icons/rx";
import { MdDelete } from "react-icons/md";
import { MdHome } from "react-icons/md";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import useStore from "../../../store/Store";

interface MenuINT {
  nav: string | null;
  setNav: (val: string) => void;
  showMenu: boolean;
  setShowMenu: (val: boolean) => void;
}

const Sidebar: React.FC<MenuINT> = ({ setShowMenu, showMenu, setNav, nav }) => {
  const buttons = [
    { id: 1, title: "Add Door", icon: <IoMdAdd /> },
    { id: 2, title: "Update Door", icon: <RxUpdate /> },
    { id: 3, title: "Delete Door", icon: <MdDelete /> },
    { id: 4, title: "Home", icon: <MdHome /> },
  ];

  const navigate = useNavigate();

  const { darkTheme } = useStore();

  console.log(darkTheme);

  return (
    <>
      <div
        className={`${
          showMenu ? "left-0 lg:left-auto" : "-left-full lg:left-auto"
        } w-[70%] max-w-[400px] border-r border-r-gray-300 transition-all ease-in-out duration-700 fixed top-0 h-full lg:relative lg:w-[20%] lg:max-w-fulla z-10 lg:min-h-screen flex flex-col items-center justify-start px-5 py-10 ${
          darkTheme ? "bg-[#1B1B1B]" : "bg-[#fafafa]"
        }`}
      >
        <div className="w-full flex flex-col items-center gap-2">
          <div className="rounded-full w-[80px] h-[80px]">
            <img
              className="rounded-full h-full w-full"
              src="https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjV8fHVzZXJ8ZW58MHx8MHx8fDA%3D"
              alt=""
            />
          </div>
          <div className="text-center">
            <h1 className="text-lg font-semibold">Hey Admin</h1>
            <p className="text-sm">Welcome to your dashboard</p>
          </div>
          <p></p>
        </div>
        <div className="w-full xl:px-5 mt-10">
          {buttons.map((item) => (
            <motion.button
              onClick={() => {
                if (item.title === "Home") {
                  navigate("/");
                } else {
                  setNav(item.title);

                  localStorage.setItem("nav", item.title);
                }
              }}
              key={item.id}
              className={`
                flex rounded-sm items-center border justify-start gap-3 px-3 py-[5px] 
                ${
                  darkTheme
                    ? "bg-warmBrown hover:border-warmBrown hover:text-warmBrown border-warmBrown"
                    : "bg-darkRed hover:border-darkRed hover:text-darkRed"
                } 
                hover:bg-transparent text-nowrap border transition-all ease-in-out duration-300  font-medium w-full my-3 
                ${
                  nav === item.title
                    ? "bg-transparent border-darkRed text-darkRed"
                    : "text-white"
                } 
              `}
              whileTap={{
                scale: 0.75,
                transition: { duration: 0 },
              }}
            >
              {React.cloneElement(item.icon, { className: "text-xl" })}
              {item.title}
            </motion.button>
          ))}
        </div>
        <RxCross2
          onClick={() => setShowMenu(false)}
          className="absolute top-5 lg:hidden right-5 text-3xl hover:rotate-180 transition-all ease-in-out duration-1000 cursor-pointer"
        />
      </div>
    </>
  );
};

export default Sidebar;
