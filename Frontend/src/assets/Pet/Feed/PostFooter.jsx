import { useState, useEffect } from 'react';
import { FaBell, FaHeart, FaComment } from 'react-icons/fa'; 
import axios from 'axios';

const API_URL = 'http://localhost:8080/pet';

export default function PostFooter({ postId }) {
  const [liked, setLike] = useState(false);
  const [reactions, setReactions] = useState([]);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  // Fetch reactions when component mounts
  useEffect(() => {
    if (postId) { // Only fetch if postId exists
      fetchReactions();
    }
  }, [postId]);

  // Fetch reactions from backend
  const fetchReactions = async () => {
    if (!postId) return; // Guard clause
    
    try {
      const response = await axios.get(`${API_URL}/getReact/${postId}`);
      setReactions(response.data);
      // Check if current user has liked the post
      const userReaction = response.data.find(react => react.userId === getCurrentUserId());
      setLike(!!userReaction);
    } catch (error) {
      console.error('Error fetching reactions:', error);
    }
  };

  // Handle like button click
  const handleLike = async () => {
    if (!postId) {
      console.error('Post ID is required');
      return;
    }

    try {
      const response = await axios.get(`${API_URL}/giveReact`, {
        params: {
          id: 1,
          type: liked ? 0 : 1
        }
      });

      if (response.data === "success") {
        setLike(!liked);
        fetchReactions();
      }
    } catch (error) {
      console.error('Error updating reaction:', error);
    }
  };

  // Get current user ID
  const getCurrentUserId = () => {
    return 1; // Replace with actual user ID from your auth system
  };

  return (
    <>
      <div className="flex items-center gap-4 w-full pt-0 mb-2 my-4">
        <div onClick={handleLike} className="cursor-pointer text-lg">
          {liked ? <FaHeart className="text-red-500" /> : <FaHeart />}
        </div>
        <div className="cursor-pointer text-lg">
          <FaComment />
        </div>
      </div>
      
      <p className="text-sm font-bold text-black">
        {reactions.length} {reactions.length === 1 ? 'like' : 'likes'}
      </p>
    </>
  );
}