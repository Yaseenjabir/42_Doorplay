import React, { useEffect, useState } from "react";
import { IoIosArrowUp, IoIosSearch } from "react-icons/io";
import { Input } from "../../../components/ui/input";
import { RxCross2 } from "react-icons/rx";
import Logo from "../../../../public/AR Garage - Logo.png";
import {
  DoorSchema,
  imageReplacement,
  useProcessData,
} from "../../../utils/utils";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import useStore from "../../../store/Store";
import { CiSearch } from "react-icons/ci";

interface DataType {
  category: string;
  subcategory: string;
}

const MobileHeader: React.FC = () => {
  const [isSlided, setIsSlided] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [wrapSearchBar, setWrapSearchBar] = useState(true);

  const [data, setData] = useState<DoorSchema[]>([]);
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(false);

  const { toggleVal, val, globalData } = useStore();

  const searchData = async (userInput: string) => {
    setInputValue(userInput);
    if (userInput.length < 3) {
      toast.warning("Please enter 3 characters");
      return;
    }
    try {
      const titleRegex = new RegExp(userInput, "i");
      const filteredData = globalData.filter((item) =>
        titleRegex.test(item.title)
      );
      if (filteredData.length > 0) {
        setData(filteredData);
        setNotFound(false);
      } else {
        setNotFound(true);
      }
    } catch (ex) {
      console.log(ex);
    } finally {
      setLoading(false);
    }
  };

  function handleHamburger(): void {
    setIsOpen((prev) => !prev);
    setIsSlided((prev) => !prev);
  }

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    const user = sessionStorage.getItem("user");

    if (user) {
      const { token } = JSON.parse(user);
      if (token) {
        setIsAuthenticated(true);
      }
    }
  }, []);

  const [showGarageDoorDropDown, setShowGarageDoorDropDown] = useState(false);
  const [showCommercialDoorDropDown, setCommercialDoorDropDown] =
    useState(false);

  const [garageData, setGarageData] = useState<DataType[]>([]);
  const [commercialData, setCommercialData] = useState<DataType[]>();

  useProcessData("garage", setGarageData, globalData);
  useProcessData("commercial", setCommercialData, globalData);

  function truncateText(text: string, length: number) {
    return text.length > length ? `${text.slice(0, length)}...` : text;
  }

  return (
    <>
      <header
        className="w-full h-[56px] sticky top-0 flex items-center justify-between px-4 
      border-b z-50 lg:hidden bg-white "
      >
        <a href="/">
          <img src={Logo} className="w-[65px] md:w-[80px] -translate-x-4" />
        </a>
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
        className={`fixed top-0 left-0 h-screen bg-white w-full p-5 px-7 flex flex-col justify-center z-30 transition-all lg:hidden ease-in-out duration-1000 ${
          isSlided ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <h1 className="text-2xl font-bold">Menu</h1>
        <ul className="mt-10 flex flex-col gap-7 w-full">
          <li className="text-2xl w-full font-bold text-[#4f738a] flex flex-col items-center justify-between">
            <div className="flex items-center justify-between gap-2 w-full">
              <a href="/garage-doors" className="hover:underline">
                Garage Doors
              </a>
              <IoIosArrowUp
                onClick={() => {
                  showCommercialDoorDropDown &&
                    setCommercialDoorDropDown(false);
                  setShowGarageDoorDropDown((prev) => !prev);
                }}
                className={`text-2xl cursor-pointer ${
                  showGarageDoorDropDown && "rotate-180"
                }`}
              />
            </div>
            <div
              className={`text-xl overflow-auto flex flex-col px-5 w-full transition-all ease-linear duration-300 gap-5  ${
                showGarageDoorDropDown ? "h-[200px] mt-5" : "h-0 mt-0"
              } scrollable-div`}
            >
              <a href="/garage-doors" className="hover:underline">
                All Garage Doors
              </a>
              {garageData &&
                garageData.map((item, index) => {
                  return (
                    <a
                      key={index}
                      href={`/${item.category}/${item.subcategory.replace(
                        /\s+/g,
                        "-"
                      )}`}
                      className="hover:underline"
                    >
                      {item.subcategory[0].toUpperCase() +
                        item.subcategory.slice(1)}
                    </a>
                  );
                })}
            </div>
          </li>
          <li className="text-2xl w-full font-bold text-[#4f738a] flex flex-col items-center justify-between">
            <div className="flex items-center justify-between gap-2 w-full">
              <a href="/commercial-doors" className="hover:underline">
                Commercial Doors
              </a>
              <IoIosArrowUp
                onClick={() => {
                  showGarageDoorDropDown && setShowGarageDoorDropDown(false);
                  setCommercialDoorDropDown((prev) => !prev);
                }}
                className={`text-2xl cursor-pointer ${
                  showCommercialDoorDropDown && "rotate-180"
                }`}
              />
            </div>
            <div
              className={`text-xl overflow-auto flex flex-col px-5 w-full transition-all ease-linear duration-300 gap-5  ${
                showCommercialDoorDropDown ? "h-[200px] mt-5" : "h-0 mt-0"
              } scrollable-div`}
            >
              <a href="/commercial-doors" className="hover:underline">
                All Commercial Doors
              </a>
              {commercialData &&
                commercialData.map((item, index) => {
                  return (
                    <a
                      key={index}
                      href={`/${item.category}/${item.subcategory.replace(
                        /\s+/g,
                        "-"
                      )}`}
                      className="hover:underline"
                    >
                      {item.subcategory[0].toUpperCase() +
                        item.subcategory.slice(1)}
                    </a>
                  );
                })}
            </div>
          </li>
          <li className="text-2xl font-bold text-[#4f738a] hover:underline">
            <a href="/about">About</a>
          </li>
          <li className="text-2xl font-bold text-[#4f738a] hover:underline">
            <a href="/top-picks">Top Picks</a>
          </li>
          <li className="text-2xl font-bold text-[#4f738a] hover:underline">
            <a href="/contact">Contact</a>
          </li>
          {isAuthenticated ? (
            <li className="text-2xl font-bold text-[#4f738a] hover:underline">
              <a href="/dashboard">Dashboard</a>
            </li>
          ) : (
            <li className="text-2xl font-bold text-[#4f738a] hover:underline">
              <a href="/auth">Login</a>
            </li>
          )}

          {/* <li className="text-2xl font-bold text-[#4f738a] hover:underline">
            <a href="">Where To Buy/Service</a>
          </li> */}
        </ul>
      </div>

      {/* Search bar  */}
      <div
        className={`fixed top-[58px] max-w-[700px] flex items-center left-1/2 transform -translate-x-1/2 w-[95%] bg-white rounded-md transition-all ease-in-out z-10 duration-300 lg:hidden border shadow ${
          wrapSearchBar ? "opacity-0 h-[0px]" : "opacity-100 h-[36px]"
        }`}
      >
        <div className="bg-white flex items-center justify-center px-3 h-full">
          <CiSearch
            onClick={() => {
              setInputValue("");
              setWrapSearchBar(true);
              val ? toggleVal(false) : toggleVal(true);
              navigate(`/search?query=${inputValue}`);
            }}
            className="text-2xl cursor-pointer h-full"
          />
        </div>
        <Input
          value={inputValue}
          type="text"
          onChange={(e) => searchData(e.target.value)}
          placeholder="Search for doors, designs, drawing etc..."
          className="bg-white border-none rounded-none h-full"
        />
        <div className="bg-white h-full flex items-center justify-center px-3">
          <RxCross2
            onClick={() => {
              setWrapSearchBar(true);
              setInputValue("");
            }}
            className="text-2xl cursor-pointer h-full"
          />
        </div>
      </div>
      <div
        className={`${
          inputValue.length >= 3 ? "block" : "hidden"
        } bg-white shadow-xl shadow-[#00000034] border border-gray-200 rounded py-5 fixed z-50 max-w-[700px] w-[95%] top-[93px] px-5 flex-col left-1/2 transform -translate-x-1/2 max-h-[300px] overflow-y-auto lg:hidden scrollable-div`}
      >
        {loading ? (
          <div className="flex justify-center items-center">
            <div className="border-t-4 border-darkRed border-solid w-10 h-10 rounded-full animate-spin"></div>
          </div>
        ) : notFound ? (
          <p>No result for you search</p>
        ) : (
          data &&
          data.map((item) => {
            return (
              <div
                key={item._id}
                onClick={() => {
                  setInputValue("");
                  setWrapSearchBar(true);
                  val ? toggleVal(false) : toggleVal(true);
                  navigate(
                    `/${item.category === "garage" ? "garage-doors" : "commercial-doors"}/${encodeURIComponent(item.title.replace(/\s+/g, "-"))}?id=${item._id}`
                  );
                }}
              >
                <hr />
                <div className="border-b py-3 text-sm text-titleColor w-full cursor-pointer flex items-center justify-center gap-3 hover:bg-gray-100 px-1">
                  <img
                    src={
                      item.media.length > 0 && item.media[0]
                        ? item.media[0].url
                        : imageReplacement
                    }
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="w-full">
                    <h1 className="font-semibold">{item.title}</h1>
                    <p>{truncateText(item.shortPreview, 100)}</p>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </>
  );
};

export default MobileHeader;
