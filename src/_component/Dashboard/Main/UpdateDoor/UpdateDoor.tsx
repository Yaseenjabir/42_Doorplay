import { Badge } from "../../../../components/ui/badge";
import { DoorSchema } from "../../../../utils/utils";
import { GET_ALL_DOORS } from "../../../../constants/constant";
import TextField from "@mui/material/TextField";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { FaArrowRotateRight } from "react-icons/fa6";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { useRef, useState, useEffect } from "react";
import { AxiosError } from "axios";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "../../../../components/ui/dialog";
import { apiClient } from "../../../../apiClient/apiClient";
import { ADD_DOOR_ROUTE } from "../../../../constants/constant";
import useStore from "../../../../store/Store";

type Inputs = {
  doorTitle: string;
  shortPreview: string;
  description: string;
  constructionTitle: string;
  constructionDescription: string;
  materialTitle: string;
  materialDescription: string;
  customizationTitle: string;
  customizationDescription: string;
  insulationTitle: string;
  insulationDescription: string;
  reinforcementTitle: string;
  reinforcementDescription: string;
  category: string;
  subcategory: string;
  stock: number;
  file: FileList | null;
};

type Category = "commercial" | "garage";
type SubcategoryOptions = {
  [key in Category]: Array<{ value: string; label: string }>;
};

const categoryOptions = [
  { value: "commercial", label: "Commercial" },
  { value: "garage", label: "Garage" },
];

const subcategoryOptions: SubcategoryOptions = {
  commercial: [
    { value: "overhead sectional", label: "Overhead Sectional" },
    { value: "sectional", label: "Sectional" },
    { value: "grillies", label: "Grillies" },
    { value: "counter", label: "Counter" },
    { value: "commercial sheet", label: "Commercial Sheet" },
    { value: "sheet", label: "Sheet" },
  ],
  garage: [
    { value: "modern", label: "Modern" },
    { value: "carriage house", label: "Carriage House" },
    { value: "traditional", label: "Traditional" },
  ],
};

