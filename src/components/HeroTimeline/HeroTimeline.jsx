import { appTimeline } from "../../common/staticArray";

const HeroTimeline = () => {
  return (
    <div className="mb-20">
      <ol class="relative border-s border-gray-700">
        {appTimeline.map((item, index) => {
          return (
            <li class="mb-10 ms-6" key={index}>
              <span class="absolute flex items-center justify-center w-6 h-6 rounded-full -start-3 ring-8 ring-gray-900 bg-blue-900">
                <svg
                  class="w-2.5 h-2.5 text-blue-300"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                </svg>
              </span>
              <h3 class="flex items-center mb-1 text-lg font-semibold text-white">
                {item.stepTitle}
              </h3>
              <time class="block mb-2 text-sm font-normal leading-none text-gray-500">
                * {item.supportMessage}
              </time>
              <p class="mb-4 text-base font-normal text-gray-400">
                {item.description}
              </p>
              <div className="mt-2">{item.action && item.action}</div>
            </li>
          );
        })}
      </ol>
    </div>
  );
};

export default HeroTimeline;
