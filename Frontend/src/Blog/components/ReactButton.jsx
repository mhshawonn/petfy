import React, { useState } from 'react';
import { blogService } from '../services/blogService';

const ReactButton = ({ id, postType, initialReactType, initialReactCount }) => {
  const [reactType, setReactType] = useState(initialReactType);
  const [reactCount, setReactCount] = useState(initialReactCount);

  const handleReact = async (type) => {
    try {
      await blogService.addReact(id, postType, type, false);
      if (reactType === type) {
        setReactType(null);
        setReactCount(prevCount => prevCount - 1);
      } else {
        setReactType(type);
        setReactCount(prevCount => reactType === null ? prevCount + 1 : prevCount);
      }
    } catch (error) {
      console.error('Error adding react:', error);
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={() => handleReact(1)}
        className={`p-2 rounded-full transition duration-300 ease-in-out ${
          reactType === 1 ? 'bg-pink-500 text-white' : 'bg-gray-200 hover:bg-gray-300'
        }`}
      >
        👍
      </button>
      <button
        onClick={() => handleReact(2)}
        className={`p-2 rounded-full transition duration-300 ease-in-out ${
          reactType === 2 ? 'bg-pink-500 text-white' : 'bg-gray-200 hover:bg-gray-300'
        }`}
      >
        👎
      </button>
      <span className="text-gray-600 font-semibold">{reactCount}</span>
    </div>
  );
};

export default ReactButton;
