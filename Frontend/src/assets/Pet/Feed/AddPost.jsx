import React, { useState } from 'react';

function AddPost() {
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control the modal visibility
  const [postContent, setPostContent] = useState(""); // State for the post content
  const [name, setName] = useState(""); // State for the post name
  const [description, setDescription] = useState(""); // State for the description
  const [image, setImage] = useState(null); // State for the image file
  const [category, setCategory] = useState(""); // State for the category
  const [location, setLocation] = useState(""); // State for the location

  // Function to handle opening the modal
  const openModal = () => setIsModalOpen(true);

  // Function to handle closing the modal
  const closeModal = () => setIsModalOpen(false);

  // Function to handle form submission
  const handleSubmit = () => {
    console.log("Post Content: ", postContent);
    console.log("Name: ", name);
    console.log("Description: ", description);
    console.log("Category: ", category);
    console.log("Location: ", location);
    // Handle the post submission here
    setPostContent(""); // Clear content after submission
    setName(""); // Clear name
    setDescription(""); // Clear description
    setCategory(""); // Clear category
    setLocation(""); // Clear location
    setImage(null); // Clear image
    closeModal(); // Close the modal after submission
  };

  // Handle image file change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file)); // Show preview of the image
    }
  };

  return (
    <>
      {/* Button to trigger the modal */}
      <div className='flex flex-col sm:flex-row items-center gap-10 mt-20 justify-center mb-10'>
        <span className=' font-bold hover:drop-shadow-2xl transition-all duration-300 transform hover:scale-110'>Add your Post</span>
        <button
          onClick={openModal}
          className="text-white bg-pink-500 hover:bg-blue-700 px-4 py-2 rounded-md"
        >
          Add
        </button>
      </div>
  
      {/* Modal: Only shown when isModalOpen is true */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 mt-40 ">
          <div className="bg-white p-6 rounded-lg w-full sm:w-96">
            {/* Modal Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-semibold text-xl text-pink-600">Create a Post</h2>
              <button
                onClick={closeModal}
                className="text-pink-500 text-lg font-bold"
              >
                X
              </button>
            </div>

            {/* Post Form */}
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 border border-pink-300 rounded-md"
                placeholder="Enter Post Name"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-3 border border-pink-400 rounded-md"
                placeholder="Enter Description"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image</label>
              <input
                type="file"
                id="image"
                onChange={handleImageChange}
                className="w-full p-3 border border-pink-400 rounded-md"
              />
              {image && (
                <div className="mt-2">
                  <img src={image} alt="Preview" className="w-32 h-32 object-cover" />
                </div>
              )}
            </div>

            <div className="mb-4">
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
                <select
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full p-3 border border-pink-400 rounded-md"
                >
                    <option value="">Select a Category</option>
                    <option value="dog">Dog</option>
                    <option value="cat">Cat</option>
                    <option value="birds">Birds</option>
                    <option value="fish">Fish</option>
                    <option value="rabbit">Rabbit</option>
                    <option value="horse">Horse</option>
                    <option value="cow">Cow</option>
                    <option value="hen">Hen</option>
                    <option value="duck">Duck</option>
                    <option value="goat">Goat</option>
                </select>
                </div>


            <div className="mb-4">
              <label htmlFor="location" className="block text-sm font-medium text-gray-500">Location</label>
              <input
                type="text"
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full p-3 border border-pink-400 rounded-md"
                placeholder="Enter Location"
              />
            </div>

            <div className="mb-4">
              <button
                onClick={handleSubmit}
                className="w-full text-white bg-pink-500 hover:bg-blue-700 py-2 rounded-md"
              >
                Submit Post
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default AddPost;
