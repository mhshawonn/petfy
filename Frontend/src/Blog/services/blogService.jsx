import axios from "axios";

const API_URL = "http://localhost:8080/blog";


export const blogService = {
  getBlogs: async (page = 0, userId) => {
    try {
      const response = await axios.get(`${API_URL}/get/${page}?userId=${userId}`);
      console.log("fetched blogs");
      console.log(response.data);
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch blogs");
    }
  },

  getBlogById: async (blogId) => {
    try {
      const response = await axios.get(`${API_URL}/get/${blogId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      })
      return response.data
    } catch (error) {
      throw new Error("Failed to fetch blog")
    }
  },

  createBlog: async (blog, files, tags, userId) => {
    try {
      const formData = new FormData();
      formData.append("blog", JSON.stringify(blog));

      files.forEach((file) => {
        formData.append("files", file);
      });

      // formData.append('tag', JSON.stringify(tags));
      // formData.append('tag', tags.split(',').map(tag => parseInt(tag.trim())));

      if (typeof tags === "string") {
        formData.append(
          "tag",
          tags.split(",").map((tag) => parseInt(tag.trim()))
        );
      } else if (Array.isArray(tags)) {
        formData.append("tag", tags);
      } else {
        throw new Error("Invalid tags format");
      }

      formData.append("userId", userId);

      const response = await axios.post(`${API_URL}/create`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error creating blog:", error);
      throw new Error("Failed to create blog");
    }
  },

  giveReact: async (id, type) => {
    try {
      const response = await axios.get(`${API_URL}/giveReact`, {
        params: { id, type },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error("Failed to react to blog");
    }
  },

  getReactions: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/showReact`, {
        params: { id },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error("Failed to get reactions");
    }
  },

  getComments: async (blogId, page = 0) => {
    try {
      const response = await axios.get(`${API_URL}/getComment/${page}`, {
        params: { blog_id: blogId },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      })
      return response.data
    } catch (error) {
      throw new Error("Failed to fetch comments")
    }
  },

  getReplies: async (blogId, parentId, page = 0) => {
    try {
      const response = await axios.get(`${API_URL}/getReply/${page}`, {
        params: { blog_id: blogId, parent_id: parentId },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch replies");
    }
  },

  addComment: async (blogId, content, parentId = null) => {
    try {
      const formData = new FormData()
      formData.append("blog_id", blogId)
      formData.append("content", content)
      if (parentId) {
        formData.append("parent_id", parentId)
      }

      const response = await axios.post(`${API_URL}/addComment`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      })
      return response.data
    } catch (error) {
      throw new Error("Failed to add comment")
    }
  },

  reactToComment: async (commentId, type) => {
    try {
      const response = await axios.get(`${API_URL}/reactComment`, {
        params: { id: commentId, type },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      })
      return response.data
    } catch (error) {
      throw new Error("Failed to react to comment")
    }
  },

  getCommentReactions: async (commentId) => {
    try {
      const response = await axios.get(`${API_URL}/getReactComment`, {
        params: { id: commentId },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      })
      return response.data
    } catch (error) {
      throw new Error("Failed to get comment reactions")
    }
  },
};
