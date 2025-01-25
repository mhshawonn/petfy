// CommentCard.jsx

import React from "react";
import { formatDistanceToNow } from "date-fns";
import ReactButton from "./ReactButton";

const CommentCard = ({ comment, onReply }) => {
  const getFormattedDate = (date) => {
    try {
      if (date) {
        // Ensure date is a valid Date object
        const dateObj = new Date(Number(date));
        return formatDistanceToNow(dateObj, { addSuffix: true });
      }
    } catch (error) {
      console.error("Error formatting date:", error);
    }
    return "Invalid Date";
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
      <div className="flex items-start space-x-3">
        <img
          src={comment.author?.avatar || "/placeholder.svg"}
          alt={comment.author?.name || "Anonymous"}
          className="w-10 h-10 rounded-full"
        />
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-gray-800">
              {comment.author?.name || "Anonymous"}
            </h4>
            <span className="text-sm text-gray-500">
              {getFormattedDate(comment.createdAt)}
            </span>
          </div>
          <p className="mt-1 text-gray-600">
            {comment.content || "No content available."}
          </p>
          <div className="mt-2 flex items-center space-x-4">
            <ReactButton
              id={comment.id}
              initialLikeCount={comment.likeCount || 0}
              initialDislikeCount={comment.dislikeCount || 0}
              initialReactType={comment.userReaction || null}
            />
            <button
              onClick={() => onReply(comment.id)}
              className="text-sm text-blue-500 hover:text-blue-600"
            >
              Reply
            </button>
          </div>
          {comment.replies && comment.replies.length > 0 && (
            <div className="mt-4 ml-8 border-l-2 border-gray-200 pl-4">
              {comment.replies.map((reply) => (
                <CommentCard key={reply.id} comment={reply} onReply={onReply} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentCard;