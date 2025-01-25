import React, { useState, useEffect } from "react";
import { blogService } from "../services/blogService";
import { useDispatch, useSelector } from "react-redux";
import { currentUser } from "../../Redux/Auth/Action";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa"; // Import icons

const ReactButton = ({ id, initialLikeCount, initialDislikeCount, initialReactType }) => {
  const [likeCount, setLikeCount] = useState(initialLikeCount);
  const [dislikeCount, setDislikeCount] = useState(initialDislikeCount);
  const [reactType, setReactType] = useState(initialReactType);
  const [isHovered, setIsHovered] = useState(false);
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    if (!token) {
      dispatch(currentUser(token));
    }
  }, [dispatch, token]);

  const handleReact = async (type) => {
    if (!token) {
      // Show login prompt if user is not authenticated
      alert("Please login to react");
      return;
    }

    try {
      await blogService.giveReact(id, type);

      if (reactType === type) {
        setReactType(null);
        if (type === 1) {
          setLikeCount((prevCount) => prevCount - 1);
        } else if (type === 2) {
          setDislikeCount((prevCount) => prevCount - 1);
        }
      } else {
        setReactType(type);
        if (type === 1) {
          setLikeCount((prevCount) => prevCount + 1);
          if (reactType === 2) {
            setDislikeCount((prevCount) => prevCount - 1);
          }
        } else if (type === 2) {
          setDislikeCount((prevCount) => prevCount + 1);
          if (reactType === 1) {
            setLikeCount((prevCount) => prevCount - 1);
          }
        }
      }
    } catch (error) {
      console.error("Error adding react:", error);
    }
  };

  const formatCount = (count) => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count;
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-center space-x-4">
        <div className="flex items-center">
          <button
            onClick={() => handleReact(1)}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-all duration-200 ${
              reactType === 1
                ? "bg-blue-100 text-blue-600"
                : "hover:bg-gray-100 text-gray-600"
            }`}
          >
            <FaThumbsUp
              className={`text-xl ${
                reactType === 1 ? "text-blue-600" : "text-gray-600"
              }`}
            />
            <span className="font-medium">
              {reactType === 1 ? "Liked" : "Like"}
            </span>
          </button>
          {likeCount > 0 && (
            <span className="ml-2 text-sm text-gray-500">
              {formatCount(likeCount)}
            </span>
          )}
        </div>

        <div className="flex items-center">
          <button
            onClick={() => handleReact(2)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-all duration-200 ${
              reactType === 2
                ? "bg-red-100 text-red-600"
                : "hover:bg-gray-100 text-gray-600"
            }`}
          >
            <FaThumbsDown
              className={`text-xl ${
                reactType === 2 ? "text-red-600" : "text-gray-600"
              }`}
            />
            <span className="font-medium">
              {reactType === 2 ? "Disliked" : "Dislike"}
            </span>
          </button>
          {dislikeCount > 0 && (
            <span className="ml-2 text-sm text-gray-500">
              {formatCount(dislikeCount)}
            </span>
          )}
        </div>
      </div>

      {/* Reaction count summary */}
      {(likeCount > 0 || dislikeCount > 0) && (
        <div className="mt-2 text-sm text-gray-500">
          {likeCount + dislikeCount} people reacted to this
        </div>
      )}
    </div>
  );
};

export default ReactButton;