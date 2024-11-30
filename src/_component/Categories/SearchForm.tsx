import React, { useEffect, useState } from "react";
import { DoorSchema } from "../../utils/utils";
import { GET_ALL_DOORS } from "../../constants/constant";
import { toast } from "sonner";

import { Select, SelectItem } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { RxCross2 } from "react-icons/rx";
import { FaFilter } from "react-icons/fa";
import { FaFilterCircleXmark } from "react-icons/fa6";

interface DatInt {
  data: DoorSchema[];
  setAvailability: (item: boolean) => void;
  setHasMore: (item: boolean) => void;
  setLoader: (item: boolean) => void;
  setShowFilter: (item: boolean) => void;
  setSearchedData: (item: DoorSchema[]) => void;
  showFilter: boolean;
}

const SearchForm: React.FC<DatInt> = ({
  data,
  setLoader,
  setSearchedData,
  setHasMore,
  setAvailability,
  setShowFilter,
  showFilter,
}) => {
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [subcategoryList, setSubcategoryList] = useState<string[] | undefined>(
    []
  );

  const [title, setTitle] = useState("");
  const [categoryValue, setCategoryValue] = useState("");

  useEffect(() => {
    if (data && data.length > 0) {
      setCategory(data[0].category);
      // setSubcategory(data[0].subcategory);
      const filteredItem = [...new Set(data.map((item) => item.subcategory))];
      setSubcategoryList(filteredItem);
    }
  }, [data]);

  const handleSearch = async (
    title: string,
    subcategory: string,
    categoryValue: string
  ) => {
    if (!categoryValue && !subcategory && !title) {
      setSearchedData([]);
      setAvailability(true);
      setHasMore(true);
      toast.error("Please enter title or select any category or subcategory");
      return;
    }
    try {
      const cache = await caches.open("A&R-Doors");
      const chachedResult = await cache.match(GET_ALL_DOORS);
      const chachedData = await chachedResult?.json();

      let result = null;

      if (category && subcategory && title) {
        const titleRegex = new RegExp(title, "i");

        result = chachedData.filter(
          (item: DoorSchema) =>
            item.category === category &&
            item.subcategory === subcategory &&
            titleRegex.test(item.title)
        );
      } else if (category && subcategory) {
        result = chachedData.filter(
          (item: DoorSchema) =>
            item.category === category && item.subcategory === subcategory
        );
      } else if (category && title) {
        const titleRegex = new RegExp(title, "i");
        result = chachedData.filter(
          (item: DoorSchema) =>
            item.category === category && titleRegex.test(item.title)
        );
      } else if (category) {
        result = chachedData.filter(
          (item: DoorSchema) => item.category === category
        );
      } else if (subcategory) {
        result = chachedData.filter(
          (item: DoorSchema) => item.subcategory === subcategory
        );
      } else if (title) {
        const titleRegex = new RegExp(title, "i");
        result = chachedData.filter((item: DoorSchema) =>
          titleRegex.test(item.title)
        );
      }

      if (result) {
        if (result.length === 0) {
          setSearchedData([]);
          setAvailability(false);
          setHasMore(false);
          setShowFilter(false);
          return;
        }
        setHasMore(false);
        setAvailability(true);
        setSearchedData(result);
        setShowFilter(false);
      }
    } finally {
      setLoader(false);
    }
  };

  const handleClearFilter = () => {
    setSubcategory("");
    setCategoryValue("");
    setTitle("");
    setSearchedData([]);
    setAvailability(true);
    setHasMore(true);
  };

  const SelectorIcon = (props: any) => (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
      width="1em"
      {...props}
    >
      <path d="M0 0h24v24H0z" fill="none" stroke="none" />
      <path d="M8 9l4 -4l4 4" />
      <path d="M16 15l-4 4l-4 -4" />
    </svg>
  );

  return (
    <div
      onClick={() => setShowFilter(false)}
      style={{ transitionDuration: "2000ms" }}
      className={`w-full h-screen fixed top-0 right-0 z-50 ${
        showFilter ? "visible backdrop-blur-sm" : "invisible backdrop-blur-none"
      } transition-all ease-in-out`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`w-[85%] h-screen transition-all ease-in-out duration-500 absolute top-0 right-0 bg-white flex flex-col items-center z-50 justify-center max-w-[600px] shadow-sm shadow-[#000000ab] ${
          showFilter ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="w-full flex flex-col items-center justify-center relative z-0  pt-10 px-5 text-nowrap">
          <h1 className="text-start w-full mb-5 text-xl">Filter</h1>
          <form className="w-full flex gap-3 flex-col md:flex-row max-w-[780px]">
            <div className="w-full flex flex-col gap-8">
              <div className="w-full">
                <Select
                  selectedKeys={[categoryValue]}
                  value={categoryValue}
                  onChange={(e) => setCategoryValue(e.target.value)}
                  label="Category"
                  placeholder="Select a category"
                  labelPlacement="outside"
                  fullWidth
                  disableSelectorIconRotation
                  selectorIcon={<SelectorIcon />}
                >
                  <SelectItem key={category} value={category}>
                    {category && category[0].toUpperCase() + category.slice(1)}
                  </SelectItem>
                </Select>
              </div>
              <div className="w-full">
                <Select
                  selectedKeys={[subcategory]}
                  value={subcategory}
                  onChange={(e) => {
                    setSubcategory(e.target.value);
                  }}
                  label="Subcategory"
                  placeholder="Select a subcategory"
                  labelPlacement="outside"
                  fullWidth
                  disableSelectorIconRotation
                  selectorIcon={<SelectorIcon />}
                >
                  {subcategoryList && subcategoryList.length > 0 ? (
                    subcategoryList.map((item) => (
                      <SelectItem key={item} value={item}>
                        {item[0].toUpperCase() + item.slice(1)}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem key={"subcategory"}>Waiting</SelectItem>
                  )}
                </Select>
              </div>
              <div className="w-full flex items-end justify-center">
                <Input
                  onClick={(e) => e.stopPropagation()}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  size={"md"}
                  type="text"
                  label="Search"
                  labelPlacement="outside"
                  placeholder="Search here..."
                />
              </div>
              <div className="w-full flex gap-3">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleSearch(title, subcategory, categoryValue);
                  }}
                  className="py-2 px-8 text-sm font-semibold bg-warmBrown border border-warmBrown hover:bg-transparent hover:text-warmBrown transition-all ease-out duration-300 text-white flex items-center justify-center gap-2 w-[50%]"
                >
                  <FaFilter className="text-[17px]" />
                  Apply Filter
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    handleClearFilter();
                  }}
                  className="py-2 px-8 text-sm font-semibold bg-warmBrown border border-warmBrown hover:bg-transparent hover:text-warmBrown transition-all ease-out duration-300 text-white flex items-center justify-center gap-2 w-[50%]"
                >
                  <FaFilterCircleXmark className="text-lg" />
                  Clear Filter
                </button>
              </div>
            </div>
          </form>
        </div>
        <RxCross2
          onClick={() => setShowFilter(false)}
          className="absolute top-5 right-5 text-2xl cursor-pointer"
        />
      </div>
    </div>
  );
};

export default SearchForm;
