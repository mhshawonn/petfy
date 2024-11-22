import React from 'react';

import owl from './Image/owl.jpg';

export default function FeedPosts(username) {
  return (
    <div className="flex justify-between items-center w-full my-2">
      <div className="flex items-center gap-2">
        <img
          src={owl}
          alt="user profile"
          className="w-8 h-8 rounded-full"
        />
        <div className="text-sm font-bold flex gap-2 transition-all duration-300 transform hover:scale-110">
          Newbie
          <span className="text-gray-500">1w</span>
        </div>
        <div className="cursor-pointer">
          <span
            className="text-pink-600 font-bold text-sm transition-colors duration-200 ease-in-out hover:text-blue-600"
          >
            Unfollow
          </span>
        </div>
      </div>
    </div>
  );
}