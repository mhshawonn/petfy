import React, { useState } from 'react';
import { blogService } from '../services/blogService';

const CreateBlog = ({ onBlogCreated }) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    files: [],
    tags: []
  });
  const [loading, setLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({
      ...prev,
      files: Array.from(e.target.files)
    }));
  };

  const handleTagChange = (e) => {
    const tags = e.target.value.split(',').map(tag => tag.trim());
    setFormData(prev => ({
      ...prev,
      tags
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const blogData = {
        title: formData.title,
        content: formData.content
      };

      await blogService.createBlog(blogData, formData.files, formData.tags);
      alert('Blog created successfully!');
      
      // Reset form
      setFormData({
        title: '',
        content: '',
        files: [],
        tags: []
      });
      setIsExpanded(false);
      
      if (onBlogCreated) {
        onBlogCreated();
      }
    } catch (error) {
      alert(error.message || 'Failed to create blog');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div
        className="p-4 bg-pink-500 text-white cursor-pointer hover:bg-blue-600 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h2 className="text-xl font-semibold flex items-center justify-between">
          Create a New Blog Post
          <span>{isExpanded ? '▼' : '▶'}</span>
        </h2>
      </div>
      
      {isExpanded && (
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Title
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name="title"
              type="text"
              value={formData.title}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Content
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32"
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Images
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="file"
              multiple
              onChange={handleFileChange}
              accept="image/*"
            />
            {formData.files.length > 0 && (
              <div className="mt-2 flex gap-2">
                {Array.from(formData.files).map((file, index) => (
                  <div key={index} className="text-sm text-gray-600">
                    {file.name}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Tags (comma-separated)
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              value={formData.tags.join(', ')}
              onChange={handleTagChange}
              placeholder="tag1, tag2, tag3"
            />
          </div>

          <button
            className="bg-pink-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            type="submit"
            disabled={loading}
          >
            {loading ? 'Creating...' : 'Create Blog'}
          </button>
        </form>
      )}
    </div>
  );
};

export default CreateBlog;