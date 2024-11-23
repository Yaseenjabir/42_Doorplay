import { AxiosError } from "axios";
import { apiClient } from "../../../apiClient/apiClient";
import { UPDATE_DOOR_ROUTE } from "../../../constants/constant";
import React, { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { DoorSchema } from "../../../utils/utils";
import { toast } from "sonner";
import { TextField } from "@mui/material";
import { FaArrowRotateRight } from "react-icons/fa6";

type Inputs = {
  title: string;
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
  // file: FileList | null;
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

interface CompInterface {
  formTriggerRef: any;
  selectedItem: null | DoorSchema;
  setSelectedItem(value: null): void;
}

const UpdateDoorForm: React.FC<CompInterface> = ({
  selectedItem,
  setSelectedItem,
  formTriggerRef,
}) => {
  const {
    control,
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const selectedCategory = watch("category"); // Track category changes

  useEffect(() => {
    if (selectedItem) {
      reset({
        title: selectedItem?.title,
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
        category: selectedItem?.category,
        subcategory: selectedItem?.subcategory,
        stock: selectedItem.stockCount,
      });
    }
  }, [selectedItem]);

  const [loader, setLoader] = useState<boolean>(false);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const user = sessionStorage.getItem("user");
    const { token } = user && JSON.parse(user);
    if (!token) {
      toast.error("No token provided");
      return;
    }
    setLoader(true);
    interface FormattedData {
      title?: string;
      shortPreview?: string;
      description?: string;
      category?: string;
      subcategory?: string;
      stockCount?: number;
      construction: Record<string, any>;
      material: Record<string, any>;
      customization: Record<string, any>;
      insulation: Record<string, any>;
      reinforcement: Record<string, any>;
    }
    const formattedData: FormattedData = {
      title: data.title,
      shortPreview: data.shortPreview,
      category: data.category,
      subcategory: data.subcategory,
      stockCount: data.stock,
      construction: {},
      material: {},
      customization: {},
      insulation: {},
      reinforcement: {},
    };

    if (data.description) {
      formattedData.description = data.description;
    }

    // Construction block
    if (data.constructionTitle) {
      formattedData.construction.title = data.constructionTitle;
    }

    if (data.constructionDescription) {
      formattedData.construction.description = data.constructionDescription;
    }

    // Material block
    if (data.materialTitle) {
      formattedData.material.title = data.materialTitle;
    }

    if (data.materialDescription) {
      formattedData.material.description = data.materialDescription;
    }

    // Customization block
    if (data.customizationTitle) {
      formattedData.customization.title = data.customizationTitle;
    }

    if (data.customizationDescription) {
      formattedData.customization.description = data.customizationDescription;
    }

    // Insulation block
    if (data.insulationTitle) {
      formattedData.insulation.title = data.insulationTitle;
    }

    if (data.insulationDescription) {
      formattedData.insulation.description = data.insulationDescription;
    }

    // Reinforcement block
    if (data.reinforcementTitle) {
      formattedData.reinforcement.title = data.reinforcementTitle;
    }

    if (data.reinforcementDescription) {
      formattedData.reinforcement.description = data.reinforcementDescription;
    }

    try {
      const url =
        selectedItem?._id &&
        UPDATE_DOOR_ROUTE.replace(":id", selectedItem?._id);
      const response = await apiClient.patch(url ? url : "", formattedData, {
        headers: {
          Authorization: token,
        },
      });

      if (response.status === 200) {
        formTriggerRef.current?.click();
        setSelectedItem(null);
        setTimeout(() => {
          location.reload();
        }, 3000);
        toast.message("Door info has been updated succesfully");
      }
    } catch (ex: unknown) {
      if (ex instanceof AxiosError) {
        if (ex.response?.data.message) {
          toast.error(ex.response?.data.message);
          return;
        }
        if (ex.response && ex.response.data) {
          toast.error(ex.response.data);
          return;
        } else {
          toast.error("An unexpected error occurred.");
          return;
        }
      } else {
        toast.error("An unexpected error occurred.");
      }
    } finally {
      setLoader(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      {/* / / / / / / / / DOOR START / / / / /  / //   */}
      <div>
        <h3 className="font-semibold mb-3">Door</h3>
        <div className="flex flex-col gap-5">
          <div>
            <Controller
              name="title"
              control={control}
              rules={{
                required: "Door name is required",
                minLength: {
                  value: 3,
                  message: "Door Name cannot be less than 3 characters",
                },
                maxLength: {
                  value: 50,
                  message: "Door Name cannot be longer than 50 characters",
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  error={!!errors.title}
                  helperText={errors?.title?.message}
                  placeholder="Enter door name"
                  fullWidth
                  id="outlined-basic"
                  label="Door Name"
                  variant="outlined"
                />
              )}
            />
          </div>
          <div>
            <Controller
              name="shortPreview"
              control={control}
              rules={{
                required: "Short Preview is required",
                minLength: {
                  value: 3,
                  message: "Short Preview cannot be less than 3 characters",
                },
                maxLength: {
                  value: 255,
                  message: "Short Preview cannot be longer than 255 characters",
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  {...register("shortPreview")}
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
              )}
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
                  message: "Description cannot be longer than 1024 characters",
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
                message: "Construction Title cannot be less than 3 characters",
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
                message: "Material Title cannot be longer than 50 characters",
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
                message: "Customization Title cannot be less than 3 characters",
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
                message: "Insulation Title cannot be less than 3 characters",
              },
              maxLength: {
                value: 50,
                message: "Insulation Title cannot be longer than 50 characters",
              },
            })}
            error={errors && !!errors.insulationTitle}
            helperText={
              errors && errors.insulationTitle && errors.insulationTitle.message
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
                message: "Reinforcement Title cannot be less than 3 characters",
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
      <div className="flex flex-col gap-5">
        <Controller
          name="category"
          rules={{ required: "Category is required" }}
          control={control}
          render={({ field }) => (
            <select
              id="simple-select"
              {...field}
              className="w-full px-4 py-2 border  rounded-md shadow-sm focus:outline-none transition-all duration-500 bg-transparent "
            >
              {categoryOptions.map((category) => {
                return (
                  <option className="text-black" value={category.value}>
                    {category.label}
                  </option>
                );
              })}
            </select>
          )}
        />
        {/* Display an error message if the field is invalid */}
        {errors.category && (
          <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>
        )}

        {selectedCategory === "garage" ? (
          <Controller
            name="subcategory"
            rules={{ required: "Sub category is required" }}
            control={control}
            render={({ field }) => (
              <select
                id="simple-select"
                {...field} // Spread the field props to the select element
                className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none transition-all duration-500 bg-transparent "
              >
                {subcategoryOptions.garage.map((item) => (
                  <option
                    className="text-black"
                    key={item.value}
                    value={item.value}
                  >
                    {item.label}
                  </option>
                ))}
              </select>
            )}
          />
        ) : (
          <Controller
            name="subcategory"
            rules={{ required: "Sub category is required" }}
            control={control}
            render={({ field }) => (
              <select
                id="simple-select"
                {...field} // Spread the field props to the select element
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none transition-all duration-500 bg-transparent text-black"
              >
                {subcategoryOptions.commercial.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
            )}
          />
        )}

        {/* Display an error message if the field is invalid */}
        {errors.category && (
          <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>
        )}
        {/* Display an error message if the field is invalid */}
        {errors.category && (
          <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>
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
      {/* <div>
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
    </div> */}
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
  );
};

export default UpdateDoorForm;
