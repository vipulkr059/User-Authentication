import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import DOMPurify from "dompurify";
import { AuthContext } from "../context/authContext";
import { Link, useNavigate } from "react-router-dom";

const SignupForm = () => {
  const { signup } = useContext(AuthContext);
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
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
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data) => {
    const sanitizedData = {
      firstName: DOMPurify.sanitize(data.firstName),
      lastName: DOMPurify.sanitize(data.lastName),
      email: DOMPurify.sanitize(data.email),
      password: DOMPurify.sanitize(data.password),
    };
    await signup(
      sanitizedData.firstName,
      sanitizedData.lastName,
      sanitizedData.email,
      sanitizedData.password
    );
    reset();
    navigate("/");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-200">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded-3xl shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
        <div className="mb-4">
          <input
            type="text"
            placeholder="First Name"
            {...register("firstName")}
            className={`w-full p-3 border rounded-lg focus:outline-none focus:border-blue-500 ${
              errors.firstName ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.firstName && (
            <p className="text-red-500 mt-2">{errors.firstName.message}</p>
          )}
        </div>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Last Name"
            {...register("lastName")}
            className={`w-full p-3 border rounded-lg focus:outline-none focus:border-blue-500 ${
              errors.lastName ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.lastName && (
            <p className="text-red-500 mt-2">{errors.lastName.message}</p>
          )}
        </div>
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
        <div className="mb-3">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full p-3 bg-blue-500 text-white rounded-3xl hover:bg-blue-600 focus:outline-none focus:bg-blue-600 disabled:bg-gray-400"
          >
            Sign Up
          </button>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Sign in
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignupForm;
