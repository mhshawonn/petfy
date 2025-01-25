import React, { useState, useEffect } from "react"
import { blogService } from "../services/blogService"
import ReactButton from "./ReactButton"
import CommentSection from "./CommentSection"

const BlogCard = ({ blog }) => {
  const [reactions, setReactions] = useState([])
  const [isExpanded, setIsExpanded] = useState(false)
  const [showComments, setShowComments] = useState(false)

  useEffect(() => {
    fetchReactions()
  }, [blog.id])

  const fetchReactions = async () => {
    try {
      const data = await blogService.getReactions(blog.id)
      setReactions(data)
    } catch (error) {
      console.error("Failed to fetch reactions:", error)
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
            <div className="flex items-center space-x-2">
              <ReactButton id={blog.id} reactions={reactions} onReactionChange={fetchReactions} />
            </div>

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
              <button onClick={() => setShowComments(!showComments)} className="mt-4 text-blue-500 hover:text-blue-600">
                {showComments ? "Hide Comments" : "Show Comments"}
              </button>
              {showComments && <CommentSection blogId={blog.id} />}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default BlogCard

