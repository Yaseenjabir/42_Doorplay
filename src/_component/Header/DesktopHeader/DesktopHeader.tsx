import { PiMagicWand } from "react-icons/pi";
import { IoIosSearch } from "react-icons/io";
import { Input } from "../../../../src/components/ui/input";
import { RxCross2 } from "react-icons/rx";
import { useEffect, useState } from "react";
import Logo from "../../../../public/AR Garage - Logo.png";
import { apiClient } from "../../../apiClient/apiClient";
import { GET_ALL_DOORS } from "../../../constants/constant";
import { DoorSchema } from "../../../utils/utils";
import { toast } from "sonner";
import { Badge } from "../../../components/ui/badge";
import { useNavigate } from "react-router";
import useStore from "../../../store/Store";
import { IoIosArrowUp } from "react-icons/io";
import DropDownMenus from "./DropDownMenus";

const DesktopHeader = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [data, setData] = useState<DoorSchema[]>([]);
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showGarageDoorDropDown, setShowGarageDoorDropDown] = useState(false);
  const [showCommercialDoorDropDown, setCommercialDoorDropDown] =
    useState(false);

  const { toggleVal, val } = useStore();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const searchData = async (userInput: string) => {
    setInputValue(userInput);
    if (userInput.length < 3) {
      toast.warning("Please enter 3 characters");
      return;
    }
    try {
      const res = await apiClient.get(GET_ALL_DOORS, {
        params: { title: userInput },
      });
      if (res.data.length > 0) {
        setData(res.data);
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

  return (
    <>
      <header className="hidden w-full lg:flex h-[76px] border-b py-4 px-7 justify-between sticky top-0 z-20 bg-white shadow-md">
        <div className="w-full flex">
          <div className="w-[93px] mr-5"></div>
          <a href={"/"} className="absolute w-[93px] top-1">
            <img className="cursor-pointer" src={Logo} />
          </a>
          <div className="flex flex-col w-full h-[41px] overflow-hidden relative ">
            <div
              className={`flex gap-5 items-center text-[18px] text-[#3f5b6d] w-full h-[41px] absolute ${
                showSearch ? "top-[41px]" : "top-[0px]"
              } left-0 transition-all ease-in-out duration-300`}
            >
              <div className="flex items-center justify-center gap-1 ">
                <a href="/garage-doors" className="h-min hover:underline">
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
              <div className="flex items-center justify-center gap-1 ">
                <a href="/commercial-doors" className="h-min hover:underline">
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
              <a href="#" className="h-min hover:underline">
                Contact & Support
              </a>
              <IoIosSearch
                onClick={() => {
                  setShowSearch(true);
                }}
                className="w-[28px] h-[28px] cursor-pointer absolute top-2 right-2"
              />
              {isAuthenticated ? (
                <a href="/dashboard" className="h-min hover:underline">
                  Dashboard
                </a>
              ) : (
                <a href="/auth" className="h-min hover:underline">
                  Login
                </a>
              )}
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
                value={inputValue}
                onChange={(e) => searchData(e.target.value)}
                type="text"
                placeholder="Search for doors, designs, drawing etc..."
                className="bg-white border shadow-xl w-[580px]  rounded-none"
              />
              <div className="bg-white h-full flex items-center justify-center px-3">
                <RxCross2
                  onClick={() => {
                    setShowSearch(false);
                    setInputValue("");
                  }}
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
      <div
        className={`${
          inputValue.length >= 3 && "lg:flex"
        } bg-white shadow-xl shadow-[#00000034] border border-gray-200 rounded hidden py-5 fixed z-50 w-[580px] top-[60px] right-[260px] px-5 flex-col max-h-[300px] overflow-y-auto`}
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
                  setShowSearch(false);
                  val ? toggleVal(false) : toggleVal(true);
                  navigate(
                    `/${item.category}-doors/${encodeURIComponent(
                      item.title.replace(/\s+/g, "-")
                    )}`,
                    {
                      state: { id: item._id },
                    }
                  );
                }}
              >
                <hr />
                <div className="border-b py-5 w-full cursor-pointer flex gap-2 hover:bg-gray-100">
                  <h1>{item.title}</h1>
                  <Badge variant={"outline"}>{item.subcategory}</Badge>
                </div>
              </div>
            );
          })
        )}
      </div>
      {/*Garage Drop Down Menu  */}
      <DropDownMenus
        showGarageDoorDropDown={showGarageDoorDropDown}
        showCommercialDoorDropDown={showCommercialDoorDropDown}
      />
    </>
  );
};

export default DesktopHeader;
