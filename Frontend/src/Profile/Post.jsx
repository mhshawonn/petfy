import React from 'react';
import { FaHeart, FaRegComment, FaShareAlt, FaRegBookmark } from 'react-icons/fa';
import ProfileImg from '../assets/image/logo.png'; // Replace with your own profile image
import PostImg from '../assets/image/logo.png';    // Replace with your post image

function Post() {
  return (
    <div className="max-w-3xl mx-auto my-10 p-4 border border-gray-300 rounded-lg shadow-lg bg-white">
      {/* Profile Section */}
      <div className="flex items-center gap-4">
        <img
          src={ProfileImg}
          alt="User Profile"
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <span className="font-semibold text-lg">Shawon</span>
          <p className="text-sm text-gray-500">2 hours ago</p>
        </div>
      </div>

      {/* Post Image */}
      <div className="my-4">
        <img
          src={PostImg}
          alt="Post"
          className="w-full h-auto rounded-lg object-cover"
        />
      </div>

      {/* Post Interaction Buttons */}
      <div className="flex items-center gap-6 text-xl">
        <div className="flex gap-4">
          <button className="hover:text-red-500 transition-colors">
            <FaHeart />
          </button>
          <button className="hover:text-blue-500 transition-colors">
            <FaRegComment />
          </button>
          <button className="hover:text-green-500 transition-colors">
            <FaShareAlt />
          </button>
        </div>
        <button className="hover:text-gray-700 transition-colors ml-auto">
          <FaRegBookmark />
        </button>
      </div>

      {/* Post Likes */}
      <div className="mt-2">
        <span className="font-semibold">200 Likes</span>
      </div>

      {/* Post Caption */}
      <div className="mt-2">
        <span className="font-semibold">Shawon:</span> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum.
      </div>

      {/* Comments Section */}
      <div className="mt-4 text-sm text-gray-500">
        <p className="font-semibold">View 10 more comments...</p>
        <div className="flex items-center gap-4 mt-2">
          <input
            type="text"
            placeholder="Add a comment..."
            className="flex-1 p-2 border border-gray-300 rounded-lg text-sm"
          />
          <button className="text-blue-500">Post</button>
        </div>
      </div>
    </div>
  );
}

export default Post;
