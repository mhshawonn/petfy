import React, { useEffect, useState } from 'react';
import Logo from "./assets/image/logopet.png";
import aos from "aos";
import "aos/dist/aos.css";
import Profile from "./assets/image/user.png";
import { Link } from 'react-router-dom';
import { currentUser } from './Redux/Auth/Action';
const BASE_API_URL = "http://localhost:8080";
import { useDispatch, useSelector } from "react-redux";

export default function Navbar() {
  React.useEffect(() => {
    aos.init({ duration: 200, easing: "ease-in-out" });
  }, []);

  const dispatch = useDispatch(); 
  const { auth } = useSelector((store) => store);  // access Redux store to get auth data
  const token = localStorage.getItem("authToken");
  const [profile, setProfile] = useState(null);


  useEffect(()=>{
    if(token && auth?.reqUser == null){
      dispatch(currentUser(token))

    }
    if(auth?.reqUser){
      setProfile(auth?.reqUser)
    }
  },[token,auth,dispatch])

  return (
    <div
      data-aos="fade-down"
      className="fixed top-0 left-0 w-full z-30 bg-black/10 backdrop-blur-sm py-4 sm:py-4 "
    >
      <div className="container px-4 mx-auto">
        <div className="flex justify-between items-center">
          {/* Logo and Title */}
          <div className="flex items-center gap-4 mx-8">
            <Link to='./'>
              <img
                src={Logo}
                alt="PetFy Logo"
                className="w-20 hover:drop-shadow-2xl transition-all duration-300 transform hover:scale-110"
              />
            </Link>
            <Link to='./'>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-red-500 font-extrabold text-4xl tracking-wide drop-shadow-lg hover:drop-shadow-2xl transition-all duration-300 transform hover:scale-110">
                PetFy
              </span>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex text-pink-500 font-bold">
            <ul className="flex items-center gap-6 text-xl py-4 sm:py-0">
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/pet" className="hover:text-white transition-colors">
                  Pet
                </Link>
              </li>
              <li>
                <Link to="/donate" className="hover:text-white transition-colors">
                  Donate
                </Link>
              </li>

              {/* Login Button */}
              <div
                className="text-white bg-gradient-to-r from-pink-500 to-red-500 border-2 border-white px-6 py-2 rounded-lg shadow-lg hover:shadow-2xl hover:bg-gradient-to-r hover:from-red-500 hover:to-pink-500 transition-transform transform hover:scale-105"
              >
                <Link to="/login">Login</Link>
              </div>

              {/* Profile Image */}
              <div>
                <Link to='/profile'>
                  <img
                    src={profile?.profilePic || Profile}
                    alt="User Profile"
                    className="w-16 h-16 rounded-full object-cover hover:drop-shadow-2xl transition-all duration-300 transform hover:scale-110"
                  />
                </Link>
              </div>
            </ul>
          </div>

          {/* Mobile Navigation (Hamburger Menu for small screens) */}
          <div className="flex md:hidden items-center gap-4">
            <div className="relative">
              <button className="text-white text-2xl">
                <span className="block w-6 h-0.5 bg-white my-1"></span>
                <span className="block w-6 h-0.5 bg-white my-1"></span>
                <span className="block w-6 h-0.5 bg-white my-1"></span>
              </button>
            </div>
            {/* Mobile Profile Image */}
            <div>
              <Link to='/profile'>
                <img
                  src={Profile}
                  alt="User Profile"
                  className="w-16 h-15 hover:drop-shadow-2xl transition-all duration-300 transform hover:scale-110"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
