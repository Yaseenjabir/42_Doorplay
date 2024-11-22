import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../../components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { DoorSchema } from "../../utils/utils";
import { apiClient } from "../../apiClient/apiClient";
import { ADD_REVIEW } from "../../constants/constant";
import { AxiosError } from "axios";
import { toast } from "sonner";

const formSchema = z.object({
  name: z.string().min(5).max(50),
  email: z.string().email(),
  title: z.string().min(5).max(50),
  description: z.string().min(5).max(500),
});

interface ReviewFormInterface {
  triggerForm: any;
  selectedDoor: DoorSchema | undefined;
}

const ReviewForm: React.FC<ReviewFormInterface> = ({
  triggerForm,
  selectedDoor,
}) => {
  const [selectedRating, setSelectedRating] = useState<number>(1);
  const [hoveredRating, setHoveredRating] = useState<number>(0);
  const [loader, setLoader] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoader(true);
    const modifiedData = {
      ...values,
      door: selectedDoor?._id,
      rating: selectedRating,
    };
    const user = sessionStorage.getItem("user");
    const { token } = user && JSON.parse(user);
    try {
      const res = await apiClient.post(ADD_REVIEW, modifiedData, {
        headers: { Authorization: token },
      });
      if (res.status === 201) {
        toast.success("Your review has been added successfully");
        setTimeout(() => {
          location.reload();
        }, 2000);
      }
    } catch (ex: unknown) {
      console.log(ex);
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
  }

  const renderStars = () => {
    const stars = [];
    const totalStars = 5;

    for (let i = 1; i <= totalStars; i++) {
      const isSelected = i <= selectedRating;
      const isHovered = i <= hoveredRating;

      stars.push(
        <span
          key={i}
          className={`text-4xl mx-1 cursor-pointer transition-colors duration-200 ${
            isSelected || isHovered ? "text-yellow-500" : "text-gray-300"
          }`}
          onClick={() => setSelectedRating(i)}
          onMouseEnter={() => setHoveredRating(i)}
          onMouseLeave={() => setHoveredRating(0)}
        >
          ★
        </span>
      );
    }

    return stars;
  };

  return (
    <Dialog>
      <DialogTrigger ref={triggerForm} className="hidden">
        Open
      </DialogTrigger>
      <DialogContent className="w-[95%] max-h-[95vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Writing Review for {selectedDoor?.title}</DialogTitle>
          <div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8 flex flex-col items-start w-full"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="text-start w-full">
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter username" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="text-start w-full">
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem className="text-start w-full">
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter review title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className="text-start w-full">
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          rows={7}
                          placeholder="Enter review description"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormItem className="text-start w-full">
                  <FormLabel>Rating</FormLabel>
                  <div className="flex items-center space-x-1">
                    <div>{renderStars()}</div>
                  </div>
                </FormItem>
                {loader ? (
                  <div className="flex justify-center items-center w-full">
                    <div className="border-t-4 border-darkRed border-solid w-8 h-8 rounded-full animate-spin"></div>
                  </div>
                ) : (
                  <Button
                    type="submit"
                    className="w-full bg-warmBrown border border-warmBrown hover:bg-transparent hover:text-warmBrown transition-all ease-in-out duration-300"
                  >
                    Submit
                  </Button>
                )}
              </form>
            </Form>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ReviewForm;
