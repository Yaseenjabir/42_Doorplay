import { useEffect, useRef, useState } from "react";
import { IoFilter, IoStarSharp } from "react-icons/io5";
import { useLocation, useNavigate, useParams } from "react-router";
import { DoorSchema, imageReplacement } from "../../utils/utils";
import { Badge } from "../../components/ui/badge";
import Description from "./DescriptionText";
import WhyReplaceUs from "./WhyReplaceUs";
import SearchForm from "./SearchForm";
import useStore from "../../store/Store";

const Categories = () => {
  const navigate = useNavigate();

  const params = useParams();
  const { category } = params;

  useEffect(() => {
    let title =
      category === "garage-doors" ? "Garage Doors" : "Commercial Doors";

    document.title = title ? `A&R | ${title}` : "A&R Doors";
  }, [category]);

  const [data, setData] = useState<DoorSchema[]>([]);
  const [searchedData, setSearchedData] = useState<DoorSchema[]>([]);
  const [skip, setSkip] = useState<number>(0);
  const [loader, setLoader] = useState<boolean>(true);
  const [availablity, setAvailability] = useState(false);
  const limit: number = 5;
  const [hasMore, setHasMore] = useState(true);
  const scrollIntoViewRef = useRef<HTMLDivElement | null>(null);
  const [showFilter, setShowFilter] = useState(false);

  const { globalData } = useStore();

  const fetchDoorsFromLocalData = async (skip: number, limit: number) => {
    try {
      setLoader(true);
      const filteredData = globalData.filter(
        (item) =>
          item.category ===
          (category === "garage-doors" ? "garage" : "commercial")
      );

      const paginatedData = filteredData.slice(skip, skip + limit);

      if (paginatedData.length === 0 || paginatedData.length < 5) {
        setData((prev) => [...prev, ...paginatedData]);
        setAvailability(true);
        setHasMore(false);
        return;
      }

      setData((prev) => [...prev, ...paginatedData]);
      setAvailability(true);
      setHasMore(true);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    fetchDoorsFromLocalData(skip, limit);
  }, [skip, limit, category, globalData]);

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
        showFilter={showFilter}
        setShowFilter={setShowFilter}
        data={data}
        setLoader={setLoader}
        setSearchedData={setSearchedData}
        setAvailability={setAvailability}
        setHasMore={setHasMore}
      />

      <div ref={scrollIntoViewRef} className="" id="scrollIntoView"></div>
      <section className="w-full py-10 px-5">
        <div className="w-full flex flex-row items-center gap-5 justify-between">
          <h1 className="text-2xl">
            Garage Doors
            {/* <span className="text-base text-gray-400">({totalCounts})</span> */}
          </h1>
          <IoFilter
            onClick={() => setShowFilter(true)}
            className="text-2xl cursor-pointer"
          />
        </div>
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
                  onClick={() => {
                    navigate(
                      `/${door.category === "garage" ? "garage-doors" : "commercial-doors"}/${encodeURIComponent(door.title.replace(/\s+/g, "-"))}?id=${door._id}`
                    );
                  }}
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
                        <h1 className="font-bold flex flex-col text-gray-800 md:text-2xl lg:text-base">
                          {door.title}
                          <Badge
                            variant="secondary"
                            className="text-nowrap w-min"
                          >
                            {door.subcategory}
                          </Badge>
                        </h1>
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

        {/* Description text & Why replace your garage doors*/}
        <Description />
      </section>
      <WhyReplaceUs />
    </>
  );
};

export default Categories;
