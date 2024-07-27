import { verifyAccountText } from "../../common/commonText";
import { Button, SnackBar } from "../../components/index";
import { Link, useSearchParams } from "react-router-dom";
import authService from "../../appwrite/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const VerifyAccount = () => {
  const navigate = useNavigate();
  const [displaySnackbar, setDisplaySnackbar] = useState(false);
  const [message, setMessage] = useState("");
  const [params] = useSearchParams();
  const id = params.get("userId");
  const secret = params.get("secret");

  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      let res = await authService.verifyAccount(id, secret);
      setMessage(res);
      setDisplaySnackbar(true);
      setTimeout(() => {
        setDisplaySnackbar(false);
        navigate("/");
      }, 2000);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <section class="mt-8">
        <div class="flex flex-col items-center px-6 py-8 mx-auto py-8">
          <div class="w-full p-6 rounded-lg md:mt-0 sm:max-w-md sm:p-8">
            <h2 class="mb-6 text-2xl text-center font-bold leading-tight tracking-tight  md:text-2xl text-white">
              {verifyAccountText.verifyTitle}
            </h2>
            {message ? (
              <div className="bg-white rounded-lg py-3 bg-opacity-25 ">
                <h1 className="text-xl font-bold text-green-400 text-center">
                  {verifyAccountText.verified}
                </h1>
              </div>
            ) : (
              <form
                class="mt-4 space-y-4 lg:mt-5 md:space-y-5"
                onSubmit={handleVerify}
              >
                <div></div>
                <Button type="submit" className="w-full">
                  {verifyAccountText.verifyBtn}
                </Button>
              </form>
            )}
            {message && (
              <div className="text-center text-xs mt-3">
                <Link
                  to="/login"
                  className="font-medium text-blue-400 text-primary transition-all duration-200 hover:underline"
                >
                  {verifyAccountText.backToLogin}
                </Link>
              </div>
            )}
            {displaySnackbar && (
              <SnackBar message={message} display="success" />
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default VerifyAccount;
