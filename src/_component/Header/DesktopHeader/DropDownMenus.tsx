import React from "react";
import { commercial, garage } from "../../../utils/utils";

interface Menus {
  showGarageDoorDropDown: boolean;
  showCommercialDoorDropDown: boolean;
}

const DropDownMenus: React.FC<Menus> = ({
  showGarageDoorDropDown,
  showCommercialDoorDropDown,
}) => {
  return (
    <>
      <ul
        className={`bg-white shadow-lg transition-all ease-in-out duration-1000 ${
          showGarageDoorDropDown && "h-[130px] py-2 overflow-y-auto"
        } h-0 px-3 w-[140px] xl:w-[170px] fixed top-[105px] left-24 z-50 hidden lg:flex flex-col gap-2 overflow-hidden scrollable-div`}
      >
        <a
          href="/garage-doors"
          className="hover:underline text-titleColor cursor-pointer text-[15px]"
        >
          All Garage Doors
        </a>
        {garage.map((item, index) => {
          return (
            <a
              key={index}
              href={`/garage/${item.value.replace(/\s+/g, "-")}`}
              className="hover:underline text-titleColor cursor-pointer text-[15px]"
            >
              {item.name}
            </a>
          );
        })}
      </ul>
      <ul
        className={`bg-white shadow-lg transition-all ease-in-out duration-1000 ${
          showCommercialDoorDropDown && "h-[156px] py-2 overflow-y-auto"
        } h-0 px-3 w-[170px] fixed top-[105px] xl:left-[270px] left-[230px] z-50 hidden lg:flex flex-col gap-2 overflow-hidden scrollable-div`}
      >
        <a
          href="/commercial-doors"
          className="hover:underline text-titleColor cursor-pointer text-[15px]"
        >
          All Commercial Doors
        </a>
        {commercial.map((item, index) => {
          return (
            <a
              key={index}
              href={`/commercial/${item.value.replace(/\s+/g, "-")}`}
              className="hover:underline text-titleColor cursor-pointer text-[15px]"
            >
              {item.name}
            </a>
          );
        })}
      </ul>
    </>
  );
};

export default DropDownMenus;
