import React, { useEffect, useState } from "react";
import { toast } from "sonner";

import { Select, SelectItem } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { DoorSchema } from "../../../utils/utils";
import { apiClient } from "../../../apiClient/apiClient";
import { SEARCH_DOOR_ROUTE } from "../../../constants/constant";
import { useTheme } from "@mui/material";

interface DatInt {
  data: DoorSchema[];
  setAvailability: (item: boolean) => void;
  setHasMore: (item: boolean) => void;
  setLoader: (item: boolean) => void;
  setSearchedData: (item: DoorSchema[]) => void;
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
}) => {
  const [category, setCategory] = useState<Category | undefined>();
  const [subcategory, setSubcategory] = useState<string>("");
  const [title, setTitle] = useState("");

  useEffect(() => {
    if (category === "commercial") {
      setSubcategory("overhead sectional");
    } else if (category === "garage") {
      setSubcategory("modern");
    }
  }, [category]);

  const handleSearch = async (
    title: any,
    subcategory: string,
    category: string | undefined
  ) => {
    if (!category || !subcategory) {
      setSearchedData([]);
      setAvailability(true);
      setHasMore(true);
      toast.warning("Category and Subcategory is required");
      setTitle("");
      return;
    }

    setTitle(title);
    try {
      setLoader(true);
      interface Params {
        skip: number;
        limit: number;
        category: string;
        subcategory: string;
        title?: string | undefined;
      }
      const params: Params = {
        skip: 0,
        limit: 10000,
        category,
        subcategory,
      };

      if (title && title.trim()) {
        params.title = title;
      }

      const res = await apiClient.get(SEARCH_DOOR_ROUTE, { params });
      if (res.data) {
        if (res.data.length === 0) {
          setSearchedData([]);
          setAvailability(false);
          setHasMore(false);
          return;
        }
        setHasMore(false);
        setAvailability(true);
        setSearchedData(res.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    if (title.length >= 3) handleSearch(title, subcategory, category);
  }, [subcategory, title]);

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

    // Check if dropdown is open and dark mode is enabled
    if (IsCategoryDropDownOpen && isDark) {
      // Add the class when dropdown is open and dark mode is active
      if (element && !element.classList.contains("myDarkTheme")) {
        element.classList.add("myDarkTheme");
        console.log("class added");
      }
    } else {
      // Remove the class when dropdown is closed or dark mode is not active
      if (element && element.classList.contains("myDarkTheme")) {
        element.classList.remove("myDarkTheme");
        console.log("class removed");
      }
    }
  }, [IsCategoryDropDownOpen, isDark]); // Run the effect when the dropdown or dark mode changes

  return (
    <div className="w-full flex flex-col items-center justify-center relative z-0 pt-10 text-nowrap mb-10">
      <form className="w-full flex gap-3 flex-col md:flex-row max-w-[780px]">
        <div className="w-full flex gap-5">
          <div className="w-[40%] md:w-full">
            <Select
              value={category}
              onChange={(e) => {
                setCategory(e.target.value as Category);
                setSearchedData([]);
                setAvailability(true);
                setHasMore(true);
                toast.warning("Category and Subcategory is required");
                setTitle("");
                handleSearch(title, subcategory, e.target.value);
              }}
              label="Category"
              placeholder="Select a category"
              labelPlacement="inside"
              className="max-w-xs"
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
          <div className="w-[40%] md:w-full">
            <Select
              value={subcategory}
              onChange={(e) => {
                setSubcategory(e.target.value);
                handleSearch(title, e.target.value, category);
              }}
              label="Subcategory"
              placeholder="Select a subcategory"
              labelPlacement="inside"
              className="max-w-xs"
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
        </div>
        <div className="w-[85%] flex items-end justify-center">
          <Input
            onChange={(e) =>
              handleSearch(e.target.value, subcategory, category)
            }
            size={"md"}
            type="text"
            label="Search"
            labelPlacement="inside"
            placeholder="Search here..."
          />
        </div>
      </form>
    </div>
  );
};

export default Filter;
