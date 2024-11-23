import React, { useEffect, useState } from "react";
import { DoorSchema } from "../../utils/utils";
import { apiClient } from "../../apiClient/apiClient";
import { SEARCH_DOOR_ROUTE } from "../../constants/constant";
import { toast } from "sonner";

import { Select, SelectItem } from "@nextui-org/react";
import { Input } from "@nextui-org/react";

interface DatInt {
  data: DoorSchema[];
  setAvailability: (item: boolean) => void;
  setHasMore: (item: boolean) => void;
  setLoader: (item: boolean) => void;
  setSearchedData: (item: DoorSchema[]) => void;
}

const SearchForm: React.FC<DatInt> = ({
  data,
  setLoader,
  setSearchedData,
  setHasMore,
  setAvailability,
}) => {
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [subcategoryList, setSubcategoryList] = useState<string[] | undefined>(
    []
  );
  const [title, setTitle] = useState("");

  useEffect(() => {
    if (data && data.length > 0) {
      setCategory(data[0].category);
      setSubcategory(data[0].subcategory);
      const filteredItem = [...new Set(data.map((item) => item.subcategory))];
      setSubcategoryList(filteredItem);
    }
  }, [data, category]);

  const handleSearch = async (title: any, subcategory: string) => {
    if (title.length < 3) {
      setSearchedData([]);
      setAvailability(true);
      setHasMore(true);
      toast.warning("Search title should be more than 3 characters");
      setTitle("");
      return;
    }

    setTitle(title);
    try {
      setLoader(true);
      const res = await apiClient.get(SEARCH_DOOR_ROUTE, {
        params: {
          skip: 0,
          limit: 10000,
          category,
          subcategory,
          title,
        },
      });
      console.log(res.data);
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
    if (title.length >= 3) handleSearch(title, subcategory);
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

  return (
    <div className="w-full flex flex-col items-center justify-center relative z-0  pt-10 px-5 text-nowrap">
      <form className="w-full flex gap-3 flex-col md:flex-row max-w-[780px]">
        <div className="w-full flex gap-5">
          <div className="w-[40%] md:w-full">
            <Select
              defaultSelectedKeys={[category]}
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              label="Category"
              placeholder="Select a category"
              labelPlacement="outside"
              className="max-w-xs"
              disableSelectorIconRotation
              selectorIcon={<SelectorIcon />}
            >
              <SelectItem key={category} value={category}>
                {category && category[0].toUpperCase() + category.slice(1)}
              </SelectItem>
            </Select>
          </div>
          <div className="w-[40%] md:w-full">
            <Select
              defaultSelectedKeys={[subcategory]}
              value={subcategory}
              onChange={(e) => {
                setSubcategory(e.target.value);
                handleSearch(title, e.target.value);
              }}
              label="Subcategory"
              placeholder="Select a subcategory"
              labelPlacement="outside"
              className="max-w-xs"
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
        </div>
        <div className="w-[85%] flex items-end justify-center">
          <Input
            onChange={(e) => handleSearch(e.target.value, subcategory)}
            size={"md"}
            type="text"
            label="Search"
            labelPlacement="outside"
            placeholder="Search here..."
          />
        </div>
      </form>
    </div>
  );
};

export default SearchForm;
