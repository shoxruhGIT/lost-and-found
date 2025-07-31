"use client";

import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { IUser } from "../types/type";

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IUser>();

  const navigate = useNavigate();

  const handleCreateUser = async (data: IUser) => {
    try {
      const promise = axios.post(
        "https://688978734c55d5c739527348.mockapi.io/api/loastandfound/users",
        data
      );

      toast.promise(promise, {
        loading: "Yuborilmoqda...",
        success: "Foydalanuvchi muvaffaqiyatli qo‘shildi!",
        error: "Xatolik yuz berdi. Qayta urinib ko‘ring.",
      });

      const response = await promise;
      localStorage.setItem("userId", response.data.id);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="w-full max-w-[400px] mx-auto flex flex-col gap-2 justify-center">
      <div className="sm:col-span-3">
        <label
          htmlFor="username"
          className="block text-sm/6 font-medium text-gray-900"
        >
          Username
        </label>
        <div className="">
          <input
            id="username"
            type="text"
            {...register("username", {
              required: "Username is required",
              minLength: {
                value: 3,
                message: "Username should be more than three characters",
              },
            })}
            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
          />
          {errors.username && (
            <p className="text-red-500 text-sm">{errors.username.message}</p>
          )}
        </div>
      </div>

      <div className="sm:col-span-3">
        <label
          htmlFor="email"
          className="block text-sm/6 font-medium text-gray-900"
        >
          Email
        </label>
        <div className="">
          <input
            id="email"
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Email is wrong",
              },
            })}
            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>
      </div>

      <div className="sm:col-span-3">
        <label
          htmlFor="password"
          className="block text-sm/6 font-medium text-gray-900"
        >
          Password
        </label>
        <div className="">
          <input
            id="password"
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password should more than six characters",
              },
            })}
            autoComplete="password"
            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>
      </div>
      <button
        onClick={handleSubmit(handleCreateUser)}
        disabled={isSubmitting}
        className={` ${
          isSubmitting ? "bg-gray-500" : "bg-indigo-600 hover:bg-indigo-500"
        }
        } rounded-md  px-3 py-2 text-sm font-semibold text-white shadow-xs  focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer `}
      >
        {isSubmitting ? "Loading..." : "Register"}
      </button>
      <p className="text-center">
        Already have an account?{" "}
        <Link
          to={"/login"}
          className="text-indigo-600 font-bold cursor-pointer"
        >
          Login
        </Link>
      </p>
    </section>
  );
};

export default RegisterPage;
