import React, { useEffect, useState } from "react";

import { Select, SelectItem } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { DoorSchema } from "../../../utils/utils";

import { GET_ALL_ADMIN_DOORS } from "../../../constants/constant";
import { useTheme } from "@mui/material";
import { FaFilter } from "react-icons/fa";
import { FaFilterCircleXmark } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { toast } from "sonner";

interface DatInt {
  data: DoorSchema[];
  setAvailability: (item: boolean) => void;
  setHasMore: (item: boolean) => void;
  setLoader: (item: boolean) => void;
  setSearchedData: (item: DoorSchema[]) => void;
  showFilter: boolean;
  setShowFilter: (item: boolean) => void;
  isDarkMode: boolean;
}

type Category = "commercial" | "garage";
type SubcategoryOptions = {
  [key in Category]: Array<{ value: string; label: string }>;
};

const categoryOptions = [
  { value: "commercial", label: "Commercial" },
  { value: "garage", label: "Garage" },
];

const subcategoryOptions: SubcategoryOptions = {
  commercial: [
    { value: "overhead sectional", label: "Overhead Sectional" },
    { value: "sectional", label: "Sectional" },
    { value: "grillies", label: "Grillies" },
    { value: "counter", label: "Counter" },
    { value: "commercial sheet", label: "Commercial Sheet" },
    { value: "sheet", label: "Sheet" },
  ],
  garage: [
    { value: "modern", label: "Modern" },
    { value: "carriage house", label: "Carriage House" },
    { value: "traditional", label: "Traditional" },
  ],
};

const Filter: React.FC<DatInt> = ({
  setLoader,
  setSearchedData,
  setHasMore,
  setAvailability,
  setShowFilter,
  showFilter,
  isDarkMode,
}) => {
  const [category, setCategory] = useState<Category | string>("");
  const [subcategory, setSubcategory] = useState<string>("");
  const [title, setTitle] = useState("");

  useEffect(() => {
    if (category) {
      setSubcategory("");
    }
  }, [category]);

  const handleSearch = async () => {
    if (!title && !category && !subcategory) {
      setSearchedData([]);
      setAvailability(true);
      setHasMore(true);
      toast.error(
        "Please enter any title or choose any category or subcategory"
      );
      return;
    }
    try {
      const cache = await caches.open("A&R-Doors");
      const cachedResult = await cache.match(GET_ALL_ADMIN_DOORS);
      const cachedData = await cachedResult?.json();
      let result = null;

      if (category && subcategory && title) {
        const titleRegex = new RegExp(title, "i");

        result = cachedData.filter(
          (item: DoorSchema) =>
            item.category === category &&
            item.subcategory === subcategory &&
            titleRegex.test(item.title)
        );
      } else if (category && subcategory) {
        result = cachedData.filter(
          (item: DoorSchema) =>
            item.category === category && item.subcategory === subcategory
        );
      } else if (category && title) {
        const titleRegex = new RegExp(title, "i");
        result = cachedData.filter(
          (item: DoorSchema) =>
            item.category === category && titleRegex.test(item.title)
        );
      } else if (category) {
        result = cachedData.filter(
          (item: DoorSchema) => item.category === category
        );
      } else if (subcategory) {
        result = cachedData.filter(
          (item: DoorSchema) => item.subcategory === subcategory
        );
      } else if (title) {
        const titleRegex = new RegExp(title, "i");
        result = cachedData.filter((item: DoorSchema) =>
          titleRegex.test(item.title)
        );
      }

      if (result.length === 0) {
        setSearchedData([]);
        setAvailability(false);
        setHasMore(false);
        return;
      }
      setHasMore(false);
      setAvailability(true);
      setSearchedData(result);
    } finally {
      setLoader(false);
    }
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

  const [IsCategoryDropDownOpen, setIsCategoryDropDownOpen] = useState(false);

  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  useEffect(() => {
    const element = document.querySelector(".bg-content1");

    if (IsCategoryDropDownOpen && isDark) {
      if (element && !element.classList.contains("myDarkTheme")) {
        element.classList.add("myDarkTheme");
      }
    } else {
      if (element && element.classList.contains("myDarkTheme")) {
        element.classList.remove("myDarkTheme");
      }
    }
  }, [IsCategoryDropDownOpen, isDark]);

  const handleFilter = () => {
    setTitle("");
    setCategory("");
    setSubcategory("");
    setSearchedData([]);
    setAvailability(true);
    setHasMore(true);
  };

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
        className={`w-[85%] h-screen transition-all ease-in-out duration-500 absolute top-0 right-0 ${
          isDarkMode
            ? "bg-[#121212] shadow-[#fffffff8]"
            : "bg-white shadow-[#000000ab]"
        } flex flex-col items-center z-50 justify-center max-w-[600px] shadow-md ${
          showFilter ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="w-full flex flex-col items-center justify-center relative z-0 pt-10 px-5 text-nowrap">
          <h1 className="text-start w-full mb-5 text-xl">Filter</h1>
          <form className="w-full flex gap-3 flex-col md:flex-row max-w-[780px]">
            <div className="w-full flex flex-col gap-8">
              <div className="w-full">
                <Select
                  selectedKeys={[category]}
                  value={category}
                  fullWidth
                  onChange={(e) => {
                    setCategory(e.target.value as Category);
                  }}
                  label="Category"
                  placeholder="Select a category"
                  labelPlacement="inside"
                  disableSelectorIconRotation
                  onOpenChange={() => setIsCategoryDropDownOpen(true)}
                  onClose={() => setIsCategoryDropDownOpen(false)}
                  selectorIcon={<SelectorIcon />}
                >
                  {categoryOptions.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
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
                  labelPlacement="inside"
                  fullWidth
                  onOpenChange={() => setIsCategoryDropDownOpen(true)}
                  onClose={() => setIsCategoryDropDownOpen(false)}
                  disableSelectorIconRotation
                  selectorIcon={<SelectorIcon />}
                >
                  {!category ? (
                    <SelectItem isDisabled key="no-category" value="">
                      Please select a category
                    </SelectItem>
                  ) : category === "commercial" ? (
                    subcategoryOptions.commercial.map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.label}
                      </SelectItem>
                    ))
                  ) : (
                    subcategoryOptions.garage.map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.label}
                      </SelectItem>
                    ))
                  )}
                </Select>
              </div>
              <div className="w-full flex items-end justify-center">
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  size="md"
                  type="text"
                  label="Search"
                  labelPlacement="inside"
                  placeholder="Search here..."
                />
              </div>
              <div className="w-full flex gap-3">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleSearch();
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
                    handleFilter();
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
          className="absolute top-20 right-5 z-50 text-2xl cursor-pointer"
        />
      </div>
    </div>
  );
};

export default Filter;
