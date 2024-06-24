import React, { useEffect, useState } from "react";
import { Button, Input, Container, Messages, SnackBar } from "../index";
import { useForm } from "react-hook-form";
import appwriteService from "../../appwrite/config";
import { v4 as uuidv4 } from "uuid";
import { contactText } from "../../common/commonText";

const Contact = () => {
  const [queries, setQueries] = useState([]);
  const [snackBarView, SetSnackBarView] = useState(false);
  const [snackBarMessage, SetSnackBarMessage] = useState(false);

  const messageSubmit = (data) => {
    const id = uuidv4();
    const emailBody = `Message from ${data.name}: ${data.message}`;
    const mailToLink = `mailto:${data.email}?subject=Query%20Resolution&body=${encodeURIComponent(emailBody)}`;
    appwriteService
      .addQuery(id, data, mailToLink)
      .then((res) => {
        SetSnackBarMessage(res);
        SetSnackBarView(true);
      })
      .then(() => appwriteService.getQueries())
      .then((res) => setQueries(res));
    setValue("name", "");
    setValue("email", "");
    setValue("message", "");
  };

  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const fetchQueries = () => {
    appwriteService
      .checkAddAccess()
      .then(() => appwriteService.getQueries())
      .then((res) => res.reverse())
      .then((res) => {
        setQueries(res);
      });
    console.log("Queries count ", queries.length);
  };

  useEffect(() => {
    appwriteService.checkAddAccess().then(() => {
      fetchQueries();
    });
  }, []);

  return (
    <div>
      {snackBarView && <SnackBar display="success" message={snackBarMessage} />}

      <section className="px-5">
        <div className="py-2 lg:py-4 px-4 mx-auto max-w-screen-md">
          <h2 className="mb-2 text-4xl tracking-tight font-bold text-center text-gray-900 dark:text-white">
            {contactText.heading}
          </h2>
          <p className="mb-4 lg:mb-8 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">
            {contactText.description}
          </p>
          <form onSubmit={handleSubmit(messageSubmit)} className="space-y-8">
            <Input
              label={contactText.nameLabel}
              placeholder={contactText.namePlaceHolder}
              {...register("name", { required: true })}
            />
            <Input
              label={contactText.emailLabel}
              placeholder={contactText.emailPlaceHolder}
              {...register("email", { required: true })}
            />
            <div className="sm:col-span-2">
              <label
                for="message"
                className="block mb-2 text-sm font-medium text-gray-900 text-white"
              >
                Your message
              </label>
              <textarea
                name={contactText.messageLabel}
                placeholder={contactText.messagePlaceHolder}
                {...register("message", { required: true })}
                rows="4"
                maxLength="500"
                className="w-full p-2 rounded-lg text-white border border-gray-600 bg-gray-800 text-sm"
              />
              <div className="text-xs text-gray-500">
                {contactText.maxCharCount}
              </div>
            </div>
            <Button type="submit">{contactText.submitBtnTxt}</Button>
          </form>
        </div>
      </section>

      <Container>
        <Messages queries={queries} fetchQueries={fetchQueries} />
      </Container>
    </div>
  );
};

export default Contact;
