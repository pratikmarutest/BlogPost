import React, { useState, useEffect } from "react";
import { Container, Loader, Input, Button } from "../../components/index";
import { common, faqsText } from "../../common/commonText";
import appwriteService from "../../appwrite/config";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

const FAQsEditor = ({
  faq,
  onAddFAQ,
  setSnackBarMessage,
  setSnackBarDisplay,
}) => {
  const userData = useSelector((data) => data.auth.userData);
  const [faqsEdit, setFaqsEdit] = useState(false);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      title: faq?.title || "",
      description: faq?.description || "",
    },
  });

  const faqSubmit = async (data) => {
    setLoading(true);
    const id = uuidv4();
    appwriteService
      .addFAQ(id, data)
      .then((res) => {
        setSnackBarMessage(res);
        setSnackBarDisplay(true);
      })
      .then(() => {
        onAddFAQ();
        setLoading(false);
        setValue("title", "");
        setValue("description", "");
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (userData) {
      appwriteService
        .checkAddAccess(userData.$id)
        .then((res) => setFaqsEdit(res));
    }
  }, []);

  return (
    <Container>
      <div className=" my-5 md:w-1/2">
        {faqsEdit && (
          <form className="text-black" onSubmit={handleSubmit(faqSubmit)}>
            <Input
              className="mb-3"
              label={faqsText.title}
              placeholder={faqsText.titlePlaceholder}
              {...register("title", { required: true })}
            />
            <Input
              label={faqsText.description}
              placeholder={faqsText.descriptionPlaceholder}
              {...register("description", { required: true })}
            />
            <Button
              type="submit"
              className="m-1 my-3"
              bgColor="bg-green-500 hover:bg-green-600"
            >
              {loading ? <Loader /> : faq ? common.update : common.submit}
            </Button>
          </form>
        )}
      </div>
    </Container>
  );
};

export default FAQsEditor;
