import React, { useEffect, useState } from "react";
import { apiClient } from "../../../apiClient/apiClient";
import { SEARCH_DOOR_ROUTE } from "../../../constants/constant";
import { DoorSchema } from "../../../utils/utils";

interface Menus {
  showGarageDoorDropDown: boolean;
  showCommercialDoorDropDown: boolean;
}

const useFetchSubcategories = (category: string, setState: any) => {
  useEffect(() => {
    const fetchSubcategories = async () => {
      try {
        const res = await apiClient.get(SEARCH_DOOR_ROUTE, {
          params: { category, limit: 100000 },
        });

        if (res.status === 200) {
          const filteredData = res.data.map((item: DoorSchema) => ({
            category: item.category,
            subcategory: item.subcategory,
          }));

          const categoryMap = new Map();

          filteredData.forEach((item: any) => {
            const { category, subcategory } = item;

            if (!categoryMap.has(category)) {
              categoryMap.set(category, new Set());
            }

            categoryMap.get(category).add(subcategory);
          });

          const result: any = [];
          categoryMap.forEach((subcategories, category) => {
            subcategories.forEach((subcategory: any) => {
              result.push({ category, subcategory });
            });
          });

          setState(result);
        }
      } catch (ex) {
        console.log(ex);
      }
    };
    fetchSubcategories();
  }, []);
};

interface DataType {
  category: string;
  subcategory: string;
}

const DropDownMenus: React.FC<Menus> = ({
  showGarageDoorDropDown,
  showCommercialDoorDropDown,
}) => {
  const [garageData, setGarageData] = useState<DataType[]>([]);
  const [commercialData, setCommercialData] = useState<DataType[]>();

  useFetchSubcategories("garage", setGarageData);
  useFetchSubcategories("commercial", setCommercialData);

  return (
    <>
      <ul
        className={`bg-white transition-all ease-in-out duration-1000 ${
          showGarageDoorDropDown && "h-[156px] py-2 overflow-y-auto"
        } h-0 px-3 w-[170px] fixed top-[76px] left-24 z-50 flex flex-col gap-2 overflow-hidden`}
      >
        <a
          href="/garage-doors"
          className="hover:underline text-titleColor text-lg cursor-pointer text-[15px]"
        >
          All Garage Doors
        </a>
        {garageData &&
          garageData.map((item, index) => {
            return (
              <a
                key={index}
                href={`/${item.category}/${item.subcategory.replace(
                  /\s+/g,
                  "-"
                )}`}
                className="hover:underline text-titleColor text-lg cursor-pointer text-[15px]"
              >
                {item.subcategory[0].toUpperCase() + item.subcategory.slice(1)}
              </a>
            );
          })}
      </ul>
      <ul
        className={`bg-white transition-all ease-in-out duration-1000 ${
          showCommercialDoorDropDown && "h-[156px] py-2 overflow-y-auto"
        } h-0 px-3 w-[170px] fixed top-[76px] left-[270px] z-50 flex flex-col gap-2 overflow-hidden`}
      >
        <a
          href="/commercial-doors"
          className="hover:underline text-titleColor text-lg cursor-pointer text-[15px]"
        >
          All Commercial Doors
        </a>
        {commercialData &&
          commercialData.map((item, index) => {
            return (
              <a
                key={index}
                href={`/${item.category}/${item.subcategory.replace(
                  /\s+/g,
                  "-"
                )}`}
                className="hover:underline text-titleColor text-lg cursor-pointer text-[15px]"
              >
                {item.subcategory[0].toUpperCase() + item.subcategory.slice(1)}
              </a>
            );
          })}
      </ul>
    </>
  );
};

export default DropDownMenus;
