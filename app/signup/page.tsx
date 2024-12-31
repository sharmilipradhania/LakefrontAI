"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const SignupPage = () => {
  const router = useRouter();
  const [isFormValid, setIsFormValid] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
    confirmpassword: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmpassword: "",
  });

  useEffect(() => {
    validateForm(); // Validate form whenever user inputs change
  }, [user]);

  const validateForm = () => {
    const newErrors = {
      email: "",
      password: "",
      confirmpassword: "",
    };

    if (!user.email) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(user.email)) {
      newErrors.email = "Invalid email address.";
    }

    if (!user.password) {
      newErrors.password = "Password is required.";
    } else if (user.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }

    if (!user.confirmpassword) {
      newErrors.confirmpassword = "Please confirm your password.";
    } else if (user.confirmpassword !== user.password) {
      newErrors.confirmpassword = "Passwords do not match.";
    }

    setErrors(newErrors);

    // Form is valid if no errors
    setIsFormValid(
      Object.values(newErrors).every((error) => error === "") &&
      Boolean(user.email.trim()) &&
      Boolean(user.password.trim()) &&
      Boolean(user.confirmpassword.trim())
    );
  };

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isFormValid) {
      alert("Please fix the errors before submitting.");
      return;
    }

    try {
      const res = await axios.post(
        "https://lakefrontai.com:4000/register",
        {
          email: user.email.trim(), // Trim to remove unnecessary spaces
          password: user.password.trim(),
        },
        {
          headers: {
            "Content-Type": "application/json", // Explicitly set content type
          },
        }
      );
  

      if (res.data.result === "success") {
        alert("Registration successful!");
        router.push("/login");
      } else {
        alert("Registration failed: " + res.data.msg);
      }
    } catch (error: any) {
      console.error(
        "Error during registration:",
        error.response ? error.response.data : error.message
      );
      alert("An error occurred during registration. Please try again.");
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="Your Company"
            src="/logo.png"
            className="mx-auto h-10 w-auto"
          />
          <h2 className="mt-2 text-center text-2xl font-bold tracking-tight text-gray-900">
            Sign up for your account
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-gray-50 px-6 py-8 shadow sm:rounded-lg sm:px-10">
            <form onSubmit={submitHandler} className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={user.email}
                    onChange={(e) =>
                      setUser({ ...user, email: e.target.value })
                    }
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-900"
                >
                  Password
                </label>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={user.password}
                    onChange={(e) =>
                      setUser({ ...user, password: e.target.value })
                    }
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
                  />
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="confirmpassword"
                  className="block text-sm font-medium text-gray-900"
                >
                  Confirm Password
                </label>
                <div className="mt-2">
                  <input
                    id="confirmpassword"
                    name="confirmpassword"
                    type="password"
                    value={user.confirmpassword}
                    onChange={(e) =>
                      setUser({ ...user, confirmpassword: e.target.value })
                    }
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
                  />
                  {errors.confirmpassword && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.confirmpassword}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={!isFormValid}
                  className={`flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold shadow-sm ${
                    isFormValid
                      ? "bg-indigo-600 text-white hover:bg-indigo-500 focus:outline focus:ring-2 focus:ring-indigo-500"
                      : "bg-gray-400 text-gray-800 cursor-not-allowed"
                  }`}
                >
                  Sign up
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignupPage;