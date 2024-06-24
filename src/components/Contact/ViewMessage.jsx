import React from "react";
import { Button } from "../index";
import { replyIcon } from "../../assets/index";
import { Link } from "react-router-dom";
import common, { viewMessagesTxt } from "../../common/commonText";
import appwriteService from "../../appwrite/config";

const ViewMessage = ({
  setViewMessage,
  viewMessage,
  messageContent,
  fetchQueries,
}) => {
  const handleClose = () => {
    setViewMessage(false);
  };

  const updateStatus = (id, status) => {
    appwriteService
      .updateQueryStatus(id, status)
      .then(() => {
        setTimeout(() => {
          setSnackBarOpen(false);
        }, 1000);
      })
      .then(handleClose)
      .then(() => fetchQueries());
  };

  return (
    <div
      id="default-modal"
      tabindex="-1"
      aria-hidden="true"
      className={`${viewMessage ? "" : "hidden"} overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full bg-opacity-50 bg-black flex`}
    >
      <div className="relative p-4 w-full max-w-2xl max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              {viewMessagesTxt.heading}
            </h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={handleClose}
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
            </button>
          </div>

          <div className="p-4 md:p-5 space-y-4">
            <div className="text-lg font-semibold text-white">
              <span className="text-blue-300">
                {viewMessagesTxt.queryNameLabel}
              </span>{" "}
              {messageContent.name}
            </div>
            <p className="text-lg font-semibold text-white">
              <span className="text-blue-300">
                {viewMessagesTxt.queryEmailLabel}
              </span>{" "}
              {messageContent.email}
            </p>
            <p className="text-base leading-relaxed text-gray-500 dark:text-white">
              <span className="text-blue-300">
                {viewMessagesTxt.queryMessageLabel}
              </span>{" "}
              {messageContent.message}
            </p>
          </div>
          <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
            <Button
              onClick={handleClose}
              bgColor="bg-red-400"
              className="bg-red-400"
            >
              {common.crossSign}
            </Button>
            {messageContent.resolved ? (
              <Button onClick={() => updateStatus(messageContent.$id, false)}>
                {viewMessagesTxt.unresolve}
              </Button>
            ) : (
              <Button onClick={() => updateStatus(messageContent.$id, true)}>
                {viewMessagesTxt.resolve}
              </Button>
            )}
            {!messageContent.resolved && (
              <Button>
                <Link to={messageContent.mailToLink}>
                  <img src={replyIcon} />
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewMessage;
