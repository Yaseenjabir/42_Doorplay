import TextField from "@mui/material/TextField";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { FaArrowRotateRight } from "react-icons/fa6";
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  SelectChangeEvent,
  useTheme,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { AxiosError } from "axios";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../components/ui/dialog";
import { apiClient } from "../../../apiClient/apiClient";
import {
  ADD_DOOR_ROUTE,
  GET_ALL_ADMIN_DOORS,
  GET_ALL_DOORS,
} from "../../../constants/constant";
import { useNavigate } from "react-router";
import { deleteCache } from "../../../utils/utils";

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

const AddDoor = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "A&R | Dashboard";
  }, []);

  useEffect(() => {
    const user = sessionStorage.getItem("user");
    const parsedUser = user && JSON.parse(user);

    if (!parsedUser) {
      navigate("/auth");
    }
  }, []);

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

  const selectedCategory = watch("category");
  const [subCategories, setSubCategories] = useState<
    Array<{ value: string; label: string }>
  >([]);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [file, setFile] = useState<File[]>([]);

  const [loader, setLoader] = useState<boolean>(false);

  const triggerRef = useRef<HTMLButtonElement>(null);

  const theme = useTheme();
  const darkTheme = theme.palette.mode === "dark";

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoader(true);
    const user = sessionStorage.getItem("user");
    const { token } = user && JSON.parse(user);
    if (!token) {
      toast.error("No token provided");
      setLoader(false);
      return;
    }
    const formData = new FormData();

    formData.append("title", data.doorTitle);
    formData.append("shortPreview", data.shortPreview);
    // using if condition so that empty strings are not sent to backend because it will cause "required" error
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

    try {
      const response = await apiClient.post(ADD_DOOR_ROUTE, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token,
        },
      });

      if (response.data.success) {
        triggerRef.current?.click();
        reset();
        deleteCache(GET_ALL_ADMIN_DOORS);
        deleteCache(GET_ALL_DOORS);
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

  const handleCategoryChange = (event: SelectChangeEvent<string>) => {
    const selectedValue = event.target.value as Category;
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

  return (
    <div className="w-full px-5 pb-10 scrollable-div">
      <div className="max-w-2xl mx-auto py-10 flex flex-col gap-5">
        <h2 className="text-2xl font-bold mb-6">Create Door</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
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
                      message: "Door Name cannot be longer than 50 characters",
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
                      message: "Short Preview cannot be less than 3 characters",
                    },
                    maxLength: {
                      value: 255,
                      message:
                        "Short Preview cannot be longer than 255 characters",
                    },
                  })}
                  error={errors && !!errors.shortPreview}
                  helperText={
                    errors && errors.shortPreview && errors.shortPreview.message
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
                    message: "Material Title cannot be less than 3 characters",
                  },
                  maxLength: {
                    value: 50,
                    message:
                      "Material Title cannot be longer than 50 characters",
                  },
                })}
                error={errors && !!errors.materialTitle}
                helperText={
                  errors && errors.materialTitle && errors.materialTitle.message
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
                defaultValue=""
                rules={{ required: "Category is required" }}
                render={({ field }) => (
                  <Select
                    {...field}
                    labelId="category-label"
                    id="category"
                    label="Category"
                    onChange={(e) => {
                      field.onChange(e);
                      handleCategoryChange(e);
                    }}
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
            {selectedCategory && (
              <FormControl fullWidth variant="outlined" margin="normal">
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
              </FormControl>
            )}
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
                type="button"
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
      </div>
      <Dialog>
        <DialogTrigger ref={triggerRef} className="hidden">
          Open
        </DialogTrigger>
        <DialogContent className={`w-[95%] ${darkTheme && "text-titleColor"}`}>
          <DialogHeader>
            <DialogTitle>Door Added Successfully</DialogTitle>
            <DialogDescription>
              Congratulations! Your new door has been successfully added to the
              system. You can now proceed to view or manage your newly added
              door.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddDoor;
