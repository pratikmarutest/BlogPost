import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import {
  Button,
  Container,
  Loader,
  DeleteAlert,
  BackButton,
} from "../components/index";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import common, { postText } from "../common/commonText";

export default function Post() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const isAuthor = post && userData ? post.userId === userData.$id : false;
  const [loading, setLoading] = useState(false);
  const [deleteAlert, setDeleteAlert] = useState(false);

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) setPost(post);
        else navigate("/");
      });
    } else {
      navigate("/");
    }
    window.scrollTo(0, 0);
  }, [slug, navigate]);

  const deletePost = () => {
    setLoading(true);
    appwriteService.deletePost(post.$id).then((status) => {
      if (status) {
        appwriteService.deleteFile(post.featuredImage);
        navigate("/");
      }
    });
    setLoading(false);
  };

  return post ? (
    <div className="w-full py-4">
      <Container>
        <BackButton />
        <div className="flex flex-wrap -mx-4">
          <div className="w-full h-full md:w-1/2 xl:w-1/3 p-4">
            <img
              src={appwriteService.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="rounded-xl w-full"
            />
            <h1 className="text-2xl text-white m-2 font-bold">{post.title}</h1>
            <button
              className={`bg-white bg-opacity-10 text-blue-400 rounded-md px-2 py-1 inline text-xs md:text-sm`}
            >
              # {post.category}
            </button>
            <h1>
              {[...Array(post.ratings)].map((_, index) => {
                return (
                  <span className="text-3xl text-yellow-400" key={index}>
                    &#9733;
                  </span>
                );
              })}
              {[...Array(5 - post.ratings)].map((_, index) => {
                return (
                  <span className="text-3xl text-gray-400" key={index}>
                    &#9733;
                  </span>
                );
              })}
            </h1>
          </div>
          <div className="w-full md:w-1/2 xl:w-2/3 p-4">
            <div className="overflow-y-auto h-96 p-4 bg-white bg-opacity-20 text-white rounded-lg shadow-md ">
              <div className="browser-css">{parse(post.content)}</div>
            </div>
          </div>
        </div>
        <div className="sticky bottom-0 left-0 w-full bg-[#0f172a] rounded-t-lg p-4 shadow-md">
          <div className="flex justify-end">
            {isAuthor && (
              <div className="ml-4">
                <Link to={`/edit-post/${post.$id}`}>
                  <Button bgColor="bg-green-500">{common.edit}</Button>
                </Link>
                <Button
                  bgColor="bg-red-500"
                  onClick={() => setDeleteAlert(true)}
                >
                  {loading ? <Loader /> : common.delete}
                </Button>
              </div>
            )}
            <Link to={parse(post.siteLink)}>
              <Button>{postText.siteLink}</Button>
            </Link>
          </div>
        </div>
        {deleteAlert && (
          <DeleteAlert
            setDeleteAlert={setDeleteAlert}
            deletePost={deletePost}
          />
        )}
      </Container>
    </div>
  ) : (
    <Loader />
  );
}
