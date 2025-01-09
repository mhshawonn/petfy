import React, { useState, useEffect } from 'react';
import { blogService } from '../services/blogService';
import ReactButton from './ReactButton';

const BlogCard = ({ blog }) => {
  const [reactions, setReactions] = useState([]);

  useEffect(() => {
    fetchReactions();
  }, [blog.id]);

  const fetchReactions = async () => {
    try {
      const data = await blogService.getReactions(blog.id);
      setReactions(data);
    } catch (error) {
      console.error('Failed to fetch reactions:', error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {blog.media && blog.media.length > 0 && (
        <div className="relative h-48">
          <img 
            src={blog.media[0]} 
            alt={blog.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      <div className="p-6">
        <h2 className="text-2xl font-semibold mb-2 text-gray-800 hover:text-blue-600 transition-colors">
          {blog.title}
        </h2>
        
        <p className="text-gray-600 mb-4">
          {blog.content.length > 100 
            ? `${blog.content.substring(0, 100)}...` 
            : blog.content}
        </p>

        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-2">
            <ReactButton
              id={blog.id}
              reactions={reactions}
              onReactionChange={fetchReactions}
            />
          </div>
          
          <button className="text-blue-500 hover:text-blue-700 transition-colors">
            Read More
          </button>
        </div>

        {blog.tags && blog.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {blog.tags.map((tag, index) => (
              <span 
                key={index}
                className="px-2 py-1 bg-gray-100 text-gray-600 text-sm rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogCard;