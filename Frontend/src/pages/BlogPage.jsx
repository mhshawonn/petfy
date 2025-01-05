import React, { useState, useEffect } from 'react';
import { blogService } from '../services/blogService';
import BlogCard from '../components/BlogCard';
import CreateBlog from '../components/CreateBlog';

const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchBlogs();
  }, [page]);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const data = await blogService.getBlogs(page);
      setBlogs(prevBlogs => [...prevBlogs, ...data.content]);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
    setLoading(false);
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Blog Posts</h1>
        </div>
      </header>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <CreateBlog onBlogCreated={fetchBlogs} />
          <div className="mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {blogs.map(blog => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>
          {loading ? (
            <div className="mt-8 flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : (
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
