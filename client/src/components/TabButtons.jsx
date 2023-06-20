import React from "react";

const TabButtons = ({ handleCategoryChange, selectedCategory }) => {
  return (
    <>
      <button
        className={`mr-2 px-4 py-2 rounded ${
          selectedCategory === "All" ? "bg-blue-500 text-white" : "bg-gray-200"
        }`}
        onClick={() => handleCategoryChange("All")}
      >
        All
      </button>
      <button
        className={`mr-2 px-4 py-2 rounded ${
          selectedCategory === "Designs"
            ? "bg-blue-500 text-white"
            : "bg-gray-200"
        }`}
        onClick={() => handleCategoryChange("Designs")}
      >
        Design
      </button>
      <button
        className={`mr-2 px-4 py-2 rounded ${
          selectedCategory === "Animation"
            ? "bg-blue-500 text-white"
            : "bg-gray-200"
        }`}
        onClick={() => handleCategoryChange("Animation")}
      >
        Animation
      </button>
      <button
        className={`mr-2 px-4 py-2 rounded ${
          selectedCategory === "Education"
            ? "bg-blue-500 text-white"
            : "bg-gray-200"
        }`}
        onClick={() => handleCategoryChange("Education")}
      >
        Education
      </button>
    </>
  );
};

export default TabButtons;
