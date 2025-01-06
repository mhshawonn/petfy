import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import PostHeader from './PostHeader';
import PostFooter from './PostFooter';

const FeedPost = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(0); // Keep track of the current page
  const [loading, setLoading] = useState(false); // To manage loading state
  const [hasMore, setHasMore] = useState(true); // To manage whether there are more posts to load

  // Function to fetch posts from the API
  const fetchPosts = useCallback(async () => {
    if (loading || !hasMore) return; // Prevent multiple requests and stop if no more data
    setLoading(true); // Set loading to true before fetching data
    try {
      const response = await axios.get(`http://localhost:8080/pet/get/${page}?order=0`);
      const newPosts = response.data.content;
      console.log("res")
      console.log(response.data?.content[0]?.media[0])

      // setPosts((prevPosts) => [...prevPosts, ...newPosts]); 
      // Filter out any duplicate posts based on a unique identifier (e.g., post.id)
      setPosts((prevPosts) => {
        const newPostsIds = newPosts.map((post) => post.id); // Assuming 'id' is unique
        const filteredPosts = prevPosts.filter((post) => !newPostsIds.includes(post.id));
        return [...filteredPosts, ...newPosts]; // Append only unique posts
      });


      setHasMore(newPosts.length > 0);
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  }, [loading, hasMore, page]); // Dependencies: loading, hasMore, page

  // Infinite scrolling: Check if the user has scrolled to the bottom
  const handleScroll = () => {
    const bottom = document.documentElement.scrollHeight === document.documentElement.scrollTop + window.innerHeight;
    if (bottom) {
      fetchPosts(); // Trigger fetch when bottom is reached
    }
  };

  // Set up the scroll event listener when the component mounts
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll); // Cleanup event listener
    };
  }, []);

  // Fetch initial posts when the component mounts
  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return (
    <>
      <div className="max-w-2xl mx-auto p-4">
        <PostHeader />
      </div>

      <div className="max-w-2xl mx-auto p-4">
        {posts.length > 0 ? (
          posts.map((post, index) => (
            <div key={index} className="bg-white shadow-md rounded-lg overflow-hidden mb-4">
              <div className="p-4">
                {post?.media && <img src={post.media[0]} alt={post?.name} className="w-full h-auto rounded-lg" />}
              </div>
              <div className="p-4">
                <p>{post.description}</p>
              </div>
              <PostFooter />
            </div>
          ))
        ) : (
          <p>Loading posts...</p>
        )}
      </div>

      {loading && <div className="text-center p-4">Loading more posts...</div>}
      {!hasMore && <div className="text-center p-4">No more posts to load</div>}
    </>
  );
};

export default FeedPost;
