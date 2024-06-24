import { useState } from "react";
import { Button, ViewingWarning } from "../index";
import { Link } from "react-router-dom";
import { deleteIcon, replyIcon, viewIcon } from "../../assets/index";
import { ViewMessage, DeleteAlert } from "../index";
import appwriteService from "../../appwrite/config";
import { useSelector } from "react-redux";
import {
  messageRow as rows,
  messageFilters as filters,
} from "../../common/staticArray";
import { messagesText } from "../../common/commonText";

const Messages = ({ queries, fetchQueries }) => {
  const [viewMessage, setViewMessage] = useState(false);
  const [messageContent, setMessageContent] = useState("");
  const [filterSelected, setFilterSelected] = useState("Pending");
  const [deleteAlert, setDeleteAlert] = useState(false);
  const [deletePostId, setDeletePostId] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const userData = useSelector((state) => state.auth.userData);

  const deletePost = (postId) => {
    appwriteService
      .deleteQuery(postId)
      .then(() => {
        fetchQueries();
      })
      .then(() => setDeleteAlert(false));
  };

  useState(() => {
    appwriteService
      .checkAddAccess(userData?.$id)
      .then((res) => setIsAdmin(res));
  }, []);

  if (isAdmin) {
    return (
      <div className="mt-5">
        <hr />
        <div className="mb-4 text-2xl tracking-tight mt-4 font-bold text-center text-gray-900 dark:text-white">
          {messagesText.heading}
        </div>

        <ViewingWarning />
        <div className="mt-2 p-3 flex">
          <div className="text-white flex items-center">
            {messagesText.filterHeading}
          </div>

          <div className="flex m-2 ">
            {filters.map((filter) => {
              return (
                <button
                  key={filter}
                  className={`cursor-pointer text-white font-medium md:font-large mx-1 px-2 md:px-3 py-1 md:py-2 px-2  border border-1.5 border-white rounded-lg md:rounded-xl ${filterSelected === filter && "bg-blue-600 bg-opacity-70 text-blue-600 border-1.5 border-blue-600"} whitespace-nowrap select-none`}
                  onClick={() => {
                    setFilterSelected(filter);
                  }}
                >
                  {filter}
                </button>
              );
            })}
          </div>
        </div>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                {rows.map((row) => {
                  return (
                    <th key={row} scope="col" className="p-4">
                      {row}
                    </th>
                  );
                })}
              </tr>
            </thead>

            <tbody>
              {filterSelected === "All" &&
                queries &&
                queries.map((query) => (
                  <tr
                    key={query.$id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <td className="w-4 p-4">
                      <div className="flex items-center">
                        <input
                          id={`checkbox-table-search-${query.$id}`}
                          type="checkbox"
                          checked={query.resolved}
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                          onChange={() => {
                            setViewMessage(true);
                            setMessageContent(query);
                          }}
                        />
                        <label
                          htmlFor={`checkbox-table-search-${query.$id}`}
                          className="sr-only"
                        >
                          checkbox
                        </label>
                      </div>
                    </td>
                    <td className="px-6 py-4">{query.name}</td>
                    <td className="px-6 py-4">{query.email}</td>
                    <td className="px-6 py-4">
                      {query.message.slice(0, 50)}{" "}
                      {query.message.length >= 50 ? "..." : ""}
                    </td>
                    <td className="flex items-center px-6 py-4">
                      <Button
                        onClick={() => {
                          setViewMessage(true);
                          setMessageContent(query);
                        }}
                        width="w-4"
                      >
                        <img src={viewIcon} />
                      </Button>

                      {!query.resolved && (
                        <Link to={query.mailToLink}>
                          <Button width="w-4">
                            <img src={replyIcon} />
                          </Button>
                        </Link>
                      )}

                      <Button
                        onClick={() => {
                          setDeletePostId(query.$id);
                          setDeleteAlert(true);
                        }}
                        width="w-4"
                      >
                        <img src={deleteIcon} />
                      </Button>
                    </td>
                  </tr>
                ))}
              {filterSelected !== "All" &&
                queries &&
                queries
                  .filter((query) => {
                    if (filterSelected === "Resolved") {
                      return query.resolved === true;
                    }
                    return query.resolved === false;
                  })
                  .map((query) => (
                    <tr
                      key={query.$id}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                      <td className="w-4 p-4">
                        <div className="flex items-center">
                          <input
                            id={`checkbox-table-search-${query.$id}`}
                            type="checkbox"
                            checked={query.resolved}
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            onChange={() => {
                              setViewMessage(true);
                              setMessageContent(query);
                            }}
                          />
                          <label
                            htmlFor={`checkbox-table-search-${query.$id}`}
                            className="sr-only"
                          >
                            checkbox
                          </label>
                        </div>
                      </td>
                      <td className="px-6 py-4">{query.name}</td>
                      <td className="px-6 py-4">{query.email}</td>
                      <td className="px-6 py-4">
                        {query.message.slice(0, 50)}{" "}
                        {query.message.length >= 50 ? "..." : ""}
                      </td>
                      <td className="flex items-center px-6 py-4">
                        <Button
                          onClick={() => {
                            setViewMessage(true);
                            setMessageContent(query);
                          }}
                          width="w-4"
                        >
                          <img src={viewIcon} />
                        </Button>
                        {!query.resolved && (
                          <Link to={query.mailToLink}>
                            <Button width="w-4">
                              <img src={replyIcon} />
                            </Button>
                          </Link>
                        )}
                        <Button
                          onClick={() => {
                            setDeletePostId(query.$id);
                            setDeleteAlert(true);
                          }}
                          width="w-4"
                        >
                          <img src={deleteIcon} />
                        </Button>
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>

        {viewMessage && (
          <ViewMessage
            setViewMessage={setViewMessage}
            viewMessage={viewMessage}
            messageContent={messageContent}
            fetchQueries={fetchQueries}
          />
        )}
        {deleteAlert && (
          <DeleteAlert
            setDeleteAlert={setDeleteAlert}
            postId={deletePostId}
            deletePost={deletePost}
          />
        )}
      </div>
    );
  }
  return <div></div>;
};

export default Messages;
