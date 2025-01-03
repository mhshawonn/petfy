import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // To navigate after login
import logo from "../assets/image/logopet.png"; // Assuming this is your logo
import { useDispatch } from "react-redux";
import { login, currentUser } from "../Redux/Auth/Action";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { auth } = useSelector((store) => store);
  const token = localStorage.getItem("authToken");

  // Hook to navigate to different pages

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setErrorMessage("Please enter both username and password");
    } else {
      const data = { username, password };

      dispatch(login(data))
        .then((response) => {
          console.log("response", response);

          console.log("login auth", auth?.reqUser);

          if (response.success) {
            navigate("/");
          } else {
            setErrorMessage("Invalid username or password");
            console.error(response.message);
          }
        })
        .catch((error) => {
          setErrorMessage("An error occurred. Please try again.");
          console.error(error);
        });
      // Redirect to the profile page after login
    }
  };

  useEffect(() => {
    if (token) {
      dispatch(currentUser(token));

      if (auth?.reqUser?.name) {
        // console.log("q You are already logged in as " + auth?.reqUser);
      }
    }
  }, [token]);

  useEffect(() => {
    if (auth?.reqUser?.name) {
      // navigate("/");
      console.log("You are already logged in as " + auth?.reqUser?.name);
    }
  }, [auth?.reqUser]);

  console.log("auth", auth?.reqUser);
  console.log("auth name", auth?.reqUser?.name);

  return (
    <div className="relative flex items-center justify-center h-screen bg-gray-100">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${logo})` }}
      ></div>
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      <div className="relative z-10 w-full max-w-xs p-6 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <img src={logo} alt="logo" className="w-24 mx-auto mb-6" />
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
            <span className="text-sm text-gray-600">
              Don't have an account?
            </span>
            <a
              href="/signup"
              className="text-sm font-semibold text-pink-500 hover:underline"
            >
              Sign Up
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
