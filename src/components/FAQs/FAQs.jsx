import React, { useEffect, useState } from "react";
import {
  FAQsEditor,
  Container,
  Button,
  Input,
  SnackBar,
  DeleteAlert,
} from "../index";
import appwriteService from "../../appwrite/config";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import common, { faqsText } from "../../common/commonText";

const FAQs = () => {
  const [faqs, setFaqs] = useState();
  const [faqsEdit, setFaqsEdit] = useState(false);
  const [editFaqId, setEditFaqId] = useState(false);
  const [editEnable, setEditEnable] = useState(false);
  const userData = useSelector((data) => data.auth.userData);
  const [snackBarDisplay, setSnackBarDisplay] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState("Event Successfully");
  const { register, handleSubmit } = useForm();
  const [deleteAlert, setDeleteAlert] = useState(false);
  const [deletePostId, setDeletePostId] = useState("");
  const [openFaqId, setOpenFaqId] = useState(null);

  const handleAddFAQ = () => {
    appwriteService.getFAQs().then((res) => {
      setFaqs(res);
    });
  };

  const deletePost = async () => {
    appwriteService
      .deleteFAQ(deletePostId)
      .then((res) => {
        setSnackBarMessage(res);
        setDeleteAlert(false);
        setSnackBarDisplay(true);
        setTimeout(() => {
          setSnackBarDisplay(false);
          setSnackBarMessage("");
        }, 3000);
      })
      .then(() => {
        appwriteService.getFAQs().then((res) => setFaqs(res));
      });
  };

  useEffect(() => {
    appwriteService
      .getFAQs()
      .then((res) => {
        if (Array.isArray(res)) {
          setFaqs(res);
          setOpenFaqId(res[0].$id);
        } else {
          console.error("Expected an array of FAQs, but got:", res);
        }
      })
      .catch((error) => {
        console.error("Error getting FAQs:", error);
      });
  }, []);

  useEffect(() => {
    async function checkAdmin() {
      appwriteService
        .checkAddAccess(userData.$id)
        .then((res) => setFaqsEdit(res));
    }
    checkAdmin();
  }, []);

  const faqSubmit = (data) => {
    appwriteService
      .updateFAQ(editFaqId, data)
      .then((res) => {
        appwriteService.getFAQs().then((res) => setFaqs(res));
        return res;
      })
      .then((res) => {
        setEditFaqId(false);
        setEditEnable(false);
        setSnackBarDisplay(true);
        setSnackBarMessage(res);
        setTimeout(() => {
          setSnackBarDisplay(false);
        }, 3000);
      });
  };

  const handleFaqClick = (faqId) => {
    if (openFaqId === faqId) {
      setOpenFaqId(null);
    } else {
      setOpenFaqId(faqId);
    }
  };

  return (
    <Container>
      <FAQsEditor
        onAddFAQ={handleAddFAQ}
        setSnackBarMessage={setSnackBarMessage}
        setSnackBarDisplay={setSnackBarDisplay}
      />

      <div className="md:flex md:justify-center">
        <div className="bg-blue-400 bg-opacity-60 text-white text-center mx-4 mb-5 rounded-lg py-2 font-semibold md:text-lg md:w-1/2">
          {faqsText.faqs}
        </div>
      </div>

      {faqs &&
        faqs.map((faq) => {
          return (
            <div key={faq.$id}>
              {faq.$id === editFaqId && editEnable ? (
                <form onSubmit={handleSubmit(faqSubmit)}>
                  <Input
                    {...register("title", {
                      required: true,
                    })}
                  />
                  <Input
                    {...register("description", {
                      required: true,
                    })}
                  />
                  <Button type="submit">{common.tickSign}</Button>
                  <Button
                    onClick={() => {
                      setEditEnable(false);
                    }}
                  >
                    {common.crossSign}
                  </Button>
                </form>
              ) : (
                // Accordian view to non-Admin (Expandable)
                <div className="m-3">
                  <h2 id={`accordion-collapse-heading-${faq.$id}`}>
                    <div
                      type="button"
                      className={`flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border ${openFaqId === faq.$id ? "border-b-0 rounded-t-lg" : "rounded-lg"} border-gray-200 bg-white bg-opacity-20 backdrop-blur-sm bg-gray-600 border-white text-white hover:bg-opacity-40 transition-colors duration-300 cursor-pointer}`}
                      data-accordion-target={`#accordion-collapse-body-${faq.$id}`}
                      aria-expanded="false"
                      aria-controls={`accordion-collapse-body-${faq.$id}`}
                      onClick={() => {
                        handleFaqClick(faq.$id);
                        const accordionBody = document.getElementById(
                          `accordion-collapse-body-${faq.$id}`,
                        );
                        accordionBody.classList.toggle("hidden");
                        this.setAttribute(
                          "aria-expanded",
                          accordionBody.classList.contains("hidden")
                            ? "false"
                            : "true",
                        );
                      }}
                    >
                      <span>{`Q. ${faq.title}`}</span>
                      <svg
                        data-accordion-icon
                        className={`w-3 h-3 ${openFaqId === faq.$id ? "" : "rotate-180"} shrink-0`}
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 10 6"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 5 5 1 1 5"
                        />
                      </svg>
                    </div>
                  </h2>
                  <div
                    id={`accordion-collapse-body-${faq.$id}`}
                    className={openFaqId === faq.$id ? "" : "hidden"}
                    aria-labelledby={`accordion-collapse-heading-${faq.$id}`}
                  >
                    <div className="p-5 border border-t-0 rounded-b-lg border-white flex">
                      <p className="mb-2 ml-2 text-blue-300">&gt;</p>
                      <p className="mb-2 ml-2 text-white">
                        {faq.description}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {faqsEdit && (
                <Button
                  className="ml-4"
                  onClick={() => {
                    setEditEnable(!editEnable);
                    setEditFaqId(faq.$id);
                  }}
                  hidden={editEnable && editFaqId === faq.$id}
                >
                  {common.edit}
                </Button>
              )}

              {faqsEdit && (
                <Button
                  onClick={() => {
                    setDeletePostId(faq.$id);
                    setDeleteAlert(true);
                  }}
                >
                  {common.delete}
                </Button>
              )}
            </div>
          );
        })}
      {snackBarDisplay && (
        <SnackBar display="success" message={snackBarMessage} />
      )}

      {deleteAlert && (
        <DeleteAlert
          setDeleteAlert={setDeleteAlert}
          postId={deletePostId}
          deletePost={deletePost}
        />
      )}
    </Container>
  );
};

export default FAQs;
