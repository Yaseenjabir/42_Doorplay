import { useEffect, useRef, useState } from "react";
import { IoIosStar } from "react-icons/io";
import { IoStarSharp } from "react-icons/io5";
import { LuHelpingHand } from "react-icons/lu";
import { SlBadge } from "react-icons/sl";
import { useLocation, useNavigate } from "react-router";
import { apiClient } from "../../apiClient/apiClient";
import { GET_ALL_DOORS } from "../../constants/constant";
import { DoorSchema, imageReplacement } from "../../utils/utils";
import { Badge } from "../../components/ui/badge";
import { AxiosError } from "axios";
import { toast } from "sonner";
import SearchForm from "../GarageDoors/SearchForm";

const CommercialDoors = () => {
  const navigate = useNavigate();

  const [data, setData] = useState<DoorSchema[]>([]);
  const [skip, setSkip] = useState<number>(0);
  const [searchedData, setSearchedData] = useState<DoorSchema[]>([]);
  const [loader, setLoader] = useState<boolean>(true);
  const [availablity, setAvailability] = useState(false);
  const limit: number = 5;
  const [hasMore, setHasMore] = useState(true);
  const scrollIntoViewRef = useRef<HTMLDivElement | null>(null);
  const fetchDoors = async () => {
    try {
      setLoader(true);
      const res = await apiClient.get(GET_ALL_DOORS, {
        params: { skip, limit, category: "commercial" },
      });
      if (res.data) {
        if (res.data.length === 0 || res.data.length < 5) {
          setData((prev) => [...prev, ...res.data]);
          setAvailability(true);
          setHasMore(false);
          return;
        }
        setData((prev) => [...prev, ...res.data]);
        setAvailability(true);
      } else {
        setHasMore(false);
        setAvailability(false);
      }
    } catch (ex: unknown) {
      setHasMore(false);
      setAvailability(false);
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
    fetchDoors();
  }, [skip, limit]);

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
      <SearchForm
        data={data}
        setLoader={setLoader}
        setSearchedData={setSearchedData}
        setAvailability={setAvailability}
        setHasMore={setHasMore}
      />
      <div ref={scrollIntoViewRef} className="" id="scrollIntoView"></div>
      <section className="w-full py-10 px-5">
        <h1 className="text-2xl">
          Commercial Doors
          {/* <span className="text-base text-gray-400">({totalCounts})</span> */}
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
            {(searchedData.length > 0 ? searchedData : data).map((door) => {
              return (
                <div
                  key={door._id}
                  onClick={() =>
                    navigate(
                      `/garage-doors/${encodeURIComponent(
                        door.title.replace(/\s+/g, "-")
                      )}`,
                      {
                        state: { id: door._id },
                      }
                    )
                  }
                  className="w-full flex flex-col cursor-pointer"
                >
                  <img
                    src={
                      door && door.media && door.media[0]
                        ? door.media[0].url
                        : imageReplacement
                    }
                    className="w-full rounded-md max-h-[360px]"
                  />
                  <div className="w-full flex flex-col md:flex-row md:items-center md:justify-between lg:items-start lg:flex-col">
                    <div className="py-5 w-full flex flex-col gap-3 md:w-[400px] lg:w-full">
                      <div className="flex items-center justify-between gap-2">
                        <h1 className="font-bold text-gray-800 md:text-2xl lg:text-base">
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
                          onClick={() =>
                            navigate(
                              `/garage-doors/${encodeURIComponent(
                                door.title.replace(/\s+/g, "-")
                              )}`,
                              {
                                state: { id: door._id },
                              }
                            )
                          }
                          className="py-2 px-5 bg-darkRed border-[2px] border-darkRed rounded-md text-white hover:bg-transparent hover:text-darkRed transition-all ease-in-out duration-200 w-min text-nowrap mt-3 md:h-min hidden xl:block"
                        >
                          Learn More
                        </button>
                      </div>
                      <div className="flex items-center justify-between md:mt-5 xl:mt-0">
                        <div className="text-sm flex items-center text-gray-800 gap-1">
                          Also in :{" "}
                          <div className="bg-cyan-500 w-3 h-3 rounded-full"></div>
                          <div className="bg-red-600 w-3 h-3 rounded-full"></div>{" "}
                          + 5
                        </div>
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
                      onClick={() =>
                        navigate(
                          `/garage-doors/${encodeURIComponent(
                            door.title.replace(/\s+/g, "-")
                          )}`,
                          {
                            state: { id: door._id },
                          }
                        )
                      }
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

        {/* Description text */}
        <div className="w-full my-5 flex flex-col gap-5">
          <div className="w-full">
            <h1 className="font-bold text-xl text-gray-800 md:text-2xl">
              Garage Doors Crafted for Every Home
            </h1>
            <p className="text-gray-800 mt-4 md:text-xl lg:text-base">
              For more than 50 years, AR Doors has manufactured beautiful,
              durable and reliable garage doors. We are honored to be America’s
              favorite garage door brand, a distinction achieved through our
              unrelenting focus on delivering true performance. With all the
              styles of garage doors offered by AR Doors, the perfect look and
              design is ready to be crafted for you.
            </p>
          </div>
          <div className="w-full">
            <h1 className="font-bold text-xl text-gray-800 md:text-2xl">
              Find Inspiration
            </h1>
            <p className="text-gray-800 mt-4 md:text-xl lg:text-base">
              Be inspired by our{" "}
              <span className="text-slate-500 hover:underline cursor-pointer">
                latest Lookbook
              </span>
              , featuring projects from award-winning architects, builders, and
              influencers featuring garage doors from AR Doors.
            </p>
          </div>
          <div className="w-full">
            <h1 className="font-bold text-xl text-gray-800 md:text-2xl">
              Build Your Own Beauty
            </h1>
            <p className="text-gray-800 mt-4 md:text-xl lg:text-base">
              Tap into your vision and unlock the full craftsmanship of AR Doors
              in our{" "}
              <span className="text-slate-500 hover:underline cursor-pointer">
                Door Imagination System
              </span>
              . Upload a picture of your home, build your custom door, and
              preview it on your own home. Explore how each available design
              option changes and beautifies your curb appeal.
            </p>
          </div>
          <div className="w-full">
            <h1 className="font-bold text-xl text-gray-800 md:text-2xl">
              Craftsmanship from Build to Install
            </h1>
            <p className="text-gray-800 mt-4 md:text-xl lg:text-base">
              AR Doors has a network of more than 400 trusted and certified
              local dealers and service specialists. We trust our craftsmanship
              to them and so can you.{" "}
              <span className="text-slate-500 hover:underline cursor-pointer">
                Find an authorized garage door professional{" "}
              </span>
              near you to handle the delivery and installation of your garage
              door. Have peace of mind from start to finish.
            </p>
          </div>
        </div>
      </section>
      {/* Why replace your garage doors  */}
      <div className="w-full flex flex-col text-center py-10 lg:py-16 bg-darkRed text-white">
        <h1 className="text-2xl font-bold px-16 md:text-3xl">
          Why Replace Your Garage Door?
        </h1>
        <div className="w-full py-5 flex flex-col gap-14 lg:flex-row lg:justify-evenly">
          <div className="flex flex-col items-center justify-center gap-3 lg:w-[200px]">
            <SlBadge className="w-[50px] h-[50px] text-yellow-300" />
            <h1 className="text-3xl font-bold">70%</h1>
            <p className="text-sm md:text-lg">ROI at resale</p>
          </div>
          <div className="flex flex-col items-center justify-center gap-3 lg:w-[200px]">
            <LuHelpingHand className="w-[50px] h-[50px] text-yellow-300" />
            <h1 className="text-3xl font-bold">193%+</h1>
            <p className="text-sm max-w-[200px] md:text-lg">
              Realtors agree a new garage door helps a home sell faster
            </p>
          </div>
          <div className="flex flex-col items-center justify-center gap-3 lg:w-[200px]">
            <IoIosStar className="w-[50px] h-[50px] text-yellow-300" />
            <h1 className="text-3xl font-bold">Show Off</h1>
            <p className="text-sm max-w-[200px] md:text-lg">
              Your style with a new customized garage door
            </p>
          </div>
        </div>
        <button className="py-3 px-5 text-sm bg-warmBrown rounded-md w-min text-nowrap self-center border border-warmBrown hover:bg-transparent transition-all ease-in-out duration-200 mt-5 lg:mt-10">
          Explore Buying Guide
        </button>
      </div>
    </>
  );
};

export default CommercialDoors;
