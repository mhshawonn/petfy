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

  // Fetch comments for a specific blog
  getComments: async (blogId, page = 0) => {
    try {
      const response = await axios.get(`${API_URL}/comments/getComment/${page}`, {
        params: { blog_id: blogId },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      return response.data; // assuming the response contains 'content' for comments
    } catch (error) {
      throw new Error("Failed to fetch comments");
    }
  },

  // Add a new comment to a specific blog
  addComment: async (blogId, content) => {
    try {
      const response = await axios.post(
        `${API_URL}/comments/addComment`,
        {
          blog_id: blogId,
          content: content,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      return response.data; // assuming the response contains the created comment or success message
    } catch (error) {
      throw new Error("Failed to add comment");
    }
  },

  // React to a comment (like/dislike)
  reactComment: async (commentId, type) => {
    try {
      const response = await axios.get(`${API_URL}/comments/reactComment`, {
        params: { id: commentId, type: type },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      return response.data; // assuming the response contains a success message
    } catch (error) {
      throw new Error("Failed to react to comment");
    }
  },
};
