import React, { useState, useEffect } from "react";
import { blogService } from "../services/blogService";
import BlogCard from "../components/BlogCard";
import CreateBlog from "../components/CreateBlog";
import { useDispatch, useSelector } from "react-redux";
import { currentUser } from "../../Redux/Auth/Action";

const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  // Fix: Select only the auth state
  const auth = useSelector((state) => state.auth);
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    if (!token) {
      dispatch(currentUser(token));
    }
  }, [dispatch, token]); // Added missing dependencies

  useEffect(() => {
    fetchBlogs();
  }, [page]);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const data = await blogService.getBlogs(page, auth?.reqUser?.id);
      console.log('page data: ')
      console.log(data)
      
      // Fix: Ensure no duplicate blogs by using Set or filtering
      setBlogs((prevBlogs) => {
        const newBlogs = [...prevBlogs];
        data.content.forEach((newBlog) => {
          if (!newBlogs.some((blog) => blog.id === newBlog.id)) {
            newBlogs.push(newBlog);
          }
        });
        return newBlogs;
      });
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
    setLoading(false);
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  // Function to ensure unique keys
  const generateUniqueKey = (blog) => {
    return `blog-${blog.id}-${blog.createdAt || Date.now()}`;
  };

  return (
    <div className="min-h-screen bg-gray-100 mt-12">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Blog Posts</h1>
        </div>
      </header>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <CreateBlog onBlogCreated={fetchBlogs} />
          <div className="mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {blogs.map((blog) => (
              <BlogCard 
                key={generateUniqueKey(blog)} 
                blog={blog} 
              />
            ))}
          </div>
          {loading ? (
            <div className="mt-8 flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : blogs.length > 0 && (
            <div className="mt-8 flex justify-center">
              <button
                onClick={handleLoadMore}
                className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
              >
                Load More
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default BlogPage;