import React from 'react';
import Logo from "./assets/image/logopet.png";
import aos from "aos";
import "aos/dist/aos.css";
import Profile from "./assets/image/user.png";
import { Link } from 'react-router-dom';

export default function Navbar() {
  React.useEffect(() => {
    aos.init({ duration: 200, easing: "ease-in-out" });
  }, []);

  return (
    <div
      data-aos="fade-down"
      className="fixed top-0 right-0 w-full z-50 bg-black/10 backdrop-blur-sm py-4 sm:py-4"
    >
      <div className="container">
        <div className="flex justify-between items-center">
          {/* Logo and Title */}
          <div className="flex text-white text-2xl font-bold gap-4 items-center">
            <Link to='./'>
           
            <img
              src={Logo}
              alt="PetFy Logo"
              className="w-20 hover:drop-shadow-2xl transition-all duration-300 transform hover:scale-110"
            />
             </Link>
             <Link to='./'>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-red-500 
                font-extrabold text-4xl tracking-wide drop-shadow-lg hover:drop-shadow-2xl 
                transition-all duration-300 transform hover:scale-110"
            >
              PetFy
            </span>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="text-pink-500 font-bold">
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
                <Link to="/shop" className="hover:text-white transition-colors">
                  Shop
                </Link>
              </li>

              {/* Login Button */}
              <div
                className="text-white bg-gradient-to-r from-pink-500 to-red-500 border-2 border-white 
                px-6 py-2 rounded-lg shadow-lg hover:shadow-2xl hover:bg-gradient-to-r 
                hover:from-red-500 hover:to-pink-500 transition-transform transform 
                hover:scale-105"
              >
                <Link to="/login">Login</Link>
              </div>

              {/* Profile Image */}
              <div>
               <Link to='/profile'> <img
                  src={Profile}
                  alt="User Profile"
                  className="w-16 h-15 hover:drop-shadow-2xl 
                  transition-all duration-300 transform hover:scale-110"
                />
                </Link>
              </div>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}