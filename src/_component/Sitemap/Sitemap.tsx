import { useEffect, useState } from "react";
import { useProcessData } from "../../utils/utils";
import useStore from "../../store/Store";

interface DataType {
  category: string;
  subcategory: string;
}

const Sitemap = () => {
  const [garageData, setGarageData] = useState<DataType[]>([]);
  const [commercialData, setCommercialData] = useState<DataType[]>();

  const { globalData } = useStore();

  useProcessData("garage", setGarageData, globalData);
  useProcessData("commercial", setCommercialData, globalData);

  useEffect(() => {
    document.title = "A&R | Sitemap";
  }, []);

  return (
    <section className="w-full py-10 px-5 text-titleColor max-w-[1020px] mx-auto">
      <h1 className="text-2xl font-semibold lg:font-light lg:text-4xl">
        A&R Sitemap
      </h1>
      <div className="w-full mt-7 gap-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {/* Garage Doors  */}
        <div className="flex flex-col gap-4">
          <h1 className="text-xl font-bold">Garage Doors</h1>
          <ul className="flex flex-col px-3 text-[16px] gap-2">
            <a
              className="hover:underline cursor-pointer w-min text-nowrap"
              href="/garage-doors"
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
                    className="hover:underline text-titleColor cursor-pointer w-min text-nowrap"
                  >
                    {item.subcategory[0].toUpperCase() +
                      item.subcategory.slice(1)}
                  </a>
                );
              })}
          </ul>
        </div>
        {/* Commercial Doors  */}
        <div className="flex flex-col gap-4">
          <h1 className="text-xl font-bold">Commercial Doors</h1>
          <ul className="flex flex-col px-3 text-[16px] gap-2">
            <a
              className="hover:underline cursor-pointer w-min text-nowrap"
              href="/garage-doors"
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
                    className="hover:underline text-titleColor cursor-pointer w-min text-nowrap"
                  >
                    {item.subcategory[0].toUpperCase() +
                      item.subcategory.slice(1)}
                  </a>
                );
              })}
          </ul>
        </div>
        {/* Miscellaneous */}
        <div className="flex flex-col gap-4">
          <h1 className="text-xl font-bold">Miscellaneous</h1>
          <ul className="flex flex-col px-3 text-[16px] gap-2">
            <a
              className="hover:underline cursor-pointer w-min text-nowrap"
              href="/"
            >
              Home
            </a>
            <a
              className="hover:underline cursor-pointer w-min text-nowrap"
              href="/about"
            >
              About Us
            </a>
            <a
              className="hover:underline cursor-pointer w-min text-nowrap"
              href="/lookbook"
            >
              Lookbook
            </a>
            <a
              className="hover:underline cursor-pointer w-min text-nowrap"
              href="/privacy-policy"
            >
              Privacy Policy
            </a>
            <a
              className="hover:underline cursor-pointer w-min text-nowrap"
              href="#"
            >
              Terms And Condiitons
            </a>
            <a
              className="hover:underline cursor-pointer w-min text-nowrap"
              href="/sitemap"
            >
              Sitemap
            </a>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Sitemap;
