import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import DOMPurify from "dompurify";
import { AuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";

const SigninForm = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data) => {
    const sanitizedData = {
      email: DOMPurify.sanitize(data.email),
      password: DOMPurify.sanitize(data.password),
    };
    await login(sanitizedData.email, sanitizedData.password);
    navigate("/profile");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <div className="mb-4">
          <input
            type="email"
            placeholder="Email"
            {...register("email")}
            className={`w-full p-3 border rounded-lg focus:outline-none focus:border-blue-500 ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.email && (
            <p className="text-red-500 mt-2">{errors.email.message}</p>
          )}
        </div>
        <div className="mb-4">
          <input
            type="password"
            placeholder="Password"
            {...register("password")}
            className={`w-full p-3 border rounded-lg focus:outline-none focus:border-blue-500 ${
              errors.password ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.password && (
            <p className="text-red-500 mt-2">{errors.password.message}</p>
          )}
        </div>
        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600 disabled:bg-gray-400"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default SigninForm;
