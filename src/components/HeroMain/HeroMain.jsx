import { Link } from "react-router-dom";
import common, { heroMainText } from "../../common/commonText";

const HeroMain = () => {
  return (
    <div className="text-center">
      <h1 class="mb-4 text-3xl font-bold tracking-tight leading-none md:text-5xl lg:text-6xl text-white mt-12 text-center">
        {heroMainText.mainHeading}
      </h1>
      <p class="mb-8 text-sm font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 text-gray-400 text-center">
        {heroMainText.description}
      </p>
      <div class="flex flex-col mb-8 lg:mb-12 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
        <Link
          to="/signup"
          class="inline-flex justify-center items-center py-2 md:py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-primary-900"
        >
          {common.signup}
          <svg
            class="ml-2 -mr-1 w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </Link>
        <Link
          to="/login"
          class="inline-flex justify-center items-center py-2 md:py-3 px-5 text-base font-medium text-center rounded-lg border hover:bg-gray-100 focus:ring-4 text-white border-gray-700 hover:bg-gray-700 focus:ring-gray-800 bg-white bg-opacity-10"
        >
          {common.login}
        </Link>
      </div>

      <Link
        to="/contact"
        class="inline-flex justify-between items-center py-1 px-1 pr-4 mb-24 text-sm  rounded-full bg-gray-800 text-white hover:bg-gray-700"
        role="alert"
      >
        <span class="text-xs bg-blue-600 rounded-full text-white px-4 py-1.5 mr-3">
          {heroMainText.anyQuestions}
        </span>{" "}
        <span class="text-sm font-medium">
          {heroMainText.anyQuestionDescription}
        </span>
        <svg
          class="ml-2 w-5 h-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </Link>
    </div>
  );
};

export default HeroMain;
