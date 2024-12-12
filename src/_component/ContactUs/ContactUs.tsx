import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import contactImage from "../../../public/contactus.jpg";

import { Button } from "../../components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { apiClient } from "../../apiClient/apiClient";
import {
  CREATE_CONTACT_ROUTE,
  GET_ALL_EMAIL_CONTACTS,
} from "../../constants/constant";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { FaArrowRotateRight } from "react-icons/fa6";
import React, { useRef, useState } from "react";
import { useLocation } from "react-router";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import flag from "../../../public/usLogo.png";

const formSchema = z.object({
  name: z.string().min(6).max(50),
  email: z.string().email(),
  message: z.string().min(10).max(1024),
  number: z.string().length(10, { message: "Phone number must be 11 digits" }),
});

const ContactUs = () => {
  const location = useLocation();
  const pathName = location.state && location.state.pathName;
  const [phone, setPhone] = useState("");
  const dialogRef = useRef<HTMLButtonElement | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: pathName
        ? `Selected Door is : ${pathName}. If you have any query please write down below, we will reach out to you ASAP!`
        : "",
    },
  });

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");

    if (value.length > 10) {
      value = value.slice(0, 10);
    }

    let formattedValue = value;

    if (formattedValue.length === 0) {
      formattedValue = "";
    } else if (formattedValue.length <= 3) {
      formattedValue = `(${formattedValue}`;
    } else if (formattedValue.length <= 6) {
      formattedValue = `(${formattedValue.slice(0, 3)}) ${formattedValue.slice(3)}`;
    } else {
      formattedValue = `(${formattedValue.slice(0, 3)}) ${formattedValue.slice(3, 6)}-${formattedValue.slice(6, 10)}`;
    }

    setPhone(formattedValue);
    setValue("number", value);
  };

  const { reset, setValue } = form;
  const countryCode = "+1";

  const [loading, setLoading] = useState(false);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    const modifiedData = {
      ...values,
      number: `+1 ${phone}`,
      message: values.message.replace(
        "If you have any query please write down below, we will reach out to you ASAP!",
        ""
      ),
    };
    try {
      const res = await apiClient.post(CREATE_CONTACT_ROUTE, modifiedData);
      if (res.status === 200) {
        reset({
          name: "",
          email: "",
          number: "",
          message: "",
        });
        const cache = await caches.open("A&R-Doors");
        await cache.delete(GET_ALL_EMAIL_CONTACTS);
        dialogRef.current?.click();
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
      setLoading(false);
    }
  }

  return (
    <section className="w-full py-10 px-10 max-w-[1100px] mx-auto md:mb-10">
      {/* Contact us description  */}
      <div className="text-titleColor flex flex-col gap-2 md:py-10 md:px-7 lg:gap-3 xl:gap-5">
        <h1 className="text-4xl font-light lg:text-5xl lg:text-titleColor md:font-medium lg:font-light">
          Contact Us
        </h1>
        <p className="md:font-semibold md:text-gray-600 md:max-w-[620px] md:text-lg lg:font-normal lg:text-base">
          Please fill out the form below with your details, including the type
          of door you're interested in. Let us know if you have any specific
          queries or need assistance with a door reference. We’ll get back to
          you as soon as possible!
        </p>
      </div>
      {/* Contact us form  */}
      <div className="w-full flex flex-col mt-10 items-center justify-center bg-[#fafafa70] md:flex-row-reverse md:h-[740px] lg:gap-5">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 w-full flex flex-col items-center justify-center px-5 h-full"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-white w-full"
                      placeholder="Enter full name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-white w-full"
                      placeholder="Enter your email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="number"
              render={({ field }) => (
                <div
                  className="w-full flex gap-1 relative pt-5 pb-2"
                  id="checking"
                >
                  <Select defaultValue="+1">
                    <SelectTrigger className="w-min mt-2 bg-white">
                      <SelectValue placeholder="Country Code" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={countryCode}>
                        <span className="pr-4 flex flex-row items-center gap-1">
                          <img
                            src={flag}
                            className="w-5 h-3 mt-[2px]"
                            alt="us-flag"
                          />
                          {countryCode}
                        </span>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormItem className="w-full">
                    <FormLabel className="absolute top-0 left-0">
                      Phone Number
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="bg-white"
                        placeholder="Enter your phone number"
                        value={phone}
                        onChange={handlePhoneChange}
                        maxLength={14}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </div>
              )}
            />
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message</FormLabel>
                  <FormControl>
                    <Textarea
                      className="bg-white"
                      rows={6}
                      placeholder="Enter your message"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Want to know more about one of our products? Just share the
                    link in the description below!
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            {loading ? (
              <Button
                className="bg-warmBrown w-full border border-warmBrown hover:text-warmBrown hover:bg-transparent hover:border-warmBrown"
                type="button"
              >
                <FaArrowRotateRight className="animate-spin" />
                Submitting
              </Button>
            ) : (
              <Button
                className="bg-warmBrown w-full border border-warmBrown hover:text-warmBrown hover:bg-transparent hover:border-warmBrown"
                type="submit"
              >
                Submit
              </Button>
            )}
          </form>
        </Form>
        <div className="w-full bg-white md:h-full flex flex-col items-center justify-center">
          <img
            src={contactImage}
            alt="contact-us"
            className="w-full h-full md:h-[60%] lg:h-[70%] "
          />
        </div>
      </div>
      <Dialog>
        <DialogTrigger className="hidden" ref={dialogRef}>
          Open
        </DialogTrigger>
        <DialogContent className="w-[95%]">
          <DialogHeader>
            <DialogTitle>Thank you for reaching out!</DialogTitle>
            <DialogDescription>
              We’ve successfully received your email. Our team will review your
              request and get back to you as soon as possible.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default ContactUs;
