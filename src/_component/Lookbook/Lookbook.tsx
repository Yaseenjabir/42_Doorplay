import { useEffect, useState } from "react";
import { Badge } from "../../components/ui/badge";
import { DoorSchema, imageReplacement } from "../../utils/utils";
import useStore from "../../store/Store";
import { useNavigateToSingleDoor } from "../../utils/useNavigateToSingleDoor";

const Lookbook = () => {
  const [data, setData] = useState<DoorSchema[]>();
  const [loader, setLoader] = useState<boolean>(true);
  const navigateToSingleDoor = useNavigateToSingleDoor();

  const { globalData } = useStore();

  useEffect(() => {
    document.title = "A&R | Lookbook";
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoader(true);
        const filteredData = globalData.filter(
          (item) => item.isFavourited === true
        );
        if (filteredData) {
          setData(filteredData);
        }
      } catch (ex) {
        console.log(ex);
      } finally {
        setLoader(false);
      }
    }
    fetchData();
  }, [globalData]);

  return (
    <>
      {/* Hero Section  */}
      <div className="w-full relative">
        <div className="absolute bottom-28 text-white px-5 flex flex-col gap-2 md:static md:text-black md:py-10 md:px-7 lg:gap-3 xl:gap-5">
          <h1 className="text-4xl font-light lg:text-5xl lg:text-titleColor">
            A&R Lookbook
          </h1>
          <p className="md:font-semibold md:text-gray-600 md:max-w-[620px] md:text-lg lg:font-normal lg:text-base">
            Get inspired by projects from award-winning architects, builders,
            and influencers featuring garage doors from A&R
          </p>
        </div>
        <div
          id="lookbook-herosection"
          className="w-full h-screen md:h-[80vh]"
          style={{
            backgroundImage:
              'url("https://www.clopaydoor.com/images/default-source/lookbook/moderncrplank.webp?sfvrsn=a940707d_1")',
            backgroundSize: "cover",
            backgroundPosition: "right bottom",
          }}
        >
          {/* Content here */}
        </div>
      </div>
      <section className="w-full px-5 py-10 lg:px-10 xl:px-16 mt-20 flex flex-col gap-20 lg:gap-32">
        {loader ? (
          <div className="flex justify-center items-center h-[70vh]">
            <div className="border-t-4 border-darkRed border-solid w-16 h-16 rounded-full animate-spin"></div>
          </div>
        ) : (
          data &&
          data.map((item, index) => {
            const styleFirst = index % 2 === 0;

            return (
              <div
                className={`w-full flex flex-col gap-5 ${styleFirst ? "lg:flex-row bg-white pl-0" : "lg:flex-row-reverse bg-[#2a292a] lg:pl-5"}`}
              >
                <div className="w-full h-[300px] md:h-[600px] lg:w-[60%] lg:h-auto">
                  <img
                    className="w-full h-full"
                    src={
                      item.media && item.media[0]
                        ? item.media[0].url
                        : imageReplacement
                    }
                  />
                </div>
                <div
                  className={`w-full flex  flex-col gap-5 lg:w-[40%] ${styleFirst ? "py-0 " : " p-5 lg:py-5 lg:p-0"}`}
                >
                  <div className="flex flex-col md:flex-row">
                    <div className="w-full max-w-[400px] md:w-[51%] md:max-w-full lg:w-full">
                      <h1
                        className={`text-[25px] md:tex-[30px] lg:text-[35px] font-bold ${styleFirst ? "text-titleColor" : "text-yellow-300"}`}
                      >
                        {item.title}
                      </h1>
                      <Badge variant={"secondary"}>{item.subcategory}</Badge>
                      <p
                        className={`mt-4 md:text-lg lg:text-base ${styleFirst ? "text-titleColor" : "text-white"}`}
                      >
                        {item.shortPreview}
                      </p>

                      <button
                        onClick={() => {
                          navigateToSingleDoor(item);
                        }}
                        className={`py-[10px] mt-5 px-4 text-sm  border-[2px]  rounded-md  hover:bg-transparent transition-all ease-in-out duration-200 ${styleFirst ? "bg-darkRed border-darkRed text-white hover:text-darkRed" : "bg-yellow-300 border-yellow-300 text-black hover:text-yellow-300"}`}
                      >
                        View Product Details
                      </button>
                    </div>
                    <img
                      className="w-[49%] hidden md:block lg:hidden"
                      src={
                        item.media && item.media[1]
                          ? item.media[1].url
                          : imageReplacement
                      }
                      alt=""
                    />
                  </div>
                  <div className="w-full flex flex-col gap-5">
                    <div className="w-full h-[120px] md:h-[240px] flex flex-row gap-5 lg:h-[200px]">
                      <div
                        className="w-full h-full bg-cover bg-center"
                        style={{
                          backgroundImage: `url('${
                            item.media && item.media[1]
                              ? item.media[1].url
                              : imageReplacement
                          }')`,
                        }}
                      ></div>
                      <div
                        style={{
                          backgroundImage: `url('${
                            item.media && item.media[2]
                              ? item.media[2].url
                              : imageReplacement
                          }')`,
                        }}
                        className="w-full h-full bg-cover bg-center"
                      ></div>
                    </div>
                    <div
                      style={{
                        backgroundImage: `url('${
                          item.media && item.media[3]
                            ? item.media[3].url
                            : imageReplacement
                        }')`,
                      }}
                      className="w-full h-full bg-cover bg-center hidden lg:block lg:h-[250px]"
                    ></div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </section>
    </>
  );
};

export default Lookbook;
