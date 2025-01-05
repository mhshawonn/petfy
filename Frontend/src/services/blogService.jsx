import axios from 'axios';

const API_URL = 'http://localhost:8080/blog'; // Replace with your actual API URL

export const blogService = {
  // Method to get blogs (added pagination for flexibility)
  getBlogs: async (page = 0) => {
    const response = await axios.get(`${API_URL}/blogs`, { params: { page } });
    return response.data;
  },

  // Method to create a blog, including files and tags
  createBlog: async (blog, files, tags) => {
    // Prepare FormData
    const formData = new FormData();

    // Append blog data (assuming blog is an object with title, content, etc.)
    for (const [key, value] of Object.entries(blog)) {
      formData.append(key, value);
    }

    // Append files to FormData
    files.forEach((file) => {
      formData.append('files', file);
    });

    // Append tags to FormData
    tags.forEach((tag) => {
      formData.append('tag', tag);
    });

    // Make the POST request with FormData and multipart/form-data header
    const response = await axios.post(`${API_URL}/create`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Method to add react (like/dislike or other reactions)
  addReact: async (id, postType, type, isSaved) => {
    const response = await axios.post(`${API_URL}/blogs/react`, { id, postType, type, isSaved });
    return response.data;
  },
};
