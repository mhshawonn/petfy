import React from 'react';
import ReactButton from './ReactButton';

const BlogCard = ({ blog }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-xl">
      {blog.media && blog.media.length > 0 && (
        <img src={blog.media[0]} alt={blog.title} className="w-full h-48 object-cover" />
      )}
      <div className="p-6">
        <h2 className="text-2xl font-semibold mb-2 text-gray-800">{blog.title}</h2>
        <p className="text-gray-600 mb-4">{blog.content.substring(0, 100)}...</p>
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <img
              src={`https://ui-avatars.com/api/?name=${blog.author.username}&background=random`}
              alt={blog.author.username}
              className="w-8 h-8 rounded-full mr-2"
            />
            <span className="text-sm text-gray-500">
              By {blog.author.username}
            </span>
          </div>
          <span className="text-sm text-gray-500">
            {new Date(blog.publicationDate).toLocaleDateString()}
          </span>
        </div>
        <div className="mt-4 flex justify-between items-center">
          <ReactButton
            id={blog.id}
            postType={1}
            initialReactType={blog.reactType}
            initialReactCount={blog.reactCount}
          />
          <button className="text-blue-500 hover:text-blue-600 transition duration-300 ease-in-out">
            Read More
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
