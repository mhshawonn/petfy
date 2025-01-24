import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./Redux/store";

import App from "./App";
import About from "./About";
import Home from "./Home";
import ErrorPage from "./ErrorPage";
import Profile from "./Profile/ProfilePost";
import Pet from "./assets/Pet/Feed/FeedPosts";
import LogIn from "./LogIn/LogIn";
import SignUp from "./LogIn/SignUp";
import ChatPage from "./../src/assets/ChatApp/ChatPage";
import BlogPage from "./Blog/pages/BlogPage";
import DonationPage from "./Donation/DonationPage";
import Donate from "./Donation/donate/Donate";
import ChatBot from "./ChatBot/ChatBot";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/pet",
        element: <Pet />,
      },
      {
        path: "/login",
        element: <LogIn />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/chat",
        element: <ChatPage />,
      },
      {
        path: "/blog",
        element: <BlogPage />,
      },
      {
        path: "/donate",
        element: <DonationPage />,
      },
      {
        path: "/donate/page",
        element: <Donate />,
      },
      {
        path: "/chatbot",
        element: <ChatBot />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
