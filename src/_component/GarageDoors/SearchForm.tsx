import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { FormControl, InputLabel, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { DoorSchema } from "../../utils/utils";
import { apiClient } from "../../apiClient/apiClient";
import { SEARCH_DOOR_ROUTE } from "../../constants/constant";
import { toast } from "sonner";

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
  const [subcategoryList, setSubcategoryList] = useState<string[]>();
  const [title, setTitle] = useState("");

  useEffect(() => {
    if (data && data.length > 0) {
      setCategory(data[0].category);
      setSubcategory(data[0].subcategory);
      const filteredItem = [...new Set(data.map((item) => item.subcategory))];
      setSubcategoryList(filteredItem);
    }
  }, [data]);

  const handleSearch = async (title: any) => {
    console.log(category, subcategory, title);
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
    if (title.length >= 3) handleSearch(title);
  }, [subcategory, title]);

  return (
    <div className="w-full flex flex-col items-center justify-center pt-10 px-5 text-nowrap">
      <form className="w-full flex gap-3 flex-col md:flex-row max-w-[780px]">
        <div className="w-full flex gap-5">
          <div className="w-[40%] md:w-full">
            <FormControl fullWidth variant="outlined">
              <InputLabel id="Category-select-label">Category</InputLabel>
              <Select
                value={category}
                labelId="Category-select-label"
                id="Category-select"
                onChange={(e) => setCategory(e.target.value)}
                label="Category"
              >
                <MenuItem value={category}>
                  {category.length > 0 &&
                    category[0].toUpperCase() + category.slice(1)}
                </MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="w-[40%] md:w-full">
            <FormControl fullWidth variant="outlined">
              <InputLabel id="Subcategory-select-label">Subcategory</InputLabel>
              <Select
                value={subcategory}
                labelId="Subcategory-select-label"
                id="Subcategory-select"
                onChange={(e) => setSubcategory(e.target.value)}
                label="Subcategory"
              >
                {subcategoryList &&
                  subcategoryList.length > 0 &&
                  subcategoryList.map((item, index) => {
                    return (
                      <MenuItem key={index} value={item}>
                        {item[0].toUpperCase() + item.slice(1)}
                      </MenuItem>
                    );
                  })}
              </Select>
            </FormControl>
          </div>
        </div>
        <div className="w-[85%]">
          <TextField
            onChange={(e) => handleSearch(e.target.value)}
            label="Search for door"
            variant="outlined"
            fullWidth
          />
        </div>
      </form>
    </div>
  );
};

export default SearchForm;
