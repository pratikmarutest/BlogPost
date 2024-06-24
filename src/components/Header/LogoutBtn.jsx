import { useState } from "react";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { useSelector } from "react-redux";
import { logout } from "../../store/authSlice";
import commonText from "../../common/commonText";
import { useNavigate } from "react-router-dom";
import { Button, Loader } from "../index.js";

const LogoutBtn = ({ additionalClass }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const userData = useSelector((state) => state.auth.userData);

  const logoutHandler = () => {
    setLoading(true);
    authService.logout().then(() => {
      dispatch(logout());
      navigate("/login");
    });
    setLoading(false);
  };
  return (
    <div>
      <Button
        type="button"
        className={` ${additionalClass} `}
        onClick={logoutHandler}
        title={userData ? userData.name : ""}
      >
        {loading ? <Loader /> : commonText.logout}
      </Button>
    </div>
  );
};

export default LogoutBtn;
