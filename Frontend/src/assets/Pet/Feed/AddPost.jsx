import React, { useState, useEffect } from "react";
import axios from "axios";
import { use } from "react";

function AddPost() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]); // For storing sub-categories
  const [category, setCategory] = useState(""); // Selected category
  const [subCategory, setSubCategory] = useState(""); // Selected sub-category
  const [location, setLocation] = useState("");
  const [locationId, setLocationId] = useState(null);
  const [animalId, setAnimalId] = useState(null); // Assuming animal ID is needed
  const [addressSuggestions, setAddressSuggestions] = useState([]); 
  const [categoryIds, setcategoryIds] = useState([]);

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
    if (location.length > 2) { // Trigger the request when at least 3 characters are entered
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
    
      axios
        .get(`http://localhost:8080/animal/getCategory/${category}`)
        .then((response) => {
          setSubCategories(response.data);
          console.log(response)
          console.log(response.data)
        })
        .catch((error) => console.error("Error fetching sub-categories:", error));
    
  }, [category]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setImage(file);
  };

  const getAnimalId = (animal_sub_category, category) => {
    for (let sub_cat of category) {
      if (sub_cat.name === animal_sub_category) {
        return sub_cat.id;
      }
    }
  
    return -1; // Return -1 if no match is found
  };
  


  const handleSubmit = async () => {
    if (!name || !description || !category || !subCategory || !location || !image) {
      alert("Please fill out all fields.");
      return;
    }

    const url = new URL(`http://localhost:8080/pet/add?animal_id=${Number(category)}&category_ids=1,2&address_id=${locationId}`); 
    const params = new URLSearchParams();
    const formData = new FormData();
    formData.append("pet", JSON.stringify({ name, description }));
    formData.append("files", image);
    
    console.log("Dekhte")
    console.log(categories)
    console.log(categories, location, name, description,category)
    url.search = params.toString();
    console.log(url);

    try {
      const response = await axios.post(url, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Post submitted successfully!");
      closeModal();
    } catch (error) {
      console.error("Error submitting post:", error);
      alert("Failed to submit post. Check the console for details.");
    }
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row items-center gap-10 mt-20 justify-center mb-28">
        <span className="font-bold hover:drop-shadow-2xl transition-all duration-300 transform hover:scale-110">
          Add your Post
        </span>
        <button
          onClick={openModal}
          className="text-white bg-pink-500 hover:bg-blue-700 px-4 py-2 rounded-md"
        >
          Add
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 mt-40">
          <div className="bg-white p-6 rounded-lg w-full sm:w-96">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-semibold text-xl text-pink-600">Create a Post</h2>
              <button
                onClick={closeModal}
                className="text-pink-500 text-lg font-bold"
              >
                X
              </button>
            </div>

            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
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
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-3 border border-pink-400 rounded-md"
                placeholder="Enter Description"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                Image
              </label>
              <input
                type="file"
                id="image"
                onChange={handleImageChange}
                className="w-full p-3 border border-pink-400 rounded-md"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                Category
              </label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-3 border border-pink-400 rounded-md"
              >
                <option value="">Select a Category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}

                  </option>
                ))}
              </select>
            </div>

            {/* Sub-category Dropdown */}
            {category && (
              <div className="mb-4">
                <label htmlFor="subCategory" className="block text-sm font-medium text-gray-700">
                  Sub-Category
                </label>
                <select
                  id="subCategory"
                  value={subCategory}
                  onChange={(e) => setSubCategory(e.target.value)}
                  className="w-full p-3 border border-pink-400 rounded-md"
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

              <div className="mb-4">
              <label htmlFor="location" className="block text-sm font-medium text-gray-500">
                Location
              </label>
              <input
                type="text"
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full p-3 border border-pink-400 rounded-md"
                placeholder="Enter Location"
              />
              {addressSuggestions.length > 0 && (
                <ul className="mt-2 border border-gray-300 rounded-md">
                  {addressSuggestions.map((address) => (
                    <li
                      key={address.id}
                      onClick={() => {
                        setLocation(address.city);
                        setLocationId(address.id);
                        setAddressSuggestions([]); // Clear suggestions once an address is selected
                      }}
                      
                      className="p-2 cursor-pointer hover:bg-gray-100"
                    >
                      {address.city}
                    </li>
                  ))}
                </ul>
              )}
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
