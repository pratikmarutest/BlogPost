import { Button, Input } from "../../components/index";
import { Link, useNavigate } from "react-router-dom";
import { forgotPwdText } from "../../common/commonText";

const ForgotPwd = () => {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate("/login");
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
                />
                <p className="text-xs text-gray-500 mt-1">
                  {forgotPwdText.passwordDescription}
                </p>
              </div>
              <Button type="submit" className="w-full">
                {forgotPwdText.resetBtn}
              </Button>
            </form>
            <div className="text-center text-xs mt-3">
              <Link
                to="/login"
                className="font-medium text-blue-400 text-primary transition-all duration-200 hover:underline"
              >
                {forgotPwdText.backToLogin}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ForgotPwd;
