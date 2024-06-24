import React, { useEffect, useState } from "react";
import { Container, Loader, PostForm } from "../components/index";
import { useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";

const EditPost = () => {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => setPost(post));
    } else {
      navigate("/");
    }
  }, [slug, navigate]);
  return post ? (
    <div className="py-8">
      <Container>
        <PostForm post={post} />
      </Container>
    </div>
  ) : (
    <Loader />
  );
};
export default EditPost;
