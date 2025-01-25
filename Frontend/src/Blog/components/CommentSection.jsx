// CommentSection.jsx

import React, { useState, useEffect } from "react";
import { blogService } from "../services/blogService";
import CommentCard from "./CommentCard";

const CommentSection = ({ blogId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [replyTo, setReplyTo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);

  useEffect(() => {
    setPage(0);
    fetchComments(0);
  }, [blogId]);

  const fetchComments = async (pageToFetch) => {
    setLoading(true);
    try {
      const data = await blogService.getComments(blogId, pageToFetch);
      console.log("Fetched comments data:", data);

      const commentsWithReplies = await Promise.all(
        data.content.map(async (comment) => {
          // Map the comment data to include expected fields
          const mappedComment = mapCommentData(comment);

          const repliesData = await fetchReplies(comment.id);
          return { ...mappedComment, replies: repliesData };
        })
      );
      if (pageToFetch === 0) {
        setComments(commentsWithReplies);
      } else {
        setComments((prevComments) => [...prevComments, ...commentsWithReplies]);
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchReplies = async (parentId) => {
    try {
      const data = await blogService.getReplies(blogId, parentId, 0);
      console.log(`Fetched replies for comment ID ${parentId}:`, data);

      // Map each reply
      const mappedReplies = data.content.map((reply) => mapCommentData(reply));
      return mappedReplies;
    } catch (error) {
      console.error("Error fetching replies for comment id:", parentId, error);
      return [];
    }
  };

  // Helper function to map comment data
  const mapCommentData = (comment) => {
    return {
      ...comment,
      author: {
        name: comment.userFromUsername || "Anonymous",
        avatar: comment.userFromProfilePic || "/placeholder.svg",
      },
      createdAt: comment.commentDate,
    };
  };

  const handleSubmitComment = async (e) => {
    e.preventDefault();

    if (!newComment.trim()) {
      alert("Comment content cannot be empty!");
      return;
    }

    try {
      await blogService.addComment(blogId, newComment.trim(), replyTo);

      // Re-fetch comments to get the latest data
      setPage(0);
      fetchComments(0);

      setNewComment("");
      setReplyTo(null);
    } catch (error) {
      if (error.response) {
        console.error("Server error:", error.response.data);
      } else {
        console.error("Error adding comment:", error.message);
      }
    }
  };

  const handleReply = (commentId) => {
    setReplyTo(commentId);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleLoadMore = async () => {
    setLoading(true);
    try {
      const nextPage = page + 1;
      const data = await blogService.getComments(blogId, nextPage);

      const commentsWithReplies = await Promise.all(
        data.content.map(async (comment) => {
          const mappedComment = mapCommentData(comment);
          const repliesData = await fetchReplies(comment.id);
          return { ...mappedComment, replies: repliesData };
        })
      );
      setComments((prevComments) => [...prevComments, ...commentsWithReplies]);
      setPage(nextPage);
    } catch (error) {
      console.error("Error fetching more comments:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold mb-4">Comments</h3>
      <form onSubmit={handleSubmitComment} className="mb-6">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="w-full p-2 border rounded-md"
          placeholder={replyTo ? "Write a reply..." : "Write a comment..."}
          rows="3"
          required
        />
        <div className="mt-2 flex justify-between items-center">
          {replyTo && (
            <button
              type="button"
              onClick={() => setReplyTo(null)}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              Cancel Reply
            </button>
          )}
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            {replyTo ? "Reply" : "Comment"}
          </button>
        </div>
      </form>
      <div className="space-y-4">
        {comments.map((comment) => (
          <CommentCard key={comment.id} comment={comment} onReply={handleReply} />
        ))}
      </div>
      {loading && (
        <div className="mt-4 flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}
      {!loading && comments.length > 0 && (
        <div className="mt-4 flex justify-center">
          <button
            onClick={handleLoadMore}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
          >
            Load More Comments
          </button>
        </div>
      )}
    </div>
  );
};

export default CommentSection;