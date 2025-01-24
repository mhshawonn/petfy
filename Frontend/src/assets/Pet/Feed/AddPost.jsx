import React, { useState, useEffect } from "react";
import axios from "axios";
import { currentUser } from "../../../Redux/Auth/Action";
import { useDispatch, useSelector } from "react-redux";

function AddPost({ onPostCreated }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]); // For storing sub-categories
  const [category, setCategory] = useState(""); // Selected category
  const [subCategory, setSubCategory] = useState(""); // Selected sub-category
  const [location, setLocation] = useState("");
  const [locationId, setLocationId] = useState(null);
  const [addressSuggestions, setAddressSuggestions] = useState([]);
  const [categoryIds, setCategoryIds] = useState([]);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  // Fix: Select only the auth state
  const auth = useSelector((state) => state.auth);
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    if (!token) {
      dispatch(currentUser(token));
    }
  }, [dispatch, token]);

  // Fetch categories on component mount
  useEffect(() => {
    axios
      .get("http://localhost:8080/animal/getAnimal") // Update the port if necessary
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  // Fetch address suggestions as the user types in the location field
  useEffect(() => {
    if (location.length > 2) {
      // Trigger the request when at least 3 characters are entered
      axios
        .get(`http://localhost:8080/address/getByCity?location=${location}`)
        .then((response) => {
          setAddressSuggestions(response.data);
        })
        .catch((error) => console.error("Error fetching address suggestions:", error));
    } else {
      setAddressSuggestions([]); // Clear the suggestions if the location is too short
    }
  }, [location]);

  // Fetch sub-categories whenever category changes
  useEffect(() => {
    if (category) {
      axios
        .get(`http://localhost:8080/animal/getCategory/${category}`)
        .then((response) => {
          setSubCategories(response.data);
        })
        .catch((error) => console.error("Error fetching sub-categories:", error));
    } else {
      setSubCategories([]);
      setSubCategory("");
    }
  }, [category]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) setImage(files);
  };

  const handleSubmit = async () => {
    try {
      // Validate required fields
      if (!name || !description || !category || !image) {
        alert("Please fill all required fields");
        return;
      }
  
      // Create FormData object
      const formData = new FormData();
      
      // Add pet JSON
      const petData = {
        name: name,
        description: description
        // add other pet fields as needed
      };
      formData.append("pet", JSON.stringify(petData));
      
      // Add files
      if (Array.isArray(image)) {
        image.forEach(file => {
          formData.append("multipartFiles", file);
        });
      } else {
        formData.append("multipartFiles", image);
      }
      
      // Add other parameters
      formData.append("animal_id", category);
      if (categoryIds && categoryIds.length > 0) {
        formData.append("category_ids", categoryIds.join(','));
      }
      if (locationId) {
        formData.append("address_id", locationId);
      }
  
      // Make the API call
      const response = await axios.post(
        "http://localhost:8080/pet/add",
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
  
      if (response.data) {
        alert("Post submitted successfully!");
        closeModal();
      }
    } catch (error) {
      console.error("Error submitting post:", error);
      alert(error.response?.data?.message || "Failed to submit post");
    }
  };


  return (
    <div className="max-w-2xl mx-auto my-8">
      <div
        className="p-4 bg-pink-500 text-white cursor-pointer hover:bg-pink-600 transition-colors rounded-lg shadow-md"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h2 className="text-xl font-semibold flex items-center justify-between">
          {isExpanded ? "Close Add Post Form" : "Add Your Post"}
          <span>{isExpanded ? "▲" : "▼"}</span>
        </h2>
      </div>

      {isExpanded && (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mt-4 space-y-4">
          {/* Name Field */}
          <div>
            <label htmlFor="name" className="block text-gray-700 font-medium mb-1">
              Name<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border border-pink-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
              placeholder="Enter Post Name"
              required
            />
          </div>

          {/* Description Field */}
          <div>
            <label htmlFor="description" className="block text-gray-700 font-medium mb-1">
              Description<span className="text-red-500">*</span>
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-3 border border-pink-400 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
              placeholder="Enter Description"
              rows="4"
              required
            />
          </div>

          {/* Image Upload */}
          <div>
            <label htmlFor="image" className="block text-gray-700 font-medium mb-1">
              Image<span className="text-red-500">*</span>
            </label>
            <input
              type="file"
              id="image"
              onChange={handleImageChange}
              className="w-full p-2 border border-pink-400 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
              multiple
              accept="image/*"
              required
            />
            {image.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {image.map((file, index) => (
                  <span key={index} className="text-sm text-gray-600 bg-gray-200 px-2 py-1 rounded">
                    {file.name}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Category Selection */}
          <div>
            <label htmlFor="category" className="block text-gray-700 font-medium mb-1">
              Category<span className="text-red-500">*</span>
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-3 border border-pink-400 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
              required
            >
              <option value="">Select a Category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Sub-Category Selection */}
          {category && (
            <div>
              <label htmlFor="subCategory" className="block text-gray-700 font-medium mb-1">
                Sub-Category
              </label>
              <select
                id="subCategory"
                value={subCategory}
                onChange={(e) => setSubCategory(e.target.value)}
                className="w-full p-3 border border-pink-400 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
              >
                <option value="">Select a Sub-Category</option>
                {subCategories.map((sub) => (
                  <option key={sub.id} value={sub.id}>
                    {sub.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Location Input */}
          <div className="relative">
            <label htmlFor="location" className="block text-gray-700 font-medium mb-1">
              Location
            </label>
            <input
              type="text"
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full p-3 border border-pink-400 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
              placeholder="Enter Location"
            />
            {addressSuggestions.length > 0 && (
              <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 max-h-60 overflow-y-auto">
                {addressSuggestions.map((address) => (
                  <li
                    key={address.id}
                    onClick={() => {
                      setLocation(address.city);
                      setLocationId(address.id);
                      setAddressSuggestions([]);
                    }}
                    className="p-2 cursor-pointer hover:bg-gray-100"
                  >
                    {address.city}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className={`w-full text-white bg-pink-500 hover:bg-pink-600 py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400 transition-transform transform hover:-translate-y-1 hover:scale-105 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit Post"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default AddPost;