import { FaRegCheckCircle } from "react-icons/fa";
import { apiClient } from "../../../apiClient/apiClient";
import { useForm } from "react-hook-form";
import React, { useRef, useState } from "react";
import { toast } from "sonner";
import { DoorSchema } from "../../../utils/utils";
import { AxiosError } from "axios";

interface FormInterface {
  selectedImages: any;
  selectedItem: DoorSchema | null;
}

interface MediaInterface {
  _id: string;
  public_id: string;
  url: string;
}

type Inputs = {
  file: FileList | null;
};

const UpdateMediaForm: React.FC<FormInterface> = ({
  selectedImages,
  selectedItem,
}) => {
  const {
    register,
    setValue,
    trigger,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const [file, setFile] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [loader, setLoader] = useState(false);
  const [removeImages, setRemoveImages] = useState<MediaInterface[]>([]);

  const deleteFiles = async () => {
    const user = sessionStorage.getItem("user");
    const { token } = user && JSON.parse(user);
    if (!token) {
      toast.error("No token provided");
      return;
    }
    try {
      setLoader(true);
      const res = await apiClient.patch(
        `/api/door/${selectedItem?._id}/media`,
        {
          remove: removeImages,
        },
        { headers: { Authorization: token } }
      );
      if (res.status === 200) {
        toast.success("Media has been deleted successfully");
        setTimeout(() => {
          location.reload();
        }, 2000);
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
      setLoader(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (selectedFiles && selectedFiles.length > 7) {
      toast.error("Images cannot be more than 7");
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      setFile([]);
      setValue("file", null);
      trigger("file");
      return;
    }
    const filesArray = Array.from(selectedFiles || []);
    const validFiles = filesArray.filter((file) =>
      file.type.startsWith("image/")
    );
    if (validFiles.length !== filesArray.length) {
      alert("Only image files are allowed.");
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      setFile([]);
      setValue("file", null);
      trigger("file");
      return;
    }
    setFile(validFiles);
    setValue("file", selectedFiles);
    trigger("file");
  };

  const onSubmit = async () => {
    const user = sessionStorage.getItem("user");
    const { token } = user && JSON.parse(user);
    try {
      setLoader(true);
      const formData = new FormData();
      file.forEach((file) => {
        formData.append("files", file);
      });
      const res = await apiClient.patch(
        `/api/door/${selectedItem?._id}/media`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: token,
          },
        }
      );
      if (res.status === 200) {
        toast.success("Media has been updated successfully");
        setTimeout(() => {
          location.reload();
        }, 2000);
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
      setLoader(false);
    }
  };

  return loader ? (
    <div className="flex justify-center items-center h-[70vh]">
      <div className="border-t-4 border-darkRed border-solid w-16 h-16 rounded-full animate-spin"></div>
    </div>
  ) : (
    <div className="w-full py-10 flex flex-col items-center justify-center">
      <h1 className="text-center font-semibold mb-10">Delete Media</h1>
      {selectedImages.length > 0 ? (
        <h1 className="mb-3">Select the images you want to delete</h1>
      ) : (
        <p className="">No media available to delete</p>
      )}

      <div className="flex flex-col gap-5 w-full">
        {selectedImages?.map((item: MediaInterface) => {
          const isSelectedForRemoval = removeImages.some(
            (removedItem) => removedItem._id === item._id
          );
          return (
            <div
              onClick={() => {
                setRemoveImages((prev) => {
                  const isItemInState = prev.some(
                    (removedItem) => removedItem._id === item._id
                  );

                  if (isItemInState) {
                    return prev.filter(
                      (removedItem) => removedItem._id !== item._id
                    );
                  } else {
                    return [...prev, item];
                  }
                });
              }}
              key={item._id}
              className={`rounded cursor-pointer overflow-hidden border-[4px] relative ${isSelectedForRemoval && "border-blue-500 before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-[#ffffff38]"}`}
            >
              <img className="w-full" src={item.url} alt="" />
              {isSelectedForRemoval && (
                <FaRegCheckCircle className="absolute -top-1 -right-[6px] bg-white text-black text-4xl rounded-full py-2" />
              )}
            </div>
          );
        })}
      </div>
      {selectedImages.length > 0 && (
        <button
          onClick={deleteFiles}
          className="w-full text-sm bg-warmBrown border border-warmBrown hover:text-warmbbg-warmBrown hover:bg-transparent transition-all ease-in-out duration-300 rounded py-2 mt-10 font-semibold text-white hover:text-warmBrown"
        >
          Delete
        </button>
      )}

      <div className="flex items-center mt-10 w-full">
        <div className="flex-grow border-t border-gray-300"></div>
        <span className="mx-4 text-gray-600">OR</span>
        <div className="flex-grow border-t border-gray-300"></div>
      </div>
      <form className="mt-10 w-full" onSubmit={handleSubmit(onSubmit)}>
        <h1 className="text-center font-semibold mb-10">Add Media</h1>
        <div>
          <input
            {...register("file", {
              required: "File is required",
              validate: {
                isImage: (value) => {
                  if (value && value.length > 0) {
                    const file = value[0];
                    return (
                      [
                        "image/jpeg",
                        "image/png",
                        "image/heic",
                        "image/heif",
                      ].includes(file.type) ||
                      "Images with jpeg, png, heic, heif are allowed"
                    );
                  }
                  return true;
                },
              },
            })}
            accept=".jpg, .jpeg, .png, .heic, .heif"
            multiple
            ref={fileInputRef}
            onChange={handleFileChange}
            type="file"
            className="border border-gray-300 w-full py-2 rounded-md px-2"
          />
          {errors.file && (
            <span className="text-[12px] px-3 text-red-500">
              {errors.file.message}
            </span>
          )}
        </div>
        <button
          type="submit"
          className="bg-warmBrown text-white text-sm font-semibold hover:bg-transparent border border-warmBrown hover:text-warmBrown w-full py-2 rounded mt-8 transition-all ease-in-out duration-300"
        >
          Upload Images
        </button>
      </form>
    </div>
  );
};

export default UpdateMediaForm;
