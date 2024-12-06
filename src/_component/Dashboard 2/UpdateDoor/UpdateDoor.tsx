import { Badge } from "../../../components/ui/badge";
import {
  deleteCache,
  DoorSchema,
  imageReplacement,
} from "../../../utils/utils";
import { GET_ALL_DOORS, UPDATE_DOOR_ROUTE } from "../../../constants/constant";
import { useRef, useState, useEffect, useCallback } from "react";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { IoFilter, IoStarSharp } from "react-icons/io5";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "../../../components/ui/dialog";
import { apiClient } from "../../../apiClient/apiClient";
import { useTheme } from "@mui/material/styles";

import UpdateDoorForm from "./UpdateDoorForm";
import UpdateMediaForm from "./UpdateMediaForm";
import { useNavigate } from "react-router";
import { IoStarOutline } from "react-icons/io5";
import Filter from "./Filter";
import { FaCircleArrowDown } from "react-icons/fa6";
import { MdStar, MdStarBorder } from "react-icons/md";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import useStore from "../../../store/Store";

const UpdateDoor = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "A&R | Dashboard";
  }, []);

  useEffect(() => {
    const user = sessionStorage.getItem("user");
    const parsedUser = user && JSON.parse(user);

    if (!parsedUser) {
      navigate("/auth");
    }
  }, []);

  const [data, setData] = useState<DoorSchema[]>([]);
  const [skip, setSkip] = useState<number>(0);
  const limit: number = 10;
  const [dataLoader, setDataLoader] = useState<boolean>(true);
  const [availablity, setAvailability] = useState(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [selectedImages, setSelectedImages] = useState<any>([]);
  const [starLoader, setStarLoader] = useState<null | string>(null);

  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

  const [selectedItem, setSelectedItem] = useState<null | DoorSchema>(null);
  const formTriggerRef = useRef<HTMLButtonElement>(null);
  const mediaFormTrigger = useRef<HTMLButtonElement>(null);

  const [searchedData, setSearchedData] = useState<DoorSchema[]>([]);

  const { val, toggleVal } = useStore();

  const fetchDoors = async () => {
    setDataLoader(true);
    let data = null;
    try {
      const cache = await caches.open("A&R-Doors");
      const cachedResult = await cache.match(GET_ALL_DOORS);
      if (cachedResult) {
        const cachedData = await cachedResult.json();
        data = cachedData;
      } else {
        const res = await apiClient.get(GET_ALL_DOORS, {
          params: { skip, limit: 1000000 },
        });
        if (res.status === 200) {
          const response = new Response(JSON.stringify(res.data), {
            headers: {
              "Content-Type": "application/json",
            },
          });
          cache.put(GET_ALL_DOORS, response);
          data = res.data;
        }
      }
      const paginatedData = data.slice(skip, skip + limit);
      if (paginatedData) {
        if (paginatedData.length === 0) {
          setHasMore(false);
          return;
        }
        setData((prev) => [...prev, ...paginatedData]);
        setAvailability(true);
      } else {
        setHasMore(false);
        setAvailability(false);
      }
    } catch (ex: unknown) {
      if (ex instanceof AxiosError) {
        if (ex.response?.data.message) {
          toast.error(ex.response.data.message);
          return;
        }
        if (ex.response && ex.response.data && ex.response.data.error) {
          toast.error(ex.response.data.error);
          return;
        } else {
          toast.error("An unexpected error occurred.");
        }
      } else {
        toast.error("An unexpected error occurred.");
      }
    } finally {
      setDataLoader(false);
    }
  };

  const [starIndex, setStarIndex] = useState<number | null>(null);

  const handleFavorite = useCallback(
    async (_id: string, value: boolean, index: number) => {
      const user = sessionStorage.getItem("user");
      const { token } = user && JSON.parse(user);
      if (!token) {
        toast.error("No token provided");
        return;
      }
      setStarIndex(index);
      setStarLoader(_id);
      try {
        const url = _id && UPDATE_DOOR_ROUTE.replace(":id", _id);
        const response = await apiClient.patch(
          url ? url : "",
          { isFavourited: value },
          {
            headers: {
              Authorization: token,
            },
          }
        );

        if (response.status === 200) {
          deleteCache(GET_ALL_DOORS);
          toggleVal(val ? false : true);
          let message = "";
          if (response.data.isFavourited) {
            message = "Door has been added to your favorite list";
          } else {
            message = "Door has been removed from your favorite list";
          }
          toast.success(message);
          setSearchedData((prev: DoorSchema[]) =>
            prev.map((door: DoorSchema) =>
              door._id === response.data._id ? response.data : door
            )
          );
          setData((prev: DoorSchema[]) =>
            prev.map((door: DoorSchema) =>
              door._id === response.data._id ? response.data : door
            )
          );
        }
      } catch (ex: unknown) {
        console.log(ex);
        if (ex instanceof AxiosError) {
          if (ex.response?.data.message) {
            toast.error(ex.response?.data.message);
            return;
          }
          if (ex.response && ex.response.data) {
            toast.error(ex.response.data);
            return;
          } else {
            toast.error("An unexpected error occurred.");
            return;
          }
        } else {
          toast.error("An unexpected error occurred.");
        }
      } finally {
        setStarLoader(null);
        setTrackIndex(null);
      }
    },
    []
  );

  useEffect(() => {
    fetchDoors();
  }, [skip, limit, handleFavorite]);

  const truncateText = (text: string, length: number) => {
    const truncatedText =
      text && text.length > length ? text.slice(0, length) + "..." : text;
    return truncatedText;
  };
  const capitalizeText = (text: string) => {
    return text[0].toUpperCase() + text.slice(1);
  };

  const [height, setHeight] = useState(true);
  const [trackIndex, setTrackIndex] = useState<null | number>(null);
  const [zIndex, setZIndex] = useState<number | null>(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const panelGroupStyle = {
    minHeight: 200,
    display: windowWidth > 1024 ? "flex" : "none",
  };

  const [showFilter, setShowFilter] = useState(false);

  return (
    <section className="w-full py-10 flex flex-col items-center justify-start px-5 scrollable-div">
      <div className="w-full flex flex-row items-center gap-5 justify-between mb-10">
        <h1 className="text-xl">
          Update Doors
          {/* <span className="text-base text-gray-400">({totalCounts})</span> */}
        </h1>
        <IoFilter
          onClick={() => setShowFilter(true)}
          className="text-2xl cursor-pointer"
        />
      </div>
      <Filter
        isDarkMode={isDarkMode}
        showFilter={showFilter}
        setShowFilter={setShowFilter}
        data={data}
        setLoader={setDataLoader}
        setAvailability={setAvailability}
        setHasMore={setHasMore}
        setSearchedData={setSearchedData}
      />
      {dataLoader ? (
        <div className="flex justify-center items-center h-[70vh]">
          <div className="border-t-4 border-darkRed border-solid w-16 h-16 rounded-full animate-spin"></div>
        </div>
      ) : !availablity ? (
        <div>
          <p>No doors available to update</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 w-full gap-10">
          {(searchedData.length > 0 ? searchedData : data).map(
            (door, index) => {
              return (
                <div
                  style={{ fontFamily: "Poppins" }}
                  className="rounded w-full h-[355px] relative max-w-[400px]"
                >
                  <div
                    className={`absolute w-full top-0 rounded left-0 ${isDarkMode ? "bg-[#181818] border-[#535353]" : "bg-white"} overflow-hidden ${index === zIndex ? "z-10" : setTimeout(() => "z-0", 3000)} border ${index !== trackIndex ? "max-h-[355px]" : "max-h-[2000px]"} transition-all ease-in-out duration-1000 place-content-center`}
                  >
                    <img
                      src={
                        door && door.media && door.media[0]
                          ? door.media[0].url
                          : imageReplacement
                      }
                      alt=""
                      className="w-full max-h-[220px] h-[200px] lg:hidden"
                    />
                    <PanelGroup direction="horizontal" style={panelGroupStyle}>
                      <Panel>
                        <img
                          src={
                            door && door.media && door.media[0]
                              ? door.media[0].url
                              : imageReplacement
                          }
                          alt=""
                          className="w-full h-full"
                        />
                      </Panel>
                      <PanelResizeHandle />
                      <Panel>
                        <PanelGroup direction="vertical">
                          <Panel>
                            <img
                              src={
                                door && door.media && door.media[1]
                                  ? door.media[1].url
                                  : imageReplacement
                              }
                              alt=""
                              className="w-full h-full"
                            />
                          </Panel>
                          <PanelResizeHandle />
                          <Panel>
                            <PanelGroup direction="horizontal">
                              <Panel>
                                <img
                                  src={
                                    door && door.media && door.media[2]
                                      ? door.media[2].url
                                      : imageReplacement
                                  }
                                  alt=""
                                  className="w-full h-full"
                                />
                              </Panel>
                              <PanelResizeHandle />
                              {/* <Panel>right</Panel> */}
                            </PanelGroup>
                          </Panel>
                        </PanelGroup>
                      </Panel>
                      <PanelResizeHandle />
                      {/* <Panel>right</Panel> */}
                    </PanelGroup>
                    <div className="p-3 pb-12 flex flex-col gap-3 relative">
                      <h1
                        onClick={() => setHeight(!height)}
                        className="font-semibold text-nowrap"
                      >
                        {truncateText(door.title, 24)}
                      </h1>
                      <div className="flex items-center gap-2 text-sm">
                        <h4 className="font-semibold">Category</h4>
                        <span>:</span>
                        <h5 className="font-light">
                          {capitalizeText(door.category)}
                        </h5>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <h4 className="font-semibold">Subcategory</h4>
                        <span>:</span>
                        <h5 className="font-light">
                          {capitalizeText(door.subcategory)}
                        </h5>
                      </div>
                      <p className="text-sm ">
                        {door.description
                          ? door.shortPreview
                          : "No description is available"}
                      </p>
                      <div className="flex flex-col gap-4">
                        {/* Construction  */}
                        {(door.construction?.title ||
                          door.construction?.description) && (
                          <div className="flex flex-col w-full">
                            <div className="flex items-center gap-2 font-semibold">
                              <h1>Construction</h1>
                              <span>:</span>
                            </div>
                            <div className="text-sm flex flex-col gap pl-5">
                              {door?.construction?.title && (
                                <h1 className="font-">
                                  {door.construction.title}
                                </h1>
                              )}
                              {door?.construction?.description && (
                                <p>{door.construction.description}</p>
                              )}
                            </div>
                          </div>
                        )}

                        {/* Customization  */}
                        {(door.customization?.title ||
                          door.customization?.description) && (
                          <div className="flex flex-col  w-full">
                            <div className="flex items-center gap-2 font-semibold">
                              <h1>Customization</h1>
                              <span>:</span>
                            </div>
                            <div className="text-sm flex flex-col gap pl-5">
                              <h1 className="font-">
                                {door?.customization?.title &&
                                  door.customization.title}
                              </h1>
                              <p>
                                {door?.customization?.description &&
                                  door.customization.description}
                              </p>
                            </div>
                          </div>
                        )}

                        {/* Insulation  */}
                        {(door.insulation?.title ||
                          door.insulation?.description) && (
                          <div className="flex flex-col  w-full">
                            <div className="flex items-center gap-2 font-semibold">
                              <h1>Insulation</h1>
                              <span>:</span>
                            </div>
                            <div className="text-sm flex flex-col gap pl-5">
                              <h1 className="font-">
                                {door?.insulation?.title &&
                                  door.insulation.title}
                              </h1>
                              <p>
                                {door?.insulation?.description &&
                                  door.insulation.description}
                              </p>
                            </div>
                          </div>
                        )}

                        {/* Material  */}
                        {(door.material?.title ||
                          door.material?.description) && (
                          <div className="flex flex-col  w-full">
                            <div className="flex items-center gap-2 font-semibold">
                              <h1>Material</h1>
                              <span>:</span>
                            </div>
                            <div className="text-sm flex flex-col gap pl-5">
                              <h1 className="font-">
                                {door?.material?.title && door.material.title}
                              </h1>
                              <p>
                                {door?.material?.description &&
                                  door.material.description}
                              </p>
                            </div>
                          </div>
                        )}

                        {/* Reinforcement  */}
                        {(door.reinforcement?.title ||
                          door.reinforcement?.description) && (
                          <div className="flex flex-col  w-full">
                            <div className="flex items-center gap-2 font-semibold">
                              <h1>Reinforcement</h1>
                              <span>:</span>
                            </div>
                            <div className="text-sm flex flex-col gap pl-5">
                              <h1 className="font-">
                                {door?.reinforcement?.title &&
                                  door.reinforcement.title}
                              </h1>
                              <p>
                                {door?.reinforcement?.description &&
                                  door.reinforcement.description}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                      {/* Stock Count and isFavorited  */}
                      <div className="flex items-center gap-5 text-nowrap">
                        <Badge
                          className="text-[14px] px-5 rounded-full text-titleColor"
                          variant={"secondary"}
                        >
                          Stock : {door.stockCount}
                        </Badge>

                        {door.isFavourited ? (
                          <Badge
                            variant={"secondary"}
                            className="text-[14px] flex items-center gap-1 px-5 rounded-full bg-[#fff493] text-titleColor"
                          >
                            <MdStar className="text-yellow-400 text-xl" />
                            Favorited
                          </Badge>
                        ) : (
                          <Badge
                            variant={"secondary"}
                            className="text-[14px] px-5 flex items-center gap-1 rounded-full bg-[#f1f1f1] text-titleColor"
                          >
                            <MdStarBorder className="text-xl" />
                            Unfavorited
                          </Badge>
                        )}
                      </div>
                      {/* Updation button  */}
                      <div className="w-full flex flex-col md:flex-row items-center gap-2 mt-2 relative">
                        <button
                          onClick={() => {
                            formTriggerRef.current?.click();
                            setSelectedItem(door);
                          }}
                          className="bg-warmBrown text-white w-full rounded py-1 text-sm hover:bg-transparent border border-warmBrown hover:text-warmBrown transition-all ease-in-out duration-300"
                        >
                          Update Fields
                        </button>
                        <button
                          onClick={() => {
                            mediaFormTrigger.current?.click();
                            setSelectedItem(door);
                            setSelectedImages(door.media);
                          }}
                          className="bg-warmBrown text-white w-full rounded py-1 text-sm hover:bg-transparent border border-warmBrown hover:text-warmBrown transition-all ease-in-out duration-300"
                        >
                          Update Media
                        </button>
                      </div>
                      {door.isFavourited ? (
                        <IoStarSharp
                          onClick={() => handleFavorite(door._id, false, index)}
                          className={`absolute transition-all ease-in-out  top-2 cursor-pointer z-[5] text-yellow-400 right-2 text-2xl ${starLoader && index === starIndex && "animate-spin"}`}
                        />
                      ) : (
                        <IoStarOutline
                          onClick={() => handleFavorite(door._id, true, index)}
                          className={`absolute top-2 cursor-pointer z-[5] right-2 text-2xl transition-all ease-in-out ${starLoader && index === starIndex && "animate-spin"}`}
                        />
                      )}
                    </div>
                    <FaCircleArrowDown
                      onClick={() => {
                        if (trackIndex === index) {
                          setTrackIndex(null);
                        } else {
                          setZIndex(index);
                          setTrackIndex(index);
                        }
                      }}
                      className={`border w-min ${index === zIndex ? "z-10" : setTimeout(() => "z-0", 3000)} text-3xl rounded-full absolute left-0 right-0 mx-auto bottom-2 bg-warmBrown text-white cursor-pointer ${trackIndex === index ? "applyTransform" : "removeTransform"}`}
                    />
                  </div>
                </div>
              );
            }
          )}
        </div>
      )}
      {/* Load more button  */}
      {!dataLoader && hasMore && (
        <div className="w-full md:w-min mx-auto">
          <button
            onClick={() => setSkip(skip + limit)}
            className={`border-[2px]  px-5 py-3 rounded-md hover:text-white hover:bg-darkRed transition-all ease-in-out duration-300 w-full mt-10 lg:mt-10 text-nowrap `}
          >
            Load More
          </button>
        </div>
      )}
      <Dialog>
        <DialogTrigger ref={formTriggerRef} className="hidden">
          Open
        </DialogTrigger>
        <DialogContent
          className={`overflow-y-scroll w-[90%] h-[85vh] top-[350px] rounded ${isDarkMode && "bg-black"} `}
        >
          <UpdateDoorForm
            setSearchedData={setSearchedData}
            setData={setData}
            formTriggerRef={formTriggerRef}
            setSelectedItem={setSelectedItem}
            selectedItem={selectedItem}
          />
        </DialogContent>
      </Dialog>
      <Dialog>
        <DialogTrigger ref={mediaFormTrigger} className="hidden">
          Open
        </DialogTrigger>
        <DialogContent
          className={`overflow-y-auto w-[90%] h-[85vh] top-[350px] rounded ${isDarkMode && "bg-black"}`}
        >
          <UpdateMediaForm
            setSearchedData={setSearchedData}
            mediaFormTrigger={mediaFormTrigger}
            setData={setData}
            selectedImages={selectedImages}
            selectedItem={selectedItem}
          />
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default UpdateDoor;
