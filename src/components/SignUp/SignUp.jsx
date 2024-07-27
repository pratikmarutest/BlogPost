import React, { useState } from "react";
import authService from "../../appwrite/auth";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../store/authSlice";
import { Button, Input, Loader, SnackBar } from "../index";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import common, { SignUpFormText } from "../../common/commonText";

function Signup() {
  const navigate = useNavigate();
  const [snackBarMessage, setSnackBarMessage] = useState("");
  const [snackBarDisplay, setSnackBarDisplay] = useState(false);
  const [error, setError] = useState("");
  const url = `${window.location.protocol}//${window.location.host}`;

  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);

  const create = async (data) => {
    setError("");
    setLoading(true);
    try {
      const userData = await authService.createAccount(data).then((res) => {
        setSnackBarMessage("Verification mail sent");
        setSnackBarDisplay(true);
        setTimeout(() => {
          setSnackBarDisplay(false);
          navigate("/");
        }, 2000);
        return res;
      });
      if (userData) {
        const userUpdatedData = await authService.getCurrentUser();
        if (userUpdatedData) {
          await authService.sendMail(url);
          dispatch(login(userData));
        }
      }
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  };

  return (
    <div className="flex items-center text-white justify-center">
      <div className={`mx-auto w-full max-w-lg rounded-xl px-10`}>
        <h2 className="text-center text-2xl font-bold leading-tight my-6">
          {SignUpFormText.heading}
        </h2>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <form onSubmit={handleSubmit(create)}>
          <div className="space-y-5">
            <Input
              label="Full Name: "
              placeholder="Enter your full name"
              {...register("name", {
                required: true,
              })}
            />
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
              placeholder="Enter your password"
              {...register("password", {
                required: true,
                pattern:
                  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[$^@$!%*?&.])[A-Za-z\d@$!%#*?.]{8,}$/,
              })}
            />
            {errors.password ? (
              <p className="text-red-500 mt-8 text-center">
                {SignUpFormText.passwordError}
              </p>
            ) : null}
            <div className="text-xs text-white opacity-40">
              {SignUpFormText.mailVerifyText}
            </div>
            <Button type="submit" className="w-full">
              {loading ? <Loader /> : "Create Account"}
            </Button>
          </div>
        </form>
        <div className="text-center text-md mt-3">
          {SignUpFormText.alreadyAccount}
          <Link
            to="/login"
            className="font-medium text-blue-400 text-primary transition-all duration-200 hover:underline"
          >
            {common.login}
          </Link>
        </div>
        {snackBarDisplay && (
          <SnackBar message={snackBarMessage} display="success" />
        )}
      </div>
    </div>
  );
}

export default Signup;
