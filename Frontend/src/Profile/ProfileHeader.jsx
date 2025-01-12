import React, { useState, useEffect } from "react";
import { FaCamera, FaEdit } from "react-icons/fa";
import axios from "axios";
// import { useAuth } from './AuthContext';
import { useDispatch, useSelector } from "react-redux";
import { currentUser } from "../Redux/Auth/Action";
import Image from "./default.gif";
import { uploadFileToFirebase } from "../FirebaseService";

const BASE_API_URL = "http://localhost:8080";

const ProfileHeader = () => {
  // const { user, updateUser } = useAuth();
  const [profile, setProfile] = useState(null);
  const [bio, setBio] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [profilePic, setProfilePic] = useState(null);

  const dispatch = useDispatch();
  const { auth } = useSelector((store) => store);
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    if (token && auth?.reqUser == null) {
      dispatch(currentUser(token));
    }

    if (auth?.reqUser) {
      setProfile(auth?.reqUser);
      setBio(auth?.reqUser?.bio || "");
      setProfilePic(auth?.reqUser?.profilePic);
    }
  }, []);

  const handleProfilePicUpload = async (event) => {
    const file = event.target.files[0];

    if (file == null) return;

    const fileUrl = await uploadFileToFirebase(file);

    try {
      const response = await axios.post(
        `${BASE_API_URL}/user/upload/image/${auth?.reqUser?.id}`,
        null,
        {
          params: { imageUrl: fileUrl },
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        dispatch(currentUser(token));
      } else {
        console.log("error in uploading image");
      }

      setIsEditing(false);
    } catch (error) {
      console.error("Profile pic upload error", error);
    }
  };

  const handleBioUpdate = async () => {
    try {
      const response = await axios.post(
        `${BASE_API_URL}/user/updateBio/${auth?.reqUser?.id}`,
        null,
        {
          params: { bio: bio },
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("response : ", response);

      if (response.status === 200) {
        dispatch(currentUser(token));

        console.log("Bio updated successfully");
        // No need to manually update profile here, as it will automatically re-render on state change
      } else {
        console.log("error in uploading image");
      }

      setIsEditing(false);
    } catch (error) {
      console.error("Bio update error", error);
    }
  };

  useEffect(() => {
    setProfile(auth?.reqUser);
    setBio(auth?.reqUser?.bio || "");
    setProfilePic(auth?.reqUser?.profilePic);
  }, [token]);

  useEffect(() => {
    if (auth?.reqUser) {
      setProfile(auth?.reqUser);
      setBio(auth?.reqUser?.bio || "");
      setProfilePic(auth?.reqUser?.profilePic);
    }
  }, [profile, auth?.reqUser]);

  if (profile == null) return <div>Loading...</div>;

  return (
    <div className="profile-header flex flex-col items-center">
      <div className="relative">
        <img
          src={profilePic || Image}
          alt="Profile"
          className="w-32 h-32 rounded-full object-cover"
        />

        <label className="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full p-2 cursor-pointer">
          <FaCamera />
          <input
            type="file"
            accept="image/*"
            onChange={handleProfilePicUpload}
            className="hidden"
          />
        </label>
      </div>

      <div className="mt-4 text-center">
        <h2 className="text-2xl font-bold">{profile?.username}</h2>

        {isEditing ? (
          <div className="mt-2">
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full p-2 border rounded"
              maxLength={200}
            />
            <div className="flex justify-center space-x-2 mt-2">
              <button
                onClick={handleBioUpdate}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Save
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="bg-gray-300 text-black px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="mt-2">
            <p className="text-gray-600">{profile.bio || "No bio yet"}</p>
            <button
              onClick={() => setIsEditing(true)}
              className="mt-2 flex items-center gap-2 mx-auto"
            >
              <FaEdit /> Edit Bio
            </button>
          </div>
        )}

        <div className="flex justify-center space-x-6 mt-4">
          <div>
            <span className="font-bold">4</span>
            <p className="text-gray-600">Posts</p>
          </div>
          <div>
            <span className="font-bold">1000</span>
            <p className="text-gray-600">Followers</p>
          </div>
          <div>
            <span className="font-bold">500</span>
            <p className="text-gray-600">Following</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
