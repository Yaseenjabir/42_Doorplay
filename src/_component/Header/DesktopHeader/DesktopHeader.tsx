import { PiMagicWand } from "react-icons/pi";
import { IoIosArrowDown, IoIosSearch } from "react-icons/io";
import { Input } from "../../../../src/components/ui/input";
import { RxCross2 } from "react-icons/rx";
import { useEffect, useState } from "react";
import Logo from "../../../../public/AR Garage - Logo.png";
import { apiClient } from "../../../apiClient/apiClient";
import { GET_ALL_DOORS } from "../../../constants/constant";
import { DoorSchema, imageReplacement } from "../../../utils/utils";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import useStore from "../../../store/Store";
import DropDownMenus from "./DropDownMenus";
import { CiSearch } from "react-icons/ci";

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
    const user = sessionStorage.getItem("user");

    if (user) {
      const { token } = JSON.parse(user);
      if (token) {
        setIsAuthenticated(true);
      }
    }
  }, []);

  const searchData = async (userInput: string) => {
    setInputValue(userInput);
    if (userInput.length < 3) {
      toast.warning("Please enter 3 characters");
      return;
    }
    try {
      setLoading(true);
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

  const anchorTagsFontSize = "text-[15px]";
  function truncateText(text: string, length: number) {
    return text.length > length ? `${text.slice(0, length)}...` : text;
  }
  return (
    <>
      <div className="py-2 hidden lg:block bg-black z-30 sticky top-0 w-full h-[30px]"></div>
      <header className="hidden w-full lg:flex h-[76px] border-b py-4 px-7 pr-16 justify-between sticky top-[30px] z-20 bg-white shadow-md">
        <div className="w-full flex">
          <div className="w-[73px] mr-5"></div>
          <a href={"/"} className="absolute w-[83px] top-2">
            <img className="cursor-pointer" src={Logo} />
          </a>
          <div className="flex flex-col w-full h-[43px] overflow-hidden relative ">
            <div
              className={`flex gap-5 items-center text-[18px] text-[#3f5b6d] w-full h-[43px] absolute ${
                showSearch ? "top-[43px]" : "top-[0px]"
              } left-0 transition-all ease-in-out duration-300`}
            >
              <div
                className={`flex items-center justify-center gap-1 ${anchorTagsFontSize}`}
              >
                <a href="/garage-doors" className="h-min hover:underline">
                  Garage Doors
                </a>
                <IoIosArrowDown
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
                className={`flex items-center justify-center gap-1 ${anchorTagsFontSize}`}
              >
                <a href="/commercial-doors" className="h-min hover:underline">
                  Commercial Doors
                </a>
                <IoIosArrowDown
                  onClick={() => {
                    showGarageDoorDropDown && setShowGarageDoorDropDown(false);
                    setCommercialDoorDropDown((prev) => !prev);
                  }}
                  className={`text-2xl cursor-pointer ${
                    showCommercialDoorDropDown && "rotate-180"
                  }`}
                />
              </div>
              <a
                href="/lookbook"
                className={`h-min hover:underline ${anchorTagsFontSize}`}
              >
                Lookbook
              </a>
              <a
                href="/about"
                className={`h-min hover:underline ${anchorTagsFontSize}`}
              >
                About us
              </a>
              <IoIosSearch
                onClick={() => {
                  setShowSearch(true);
                }}
                className="w-[24px] h-[24px] cursor-pointer absolute top-[9px] right-4"
              />
              {isAuthenticated ? (
                <a
                  href="/dashboard"
                  className={`h-min hover:underline ${anchorTagsFontSize}`}
                >
                  Dashboard
                </a>
              ) : (
                <a
                  href="/auth"
                  className={`h-min hover:underline ${anchorTagsFontSize}`}
                >
                  Login
                </a>
              )}
            </div>
            <div
              className={`flex items-center w-full justify-end h-[42px] absolute ${
                showSearch ? "top-[0px]" : "top-[43px]"
              } left-0 transition-all ease-in-out duration-300 w-full pr-5`}
            >
              <div className="w-min h-full relative">
                <CiSearch
                  onClick={() => {
                    setInputValue("");
                    setShowSearch(false);
                    val ? toggleVal(false) : toggleVal(true);
                    navigate(`/search?query=${inputValue}`);
                  }}
                  className="h-[24px] w-[24px] cursor-pointer text-titleColor absolute left-5 top-[10px]"
                />
                <Input
                  style={{ boxShadow: "0px 18px 10px 0px rgba(0,0,0,0.2)" }}
                  value={inputValue}
                  onChange={(e) => searchData(e.target.value)}
                  type="text"
                  placeholder="Search for doors, designs, drawing etc..."
                  className="h-full rounded  w-[458px] px-16 focus:outline-none focus:ring-0"
                />
                <RxCross2
                  onClick={() => {
                    setShowSearch(false);
                    setInputValue("");
                  }}
                  className="h-[24px] w-[24px] cursor-pointer text-titleColor absolute right-5 top-[10px]"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <button
            className={`h-[46px] w-[162px] flex items-center justify-center text-nowrap gap-2 bg-warmBrown hover:bg-mutedRed hover:bg text-white rounded-md transition-all ease-in-out duration-300 text-[14px]`}
          >
            <PiMagicWand className="text-xl" />
            Design Your Door
          </button>
        </div>
      </header>
      {/* searched item div  */}
      <div
        className={`${
          inputValue.length >= 3 && "lg:flex"
        } bg-white shadow-xl shadow-[#00000034] border border-gray-200 rounded hidden py-5 fixed z-50 w-[458px] top-[88px] right-[246px] px-5 flex-col max-h-[300px] overflow-y-auto scrollable-div`}
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
                {/* <div className="border-b py-3 text-sm text-titleColor w-full cursor-pointer flex flex-col gap-2 hover:bg-gray-100">
                  <h1>{item.title}</h1>
                  <Badge variant={"outline"} className="w-min text-nowrap">
                    {item.subcategory}
                  </Badge>
                </div> */}
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
      {/*Garage Drop Down Menu  */}
      <DropDownMenus
        showGarageDoorDropDown={showGarageDoorDropDown}
        showCommercialDoorDropDown={showCommercialDoorDropDown}
      />
    </>
  );
};

export default DesktopHeader;
