"use client";
import React, { useState } from "react";
import DisplayAnimal from "../page/Content/DisplayAnimal";
import AddCategory from "../page/Modal/AddCategory";
import AddItem from "../page/Modal/AddItem";

const Header = () => {
  const [activeCategory, setActiveCategory] = useState(categories[0].label);
  const [isAddCategoryModalOpen, setIsAddCategoryModalOpen] = useState(false);
  const [isAddItemModalOpen, setIsAddItemModalOpen] = useState(false);

  // Function to handle opening the Add Category modal
  const openAddCategoryModal = () => setIsAddCategoryModalOpen(true);

  // Function to handle closing the Add Category modal
  const closeAddCategoryModal = () => setIsAddCategoryModalOpen(false);

  // Function to handle opening the Add Item modal
  const openAddItemModal = () => setIsAddItemModalOpen(true);

  // Function to handle closing the Add Item modal
  const closeAddItemModal = () => setIsAddItemModalOpen(false);

  return (
    <div>
      <div className="flex justify-between px-8 py-8">
        <div className="flex">
          {categories.map((category) => (
            <button
              key={category.label}
              type="button"
              className={`py-2.5 px-5 me-2 mb-2 text-sm font-medium rounded-lg border ${
                activeCategory === category.label
                  ? "bg-blue-500 text-white" // Active button color
                  : "bg-white text-gray-900"
              } focus:outline-none border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700`}
              onClick={() => setActiveCategory(category.label)}
            >
              {category.label}
            </button>
          ))}
        </div>

        <div className="flex gap-5">
          <button
            type="button"
            className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            onClick={openAddItemModal} // Open the Add Item Modal
          >
            Add Animal
          </button>
          <button
            type="button"
            className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            onClick={openAddCategoryModal} // Open the Add Category Modal
          >
            Add Category
          </button>
        </div>
      </div>
      <div>
        <div className="mt-4">
          <DisplayAnimal
            content={
              categories.find((category) => category.label === activeCategory)
                ?.content
            }
          />
        </div>
      </div>

      {/* Add Category Modal */}
      {isAddCategoryModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <AddCategory />
            <button
              onClick={closeAddCategoryModal} // Close the Add Category Modal
              className="mt-4 w-full text-white bg-red-600 py-2 rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Add Item Modal */}
      {isAddItemModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <AddItem />
            <button
              onClick={closeAddItemModal} // Close the Add Item Modal
              className="mt-4 w-full text-white bg-red-600 py-2 rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const categories = [
  {
    label: "Land Animal",
    content: "Here is some information about Land Animals...",
  },
  {
    label: "Birds",
    content: "Here is some information about Birds...",
  },
  {
    label: "Fish",
    content: "Here is some information about Fish...",
  },
  {
    label: "Insect",
    content: "Here is some information about Insects...",
  },
];

export default Header;
