import { CiUnlock } from "react-icons/ci";
import { LuUser2 } from "react-icons/lu";
import { PiIdentificationCardLight } from "react-icons/pi";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { GiConfirmed } from "react-icons/gi";
import * as yup from "yup";
import { apiClient } from "../../../apiClient/apiClient";
import { SIGNUP_ROUTE } from "../../../constants/constant";
import { AxiosError } from "axios";
import { toast } from "sonner";
import React, { useState } from "react";

type Inputs = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Schema = yup.object({
  name: yup.string().required("Name is required").min(3).max(50),
  email: yup.string().email().required("Email is required").min(5).max(255),
  password: yup.string().required("Password is required").min(5).max(255),
  confirmPassword: yup
    .string()
    .required("Confirm password is required")
    .oneOf([yup.ref("password")], "Password and confirm password are not same"),
});

interface LoginInterface {
  setIsLogin: (item: boolean) => void;
}

const Signup: React.FC<LoginInterface> = ({ setIsLogin }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(Schema),
  });

  const [loader, setLoader] = useState(false);

  const onSubmit: SubmitHandler<Inputs> = async (data: Partial<Inputs>) => {
    setLoader(true);
    delete data.confirmPassword;

    try {
      const res = await apiClient.post(SIGNUP_ROUTE, data);
      if (res.data) {
        toast.success(
          "Your account has been created successfully, please login now"
        );
      }
      setIsLogin(true);
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

  return (
    <section className="w-full diagonal-split min-h-screen flex flex-col items-center justify-center text-white px-5">
      <div className="max-w-[400px] w-full flex items-center justify-center flex-col  border-red-500">
        <h1
          className="font-extrabold text-3xl mb-8 text-[#062A34]"
          id="animateAuth"
        >
          SIGNUP
        </h1>
        <form
          id="animateAuth"
          className="w-full flex flex-col gap-10"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="w-full flex flex-col items-center justify-center relative text-start">
            <PiIdentificationCardLight className="bg-white text-black absolute -top-1 right-0 w-[55px] h-[55px] rounded-full py-2" />
            <input
              {...register("name")}
              type="text"
              placeholder="Enter name"
              className="rounded-full w-full bg-[#ffffffb7] text-black outline-none py-3 pr-16 pl-5 placeholder:text-[#062A34] focus:bg-[#ffffff6e] transition-all ease-out duration-300"
            />
            {errors && errors.name && (
              <span className="text-red-500 text-sm w-full px-5 mt-1">
                {errors.name.message}
              </span>
            )}
          </div>
          <div className="w-full flex items-center flex-col justify-center relative">
            <LuUser2 className="bg-white text-black absolute left-0 w-[55px] h-[55px] -top-1 rounded-full py-2" />
            <input
              {...register("email")}
              type="email"
              placeholder="Enter email"
              className="rounded-full w-full bg-[#ffffffb7] text-black outline-none py-3 pl-16 pr-5 placeholder:text-[#062A34] focus:bg-[#ffffff6e] transition-all ease-out duration-300"
            />
            {errors && errors.email && (
              <span className="text-red-500 text-sm w-full px-5 mt-1">
                {errors.email.message}
              </span>
            )}
          </div>
          <div className="w-full flex items-center flex-col justify-center relative">
            <CiUnlock className="bg-white text-black absolute -top-1 right-0 w-[55px] h-[55px] rounded-full py-2" />
            <input
              {...register("password")}
              type="password"
              placeholder="Enter password"
              className="rounded-full w-full bg-[#ffffffb7] text-black outline-none py-3 pr-16 pl-5 placeholder:text-[#062A34] focus:bg-[#ffffff6e] transition-all ease-out duration-300"
            />
            {errors && errors.password && (
              <span className="text-red-500 text-sm w-full px-5 mt-1">
                {errors.password.message}
              </span>
            )}
          </div>
          <div className="w-full flex items-center flex-col justify-center relative">
            <GiConfirmed className="bg-white text-black absolute -top-1 left-0 w-[55px] h-[55px] rounded-full py-[10px]" />
            <input
              {...register("confirmPassword")}
              type="password"
              placeholder="Enter confirm password"
              className="rounded-full w-full bg-[#ffffffb7] text-black outline-none py-3 pl-16 pr-5 placeholder:text-[#062A34] focus:bg-[#ffffff6e] transition-all ease-out duration-300"
            />
            {errors && errors.confirmPassword && (
              <span className="text-red-500 text-sm w-full px-5 mt-1">
                {errors.confirmPassword.message}
              </span>
            )}
          </div>
          <div className="w-full text-center">
            {loader ? (
              <div className="flex justify-center items-center bg-white py-2 rounded-full">
                <div className="border-t-4 border-[#053847] border-solid w-8 h-8 rounded-full animate-spin"></div>
              </div>
            ) : (
              <button
                type="submit"
                className="font-extrabold w-full text-xl bg-white text-[#062A34] rounded-full py-2 border border-white hover:bg-transparent hover:border-black transition-all ease-in-out duration-300"
              >
                SIGNUP
              </button>
            )}
            <p className="mt-4 text-titleColor">
              Already have an account?{" "}
              <span
                onClick={() => setIsLogin(true)}
                className="underline cursor-pointer"
              >
                LOGIN
              </span>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Signup;
