import { Badge } from "../../../components/ui/badge";
import { DoorSchema } from "../../../utils/utils";
import { GET_ALL_DOORS } from "../../../constants/constant";
import { useRef, useState, useEffect } from "react";
import { AxiosError } from "axios";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "../../../components/ui/dialog";
import { apiClient } from "../../../apiClient/apiClient";
import { useTheme } from "@mui/material/styles";

import UpdateDoorForm from "./UpdateDoorForm";
import UpdateMediaForm from "./UpdateMediaForm";
import { useNavigate } from "react-router";

const UpdateDoor = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = sessionStorage.getItem("user");
    const parsedUser = user && JSON.parse(user);

    if (!parsedUser) {
      navigate("/auth");
    }
  }, []);

  const [data, setData] = useState<DoorSchema[]>([]);
  const [skip, setSkip] = useState<number>(0);
  const limit: number = 10;
  const [dataLoader, setDataLoader] = useState<boolean>(true);
  const [availablity, setAvailability] = useState(false);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const [selectedImages, setSelectedImages] = useState<any>([]);

  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

  const [selectedItem, setSelectedItem] = useState<null | DoorSchema>(null);
  const formTriggerRef = useRef<HTMLButtonElement>(null);
  const mediaFormTrigger = useRef<HTMLButtonElement>(null);

  const fetchDoors = async () => {
    setDataLoader(true);
    try {
      const res = await apiClient.get(GET_ALL_DOORS, {
        params: { skip, limit },
      });
      if (res.data) {
        if (res.data.length === 0) {
          setHasMore(false);
          return;
        }
        setData((prev) => [...prev, ...res.data]);
        setAvailability(true);
      } else {
        setHasMore(false);
        setAvailability(false);
      }
    } catch (ex: unknown) {
      if (ex instanceof AxiosError) {
        if (ex.response?.data.message) {
          toast.error(ex.response.data.message);
          return;
        }
        if (ex.response && ex.response.data && ex.response.data.error) {
          toast.error(ex.response.data.error);
          return;
        } else {
          toast.error("An unexpected error occurred.");
        }
      } else {
        toast.error("An unexpected error occurred.");
      }
    } finally {
      setDataLoader(false);
    }
  };

  useEffect(() => {
    fetchDoors();
  }, [skip, limit]);

  const truncateText = (text: string, length: number) => {
    const truncatedText =
      text && text.length > length ? text.slice(0, length) + "..." : text;
    return truncatedText;
  };

  return (
    <section className="w-full py-10 h-[calc(100vh-60px)] flex flex-col items-center justify-start px-5 overflow-y-scroll">
      {dataLoader ? (
        <div className="flex justify-center items-center h-[70vh]">
          <div className="border-t-4 border-darkRed border-solid w-16 h-16 rounded-full animate-spin"></div>
        </div>
      ) : !availablity ? (
        <div>
          <p>No doors available to update</p>
        </div>
      ) : (
        <div className="grid gap-10 place-content-center md:grid-cols-2 lg:grid-cols-3">
          {data &&
            data.map((door) => {
              return (
                <div
                  className={`max-w-[400px] border-gray-400 border rounded-md overflow-hidden`}
                >
                  <img
                    src={
                      door && door.media && door.media[0]
                        ? door.media[0].url
                        : "https://media.istockphoto.com/id/1409329028/vector/no-picture-available-placeholder-thumbnail-icon-illustration-design.webp?s=1024x1024&w=is&k=20&c=Bs1RdueQnaAcO888WBIQsC6NvA7aVTzeRVzSd8sJfUg="
                    }
                    alt=""
                    className="w-full max-h-[220px] h-[180px]"
                  />
                  <div className="p-3 flex flex-col gap-4">
                    <div className="flex items-start gap-2 flex-col">
                      <h1 className="font-semibold text-nowrap">
                        {truncateText(door.title, 24)}
                      </h1>
                      <Badge
                        variant={"secondary"}
                        className="text-[10px] w-min text-nowrap"
                      >
                        {door.category}
                      </Badge>
                    </div>
                    <p className="text-sm font-light h-[80px]">
                      {truncateText(door.description, 127)}
                    </p>
                    <div className="w-full flex items-center gap-2">
                      <button
                        onClick={() => {
                          formTriggerRef.current?.click();
                          setSelectedItem(door);
                        }}
                        className="bg-warmBrown text-white w-full rounded py-1 text-sm hover:bg-transparent border border-warmBrown hover:text-warmBrown transition-all ease-in-out duration-300"
                      >
                        Update Fields
                      </button>
                      <button
                        onClick={() => {
                          mediaFormTrigger.current?.click();
                          setSelectedItem(door);
                          setSelectedImages(door.media);
                        }}
                        className="bg-warmBrown text-white w-full rounded py-1 text-sm hover:bg-transparent border border-warmBrown hover:text-warmBrown transition-all ease-in-out duration-300"
                      >
                        Update Media
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      )}
      {/* Load more button  */}
      {!dataLoader && hasMore && (
        <div className="w-full md:w-min mx-auto">
          <button
            onClick={() => setSkip(skip + limit)}
            className={`border-[2px]  px-5 py-3 rounded-md hover:text-white hover:bg-darkRed transition-all ease-in-out duration-300 w-full mt-10 lg:mt-10 text-nowrap mb-20`}
          >
            Load More
          </button>
        </div>
      )}
      <Dialog>
        <DialogTrigger ref={formTriggerRef} className="hidden">
          Open
        </DialogTrigger>
        <DialogContent
          className={`overflow-y-scroll w-[90%] h-[85vh] top-[350px] rounded ${isDarkMode && "bg-black"} `}
        >
          <UpdateDoorForm
            formTriggerRef={formTriggerRef}
            setSelectedItem={setSelectedItem}
            selectedItem={selectedItem}
          />
        </DialogContent>
      </Dialog>
      <Dialog>
        <DialogTrigger ref={mediaFormTrigger} className="hidden">
          Open
        </DialogTrigger>
        <DialogContent
          className={`overflow-y-auto w-[90%] h-[85vh] top-[350px] rounded ${isDarkMode && "bg-black"}`}
        >
          <UpdateMediaForm
            selectedImages={selectedImages}
            selectedItem={selectedItem}
          />
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default UpdateDoor;
