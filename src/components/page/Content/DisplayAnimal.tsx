"use client";
import React from "react";

// Define a simple interface for each animal card
interface AnimalCard {
  name: string;
  image: string; // Placeholder image URL
}

interface DisplayAnimalProps {
  content: string | undefined;
}

const DisplayAnimal: React.FC<DisplayAnimalProps> = ({ content }) => {
  const animals: AnimalCard[] = [
    { name: "Lion", image: "https://via.placeholder.com/150/0000FF/808080?Text=Animal1" },
    { name: "Tiger", image: "https://via.placeholder.com/150/FF0000/FFFFFF?Text=Animal2" },
    { name: "Elephant", image: "https://via.placeholder.com/150/00FF00/FFFFFF?Text=Animal3" },
    { name: "Monkey", image: "https://via.placeholder.com/150/FFFF00/000000?Text=Animal4" },
    { name: "Giraffe", image: "https://via.placeholder.com/150/000000/FFFFFF?Text=Animal5" },
    { name: "Zebra", image: "https://via.placeholder.com/150/008000/FFFFFF?Text=Animal6" },
    { name: "Kangaroo", image: "https://via.placeholder.com/150/800080/FFFFFF?Text=Animal7" },
    { name: "Panda", image: "https://via.placeholder.com/150/FF6347/FFFFFF?Text=Animal8" },
    { name: "Koala", image: "https://via.placeholder.com/150/0000FF/FFFFFF?Text=Animal9" },
    { name: "Penguin", image: "https://via.placeholder.com/150/FF1493/FFFFFF?Text=Animal10" },
  ];

  return (
    <div className="mx-32 my-4 mb-6">
      <p>{content}</p>

      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 xl:grid-cols-5 gap-6 mt-6">
        {animals.map((animal, index) => (
          <div
            key={index}
            className="bg-white border rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <img
              src={animal.image}
              alt={animal.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800">{animal.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DisplayAnimal;
