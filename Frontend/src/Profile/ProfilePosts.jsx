import React from 'react';
import { FaHeart, FaComment } from 'react-icons/fa';
import img1 from '../assets/image/logo.png';
import img2 from '../assets/image/owl.jpg';


const ProfilePosts = () => {
  const posts = [
    { id: 1, img: img1, likes: 120, comments: 30 },
    { id: 2, img: img2, likes: 95, comments: 15 },
    { id: 3, img: img1, likes: 120, comments: 30 },
    { id: 4, img: img2, likes: 95, comments: 15 },
    { id: 5, img: img1, likes: 120, comments: 30 },
    { id: 6, img: img2, likes: 95, comments: 15 },
    
  ];

  return (
    <div className="grid grid-cols-3 gap-1 md:gap-4 p-4 mb-16">
      {posts.map((post) => (
        <div key={post.id} className="relative group overflow-hidden">
          <div>
          <img
            src={post.img}
            alt="Post"
            className="w-full max-h-72 object-cover group-hover:scale-110 transition-transform duration-300 ease-in-out"
          />
          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300 ease-in-out">
            <div className="flex items-center space-x-4 text-white">
              <div className="flex items-center space-x-1">
                <FaHeart />
                <span>{post.likes}</span>
              </div>
              <div className="flex items-center space-x-1">
                <FaComment />
                <span>{post.comments}</span>
              </div>
            </div>
          </div>
          </div>
        </div>
      ))}
    </div>
    
  );
};

export default ProfilePosts;
