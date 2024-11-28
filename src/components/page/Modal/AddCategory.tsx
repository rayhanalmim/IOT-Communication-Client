"use client";
import React, { useState } from "react";

const AddCategory = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      // Handle form submission logic here
      console.log({ email, password, rememberMe });
    };
    return (
        <div>
      <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Add Category
          </label>
          <input
            type="text"
            id="category"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="name@flowbite.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
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

export default AddCategory;