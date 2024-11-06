import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/image/logopet.png'

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your login logic here (e.g., API call)
    if (!username || !password) {
      setErrorMessage('Please enter both username and password');
    } else {
      setErrorMessage('');
      // Proceed with authentication logic
      console.log('Logged in!');
    }
  };

  return (
    <div className="relative flex items-center justify-center h-screen bg-gray-100">
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: {logo} }}></div>

      <div className="absolute inset-0 bg-black bg-opacity-40"></div>

      <div className="relative z-10 w-full max-w-xs p-6 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <img
            src={logo}
            alt="logo"
            className="w-24 mx-auto mb-6"
          />
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Username"
                className="w-full p-3 border border-gray-300 rounded-md"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <input
                type="password"
                placeholder="Password"
                className="w-full p-3 border border-gray-300 rounded-md"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {errorMessage && (
              <p className="text-red-500 text-sm mb-4">{errorMessage}</p>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-pink-500 text-white font-semibold rounded-md hover:bg-blue-600 transition"
            >
              Log In
            </button>
          </form>

          <div className="mt-4 text-center">
            <span className="text-sm text-gray-600">Don't have an account?</span>
            <Link to="/signup" className="text-sm font-semibold text-pink-500 hover:underline">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
