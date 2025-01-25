import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { blogService } from "../services/blogService"
import BlogCard from "../components/BlogCard"
import CommentSection from "../components/CommentSection"

const BlogPost = () => {
  const { blogId } = useParams()
  const [blog, setBlog] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const data = await blogService.getBlogById(blogId)
        setBlog(data)
      } catch (error) {
        console.error("Error fetching blog:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchBlog()
  }, [blogId])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (!blog) {
    return <div className="text-center mt-8">Blog post not found</div>
  }

  return (
    <div className="max-w-3xl mx-auto mt-8">
      <BlogCard blog={blog} />
      <CommentSection blogId={blogId} />
    </div>
  )
}

export default BlogPost

