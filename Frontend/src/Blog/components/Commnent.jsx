import React, { useState, useEffect } from 'react';
import { blogService } from '../services/blogService'; // Assuming you have blogService to interact with backend
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa'; // Import reaction icons

const Comment = ({ blogId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [likeCount, setLikeCount] = useState(0);
  const [dislikeCount, setDislikeCount] = useState(0);
  const [reactType, setReactType] = useState(null);

  // Fetch comments when component mounts or blogId changes
  useEffect(() => {
    fetchComments();
  }, [blogId]);

  // Fetch the comments from the backend
  const fetchComments = async () => {
    try {
      const response = await blogService.getComments(blogId, 0); // assuming page 0 for first load
      setComments(response.content);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  // Handle adding a new comment
  const handleAddComment = async () => {
    if (!newComment.trim()) return;
    try {
      await blogService.addComment(blogId, newComment);
      setNewComment('');
      fetchComments(); // Refresh the comment list
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  // Handle reacting to a comment (like/dislike)
  const handleReact = async (commentId, type) => {
    try {
      await blogService.reactComment(commentId, type);
      fetchComments(); // Refresh comments after reaction
    } catch (error) {
      console.error('Error reacting to comment:', error);
    }
  };

  return (
    <div className="comment-section">
      {/* Add a new comment */}
      <div className="add-comment">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write a comment..."
        />
        <button onClick={handleAddComment}>Post Comment</button>
      </div>

      {/* Display the comments */}
      <div className="comments-list">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.id} className="comment">
              <p>{comment.content}</p>

              {/* Show reactions for each comment */}
              <div className="reactions">
                <button onClick={() => handleReact(comment.id, 1)}>
                  <FaThumbsUp /> Like ({comment.likes})
                </button>
                <button onClick={() => handleReact(comment.id, 2)}>
                  <FaThumbsDown /> Dislike ({comment.dislikes})
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No comments yet. Be the first to comment!</p>
        )}
      </div>
    </div>
  );
};

export default Comment;
