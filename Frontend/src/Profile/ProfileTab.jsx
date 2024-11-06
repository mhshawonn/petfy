import React, { useState } from 'react';
import { MdGridOn, MdBookmark, MdFavorite } from "react-icons/md";
import ProfilePosts from './ProfilePosts';
import Post from './Post'

function ProfileTab() {
  const [activeTab, setActiveTab] = useState('posts');

  return (
    <div className="max-w-md mx-auto mt-4  mb-36">
      {/* Tab Navigation */}
      <div className="flex justify-around border-b border-gray-300 text-gray-600">
        <div
          onClick={() => setActiveTab('posts')}
          className={`flex flex-col items-center p-4 cursor-pointer transition-colors duration-200 ${
            activeTab === 'posts' ? 'text-black border-b-2 border-black' : ''
          }`}
        >
          <MdGridOn className="text-xl" />
          <span className="text-sm">Posts</span>
        </div>

        <div
          onClick={() => setActiveTab('saved')}
          className={`flex flex-col items-center p-4 cursor-pointer transition-colors duration-200 ${
            activeTab === 'saved' ? 'text-black border-b-2 border-black' : ''
          }`}
        >
          <MdBookmark className="text-xl" />
          <span className="text-sm">Saved</span>
        </div>

        <div
          onClick={() => setActiveTab('liked')}
          className={`flex flex-col items-center p-4 cursor-pointer transition-colors duration-200 ${
            activeTab === 'liked' ? 'text-black border-b-2 border-black' : ''
          }`}
        >
          <MdFavorite className="text-xl" />
          <span className="text-sm">Liked</span>
        </div>
      </div>

      {/* Content Display */}
      <div className="p-4 ">
        {activeTab === 'posts' && <div><ProfilePosts/></div>}
        {activeTab === 'saved' && <div><Post/></div>}
        {activeTab === 'liked' && <div>Show liked content here</div>}
      </div>
    </div>
  );
}

export default ProfileTab;
