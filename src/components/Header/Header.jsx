import React, { useEffect, useState } from "react";
import { Logo, LogoutBtn } from "../index.js";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import common from "../../common/commonText.jsx";
import appwriteService from "../../appwrite/config.js";

const Header = () => {
  const authStatus = useSelector((state) => state.auth.status);
  const userData = useSelector((state) => state.auth.userData);
  const [admin, setAdmin] = useState(false);
  const [displayNavLinks, setDisplayNavLinks] = useState(false);
  const [messageCount, setMessageCount] = useState(0);

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: admin,
    },
    {
      name: "Add Posts",
      slug: "/add-post",
      active: admin,
    },
    {
      name: "FAQs",
      slug: "/faqs",
      active: true,
    },
    {
      name: `Contact${messageCount > 0 ? ` (${messageCount})` : ""}`,
      slug: "/contact",
      active: true,
    },
  ];

  // useEffect(async () => {
  //   let userId;
  //   if (userData) {
  //     userId = await userData.$id;
  //   }
  //   await appwriteService
  //     .checkAddAccess(userId)
  //     .then((value) => setAdmin(value));
  // }, [userData]);

  useEffect(() => {
    const checkAdmin = async () => {
      const userId = await userData.$id;
      appwriteService
        .checkAddAccess(userId)
        .then((res) => res)
        .then((value) => setAdmin(value));
    };
    checkAdmin();
  }, [userData]);

  const fetchQueries = () => {
    appwriteService
      .checkAddAccess()
      .then(() => appwriteService.getQueries())
      .then((res) => {
        const total = res.filter((query) => {
          if (query.resolved === "Resolved") {
            return query.resolved === true;
          }
          return query.resolved === false;
        }).length;
        setMessageCount(total);
      });
  };

  useEffect(() => {
    appwriteService.checkAddAccess().then(() => {
      fetchQueries();
    });
  }, []);

  return (
    <div>
      <nav className="bg-gray-900 stcky w-full z-20 top-0 start-0 border-b border-gray-200 text-white border-gray-600">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link
            to="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <Logo />
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
              {common.orgName}
            </span>
          </Link>

          {true && (
            <div
              className={`flex justify-between ${authStatus ? "md:order-2" : "md:order-1"} space-x-3 md:space-x-0 rtl:space-x-reverse`}
            >
              {authStatus && <LogoutBtn additionalClass="hidden md:block" />}
              <button
                onClick={() => setDisplayNavLinks(!displayNavLinks)}
                data-collapse-toggle="navbar-sticky"
                type="button"
                className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 text-gray-400 hover:bg-gray-700 focus:ring-gray-600"
                aria-controls="navbar-sticky"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className="w-5 h-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 17 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 1h15M1 7h15M1 13h15"
                  />
                </svg>
              </button>
            </div>
          )}

          <div
            className={`items-center justify-between ${displayNavLinks ? "block" : "hidden"} w-full md:flex md:w-auto md:order-1`}
            id="navbar-sticky"
          >
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 bg-gray-800 bg-gray-900 border-gray-700">
              {navItems.map((item) => {
                return item.active ? (
                  <li key={item.name} onClick={() => setDisplayNavLinks(false)}>
                    <NavLink
                      className={({ isActive }) => {
                        return `block py-2 px-3 ${
                          isActive ? "text-blue-500" : "text-white"
                        } rounded md:bg-transparent md:p-0"
                            aria-current="page`;
                      }}
                      to={item.slug}
                    >
                      {item.name}
                    </NavLink>
                  </li>
                ) : null;
              })}
            </ul>
            {authStatus && <LogoutBtn additionalClass=" md:hidden mt-2 mx-1" />}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
