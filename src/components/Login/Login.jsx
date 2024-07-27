import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../../store/authSlice";
import { Button, Input, Loader } from "../index";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { useForm } from "react-hook-form";
import common, { loginText } from "../../common/commonText";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const login = async (data) => {
    setError("");
    setLoading(true);
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(authLogin(userData));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  };

  return (
    <div className="flex items-center text-white justify-center">
      <div className={`mx-auto w-full max-w-lg rounded-xl p-10`}>
        <h2 className="text-center text-2xl font-bold leading-tight my-6">
          {loginText.signIn}
        </h2>

        {error && <p className="text-red-500 m-2 text-center">{error}</p>}
        <form onSubmit={handleSubmit(login)}>
          <div className="space-y-5">
            <Input
              label="Email: "
              placeholder="Enter your email"
              type="email"
              {...register("email", {
                required: true,
                validate: {
                  matchPatern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address",
                },
              })}
            />
            <Input
              label="Password: "
              type="password"
              className="text-white"
              placeholder="Enter your password"
              {...register("password", {
                required: true,
              })}
            />
            <Button type="submit" className="w-full">
              {loading ? <Loader /> : common.signIn}
            </Button>
          </div>
        </form>
        <div className="text-center text-base mt-3">
          {loginText.signUp}
          <Link
            to="/signup"
            className="font-medium text-blue-400 text-primary transition-all duration-200 hover:underline"
          >
            {common.signup}
          </Link>
        </div>
        <div className="text-center text-base mt-3">
          <Link
            to="/forgot-password"
            className="font-medium text-blue-400 text-md text-primary transition-all duration-200 hover:underline"
          >
            {loginText.forgotPwd}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
