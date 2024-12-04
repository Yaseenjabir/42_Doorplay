import { CiUnlock } from "react-icons/ci";
import { LuUser2 } from "react-icons/lu";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { apiClient } from "../../../apiClient/apiClient";
import { LOGIN_ROUTE } from "../../../constants/constant";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { useLocation, useNavigate } from "react-router";
import React, { useState } from "react";

type Inputs = {
  email: string;
  password: string;
};

const Schema = yup.object({
  email: yup.string().email().required("Email is required").min(5).max(255),
  password: yup.string().required("Password is required").min(5).max(255),
});

interface LoginInterface {
  setIsLogin: (item: boolean) => void;
}

const Login: React.FC<LoginInterface> = ({ setIsLogin }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(Schema),
  });

  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const userLocation = queryParams.get("location");

  const onSubmit: SubmitHandler<Inputs> = async (data: Partial<Inputs>) => {
    try {
      setLoader(true);
      const res = await apiClient.post(LOGIN_ROUTE, data);
      if (res.data) {
        if (res.data.user.userRole !== "admin") {
          toast.error("Only admins have the privilege to access dashboard");
          return;
        }
        sessionStorage.setItem("user", JSON.stringify(res.data));
        if (userLocation === "review") {
          navigate(-1);
        } else {
          navigate("/dashboard");
        }
      }
    } catch (ex: unknown) {
      if (ex instanceof AxiosError) {
        if (ex.response && ex.response.data && ex.response.data.error) {
          toast.error(ex.response.data.error);
          return;
        }
        if (ex.response?.data) {
          toast.error(ex.response.data);
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

  return (
    <section className="w-full diagonal-split min-h-screen flex flex-col items-center justify-center text-white px-5">
      <div className="max-w-[400px] w-full flex items-center justify-center flex-col  ">
        <h1
          id="animateAuth"
          className="font-extrabold text-3xl mb-8 text-[#062A34]"
        >
          LOGIN
        </h1>
        <form
          id="animateAuth"
          className="w-full flex flex-col gap-10"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="w-full flex items-center flex-col justify-center relative">
            <LuUser2 className="bg-white text-black absolute left-0 w-[55px] h-[55px] -top-1 rounded-full py-2" />
            <input
              {...register("email")}
              type="email"
              placeholder="Enter email"
              className="rounded-full w-full bg-[#ffffffb7] outline-none py-3 pl-16 pr-5 placeholder:text-[#062A34] text-black focus:bg-[#ffffff6e] transition-all ease-out duration-300"
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

          <div className="w-full text-center">
            {loader ? (
              <div className="flex justify-center items-center bg-white py-2 rounded-full">
                <div className="border-t-4 border-[#053847] border-solid w-8 h-8 rounded-full animate-spin"></div>
              </div>
            ) : (
              <button
                type="submit"
                className="font-extrabold w-full text-xl bg-white text-[#062A34] rounded-full py-2 border border-white hover:bg-transparent hover:border-titleColor transition-all ease-in-out duration-300"
              >
                LOGIN
              </button>
            )}
            <p className="mt-4 text-titleColor">
              Not have an account?{" "}
              <span
                onClick={() => setIsLogin(false)}
                className="underline cursor-pointer"
              >
                Signup
              </span>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;
