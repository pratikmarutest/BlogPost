import { useEffect, useState } from "react";
import "./App.css";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice.js";
import { Header, Footer } from "./components";
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
    <div className="bg-gray-800 min-h-screen flex items-center justify-center">
      <div className="relative w-20 h-20">
        <div className="absolute bg-gradient-to-br from-purple-600 to-blue-500 rounded-full w-16 h-16 animate-spin" />
        {/* <div className="absolute bg-gradient-to-r from-blue-400 to-purple-200 rounded-full w-12 h-12 animate-pulse" /> */}
      </div>
    </div>
  );
}
