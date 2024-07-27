import { useState } from "react";
import { resetPwdText } from "../../common/commonText";
import { Input, Button, SnackBar, Loader } from "../index";
import { Link, useSearchParams } from "react-router-dom";
import authService from "../../appwrite/auth";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const ResetPwd = () => {
  const [params] = useSearchParams();
  const id = params.get("userId");
  const secret = params.get("secret");
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [snackbarDisplay, setSnackbarDisplay] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const reset = async (data) => {
    setError("");
    setLoading(true);
    if (data.newPassword !== data.repeatPassword) {
      setError(resetPwdText.passwordMismatch);
      return;
    }
    const res = await authService.resetPassword(
      id,
      secret,
      data.newPassword,
      data.repeatPassword,
    );
    setLoading(false);
    setSnackbarMessage(res);
    setSnackbarDisplay(true);

    setTimeout(() => {
      setSnackbarMessage(res);
      setSnackbarDisplay(true);
      navigate("/login");
    }, 3000);
  };
  return (
    <div>
      <section class="mt-8">
        <div class="flex flex-col items-center px-6 py-8 mx-auto py-8">
          <div class="w-full p-6 rounded-lg md:mt-0 sm:max-w-md sm:p-8">
            <h2 class="mb-6 text-2xl text-center font-bold leading-tight tracking-tight  md:text-2xl text-white">
              {resetPwdText.resetPassword}
            </h2>
            <form
              class="mt-4 space-y-4 lg:mt-5 md:space-y-5"
              onSubmit={handleSubmit(reset)}
            >
              <div>
                <Input
                  label={resetPwdText.enterNewPassword}
                  placeholder="Enter Password"
                  type="password"
                  {...register("newPassword", {
                    required: true,
                    pattern:
                      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[$^@$!%*?&.])[A-Za-z\d@$!%#*?.]{8,}$/,
                  })}
                  className="mb-2"
                />
                <Input
                  label={resetPwdText.repeatPassword}
                  placeholder="Enter Password"
                  type="password"
                  {...register("repeatPassword", {
                    required: true,
                    pattern:
                      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[$^@$!%*?&.])[A-Za-z\d@$!%#*?.]{8,}$/,
                  })}
                />
                {errors.newPassword ? (
                  <p className="text-red-500 mt-8 text-center">
                    {resetPwdText.passwordError}
                  </p>
                ) : null}

                {error && (
                  <p className="text-red-500 mt-8 text-center">{error}</p>
                )}
              </div>
              <Button type="submit" className="w-full">
                {loading ? <Loader /> : resetPwdText.resetPasswordBtn}
              </Button>
            </form>
            <div className="text-center text-xs mt-3">
              <Link
                to="/login"
                className="font-bold text-blue-400 text-md text-primary transition-all duration-200 hover:underline"
              >
                {resetPwdText.backToLogin}
              </Link>
            </div>
            {snackbarDisplay && (
              <SnackBar message={snackbarMessage} display="success" />
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ResetPwd;
