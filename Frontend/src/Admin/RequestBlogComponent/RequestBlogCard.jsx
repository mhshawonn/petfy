import { useState, useEffect } from "react"
import { blogService } from "../../Blog/services/blogService"
import axios from "axios"
// import ReactButton from "../../Blog/components/ReactButton"
// import CommentSection from "../../Blog/components/CommentSection"


const API_URL = "http://localhost:8080/blog";

const RequestBlogCard = ({ blog, fetchBlogRequests }) => {
  const [reactions, setReactions] = useState([])
  const [isExpanded, setIsExpanded] = useState(false)
  // const [showComments, setShowComments] = useState(false)

  // useEffect(() => {
  //   fetchReactions()
  // }, [blog.id])

  // const fetchReactions = async () => {
  //   try {
  //     const data = await blogService.getReactions(blog.id)
  //     setReactions(data)
  //   } catch (error) {
  //     console.error("Failed to fetch reactions:", error)
  //   }
  // }

  const handleApprove = async () => {
    console.log("Approving blog:", blog.id)
    
    try {
      const response = await axios.post(`${API_URL}/approve?id=${blog.id}`)

      console.log("Approve response:", response.data)

      fetchBlogRequests();
      
    } catch (error) {
      console.error("Failed to approve blog:", error)
    }
  }

  const handleBan = async () => {
    console.log("Banning blog:", blog.id)
    // Add API call here
    try {
      const response = await axios.post(`${API_URL}/ban?id=${blog.id}`)

      console.log("Ban response:", response.data)

      fetchBlogRequests();
    } catch (error) {
      console.error("Failed to approve blog:", error)
    }
  }

  return (
    <div
      className={`bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 
      ${isExpanded ? "col-span-full" : ""}`}
    >
      <div className={`${isExpanded ? "grid md:grid-cols-2 gap-6" : ""}`}>
        {blog.media && blog.media.length > 0 && (
          <div className={`relative ${isExpanded ? "h-full" : "h-48"}`}>
            <img
              src={blog.media[0] || "/placeholder.svg"}
              alt={blog.title}
              className={`w-full h-full object-cover ${isExpanded ? "rounded-lg" : ""}`}
            />
          </div>
        )}

        <div className="p-6">
          <h2 className="text-2xl font-semibold mb-2 text-gray-800 hover:text-blue-600 transition-colors">
            {blog.title}
          </h2>

          <div className={`text-gray-600 mb-4 ${isExpanded ? "whitespace-pre-wrap" : ""}`}>
            {isExpanded
              ? blog.content
              : blog.content.length > 100
                ? `${blog.content.substring(0, 100)}...`
                : blog.content}
          </div>

          <div className="flex justify-between items-center mb-4">
            {/* <div className="flex items-center space-x-2">
              <ReactButton id={blog.id} reactions={reactions} onReactionChange={fetchReactions} />
            </div> */}

            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            >
              {isExpanded ? "Show Less" : "Read More"}
            </button>
          </div>

          {blog.tags && blog.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {blog.tags.map((tag, index) => (
                <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-sm rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          )}

          {isExpanded && (
            <div className="mt-6">
              <div className="text-sm text-gray-500">
                <p>Posted on: {new Date(blog.createdAt).toLocaleDateString()}</p>
                {blog.author && <p className="mt-1">By: {blog.author.name || "Anonymous"}</p>}
              </div>
              {/* <button onClick={() => setShowComments(!showComments)} className="mt-4 text-blue-500 hover:text-blue-600">
                {showComments ? "Hide Comments" : "Show Comments"}
              </button>
              {showComments && <CommentSection blogId={blog.id} />} */}

              {/* Approve & Ban Buttons */}
              <div className="flex gap-4 mt-6">
                <button
                  onClick={handleApprove}
                  className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
                >
                  Approve
                </button>
                <button
                  onClick={handleBan}
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                >
                  Ban
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default RequestBlogCard
