import React, { useState } from "react";
import { reviewText } from "../../common/commonText";
import { reviewArray } from "../../common/staticArray";

const Review = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? reviewArray.length - 1 : prevIndex - 1,
    );
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % reviewArray.length);
  };

  return (
    <div className="min-h-80 text-center">
      <span className="font-semibold text-gray-400 uppercase">
        {reviewText.reviewHeading}
      </span>

      <div className="relative my-4">
        <figure className="max-w-screen-md mx-auto text-center bg-white bg-opacity-10 p-3 md:p-4 rounded-xl mt-3">
          <blockquote>
            <p className="text-lg italic font-medium text-white">
              {reviewArray[currentIndex].userReview}
            </p>
          </blockquote>
          <figcaption className="flex items-center justify-center mt-6 space-x-3 rtl:space-x-reverse">
            <div className="flex items-center divide-x-2 rtl:divide-x-reverse divide-gray-400">
              <cite className="pe-3 font-medium text-blue-300">
                {reviewArray[currentIndex].userName}
              </cite>
              <cite className="ps-3 text-sm text-gray-400">
                {reviewText.userStatus}
              </cite>
            </div>
          </figcaption>
        </figure>

        <button
          onClick={handlePrevClick}
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-400 bg-opacity-40 rounded-full p-1 md:p-3 focus:outline-none"
        >
          <svg
            className="w-6 h-6 text-gray-800"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            ></path>
          </svg>
        </button>
        <button
          onClick={handleNextClick}
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-400 bg-opacity-40 rounded-full p-1 md:p-3 focus:outline-none"
        >
          <svg
            className="w-6 h-6 text-gray-800"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            ></path>
          </svg>
        </button>
      </div>

      <div className="flex justify-center space-x-2 mt-4">
        {reviewArray.map((_, index) => (
          <span
            key={index}
            className={`h-2 w-2 rounded-full ${currentIndex === index ? "bg-blue-600" : "bg-gray-400"}`}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default Review;
