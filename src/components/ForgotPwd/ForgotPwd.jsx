import { Button, Input, SnackBar, Loader } from "../../components/index";
import { Link, useNavigate } from "react-router-dom";
import { forgotPwdText } from "../../common/commonText";
import { useRef, useState } from "react";
import authService from "../../appwrite/auth";

const ForgotPwd = () => {
  const navigate = useNavigate();
  const [snackbarDiplay, setSnackbarDiplay] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState("");
  const emailInputRef = useRef(null);
  const url = `${window.location.protocol}//${window.location.hostname}/reset-password`;
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const res = await authService.forgotPassword(
      emailInputRef.current.value,
      url,
    );
    setLoading(false);
    setSnackBarMessage(res);
    setSnackbarDiplay(true);

    setTimeout(() => {
      setSnackbarDiplay(false);
      setSnackBarMessage("");
      navigate("/login");
    }, 2000);
  };

  return (
    <div>
      <section class="mt-8">
        <div class="flex flex-col items-center px-6 py-8 mx-auto py-8">
          <div class="w-full p-6 rounded-lg md:mt-0 sm:max-w-md sm:p-8">
            <h2 class="mb-6 text-2xl text-center font-bold leading-tight tracking-tight  md:text-2xl text-white">
              {forgotPwdText.passwordTitle}
            </h2>
            <form
              class="mt-4 space-y-4 lg:mt-5 md:space-y-5"
              onSubmit={handleSubmit}
            >
              <div>
                <Input
                  label="Email: "
                  placeholder="Enter your email"
                  type="email"
                  required
                  ref={emailInputRef}
                />
                <p className="text-xs text-gray-500 mt-1">
                  {forgotPwdText.passwordDescription}
                </p>
              </div>
              <Button type="submit" className="w-full">
                {loading ? <Loader /> : forgotPwdText.resetBtn}
              </Button>
            </form>
            <div className="text-center text-xs mt-3">
              <Link
                to="/login"
                className="font-bold text-blue-400 text-md text-primary transition-all duration-200 hover:underline"
              >
                {forgotPwdText.backToLogin}
              </Link>
            </div>
            {snackbarDiplay && (
              <SnackBar message={snackBarMessage} display="success" />
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ForgotPwd;
