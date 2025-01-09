import axios from 'axios';

const API_URL = 'http://localhost:8080/blog';

export const blogService = {
  getBlogs: async (page = 0) => {
    try {
      const response = await axios.get(`${API_URL}/get/${page}`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch blogs');
    }
  },

  createBlog: async (blog, files, tags) => {
    try {
      const formData = new FormData();
      formData.append('blog', JSON.stringify(blog));
      
      files.forEach(file => {
        formData.append('files', file);
      });

      formData.append('tag', JSON.stringify(tags));

      const response = await axios.post(`${API_URL}/create`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      return response.data;
    } catch (error) {
      throw new Error('Failed to create blog');
    }
  },

  giveReact: async (id, type) => {
    try {
      const response = await axios.get(`${API_URL}/giveReact`, {
        params: { id, type }
      });
      return response.data;
    } catch (error) {
      throw new Error('Failed to react to blog');
    }
  },

  getReactions: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/showReact`, {
        params: { id }
      });
      return response.data;
    } catch (error) {
      throw new Error('Failed to get reactions');
    }
  }
};