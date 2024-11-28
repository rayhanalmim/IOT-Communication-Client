import React from 'react';

interface DisplayAnimalProps {
  content: string | undefined;
}

const DisplayAnimal: React.FC<DisplayAnimalProps> = ({ content }) => {
  return (
    <div className='mx-32'>
      <div className="mt-4">
        <p>{content}</p>
      </div>
    </div>
  );
};

export default DisplayAnimal;
