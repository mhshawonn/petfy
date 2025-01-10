import React, { useState } from 'react';
import axios from 'axios';

function CreateBlog() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [files, setFiles] = useState([]);

  const handleFileChange = (e) => {
    setFiles(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('blog', JSON.stringify({ title, content }));
    Array.from(files).forEach((file) => formData.append('files', file));
    console.log('Tag:', tags);
    console.log('Tags:', tags.split(',').map(tag => parseInt(tag.trim())));
    formData.append('tag', tags.split(',').map(tag => parseInt(tag.trim())));

    // try {
    //   const response = await axios.post('http://localhost:8080/blog/create', formData, {
    //     headers: {
    //       'Content-Type': 'multipart/form-data',
    //     },
    //   });
    //   console.log('Blog created successfully:', response.data);
    // } catch (error) {
    //   console.error('Error creating blog:', error);
    // }
  };

  return (
    <div className="max-w-3xl mx-auto my-10 p-6 border border-gray-300 rounded-lg shadow-lg bg-white">
      <h2 className="text-2xl font-bold mb-4">Create a New Blog Post</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="title">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="content">
            Content
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
            rows="5"
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="tags">
            Tags (comma-separated)
          </label>
          <input
            type="text"
            id="tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="files">
            Upload Images
          </label>
          <input
            type="file"
            id="files"
            multiple
            onChange={handleFileChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>
        <button
          type="submit"
          className="text-white font-bold bg-gradient-to-r from-blue-500 to-green-500 px-6 py-2 rounded-lg shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105"
        >
          Create Blog
        </button>
      </form>
    </div>
  );
}

export default CreateBlog;