import { ThemeSwitcher } from "@toolpad/core";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../../components/ui/popover";
import { IoMdNotifications } from "react-icons/io";
import { AxiosError } from "axios";
import {
  GET_ALL_EMAIL_CONTACTS,
  UPDATE_CONTACT_ROUE,
} from "../../../constants/constant";
import { apiClient } from "../../../apiClient/apiClient";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { EmailModel } from "../../../utils/utils";
import { useNavigate } from "react-router";
import { useTheme } from "@mui/material";
const Notification = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<EmailModel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const theme = useTheme();
  const darktheme = theme.palette.mode === "dark";

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
  async function handleMessageMarking(id: string) {
    const user = sessionStorage.getItem("user");
    if (!user) {
      toast.error("No token provided");
      return;
    }

    const { token } = user && JSON.parse(user);
    try {
      const res = await apiClient.patch(
        `${UPDATE_CONTACT_ROUE}/${id}`,
        { isRead: true },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      if (res.status === 200) {
        console.log(res.data);
        setData((prev: EmailModel[]) => {
          return prev.map((item) =>
            item._id === res.data._id ? res.data : item
          );
        });
        const cache = await caches.open("A&R-Doors");
        await cache.delete(GET_ALL_EMAIL_CONTACTS);
        toast.success("Marked as read!");
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
    }
  }

  const notificationsAvailable =
    data.length > 0 && data.some((item) => item.isRead === false);

  function generateRandomLightColor() {
    const r = Math.floor(Math.random() * 128 + 127);
    const g = Math.floor(Math.random() * 128 + 127);
    const b = Math.floor(Math.random() * 128 + 127);

    return `rgb(${r}, ${g}, ${b})`;
  }

  console.log(generateRandomLightColor());

  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <button className="relative">
            <IoMdNotifications
              className={`cursor-pointer text-2xl w-full h-full ${darktheme ? "text-[#42a5f5]" : "text-[#1565c0]"}`}
            />
            {notificationsAvailable && (
              <div className="w-2 h-2 absolute top-0 right-0 bg-red-500 rounded-full"></div>
            )}
          </button>
        </PopoverTrigger>
        <PopoverContent
          style={{ fontFamily: "Poppins" }}
          className={`w-full flex flex-col items-center justify-center ${darktheme ? "bg-[#141414] text-white" : "text-titleColor"} mt-[18px]  py-5`}
        >
          <div className="w-[320px] max-h-[500px] overflow-auto scrollable-div pr-2">
            {loading ? (
              <p>Loading..</p>
            ) : (
              data.map((item) => {
                return (
                  <div
                    onClick={() =>
                      !item.isRead && handleMessageMarking(item._id)
                    }
                    className={`w-full text-sm my-2 ${!item.isRead && "bg-slate-50"} p-2 cursor-pointer rounded flex gap-2`}
                  >
                    <div className="h-auto  flex items-center justify-center">
                      <h1
                        style={{ backgroundColor: generateRandomLightColor() }}
                        className="w-10 h-10 text-black flex items-center justify-center rounded-full font-medium text-xl"
                      >
                        {item.name[0].toUpperCase()}
                      </h1>
                    </div>
                    <div>
                      <h3>
                        <span className="font-semibold">{item.name}</span> sent
                        you an email.
                      </h3>
                      <p
                        className={`leading-4 text-[13px] ${darktheme ? "text-white" : "text-gray-500"} `}
                      >
                        {item.message.length > 27
                          ? `${item.message.slice(0, 27)}...`
                          : item.message}
                      </p>
                      <p className="text-[12px] font-light">
                        {new Date(item.date).toLocaleString()}
                      </p>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </PopoverContent>
      </Popover>
      <ThemeSwitcher />
    </>
  );
};

export default Notification;
