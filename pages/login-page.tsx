import axios from "axios";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { IUser } from "../types/type";

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IUser>();

  const navigate = useNavigate();

  const handleLogin = async (data: IUser) => {
    try {
      const promise = axios.get(
        `https://688978734c55d5c739527348.mockapi.io/api/loastandfound/users?email=${data.email}`
      );

      toast.promise(promise, {
        loading: "Checking...",
        success: "User login successfully!",
        error: "User not found!",
      });

      const response = await promise;
      const user = response.data[0];

      if (!user) {
        toast.error("Email is not found");
        return;
      }

      if (user.password !== data.password) {
        toast.error("Password is wrong");
        return;
      }

      localStorage.setItem("userId", user.id);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="w-full max-w-[400px] mx-auto flex flex-col gap-2 justify-center">
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
        onClick={handleSubmit(handleLogin)}
        disabled={isSubmitting}
        className={` ${
          isSubmitting ? "bg-gray-500" : "bg-indigo-600 hover:bg-indigo-500"
        }
        } rounded-md  px-3 py-2 text-sm font-semibold text-white shadow-xs  focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer `}
      >
        {isSubmitting ? "Loading..." : "Login"}
      </button>
      <p className="text-center">
        If you don't have an account?
        <Link
          to={"/register"}
          className="text-indigo-600 font-bold cursor-pointer"
        >
          Register
        </Link>
      </p>
    </section>
  );
};

export default LoginPage;
