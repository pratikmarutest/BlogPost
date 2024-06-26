import React from "react";
const ShimmerLoader = ({ type }) => {
  return (
    <div>
      {type === "category" && (
        <div class="bg-slate-700 object-cover w-12 rounded-lg h-8 mt-2 mx-1 animate-pulse"></div>
      )}
      {type === "post" && (
        <div class="max-w-sm border border-gray-300 rounded-lg shadow-xl bg-gray-800 border-white border-opacity-30 h-96 relative">
          <div class="animate-pulse">
            <div class="bg-slate-700 object-cover w-full h-40 rounded-t-lg"></div>
            <div className="py-3 mx-3">
              <div className="mb-1 text-xl font-bold tracking-tight text-white"></div>

              <div class="bg-slate-700 object-cover w-full h-6 my-2"></div>

              <div>
                <span className="text-2xl text-gray-400">&#9733;</span>
                <span className="text-2xl text-gray-400">&#9733;</span>
                <span className="text-2xl text-gray-400">&#9733;</span>
                <span className="text-2xl text-gray-400">&#9733;</span>
                <span className="text-2xl text-gray-400">&#9733;</span>
              </div>

              <div class="bg-slate-700 object-cover w-full h-12 mt-2"></div>
              <div class="bg-slate-700 object-cover w-24 h-8 mt-2 rounded-md"></div>
            </div>
          </div>
        </div>
      )}
      {type === "faq" && (
        <div className="m-4">
          <div class="bg-slate-700 object-cover w-full border border-white rounded-lg h-16 mt-2 animate-pulse"></div>
        </div>
      )}
    </div>
  );
};

export default ShimmerLoader;
