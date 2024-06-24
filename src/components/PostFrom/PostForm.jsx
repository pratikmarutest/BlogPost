import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Button,
  Input,
  Select,
  RTE,
  Loader,
  Container,
  SnackBar,
  ViewingWarning,
} from "../index";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import common, { postFormText } from "../../common/commonText";
import { expandIcon } from "../../assets";

const PostForm = ({ post }) => {
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.$id || "",
        featuredImage: post?.featuredImage || "",
        content: post?.content || "",
        status: post?.status || "active",
        siteLink: post?.siteLink || "",
        ratings: post?.ratings || 5,
        userId: post?.userId || 0,
        category: post?.category || "Survey",
      },
    });
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([""]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [categoryDrawer, setCategoryDrawer] = useState(false);
  const [addNewCategory, setAddNewCategory] = useState(false);
  const [updateCategory, setUpdateCategory] = useState(false);
  const [deleteCategory, setDeleteCategory] = useState(false);

  const submit = async (data) => {
    setLoading(true);
    if (post) {
      const file = data.image[0]
        ? await appwriteService.uploadFile(data.image[0])
        : null;
      if (file) {
        appwriteService.deleteFile(post.featuredImage);
      }
      const dbPost = await appwriteService.updatePost(post.$id, {
        ...data,
        ratings: parseInt(data.ratings),
        category: data.category,
        featuredImage: file ? file.$id : undefined,
      });
      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      }
    } else {
      const file = await appwriteService.uploadFile(data.image[0]);
      if (file) {
        const fileId = file.$id;
        data.featuredImage = fileId;
        const dbPost = await appwriteService.createPost({
          ...data,
          ratings: parseInt(data.ratings),
          userId: userData.$id,
          category: data.category,
        });
        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
      }
    }
    setLoading(false);
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");
    return "";
  }, []);

  React.useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  React.useEffect(() => {
    appwriteService.getCategories().then((result) => setCategories(result));
  }, [setCategories]);

  return (
    <Container displayBack>
      <ViewingWarning />
      <div className="bg-opacity-30 py-3 px-2 md:mt-3 rounded-lg bg-white text-white">
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
          <div className="w-full md:w-2/3 md:px-2">
            <Input
              label={postFormText.title}
              placeholder={postFormText.titlePlaceholder}
              className="mb-4"
              {...register("title", { required: true })}
            />
            <Input
              label={postFormText.site}
              placeholder={postFormText.sitePlaceholder}
              className="mb-4"
              {...register("siteLink", { required: true })}
            />
            <Input
              label={postFormText.slug}
              placeholder={postFormText.slugPlaceholder}
              disabled={true}
              className="mb-4"
              {...register("slug", { required: true })}
              onInput={(e) => {
                setValue("slug", slugTransform(e.currentTarget.value), {
                  shouldValidate: true,
                });
              }}
            />
            <RTE
              label={postFormText.content}
              name="content"
              control={control}
              defaultValue={getValues("content")}
            />
          </div>
          <div className="w-full md:w-1/3 md:px-2">
            <Input
              label={postFormText.image}
              type="file"
              className="mb-4"
              accept="image/png, image/jpeg, image/jpeg, image/gif"
              {...register("image", { required: !post })}
            />
            {post && (
              <div className="w-full mb-4">
                <img
                  src={appwriteService.getFilePreview(post.featuredImage)}
                  alt={post.tile}
                  className="rounded-lg"
                />
              </div>
            )}
            <Select
              options={[1, 2, 3, 4, 5]}
              label="Ratings"
              className="mb-4"
              {...register("ratings", {
                required: true,
              })}
            />

            <div className="flex justify-between">
              <div className="text-md">{`Category: ${getValues("category")}`}</div>
              <p
                className="text-2xl cursor-pointer text-black-500 hover:text-blue-700"
                onClick={() => setCategoryDrawer(!categoryDrawer)}
              >
                <img src={expandIcon} alt="+" className="inline" />
              </p>
            </div>

            {categoryDrawer && (
              <div className="m-2">
                {updateCategory ? (
                  <div className="flex">
                    <Select
                      options={categories}
                      className="mb-4"
                      {...register("category", {
                        required: true,
                      })}
                    />
                    <Button
                      onClick={() => {
                        setUpdateCategory(false);
                      }}
                    >
                      {common.crossSign}
                    </Button>
                  </div>
                ) : (
                  <Button
                    onClick={() => setUpdateCategory(true)}
                    className="block"
                  >
                    {postFormText.updateCategory}
                  </Button>
                )}

                {addNewCategory ? (
                  <div className="flex flex-row">
                    <Input
                      placeholder={postFormText.addCategoryPlaceholder}
                      className="mb-4"
                      {...register("addedCategory", {
                        required: true,
                      })}
                    />
                    <div className="flex">
                      <Button
                        className="ml-2 py-0"
                        onClick={() => {
                          appwriteService
                            .addCategory(getValues("addedCategory"))
                            .then((res) => {
                              setSnackbarOpen(true);
                              setSnackbarMessage(res);
                              setTimeout(() => {
                                setSnackbarOpen(false);
                              }, 3000);
                              appwriteService
                                .getCategories()
                                .then((updatedCategories) => {
                                  setCategories(updatedCategories);
                                });
                            })
                            .catch((error) => {
                              setSnackbarOpen(true);
                              setSnackbarMessage(error);
                              setTimeout(() => {
                                setSnackbarOpen(false);
                              }, 3000);
                            });
                          setValue("addedCategory", "");
                          setAddNewCategory(false);
                        }}
                      >
                        {common.tickSign}
                      </Button>
                      <Button
                        onClick={() => {
                          setAddNewCategory(false);
                          setValue("addedCategory", "");
                        }}
                      >
                        {common.crossSign}
                      </Button>
                    </div>
                  </div>
                ) : (
                  <Button
                    onClick={() => {
                      setAddNewCategory(!addNewCategory);
                    }}
                    className="block"
                  >
                    {postFormText.addCategory}
                  </Button>
                )}

                {deleteCategory ? (
                  <div className="flex">
                    <Select
                      options={categories}
                      className="mb-4"
                      {...register("deleteCategory", {
                        required: true,
                      })}
                    />
                    <div className="flex">
                      <Button
                        className="ml-2 py-0"
                        onClick={() => {
                          appwriteService
                            .deleteCategory(getValues("deleteCategory"))
                            .then((res) => {
                              setSnackbarOpen(true);
                              setSnackbarMessage(res);
                              setTimeout(() => {
                                setSnackbarOpen(false);
                              }, 3000);
                              appwriteService
                                .getCategories()
                                .then((updatedCategories) => {
                                  setCategories(updatedCategories);
                                });
                            })
                            .catch((error) => {
                              setSnackbarOpen(true);
                              setSnackbarMessage(error);
                              setTimeout(() => {
                                setSnackbarOpen(false);
                              }, 3000);
                            });
                          setDeleteCategory(false);
                        }}
                      >
                        {common.tickSign}
                      </Button>
                      <Button
                        onClick={() => {
                          setDeleteCategory(false);
                        }}
                      >
                        {common.crossSign}
                      </Button>
                    </div>
                  </div>
                ) : (
                  <Button
                    onClick={() => {
                      setDeleteCategory(true);
                    }}
                    className="block"
                  >
                    {postFormText.deleteCategory}
                  </Button>
                )}
              </div>
            )}

            <Select
              options={["active", "inactive"]}
              label="Status"
              className="mb-4"
              {...register("status", {
                required: true,
              })}
            />
            <Button
              type="submit"
              bgColor={post ? "bg-red-500" : "bg-green-500"}
            >
              {loading ? <Loader /> : post ? common.update : common.submit}
            </Button>
          </div>
        </form>
      </div>
      {snackbarOpen && <SnackBar message={snackbarMessage} display="success" />}
    </Container>
  );
};

export default PostForm;