const UpdateDoor = () => {
  const [data, setData] = useState<DoorSchema[]>([]);
  const [skip, setSkip] = useState<number>(0);
  const limit: number = 5;
  const [dataLoader, setDataLoader] = useState<boolean>(true);
  const [availablity, setAvailability] = useState(false);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const fetchDoors = async () => {
    try {
      setDataLoader(true);
      const res = await apiClient.get(GET_ALL_DOORS, {
        params: { skip, limit, category: "commercial" },
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
      text.length > length ? text.slice(0, 127) + "..." : text;
    return truncatedText;
  };

  // THE BELOW OPERATIONS ARE FOR UPDATE FORM ONLY

  const [selectedItem, setSelectedItem] = useState<null | DoorSchema>(null);

  const {
    watch,
    control,
    register,
    handleSubmit,
    setValue,
    trigger,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  useEffect(() => {
    if (selectedItem) {
      reset({
        doorTitle: selectedItem?.title,
        shortPreview: selectedItem?.shortPreview,
        description: selectedItem?.description,
        constructionTitle: selectedItem?.construction?.title,
        constructionDescription: selectedItem?.construction?.description,
        customizationTitle: selectedItem?.customization?.title,
        customizationDescription: selectedItem?.customization?.description,
        materialTitle: selectedItem?.material?.title,
        materialDescription: selectedItem?.material?.description,
        insulationTitle: selectedItem?.insulation?.title,
        insulationDescription: selectedItem?.insulation?.description,
        reinforcementTitle: selectedItem?.insulation?.title,
        reinforcementDescription: selectedItem?.reinforcement?.description,
        // category: selectedItem?.category,
        subcategory: selectedItem?.subcategory,
        stock: selectedItem.stockCount,
      });
    }
  }, [selectedItem]);

  const selectedCategory = watch("category");
  console.log("selectedCategory : ", selectedCategory);
  const [subCategories, setSubCategories] = useState<
    Array<{ value: string; label: string }>
  >([]);

  const { darkTheme } = useStore();

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [file, setFile] = useState<File[]>([]);

  const [loader, setLoader] = useState<boolean>(false);

  const triggerRef = useRef<HTMLButtonElement>(null);

  const formTriggerRef = useRef<HTMLButtonElement>(null);

  console.log(selectedItem);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoader(true);
    const formData = new FormData();

    formData.append("title", data.doorTitle);
    formData.append("shortPreview", data.shortPreview);
    // using if condition so that empty string is not sent to backend because it will cause "required" error
    if (data.description.length > 0) {
      formData.append("description", data.description);
    }
    if (data.constructionTitle.length > 0) {
      formData.append("construction.title", data.constructionTitle);
    }
    if (data.constructionDescription.length > 0) {
      formData.append("construction.description", data.constructionDescription);
    }
    if (data.materialTitle.length > 0) {
      formData.append("material.title", data.materialTitle);
    }
    if (data.materialDescription.length > 0) {
      formData.append("material.description", data.materialDescription);
    }
    if (data.customizationTitle.length > 0) {
      formData.append("customization.title", data.customizationTitle);
    }
    if (data.customizationDescription.length > 0) {
      formData.append(
        "customization.description",
        data.customizationDescription
      );
    }
    if (data.insulationTitle.length > 0) {
      formData.append("insulation.title", data.insulationTitle);
    }
    if (data.insulationDescription.length > 0) {
      formData.append("insulation.description", data.insulationDescription);
    }
    if (data.reinforcementTitle.length > 0) {
      formData.append("reinforcement.title", data.reinforcementTitle);
    }
    if (data.reinforcementDescription.length > 0) {
      formData.append(
        "reinforcement.description",
        data.reinforcementDescription
      );
    }
    if (data.category.length > 0) {
      formData.append("category", data.category);
    }
    if (data.subcategory.length > 0) {
      formData.append("subcategory", data.subcategory);
    }
    formData.append("stockCount", String(data.stock));
    file.forEach((file) => {
      formData.append("files", file);
    });

    // console.log(formData);

    try {
      const response = await apiClient.post(ADD_DOOR_ROUTE, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log(response);

      if (response.data.success) {
        triggerRef.current?.click();
        reset();
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
      setLoader(false);
    }
  };

  useEffect(() => {
    handleCategoryChange(selectedItem?.category);
  }, [selectedItem]);

  const handleCategoryChange = (category: string | undefined) => {
    console.log("HELLo");
    const selectedValue = category;
    setSubCategories(subcategoryOptions[selectedValue] || []);
  };

  [] > [];
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

  console.log(subCategories);

  return (
    <section className="w-full py-10 px-5 flex items-center justify-center">
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
                <div className="max-w-[400px] border border-gray-400 rounded-md overflow-hidden">
                  <img
                    src={door.media[0].url}
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
                        {door.subcategory}
                      </Badge>
                    </div>
                    <p className="text-sm font-light">
                      {truncateText(door.description, 127)}
                    </p>
                    <button
                      onClick={() => {
                        setSelectedItem(door);
                        formTriggerRef.current?.click();
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
      <Dialog>
        <DialogTrigger ref={formTriggerRef} className="hidden">
          Open
        </DialogTrigger>
        <DialogContent
          className={`overflow-y-scroll h-[600px] ${
            darkTheme && "bg-[#1B1B1B]"
          }`}
        >
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-5"
          >
            {/* / / / / / / / / DOOR START / / / / /  / //   */}
            <div>
              <h3 className="font-semibold mb-3">Door</h3>
              <div className="flex flex-col gap-5">
                <div>
                  <TextField
                    {...register("doorTitle", {
                      required: "Door name is required",
                      minLength: {
                        value: 3,
                        message: "Door Name cannot be less than 3 characters",
                      },
                      maxLength: {
                        value: 50,
                        message:
                          "Door Name cannot be longer than 50 characters",
                      },
                    })}
                    error={errors && !!errors.doorTitle}
                    helperText={
                      errors && errors.doorTitle && errors.doorTitle.message
                    }
                    placeholder="Enter door name"
                    fullWidth
                    id="outlined-basic"
                    label="Door Name"
                    variant="outlined"
                  />
                </div>
                <div>
                  <TextField
                    {...register("shortPreview", {
                      required: "Short Preview is required",
                      minLength: {
                        value: 3,
                        message:
                          "Short Preview cannot be less than 3 characters",
                      },
                      maxLength: {
                        value: 255,
                        message:
                          "Short Preview cannot be longer than 255 characters",
                      },
                    })}
                    error={errors && !!errors.shortPreview}
                    helperText={
                      errors &&
                      errors.shortPreview &&
                      errors.shortPreview.message
                    }
                    placeholder="Enter Short Preview"
                    fullWidth
                    id="outlined-basic"
                    label="Short Preview"
                    variant="outlined"
                  />
                </div>
                <div>
                  <TextField
                    multiline
                    rows={7}
                    {...register("description", {
                      minLength: {
                        value: 3,
                        message: "Description cannot be less than 3 characters",
                      },
                      maxLength: {
                        value: 1024,
                        message:
                          "Description cannot be longer than 1024 characters",
                      },
                    })}
                    error={errors && !!errors.description}
                    helperText={
                      errors && errors.description && errors.description.message
                    }
                    placeholder="Enter Description"
                    fullWidth
                    id="outlined-basic"
                    label="Description"
                    variant="outlined"
                  />
                </div>
              </div>
            </div>
            {/* / / / / / / / / DOOR END / / / / /  / //   */}
            {/* / / / / / / / / CONSTRUCTION START / / / / /  / //   */}
            <div>
              <h3 className="font-semibold mb-3">Construction</h3>
              <div className="flex flex-col gap-5">
                <TextField
                  {...register("constructionTitle", {
                    minLength: {
                      value: 3,
                      message:
                        "Construction Title cannot be less than 3 characters",
                    },
                    maxLength: {
                      value: 50,
                      message:
                        "Construction Title cannot be longer than 50 characters",
                    },
                  })}
                  error={errors && !!errors.constructionTitle}
                  helperText={
                    errors &&
                    errors.constructionTitle &&
                    errors.constructionTitle.message
                  }
                  placeholder="Enter Construction Title"
                  fullWidth
                  id="outlined-basic"
                  label="Construction Title"
                  variant="outlined"
                />
                <TextField
                  multiline
                  rows={4}
                  {...register("constructionDescription", {
                    minLength: {
                      value: 3,
                      message:
                        "Construction Description cannot be less than 3 characters",
                    },
                    maxLength: {
                      value: 255,
                      message:
                        "Construction Description cannot be longer than 255 characters",
                    },
                  })}
                  error={errors && !!errors.constructionDescription}
                  helperText={
                    errors &&
                    errors.constructionDescription &&
                    errors.constructionDescription.message
                  }
                  placeholder="Enter Construction Description"
                  fullWidth
                  id="outlined-basic"
                  label="Construction Description"
                  variant="outlined"
                />
              </div>
            </div>
            {/* / / / / / / / / CONSTRUCTION END / / / / /  / //   */}
            {/* / / / / / / / / MATERIAL START / / / / /  / //   */}
            <div>
              <h3 className="font-semibold mb-3">Material</h3>
              <div className="flex flex-col gap-5">
                <TextField
                  {...register("materialTitle", {
                    minLength: {
                      value: 3,
                      message:
                        "Material Title cannot be less than 3 characters",
                    },
                    maxLength: {
                      value: 50,
                      message:
                        "Material Title cannot be longer than 50 characters",
                    },
                  })}
                  error={errors && !!errors.materialTitle}
                  helperText={
                    errors &&
                    errors.materialTitle &&
                    errors.materialTitle.message
                  }
                  placeholder="Enter Material Title"
                  fullWidth
                  id="outlined-basic"
                  label="Material Title"
                  variant="outlined"
                />
                <TextField
                  {...register("materialDescription", {
                    minLength: {
                      value: 3,
                      message:
                        "Material Description cannot be less than 3 characters",
                    },
                    maxLength: {
                      value: 255,
                      message:
                        "Material Description cannot be longer than 255 characters",
                    },
                  })}
                  error={errors && !!errors.materialDescription}
                  helperText={
                    errors &&
                    errors.materialDescription &&
                    errors.materialDescription.message
                  }
                  multiline
                  rows={4}
                  placeholder="Enter Material Description"
                  fullWidth
                  id="outlined-basic"
                  label="Material Description"
                  variant="outlined"
                />
              </div>
            </div>
            {/* / / / / / / / / MATERIAL END / / / / /  / //   */}
            {/* / / / / / / / / Customization START / / / / /  / //   */}
            <div>
              <h3 className="font-semibold mb-3">Customization</h3>
              <div className="flex flex-col gap-5">
                <TextField
                  {...register("customizationTitle", {
                    minLength: {
                      value: 3,
                      message:
                        "Customization Title cannot be less than 3 characters",
                    },
                    maxLength: {
                      value: 50,
                      message:
                        "Customization Title cannot be longer than 50 characters",
                    },
                  })}
                  error={errors && !!errors.customizationTitle}
                  helperText={
                    errors &&
                    errors.customizationTitle &&
                    errors.customizationTitle.message
                  }
                  placeholder="Enter Customization Title"
                  fullWidth
                  id="outlined-basic"
                  label="Customization Title"
                  variant="outlined"
                />
                <TextField
                  {...register("customizationDescription", {
                    minLength: {
                      value: 3,
                      message:
                        "Customization Description cannot be less than 3 characters",
                    },
                    maxLength: {
                      value: 255,
                      message:
                        "Customization Description cannot be longer than 255 characters",
                    },
                  })}
                  error={errors && !!errors.customizationDescription}
                  helperText={
                    errors &&
                    errors.customizationDescription &&
                    errors.customizationDescription.message
                  }
                  multiline
                  rows={4}
                  placeholder="Enter Customization Description"
                  fullWidth
                  id="outlined-basic"
                  label="Customization Description"
                  variant="outlined"
                />
              </div>
            </div>
            {/* / / / / / / / / Customization END / / / / /  / //   */}
            {/* / / / / / / / / INSULATION START / / / / /  / //   */}
            <div>
              <h3 className="font-semibold mb-3">Insulation</h3>
              <div className="flex flex-col gap-5">
                <TextField
                  {...register("insulationTitle", {
                    minLength: {
                      value: 3,
                      message:
                        "Insulation Title cannot be less than 3 characters",
                    },
                    maxLength: {
                      value: 50,
                      message:
                        "Insulation Title cannot be longer than 50 characters",
                    },
                  })}
                  error={errors && !!errors.insulationTitle}
                  helperText={
                    errors &&
                    errors.insulationTitle &&
                    errors.insulationTitle.message
                  }
                  placeholder="Enter Insulation Title"
                  fullWidth
                  id="outlined-basic"
                  label="Insulation Title"
                  variant="outlined"
                />
                <TextField
                  {...register("insulationDescription", {
                    minLength: {
                      value: 3,
                      message:
                        "Insulation Description cannot be less than 3 characters",
                    },
                    maxLength: {
                      value: 255,
                      message:
                        "Insulation Description cannot be longer than 255 characters",
                    },
                  })}
                  error={errors && !!errors.insulationDescription}
                  helperText={
                    errors &&
                    errors.insulationDescription &&
                    errors.insulationDescription.message
                  }
                  multiline
                  rows={4}
                  placeholder="Enter Insulation Description"
                  fullWidth
                  id="outlined-basic"
                  label="Insulation Description"
                  variant="outlined"
                />
              </div>
            </div>
            {/* / / / / / / / / INSULATION END / / / / /  / //   */}
            {/* / / / / / / / / REINFORCEMENT START / / / / /  / //   */}
            <div>
              <h3 className="font-semibold mb-3">Reinforcement</h3>
              <div className="flex flex-col gap-5">
                <TextField
                  {...register("reinforcementTitle", {
                    minLength: {
                      value: 3,
                      message:
                        "Reinforcement Title cannot be less than 3 characters",
                    },
                    maxLength: {
                      value: 50,
                      message:
                        "Reinforcement Title cannot be longer than 50 characters",
                    },
                  })}
                  error={errors && !!errors.reinforcementTitle}
                  helperText={
                    errors &&
                    errors.reinforcementTitle &&
                    errors.reinforcementTitle.message
                  }
                  placeholder="Enter Reinforcement Title"
                  fullWidth
                  id="outlined-basic"
                  label="Reinforcement Title"
                  variant="outlined"
                />
                <TextField
                  {...register("reinforcementDescription", {
                    minLength: {
                      value: 3,
                      message:
                        "Reinforcement Description cannot be less than 3 characters",
                    },
                    maxLength: {
                      value: 255,
                      message:
                        "Reinforcement Description cannot be longer than 255 characters",
                    },
                  })}
                  error={errors && !!errors.reinforcementDescription}
                  helperText={
                    errors &&
                    errors.reinforcementDescription &&
                    errors.reinforcementDescription.message
                  }
                  multiline
                  rows={4}
                  placeholder="Enter Reinforcement Description"
                  fullWidth
                  id="outlined-basic"
                  label="Reinforcement Description"
                  variant="outlined"
                />
              </div>
            </div>
            {/* / / / / / / / / REINFORCEMENT END / / / / /  / //   */}
            {/* / / / / / / / / CATEGORY START / / / / /  / //   */}
            <div>
              <FormControl fullWidth variant="outlined" margin="normal">
                <InputLabel id="category-label">Category</InputLabel>
                <Controller
                  name="category"
                  control={control}
                  // defaultValue={selectedItem && selectedItem?.category}
                  rules={{ required: "Category is required" }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      labelId="category-label"
                      id="category"
                      label="Category"
                    >
                      {categoryOptions.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
                {errors.category && (
                  <span className="text-red-500 text-[12px] px-4">
                    {errors.category.message}
                  </span>
                )}
              </FormControl>

              {/* <FormControl fullWidth variant="outlined" margin="normal">
                <InputLabel id="subcategory-label">Subcategory</InputLabel>
                <Controller
                  name="subcategory"
                  control={control}
                  defaultValue=""
                  rules={{ required: "Sub Category is required" }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      labelId="subcategory-label"
                      id="subcategory"
                      label="Subcategory"
                    >
                      {subCategories.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
                {errors.subcategory && (
                  <span className="text-red-500 text-[12px] px-4">
                    {errors.subcategory.message}
                  </span>
                )}
              </FormControl> */}
            </div>
            {/* / / / / / / / / CATEGORY END / / / / /  / //   */}
            {/* / / / / / / / / STOCK START / / / / /  / //   */}
            <div>
              <TextField
                defaultValue={1}
                type="number"
                {...register("stock", {
                  min: {
                    value: 0,
                    message: "Stock value cannot be less than 0",
                  },
                })}
                error={errors && !!errors.stock}
                helperText={errors && errors.stock && errors.stock.message}
                placeholder="Enter Stock Value"
                fullWidth
                id="outlined-basic"
                label="Stock Value"
                variant="outlined"
              />
            </div>
            {/* / / / / / / / / STOCK END / / / / /  / //   */}
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
            <div className="mb-4">
              {loader ? (
                <button
                  type="submit"
                  className="w-full px-4 py-2 bg-warmBrown text-white rounded-lg border border-transparent hover:bg-transparent hover:border-warmBrown hover:text-warmBrown transition-all ease-in-out duration-300 flex items-center justify-center gap-2"
                >
                  <FaArrowRotateRight className="animate-spin" />
                  Submitting
                </button>
              ) : (
                <button
                  type="submit"
                  className="w-full px-4 py-2 bg-warmBrown text-white rounded-lg border border-transparent hover:bg-transparent hover:border-warmBrown hover:text-warmBrown transition-all ease-in-out duration-300"
                >
                  Submit
                </button>
              )}
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default UpdateDoor;
