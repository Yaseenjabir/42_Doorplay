import { Badge } from "../../../../components/ui/badge";
import { DoorSchema } from "../../../../utils/utils";
import { GET_ALL_DOORS } from "../../../../constants/constant";
import { useRef, useState, useEffect } from "react";
import { AxiosError } from "axios";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "../../../../components/ui/dialog";
import { apiClient } from "../../../../apiClient/apiClient";
import useStore from "../../../../store/Store";
import UpdateDoorForm from "./UpdateDoorForm";

const UpdateDoor = () => {
  const [data, setData] = useState<DoorSchema[]>([]);
  const [skip, setSkip] = useState<number>(0);
  const limit: number = 10;
  const [dataLoader, setDataLoader] = useState<boolean>(true);
  const [availablity, setAvailability] = useState(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const { darkTheme } = useStore();
  const [selectedItem, setSelectedItem] = useState<null | DoorSchema>(null);
  const formTriggerRef = useRef<HTMLButtonElement>(null);

  const fetchDoors = async () => {
    try {
      setDataLoader(true);
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
        if (ex.response && ex.response.data && ex.response.data.error) {
          toast.error(ex.response.data.error);
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
      text.length > length ? text.slice(0, length) + "..." : text;
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
                  className={`max-w-[400px] ${
                    darkTheme && "shadow shadow-[#616161] bg-[#3636362d]"
                  } border-gray-400 border rounded-md overflow-hidden`}
                >
                  <img
                    src={
                      door && door.media && door.media[0]
                        ? door.media[0].url
                        : "https://media.istockphoto.com/id/1409329028/vector/no-picture-available-placeholder-thumbnail-icon-illustration-design.webp?s=1024x1024&w=is&k=20&c=Bs1RdueQnaAcO888WBIQsC6NvA7aVTzeRVzSd8sJfUg="
                    }
                    alt=""
                    className="w-full max-h-[220px]"
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
                    <p className="text-sm font-light">
                      {truncateText(door.description, 127)}
                    </p>
                    <button
                      onClick={() => {
                        formTriggerRef.current?.click();
                        setSelectedItem(door);
                      }}
                      className="bg-warmBrown rounded py-1 text-sm hover:bg-transparent border border-warmBrown hover:text-warmBrown transition-all ease-in-out duration-300"
                    >
                      Update
                    </button>
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
            className={`border-[2px] ${
              darkTheme ? "border-warmBrown" : "border-darkRed"
            }  px-5 py-3 rounded-md hover:text-white hover:bg-darkRed transition-all ease-in-out duration-300 w-full mt-10 lg:mt-20 text-nowrap ${
              darkTheme && "hover:bg-warmBrown"
            }`}
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
          className={`overflow-y-scroll w-[90%] h-[90vh] rounded ${
            darkTheme && "bg-[#1B1B1B]"
          }`}
        >
          <UpdateDoorForm selectedItem={selectedItem} />
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default UpdateDoor;
