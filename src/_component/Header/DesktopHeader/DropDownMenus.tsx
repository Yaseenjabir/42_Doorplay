import React, { useState } from "react";
import { useProcessData } from "../../../utils/utils";
import useStore from "../../../store/Store";

interface Menus {
  showGarageDoorDropDown: boolean;
  showCommercialDoorDropDown: boolean;
}

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

  const { globalData } = useStore();
  useProcessData("garage", setGarageData, globalData);
  useProcessData("commercial", setCommercialData, globalData);

  return (
    <>
      <ul
        className={`bg-white transition-all ease-in-out duration-1000 ${
          showGarageDoorDropDown && "h-[156px] py-2 overflow-y-auto"
        } h-0 px-3 w-[170px] fixed top-[105px] left-24 z-50 hidden lg:flex flex-col gap-2 overflow-hidden scrollable-div`}
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
        } h-0 px-3 w-[170px] fixed top-[105px] left-[250px] z-50 hidden lg:flex flex-col gap-2 overflow-hidden scrollable-div`}
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
