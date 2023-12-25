import { useState } from "react";
import { useForm } from "react-hook-form";
import { Input, Button, Logo } from "./index";
import { Link, useNavigate } from "react-router-dom";
import { AuthService } from "../Appwrite_Services/auth_service";
import { useDispatch } from "react-redux";
import { login } from "../features/authentications/AuthSlice";

const SignupForm = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submit = async (data) => {
    setError("");
    try {
      let session = await AuthService.createAccount(data);
      if (session) {
        const userData = await AuthService.getCurrentUser();
        if (userData) {
          dispatch(login(userData));
          navigate("/");
        }
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
        Create an account
      </div>
      <p className="text-sm text-gray-600 mb-4">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-500 hover:underline">
          Login
        </Link>
      </p>
      {error && (
        <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
      )}
      <form onSubmit={handleSubmit(submit)}>
        <Input
          label="Name"
          type="text"
          placeholder="Enter Your Name"
          {...register("name", { required: "Name is required" })}
          className={`${errors.name ? "border-red-500" : ""}`}
        />
        {errors.name && (
          <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
        )}

        <Input
          label="Email"
          type="email"
          placeholder="Enter Your Email"
          {...register("email", { required: "Email is required" })}
          className={`${errors.email && "border-red-500"}`}
        />
        {errors.email && (
          <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
        )}

        <Input
          label="Password"
          type="password"
          placeholder="Enter Your Password"
          {...register("password", { required: "Password is required" })}
          className={`${errors.password && "border-red-500"}`}
        />
        {errors.password && (
          <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
        )}
        <Button
          type="submit"
          className="mt-4 bg-blue-500 text-white w-full py-2 rounded"
        >
          Signup
        </Button>
      </form>
    </div>
  );
};

export default SignupForm;
