import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { apiClient } from "../../../apiClient/apiClient";
import {
  GET_ALL_EMAIL_CONTACTS,
  UPDATE_CONTACT_ROUE,
} from "../../../constants/constant";
import { EmailModel } from "../../../utils/utils";
import { toast } from "sonner";
import { useTheme } from "@mui/material";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "../../../components/ui/dialog";
import { Textarea } from "../../../components/ui/textarea";
import { Button } from "../../../components/ui/button";
import { FaFilter, FaRegCheckCircle } from "react-icons/fa";
import { AxiosError } from "axios";
import { motion } from "framer-motion";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../../components/ui/popover";
import { IoFilter } from "react-icons/io5";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { Label } from "../../../components/ui/label";
import { FaFilterCircleXmark } from "react-icons/fa6";

const Emails = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "A&R | Emails";
  }, []);

  const [data, setData] = useState<EmailModel[]>([]);
  const theme = useTheme();
  const darktheme = theme.palette.mode === "dark";
  const noteDialogRef = useRef<HTMLButtonElement | null>(null);
  const addNoteDialogRef = useRef<HTMLButtonElement | null>(null);
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState<EmailModel | undefined>();
  const [read, setRead] = useState("");
  const [reply, setReply] = useState("");
  const [searchedData, setSearchedData] = useState<EmailModel[] | undefined>(
    []
  );

  useEffect(() => {
    const user = sessionStorage.getItem("user");

    const fetchEmailContacts = async (token: string) => {
      setLoading(true);
      const cache = await caches.open("A&R-Doors");
      const cachedData = await cache.match(GET_ALL_EMAIL_CONTACTS);
      if (cachedData) {
        const parsedData = await cachedData.json();
        setData(parsedData);

        setLoading(false);
        return;
      } else {
        try {
          setLoading(true);
          const res = await apiClient.get(GET_ALL_EMAIL_CONTACTS, {
            headers: {
              Authorization: token,
            },
          });
          if (res.status == 200) {
            const cache = await caches.open("A&R-Doors");
            const response = new Response(JSON.stringify(res.data), {
              headers: {
                "Content-Type": "application/json",
              },
            });
            await cache.put(GET_ALL_EMAIL_CONTACTS, response);
            setData(res.data);
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
          setLoading(false);
        }
      }
    };

    if (!user) {
      navigate("/auth");
    } else {
      const { token } = user && JSON.parse(user);

      fetchEmailContacts(token);
    }
  }, []);

  async function handleMessageMarking(
    key: string,
    value: boolean | string,
    id: string | undefined
  ) {
    const user = sessionStorage.getItem("user");
    if (!user) {
      toast.error("No token provided");
      return;
    }
    setTrackLoading(id);
    const { token } = user && JSON.parse(user);
    try {
      const res = await apiClient.patch(
        `${UPDATE_CONTACT_ROUE}/${id}`,
        { [key]: value },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      if (res.status === 200) {
        setData((prev: EmailModel[]) => {
          return prev.map((item) =>
            item._id === res.data._id ? res.data : item
          );
        });
        const cache = await caches.open("A&R-Doors");
        await cache.delete(GET_ALL_EMAIL_CONTACTS);
        let warning = "";
        if (res.data.isRead) {
          warning = "Marked as read!";
        }
        if (!res.data.isRead) {
          warning = "Marked as unread!";
        }
        if (res.data.isAnswered) {
          warning = "Marked as answered!";
        }
        if (!res.data.isAnswered) {
          warning = "Marked as unanswered";
        }

        if (key === "internalNote") {
          warning = "Your note has been added successfully. Tap to view";
          addNoteDialogRef?.current?.click();
          setSelectedItem(undefined);
        }
        toast.success(warning);
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
      setTrackLoading(undefined);
    }
  }

  const [trackIndex, setTrackIndex] = useState<null | number>(null);
  const [trackLoading, setTrackLoading] = useState<undefined | string>();

  const truncateText = (text: string, length: number) => {
    return text.length > length ? `${text.slice(0, length)}` : text;
  };

  function handleSearch(read: string, reply: string) {
    if (!read && !reply) {
      toast.warning("Please select any option");
      return;
    }

    let result;

    const isRead = read === "read";
    const isReplied = reply === "replied";
    const isUnreplied = reply === "unreplied";

    result = data.filter((item) => {
      const matchesReadStatus = isRead ? item.isRead : !item.isRead;

      const matchesReplyStatus = isReplied
        ? item.isAnswered
        : isUnreplied
          ? !item.isAnswered
          : true;

      return (read ? matchesReadStatus : true) && matchesReplyStatus;
    });

    setSearchedData(result);
  }

  const handleClearFilter = () => {
    setRead("");
    setReply("");
    setSearchedData([]);
  };

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-[70vh]">
          <div className="border-t-4 border-darkRed border-solid w-16 h-16 rounded-full animate-spin"></div>
        </div>
      ) : (
        <>
          <div className="w-full flex items-center justify-between mt-10">
            <h1 className="font-medium text-2xl text-titleColor px-1">
              Emails
            </h1>
            <Popover>
              <PopoverTrigger>
                <IoFilter className="text-2xl" />
              </PopoverTrigger>
              <PopoverContent className="mr-5 flex flex-col gap-5 py-10 px-5">
                <div>
                  <Label>Read Emails</Label>
                  <Select
                    defaultValue={read}
                    value={read}
                    onValueChange={(e) => setRead(e)}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select emails" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="read">Read</SelectItem>
                      <SelectItem value="unread">Unread</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Reply Emails</Label>
                  <Select
                    defaultValue={reply}
                    value={reply}
                    onValueChange={(e) => setReply(e)}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select emails" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="replied">Replied</SelectItem>
                      <SelectItem value="unreplied">Unreplied</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleSearch(read, reply);
                    }}
                    className="py-2 px-8 text-sm font-semibold bg-warmBrown border border-warmBrown hover:bg-transparent hover:text-warmBrown transition-all ease-out duration-300 text-white flex items-center justify-center text-nowrap gap-2 w-full"
                  >
                    <FaFilter className="text-[17px]" />
                    Apply Filter
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      handleClearFilter();
                    }}
                    className="py-2 px-8 text-sm font-semibold mt-2 bg-warmBrown border border-warmBrown hover:bg-transparent hover:text-warmBrown transition-all ease-out duration-300 text-white flex items-center text-nowrap justify-center gap-2 w-full"
                  >
                    <FaFilterCircleXmark className="text-lg" />
                    Clear Filter
                  </button>
                </div>
              </PopoverContent>
            </Popover>
          </div>
          <section
            className="w-full grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 py-10 xl:gap-5 gap-10 place-items-start"
            style={{ fontFamily: "Poppins" }}
          >
            {(searchedData && searchedData?.length > 0
              ? searchedData
              : data
            ).map((email, index) => {
              return trackLoading === email._id ? (
                <div
                  className={`max-w-md w-full min-h-[380px] flex flex-col justify-center items-center rounded-lg overflow-hidden shadow-lg border relative ${darktheme ? "bg-[#1b1b1b] border-gray-50" : "bg-white border-gray-200"}`}
                >
                  <div
                    className={`border-t-4 ${darktheme ? "border-white" : "border-darkRed"} border-solid w-16 h-16 rounded-full animate-spin`}
                  ></div>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                    transition: {
                      type: "spring",
                      stiffness: 500,
                      duration: 1,
                    },
                  }}
                  key={email._id}
                  className={`max-w-md place-self-center lg:place-self-auto w-full min-h-[380px] flex flex-col justify-center rounded-lg overflow-hidden shadow-lg border relative ${darktheme ? "bg-[#141414] border-[#646464]" : "bg-white border-gray-200"}`}
                >
                  <div className="p-4">
                    <h2
                      className={`font-medium ${darktheme ? "text-white" : "text-gray-800"}`}
                    >
                      {email.name}
                    </h2>
                    <p
                      className={`text-sm ${darktheme ? "text-white" : "text-gray-600"}`}
                    >
                      {new Date(email.date).toLocaleString()}
                    </p>

                    <div className="mt-2 text-sm">
                      <p
                        className={`font-medium ${darktheme ? "text-white" : "text-gray-800"}`}
                      >
                        Email:
                      </p>
                      <p
                        className={`text-sm ${darktheme ? "text-white" : "text-gray-600"}`}
                      >
                        {email.email}
                      </p>
                    </div>

                    <div className="mt-2 text-sm">
                      <p
                        className={`font-medium ${darktheme ? "text-white" : "text-gray-800"}`}
                      >
                        Phone:
                      </p>
                      <p
                        className={`text-sm ${darktheme ? "text-white" : "text-gray-600"}`}
                      >
                        {email.number}
                      </p>
                    </div>

                    <div className="mt-4 text-sm">
                      <p
                        className={`font-medium ${darktheme ? "text-white" : "text-gray-800"}`}
                      >
                        Message:
                      </p>
                      <p
                        className={`text-sm ${darktheme ? "text-white" : "text-gray-600"}`}
                      >
                        {trackIndex === index
                          ? email.message
                          : truncateText(email.message, 50)}
                        {email.message.length > 50 && (
                          <span
                            onClick={() =>
                              setTrackIndex(trackIndex === index ? null : index)
                            }
                            className="cursor-pointer text-blue-500 underline pl-2"
                          >
                            {trackIndex === index ? "Read less" : "Read More"}
                          </span>
                        )}
                      </p>
                    </div>
                    <div className="mt-4 text-sm">
                      <p
                        className={`font-medium ${darktheme ? "text-white" : "text-gray-800"}`}
                      >
                        Note:
                      </p>
                      {email.internalNote ? (
                        <p
                          className={`text-sm ${darktheme ? "text-white" : "text-gray-600"}`}
                        >
                          Note is added.{" "}
                          <span
                            onClick={() => {
                              setSelectedItem(email);
                              noteDialogRef.current?.click();
                            }}
                            className="cursor-pointer underline mr-3"
                          >
                            View
                          </span>
                          <span
                            onClick={() => {
                              setNote(email.internalNote);
                              setSelectedItem(email);
                              addNoteDialogRef.current?.click();
                            }}
                            className="cursor-pointer underline"
                          >
                            Update
                          </span>
                        </p>
                      ) : (
                        <p
                          className={`text-sm ${darktheme ? "text-white" : "text-gray-600"}`}
                        >
                          You haven't added any note yet.{" "}
                          <span
                            onClick={() => {
                              setNote(email.internalNote);
                              setSelectedItem(email);
                              addNoteDialogRef.current?.click();
                            }}
                            className="cursor-pointer underline"
                          >
                            Tap to add
                          </span>
                        </p>
                      )}
                    </div>
                    <div className="text-sm flex items-center gap-2 mt-4">
                      <button
                        onClick={() =>
                          handleMessageMarking(
                            "isRead",
                            email.isRead ? false : true,
                            email._id
                          )
                        }
                        className={`py-2 w-[95px] text-nowrap px-3 rounded-full text-white font-medium cursor-pointer border border-transparent hover:bg-transparent transition-all ease-in-out duration-300 ${email.isRead ? "bg-gray-400 hover:border-gray-400 hover:text-gray-400" : "bg-green-500 hover:border-green-500 hover:text-green-500"}`}
                      >
                        {email.isRead ? "Unread" : "Read"}
                      </button>
                      <button
                        onClick={() =>
                          handleMessageMarking(
                            "isAnswered",
                            email.isAnswered ? false : true,
                            email._id
                          )
                        }
                        className={`py-2 w-[95px] text-nowrap px-3 rounded-full text-white font-medium cursor-pointer border border-transparent hover:bg-transparent transition-all ease-in-out duration-300 ${email.isAnswered ? "bg-gray-400 hover:border-gray-400 hover:text-gray-400" : "bg-green-500 hover:border-green-500 hover:text-green-500"}`}
                      >
                        {email.isAnswered ? "Unreply" : "Reply"}
                      </button>
                    </div>
                  </div>
                  <div className="absolute top-3 right-3 flex flex-col">
                    {!email.isAnswered && (
                      <p className="text-red-500 text-[12px] font-medium flex items-center justify-center gap-1">
                        <span className="mt-1">*</span> <span>Not Replied</span>
                      </p>
                    )}
                    {!email.isRead && (
                      <p className="text-red-500 text-[12px] font-medium -mt-2 flex items-center justify-start gap-1">
                        <span className="mt-1">*</span> <span>Not Read</span>
                      </p>
                    )}
                    {email.isAnswered && email.isRead && (
                      <FaRegCheckCircle className="text-2xl" />
                    )}
                  </div>
                </motion.div>
              );
            })}
            {searchedData?.length === 0 && data?.length === 0 && (
              <p>No email contacts available</p>
            )}
          </section>
        </>
      )}

      {/* View note dialog  */}
      <Dialog>
        <DialogTrigger className="hidden" ref={noteDialogRef}></DialogTrigger>
        <DialogContent
          style={{ fontFamily: "Poppins" }}
          className={`w-[90%] max-h-[80vh] mt-7 overflow-y-auto scrollable-div ${darktheme && "bg-[#0f0f0f]"}`}
        >
          <div className="w-full text-start">
            <h1 className="font-semibold">Your Note :</h1>
            <p className="text-sm">{selectedItem?.internalNote}</p>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add note dialog ref  */}
      <Dialog>
        <DialogTrigger className="hidden" ref={addNoteDialogRef}>
          Open
        </DialogTrigger>
        <DialogContent
          className={`w-[90%] max-h-[80vh] mt-7 overflow-y-auto scrollable-div ${darktheme && "bg-[#1b1b1b]"}`}
        >
          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleMessageMarking("internalNote", note, selectedItem?._id);
            }}
            className="w-full pt-5 flex flex-col gap-5"
          >
            <Textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Enter your note"
              rows={7}
            ></Textarea>
            <Button
              className="bg-warmBrown w-full border border-warmBrown hover:text-warmBrown hover:bg-transparent hover:border-warmBrown"
              type="submit"
            >
              Submit
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Emails;
