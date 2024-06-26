import React, { useState, useEffect } from "react";
import appwriteService from "../appwrite/config";
import {
  Container,
  Loader,
  PostCard,
  ShimmerLoader,
} from "../components/index";

function AllPosts() {
  const [posts, setPosts] = useState([]);
  const tempArr = [1, 2, 3, 4, 5, 6, 7, 8]; // For Shimmer UI.

  useEffect(() => {
    appwriteService.getPosts([]).then((posts) => {
      if (posts) {
        const sortedPosts = posts.documents.sort(
          (a, b) => b.ratings - a.ratings,
        );
        setPosts(sortedPosts);
      }
    });
  }, []);

  if (posts.length === 0) {
    return (
      <div className="w-full py-8">
        <Container>
          <div className="md:flex flex-wrap">
            {tempArr.map((ele) => {
              return (
                <div key={ele} className="p-2 mt-2 sm:w-full md:w-1/4">
                  <ShimmerLoader />
                </div>
              );
            })}
          </div>
        </Container>
      </div>
    );
  }
  return (
    <div className="w-full py-8">
      <Container>
        <div className="md:flex flex-wrap">
          {posts.map((post) => (
            <div key={post.$id} className="p-2 mt-2 sm:w-full md:w-1/4">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default AllPosts;
