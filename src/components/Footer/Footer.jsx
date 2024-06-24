import React from "react";
import { Logo } from "../index";
import common, { footerText } from "../../common/commonText";
import { Link } from "react-router-dom";
import { footerTextArray, socialMediaLinks } from "../../common/staticArray";

const Footer = () => {
  const getCurrentYear = () => {
    const currentYear = new Date().getFullYear();
    return currentYear;
  };
  return (
    <>
      <footer className="bg-white shadow dark:bg-gray-900">
        <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
          <div className="sm:flex sm:items-center sm:justify-between">
            <Link
              to="/"
              className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
            >
              <Logo />
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                {common.orgName}
              </span>
            </Link>
            <div className="flex flex-col">
              <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
                {footerTextArray.map((footer) => {
                  return (
                    <li key={footer}>
                      <Link
                        to={footer.toLowerCase().replace(" ", "-")}
                        className="hover:underline me-4 md:me-6"
                      >
                        {footer}
                      </Link>
                    </li>
                  );
                })}
              </ul>
              <ul className="flex flex-wrap items-center text-sm font-medium md:mt-4 space-x-3 md:justify-end text-gray-500 dark:text-gray-400 md:mr-6">
                {socialMediaLinks.map((mediaLink) => {
                  return (
                    <li key={mediaLink.link}>
                      <Link
                        to={mediaLink.link}
                        className="hover:underline me-4 md:me-6"
                      >
                        <img src={mediaLink.icon} className="w-6 h-6" />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
          <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © {getCurrentYear()}{" "}
            <Link to="/" className="hover:underline">
              {common.orgName}™
            </Link>
            . {footerText.reservedRights}.
          </span>
        </div>
      </footer>
    </>
  );
};

export default Footer;
