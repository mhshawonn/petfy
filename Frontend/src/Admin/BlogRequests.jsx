import RequestBlogCard from "./RequestBlogComponent/RequestBlogCard.jsx";
import { blogService } from "../Blog/services/blogService";
import CreateBlog from "../Blog/components/CreateBlog";
import { useDispatch, useSelector } from "react-redux";
import { currentUser } from "../Redux/Auth/Action";
import { Routes, Route } from "react-router-dom";
import BlogPost from "../Blog/pages/BlogPost";
import { useEffect, useState } from "react";

const BlogRequests = () => {
  const [blogs, setBlogs] = useState([]);
  const [NotApprovedBlogs, setNotApprovedBlogs] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    if (!token) {
      dispatch(currentUser(token));
    }
  }, [dispatch, token]);

  useEffect(() => {
    // fetchBlogs();
    fetchBlogRequests();
  }, [page]);

  const fetchBlogRequests = async () => {
    setLoading(true);
    try {
      const data = await blogService.getBlogsNotApproved();
      setNotApprovedBlogs(data);
      
    } catch (error) {
      console.error("Error fetching blog requests:", error);
    }
    setLoading(false);
  };

//   const fetchBlogs = async () => {
//     setLoading(true);
//     try {
//       const data = await blogService.getBlogs(page, auth?.reqUser?.id);
//       setBlogs((prevBlogs) => {
//         const newBlogs = [...prevBlogs];
//         data.content.forEach((newBlog) => {
//           if (!newBlogs.some((blog) => blog.id === newBlog.id)) {
//             newBlogs.push(newBlog);
//           }
//         });
//         return newBlogs;
//       });
//     } catch (error) {
//       console.error("Error fetching blogs:", error);
//     }
//     setLoading(false);
//   };

  const handleLoadMore = () => {
    // setPage((prevPage) => prevPage + 1);
    fetchBlogRequests();
  };

  const generateUniqueKey = (blog) => {
    return `blog-${blog.id}-${blog.createdAt || Date.now()}`;
  };

  return (
    <div>
      <div className="min-h-screen bg-gray-100 mt-12">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900">Blog Posts</h1>
          </div>
        </header>
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <CreateBlog onBlogCreated={fetchBlogRequests} />
                    <div className="mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                      {blogs.map((blog) => (
                        <RequestBlogCard key={generateUniqueKey(blog)} blog={blog} fetchBlogRequests={fetchBlogRequests} />
                      ))}
                    </div>
                    {loading ? (
                      <div className="mt-8 flex justify-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                      </div>
                    ) : (
                      blogs.length > 0 && (
                        <div className="mt-8 flex justify-center">
                          <button
                            onClick={handleLoadMore}
                            className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
                          >
                            Load More
                          </button>
                        </div>
                      )
                    )}
                  </>
                }
              />
              <Route path=":blogId" element={<BlogPost />} />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  );
};

export default BlogRequests;
