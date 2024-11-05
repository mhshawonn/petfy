import React from 'react';
import img from "../../src/assets/image/owl.jpg";

export default function ProfileHeader() {
  return (
    <div className="flex flex-col sm:flex-row items-center gap-6 mt-20 justify-center mb-10">
      <div className="flex justify-center sm:justify-center">
        <img
          src={img}
          alt="shawon"
          className="rounded-full w-24 h-24 sm:w-32 sm:h-32 object-cover"
        />
      </div>

      <div className="flex flex-col items-center sm:items-start gap-4">
        <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-10 w-full">
          <span className="text-lg font-semibold">Newbie</span>
          <div className="flex gap-6">
            <div className="flex flex-col items-center">
              <span className="font-bold">4</span>
              <span className="text-sm text-gray-600">Posts</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-bold">1000</span>
              <span className="text-sm text-gray-600">Followers</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-bold">200</span>
              <span className="text-sm text-gray-600">Following</span>
            </div>
          </div>
          <button   className="text-white font-bold bg-gradient-to-r from-pink-500 to-red-500 border-2 border-white 
                px-6 py-2 rounded-lg shadow-lg hover:shadow-2xl hover:bg-gradient-to-r 
                hover:from-red-500 hover:to-pink-500 transition-transform transform 
                hover:scale-105">
            EditProfile
          </button>
        </div>

        <div className="flex flex-col text-center sm:text-left mt-4">
          <p className="font-semibold">Newbie</p>
          <p className="text-gray-600 text-sm">Bio: Brief description or bio text goes here.</p>
        </div>
      </div>
    </div>
  );
}
