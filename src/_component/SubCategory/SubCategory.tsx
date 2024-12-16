import { useEffect, useRef, useState } from "react";
import { DoorSchema } from "../../utils/utils";
import { useLocation, useParams } from "react-router";
import { Badge } from "../../components/ui/badge";
import { IoStarSharp } from "react-icons/io5";
import { AxiosError } from "axios";
import { toast } from "sonner";
import useStore from "../../store/Store";
import { useNavigateToSingleDoor } from "../../utils/useNavigateToSingleDoor";
import Slider from "../Categories/Slider";

const SubCategory = () => {
  useEffect(() => {
    document.title = "A&R | Subcategory";
  }, []);

  const scrollIntoViewRef = useRef<HTMLDivElement | null>(null);
  const [loader, setLoader] = useState<boolean>(true);
  const [availablity, setAvailability] = useState(false);
  const [data, setData] = useState<DoorSchema[]>([]);
  const [skip, setSkip] = useState<number>(0);
  const limit: number = 5;
  const [hasMore, setHasMore] = useState(true);
  const { subCategory } = useParams();
  const navigateToSingleDoor = useNavigateToSingleDoor();
  const [totalCounts, setTotalCounts] = useState<number>(0);

  const { globalData } = useStore();

  const fetchDoors = async (skip: number, limit: number) => {
    try {
      setLoader(true);
      const filteredData = globalData.filter(
        (item) => item.subcategory === subCategory?.replace(/-/g, " ")
      );
      setTotalCounts(filteredData && filteredData.length);
      if (filteredData.length === 0) {
        setAvailability(false);
        setHasMore(false);
        setData([]);
        setLoader(false);
        return;
      }

      const paginatedData = filteredData.slice(skip, skip + limit);
      if (paginatedData) {
        if (paginatedData.length === 0 || paginatedData.length < 5) {
          setData((prev) => [...prev, ...paginatedData]);
          setAvailability(true);
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
      setHasMore(false);
      if (ex instanceof AxiosError) {
        if (ex.response && ex.response.data && ex.response.data.error) {
          toast.error(ex.response.data.error);
        } else {
          toast.error("An unexpected error occurred.");
        }
      } else {
        toast.error("An unexpected error occurred.");
      }
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    if (globalData.length > 0) {
      fetchDoors(skip, limit);
    }
  }, [skip, limit, globalData]);

  const location = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (scrollIntoViewRef.current) {
        scrollIntoViewRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [location]);

  return (
    <>
      <div ref={scrollIntoViewRef} className="" id="scrollIntoView"></div>

      <section className="w-full py-10 px-5 lg:pr-16 lg:pl-12">
        <h1 className="text-2xl">
          {subCategory &&
            subCategory?.charAt(0).toUpperCase() + subCategory?.slice(1)}
          <span className="text-base text-gray-400">({totalCounts})</span>
        </h1>
        <hr className="hidden lg:block w-full my-5" />

        {/* Doors List  */}
        {loader ? (
          <div className="flex justify-center items-center h-[70vh]">
            <div className="border-t-4 border-darkRed border-solid w-16 h-16 rounded-full animate-spin"></div>
          </div>
        ) : !availablity ? (
          <div className="w-full h-[60vh] items-center justify-center flex flex-col text-center">
            <h1 className="font-bold lg:text-lg xl:text-xl">
              No Doors Available
            </h1>
            <p className="lg:text-lg xl:text-xl">
              OOPS! Currently, there are not doors available at the moment
            </p>
          </div>
        ) : (
          <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-14 mt-5">
            {data.map((door) => {
              return (
                <div
                  key={door._id}
                  className="w-full flex flex-col cursor-pointer"
                >
                  <Slider images={door.media} />
                  <div className="w-full flex flex-col md:flex-row md:items-center md:justify-between lg:items-start lg:flex-col">
                    <div className="py-5 w-full flex flex-col gap-3 md:w-[400px] lg:w-full">
                      <div className="flex items-center justify-between gap-2">
                        <h1
                          onClick={() => navigateToSingleDoor(door)}
                          className="font-bold text-gray-800 md:text-2xl lg:text-base"
                        >
                          {door.title}
                        </h1>
                        <Badge variant="secondary" className="text-nowrap">
                          {door.subcategory}
                        </Badge>
                        <div className="hidden lg:flex bg-slate-100 items-center px-2 rounded-xl text-lg gap-2 text-yellow-400 py-1">
                          <IoStarSharp />
                          <IoStarSharp />
                          <IoStarSharp />
                          <IoStarSharp />
                          <IoStarSharp />
                          <p className="text-black text-sm text-nowrap">
                            5.0 | 3
                          </p>
                        </div>
                      </div>
                      <div className="text-sm text-gray-600 md:text-xl lg:text-sm flex items-end xl:justify-between w-full">
                        <p className="xl:w-[400px]">{door.shortPreview}</p>
                        <button
                          onClick={() => navigateToSingleDoor(door)}
                          className="py-2 px-5 bg-darkRed border-[2px] border-darkRed rounded-md text-white hover:bg-transparent hover:text-darkRed transition-all ease-in-out duration-200 w-min text-nowrap mt-3 md:h-min hidden xl:block"
                        >
                          Learn More
                        </button>
                      </div>
                      <div className="flex items-center justify-between md:mt-5 xl:mt-0">
                        {/* <div className="text-sm flex items-center text-gray-800 gap-1">
                          Also in :{" "}
                          <div className="bg-cyan-500 w-3 h-3 rounded-full"></div>
                          <div className="bg-red-600 w-3 h-3 rounded-full"></div>{" "}
                          + 5
                        </div> */}
                        <div className="flex lg:hidden bg-slate-100 items-center px-2 rounded-xl text-lg gap-2 text-yellow-400 py-1">
                          <IoStarSharp />
                          <IoStarSharp />
                          <IoStarSharp />
                          <IoStarSharp />
                          <IoStarSharp />
                          <p className="text-black text-sm">5.0 | 3</p>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => navigateToSingleDoor(door)}
                      className="py-2 px-5 bg-darkRed border-[2px] border-darkRed rounded-md text-white hover:bg-transparent hover:text-darkRed transition-all ease-in-out duration-200 w-min text-nowrap mt-3 md:h-min xl:hidden"
                    >
                      Learn More
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Load more button  */}
        {!loader && hasMore && (
          <div className="w-full md:w-min mx-auto">
            <button
              onClick={() => setSkip(skip + limit)} // Increase skip to load more
              className="border-[2px] border-darkRed px-5 py-3 rounded-md hover:text-white hover:bg-darkRed transition-all ease-in-out duration-300 w-full mt-10 lg:mt-20 text-nowrap"
            >
              Load More
            </button>
          </div>
        )}
      </section>
    </>
  );
};

export default SubCategory;
