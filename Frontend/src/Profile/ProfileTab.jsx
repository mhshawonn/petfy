import React, { useState } from 'react';
import { 
  FaThLarge, 
  FaBookmark, 
  FaHeart 
} from 'react-icons/fa';
import ProfilePosts from './ProfilePosts';

const ProfileTabs = () => {
  const [activeTab, setActiveTab] = useState('posts');

  const renderTabContent = () => {
    switch(activeTab) {
      case 'posts':
        return <ProfilePosts />;
      case 'saved':
        return <div>Saved Posts</div>;
      case 'liked':
        return <div>Liked Posts</div>;
      default:
        return <ProfilePosts />;
    }
  };

  return (
    <div>
      <div className="flex justify-center space-x-8 border-b mb-4">
        {[
          { key: 'posts', icon: FaThLarge, label: 'Posts' },
          { key: 'saved', icon: FaBookmark, label: 'Saved' },
          { key: 'liked', icon: FaHeart, label: 'Liked' }
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex items-center gap-2 py-3 ${
              activeTab === tab.key 
                ? 'border-b-2 border-black' 
                : 'text-gray-500'
            }`}
          >
            <tab.icon />
            {tab.label}
          </button>
        ))}
      </div>

      {renderTabContent()}
    </div>
  );
};

export default ProfileTabs;