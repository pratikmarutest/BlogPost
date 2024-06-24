import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader/Loader";
import appwriteService from "../../appwrite/config";

const Protected = ({
  children,
  authentication = true,
  admin = false,
  path,
}) => {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);
  const authStatus = useSelector((state) => state.auth.status);
  const userData = useSelector((state) => state.auth.userData);

  // Protection of Login route
  useEffect(() => {
    if (authentication && authStatus !== authentication) {
      navigate("/login");
    } else if (!authentication && authStatus !== authentication) {
      navigate("/");
    }
    setLoader(false);
  }, [authStatus, navigate, authentication]);

  // Protection of Admin route
  useEffect(() => {
    async function checkAdmin() {
      try {
        if (userData) {
          const id = await userData.$id;
          const res = await appwriteService.checkAddAccess(id);
          if (admin && res) {
            navigate(path);
          } else {
            navigate("/");
          }
        }
      } catch (error) {
        console.error(error);
      }
    }
    checkAdmin();
  }, [authStatus, navigate, authentication]);

  return loader ? <Loader /> : <div>{children}</div>;
};

export default Protected;
