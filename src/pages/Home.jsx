import React, { useState, useEffect } from "react";
import appwriteService from "../appwrite/config";
import { Container, PostCard, ShimmerLoader } from "../components/index";
import { useSelector } from "react-redux";
import { HeroSection } from "../components/index";

function Home() {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState(["All"]);
  const [categorySelected, setCategorySelected] = useState("Survey");
  const authStatus = useSelector((state) => state.auth.status);
  const shimmerArr = [1, 2, 3, 4, 5, 6, 7, 8];

  useEffect(() => {
    appwriteService.getPosts().then((posts) => {
      if (posts) {
        const sortedPost = posts.documents.sort(
          (a, b) => b.ratings - a.ratings,
        );
        setPosts(sortedPost);
      }
    });
  }, []);

  useEffect(() => {
    appwriteService.getCategories().then((result) => {
      if (result) {
        setCategories(["All", ...result]);
      }
    });
  }, []);

  if (posts.length === 0) {
    if (authStatus) {
      return (
        <div className="w-full py-8">
          <Container>
            <div className="flex overflow-x-auto mb-2">
              {shimmerArr.map((ele) => {
                return (
                  <div key={ele}>
                    <ShimmerLoader type="category" />
                  </div>
                );
              })}
            </div>
            <div className="md:flex flex-wrap">
              {shimmerArr.map((ele) => {
                return (
                  <div key={ele} className="p-2 mt-2 sm:w-full md:w-1/4">
                    <ShimmerLoader type="post" />
                  </div>
                );
              })}
            </div>
          </Container>
        </div>
      );
    }
    return (
      <div className="">
        <Container>
          <HeroSection />
        </Container>
      </div>
    );
  }
  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex overflow-x-auto mb-2">
          {categories.map((category) => {
            return (
              <div
                key={category}
                className={`cursor-pointer text-white font-medium md:font-large mx-1 px-2 md:px-3 py-1 md:py-2 px-2  border border-1.5 border-white rounded-lg md:rounded-xl ${categorySelected === category && "bg-blue-600 bg-opacity-70 text-blue-600 border-1.5 border-blue-600"} whitespace-nowrap select-none`}
                onClick={() => {
                  setCategorySelected(category);
                }}
              >
                {category}
              </div>
            );
          })}
        </div>

        <div className="md:flex flex-wrap">
          {categorySelected === "All"
            ? posts.map((post) => (
                <div key={post.$id} className="p-2 mt-2 sm:w-full md:w-1/4">
                  <PostCard {...post} />
                </div>
              ))
            : posts
                .filter((post) => post.category === categorySelected)
                .map((post) => (
                  <div key={post.$id} className="p-2 mt-2 sm:w-full md:w-1/4">
                    <PostCard {...post} />
                  </div>
                ))}
        </div>
      </Container>
    </div>
  );
}

export default Home;
