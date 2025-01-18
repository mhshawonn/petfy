import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { currentUser } from "../../../Redux/Auth/Action";

const BASE_API_URL = "http://localhost:8080";

export default function FeedPosts() {
  const dispatch = useDispatch(); 
  const { auth } = useSelector((store) => store);  // access Redux store to get auth data
  const token = localStorage.getItem("authToken");
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    // Fetch user data if not already present
    if (token && auth?.reqUser == null) {
      dispatch(currentUser(token));  // call action to fetch user data
    }

    if (auth?.reqUser) {
      setProfile(auth?.reqUser);  // set user profile data
    }
  }, [token, auth, dispatch]);

  if(profile==null ) return (<div>Loadin ....</div>)

  

  return (
    <div className="flex justify-between items-center w-full my-2">
      <div className="flex items-center gap-2">
        {/* Display user profile image dynamically */}
        <img
          src={profile.profilePic || 'default_image_url'}  // Use a default image if profilePic is null
          alt="user profile"
          className="w-8 h-8 rounded-full"
        />
        <div className="text-sm font-bold flex gap-2 transition-all duration-300 transform hover:scale-110">
          {/* Display user name dynamically */}
          {profile.username}
          <span className="text-gray-500">1w</span>
        </div>
        <div className="cursor-pointer">
          <span
            className="text-pink-600 font-bold text-sm transition-colors duration-200 ease-in-out hover:text-blue-600"
          >
            Unfollow
          </span>
        </div>
      </div>
    </div>
  );
}
