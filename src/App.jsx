import { useEffect, useState } from "react";
import "./App.css";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice.js";
import { Header, Footer, Loader } from "./components";
import { Outlet } from "react-router-dom";
import common from "./common/commonText.jsx";

export default function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, []);

  // Conditional rendering
  return !loading ? (
    // <div className="min-h-screen flex flex-col bg-gradient-to-r from-gray-900 to-purple-500">

    <div className="min-h-screen flex flex-col bg-gradient-to-r from-slate-900 to-slate-700">
      <div className="hidden">{(document.title = common.orgName)}</div>
      <div className="flex-grow">
        <Header />
        <main>
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  ) : (
    <Loader />
  );
}
