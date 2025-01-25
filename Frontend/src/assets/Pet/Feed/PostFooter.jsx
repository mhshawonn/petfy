import { useState, useEffect } from 'react';
import { FaBell, FaHeart, FaComment, FaAd } from 'react-icons/fa';
import axios from 'axios';
import { currentUser } from "../../../Redux/Auth/Action";
import { useDispatch, useSelector } from "react-redux";

const API_URL = 'http://localhost:8080/pet';

export default function PostFooter({ postId }) {
  const [liked, setLike] = useState(false);
  const [reactions, setReactions] = useState([]);
  const [adopted, setAdopted] = useState(false);
  const [adoptionStatus, setAdoptionStatus] = useState(null);
  const dispatch = useDispatch();
    // Fix: Select only the auth state
    const auth = useSelector((state) => state.auth);
    const token = localStorage.getItem("authToken");
  
    useEffect(() => {
      if (!token) {
        dispatch(currentUser(token));
      }
    }, [dispatch, token]);

  useEffect(() => {
    if (postId) {
      fetchReactions();
      fetchAdoptionStatus();
    }
  }, [postId]);

  const fetchReactions = async () => {
    if (!postId) return;
    try {
      const response = await axios.get(`${API_URL}/getReact/${postId}`);
     
      setReactions(response.data);
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
      // Convert postId to number if it's a string
      const response = await axios.get(`${API_URL}/giveReact`, {
        params: {
          id: Number(postId),  
          type: liked ? 0 : 1
        }
      });
    
      
      if (response.data === "success") {
        setLike(!liked);
        await fetchReactions(); // Refresh reactions after successful like/unlike
      }
    } catch (error) {
      console.error('Error updating reaction:', error);
    }
  };

  // Handle adoption request
  const handleAdopt = async () => {
    if (!postId) return;
    
    try {
      const formData = new FormData();
      formData.append('adoptionRequest', JSON.stringify({
        userId: getCurrentUserId(),
        message: "I would like to adopt this pet"
      }));
      formData.append('files', []); // Add files if needed

      const response = await axios.post(
        `${API_URL}/request/${postId}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );

      if (response.data === "success") {
        alert('Adoption request sent successfully');
        fetchAdoptionStatus();
      }
    } catch (error) {
      console.error('Error sending adoption request:', error);
    }
  };

  const fetchAdoptionStatus = async () => {
    if (!postId) return;
    try {
      const response = await axios.get(`${API_URL}/getAdoptionRequest/${postId}/0`);
      setAdopted(response.data.content.length > 0);
      const status = response.data.content.length > 0 
        ? response.data.content[0].status 
        : 'Not requested';
      setAdoptionStatus(status);
    } catch (error) {
      console.error('Error fetching adoption status:', error);
    }
  };

  const getCurrentUserId = () => 1;

  return (
    <>
      <div className="flex items-center gap-4 w-full pt-0 mb-2 my-4">
        <div onClick={handleLike} className="cursor-pointer text-lg">
          {liked ? <FaHeart className="text-red-500" /> : <FaHeart />}
        </div>

        <div onClick={handleAdopt} className="cursor-pointer text-lg">
          <div className='text-pink-500 text-lg'>
            <button disabled={adopted}>
              {adopted ? 'Already Adopted' : 'Adopt'}
            </button>
          </div>
        </div>
      </div>

      <p className="text-sm font-bold text-black">
        {reactions.length} {reactions.length === 1 ? 'like' : 'likes'}
      </p>

      {adoptionStatus && (
        <div className="text-sm font-bold text-black">
          Status: {adoptionStatus}
        </div>
      )}
    </>
  );
}