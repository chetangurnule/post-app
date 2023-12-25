import { useState } from "react";
import { useForm } from "react-hook-form";
import { Input, Button, Logo } from "./index";
import { Link, useNavigate } from "react-router-dom";
import authService from "../Appwrite_Services/auth_service";
import { useDispatch } from "react-redux";
import { login as authLogin } from "../features/authentications/AuthSlice";

const LoginForm = () => {
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submit = async (data) => {
    setError("");
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        dispatch(authLogin(userData));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 mb-8 p-6 bg-white rounded-md shadow-md">
      <div className="text-center mb-4">
        <Logo width="120px" />
      </div>
      <div className="text-center text-lg font-semibold mb-2">
        Sign in to your account
      </div>
      <p className="text-sm text-gray-600 mb-4">
        Don't have an account?{" "}
        <Link to="/signup" className="text-blue-500 hover:underline">
          Signup
        </Link>
      </p>
      {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
      <form onSubmit={handleSubmit(submit)}>
        <Input
          label="Email"
          type="email"
          placeholder="Enter Your Email"
          className={`${errors.email ? "border-red-500" : ""}`}
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
              message: "Email address must be a valid address",
            },
          })}
        />
        {errors.email && (
          <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
        )}
        <Input
          label="Password"
          type="password"
          placeholder="Enter Your Password"
          className={`${errors.password ? "border-red-500" : ""}`}
          {...register("password", {
            required: "Password is required",
          })}
        />
        {errors.password && (
          <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
        )}
        <Button
          type="submit"
          className="mt-4 bg-blue-500 text-white w-full py-2 rounded"
        >
          Login
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;
