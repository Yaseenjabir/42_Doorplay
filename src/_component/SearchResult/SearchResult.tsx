import { useEffect, useState } from "react";
import { GoArrowUpRight } from "react-icons/go";
import { useLocation } from "react-router";
import { toast } from "sonner";
import { DoorSchema } from "../../utils/utils";
import { Pagination } from "@nextui-org/react";
import useStore from "../../store/Store";
import { useNavigateToSingleDoor } from "../../utils/useNavigateToSingleDoor";
const SearchResult = () => {
  const [data, setData] = useState<DoorSchema[]>([]);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("query");

  const { globalData } = useStore();

  useEffect(() => {
    document.title = "A&R | Search";
  }, []);

  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigateToSingleDoor = useNavigateToSingleDoor();

  useEffect(() => {
    const searchData = async (userInput: string) => {
      if (userInput.length < 3) {
        toast.warning("Please enter 3 characters");
        setNotFound(true);
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const titleRegex = new RegExp(userInput, "i");
        const filteredtData = globalData.filter((item) =>
          titleRegex.test(item.title)
        );
        if (filteredtData.length > 0) {
          setData(filteredtData);
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
    if (query) {
      searchData(query);
    }
  }, [query]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Number of items per page

  const totalPages = Math.ceil(data && data.length / itemsPerPage);

  const currentItems =
    data &&
    data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <section className="w-full pt-14 py-10 px-5 flex flex-col gap-5 lg:w-[70%] lg:max-w-[850px]">
      <div className="w-full flex flex-col gap-5 text-titleColor">
        <h1 className="font-bold text-3xl md:text-4xl lg:text-3xl">
          Result for "{query && query}"
        </h1>
        <p className="text-sm font-semibold md:text-base lg:text-sm">
          Showing {(currentPage - 1) * itemsPerPage + 1} -
          {Math.min(currentPage * itemsPerPage, data && data.length)} of{" "}
          {data.length} results
        </p>
      </div>
      {loading ? (
        <div className="flex justify-center items-center h-[40vh]">
          <div className="border-t-4 border-darkRed border-solid w-16 h-16 rounded-full animate-spin"></div>
        </div>
      ) : notFound ? (
        <div className="w-full h-[40vh] text-titleColor pt-10 text-center">
          No search result found
        </div>
      ) : (
        <div className="w-full flex flex-col gap-5">
          {currentItems &&
            currentItems.map((item) => {
              return (
                <div className="flex flex-col gap-1">
                  <h4
                    onClick={() => {
                      navigateToSingleDoor(item);
                    }}
                    className="hover:underline w-min text-nowrap flex items-center text-sm font-semibold text-gray-600 cursor-pointer md:text-lg lg:text-sm"
                  >
                    {item.title}
                    <GoArrowUpRight className="text-xl mt-[2px]" />
                  </h4>
                  <p className="text-[15px] md:text-lg lg:text-[15px]">
                    {item.shortPreview}
                  </p>
                </div>
              );
            })}
          <div className="w-full flex gap-3 items-center justify-center">
            <Pagination
              total={totalPages}
              initialPage={currentPage}
              onChange={handlePageChange}
              color="primary"
              variant="bordered"
              size="sm"
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default SearchResult;
