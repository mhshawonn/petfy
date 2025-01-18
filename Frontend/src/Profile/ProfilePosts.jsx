import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaHeart, FaComment } from 'react-icons/fa';
const BASE_API_URL = "http://localhost:8080";

const ProfilePosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('/posts/user', {
          headers: { 
            'Authorization': `Bearer ${localStorage.getItem('token')}` 
          }
        });

        // Log the response to see its structure
        console.log('Posts response:', response.data);

        // Ensure response.data is an array
        const postsData = Array.isArray(response.data) 
          ? response.data 
          : response.data.posts || [];

        setPosts(postsData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching posts', error);
        setError(error);
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <div>Loading posts...</div>;

  if (error) return <div>Error loading posts: {error.message}</div>;

  // Fallback if posts is not an array or is empty
  if (!Array.isArray(posts) || posts.length === 0) {
    return <div>No posts found</div>;
  }

  return (
    <div className="grid grid-cols-3 gap-2">
      {posts.map(post => {
        // Provide default values to prevent undefined errors
        const postId = post.id || Math.random().toString();
        const imageUrl = post.imageUrl || '/default-post-image.jpg';
        const likes = post.likes || 0;
        const comments = post.comments || 0;

        return (
          <div 
            key={postId} 
            className="relative group overflow-hidden"
          >
            <img 
              src={imageUrl} 
              alt="Post" 
              className="w-full h-64 object-cover" 
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
              <div className="flex space-x-4 text-white">
                <div className="flex items-center gap-2">
                  <FaHeart /> 
                  <span>{likes}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaComment /> 
                  <span>{comments}</span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProfilePosts;