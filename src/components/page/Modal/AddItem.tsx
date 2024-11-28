"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";

const AddItem = () => {
  const [email, setEmail] = useState(""); // This can represent Animal Name
  const [category, setCategory] = useState(""); // New state for category selection
  const [rememberMe, setRememberMe] = useState(false); // Remember me checkbox
  const categories = [
    "Land Animal",
    "Birds",
    "Fish",
    "Insect",
  ]; // Example categories, this could be dynamic or fetched from an API

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log({ email, category, rememberMe });
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
        <label
          htmlFor="email"
          className="block mb-2 text-lg font-semibold text-gray-900 dark:text-white"
        >
          Add Animal
        </label>
        
        {/* Animal Name Input */}
        <div className="mb-5">
          <input
            type="text"
            id="animalName"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Animal Name"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* Category Selection */}
        <div className="mb-5">
          <label
            htmlFor="category"
            className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white"
          >
            Select Category
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          >
            <option value="">Select a category</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Animal Picture Input */}
        <div className="grid w-full max-w-sm items-center gap-1.5 mb-5">
          <Input id="picture" type="file" />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="text-white bg-black focus:ring-4 w-full focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default AddItem;
