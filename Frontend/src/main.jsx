
import ReactDOM from 'react-dom/client';
import App from './App';
import {createBrowserRouter,RouterProvider } from "react-router-dom";
import About from './About';
import { Children } from 'react';
import Home from './Home'
import ErrorPage from './ErrorPage';
import Profile from './Profile/ProfileHeader';
import Pet from './assets/Pet/Feed/Pet';





const router = createBrowserRouter([
    {
      path: "/",
      element: <App/>,
      errorElement:<ErrorPage/>,
      children:[
        {
            path:"/",
            element:<Home/>,
        },
        {
            path:"/about",
            element:<About/>
            
        },
        {
            path:"/profile",
            element:<Profile/>
        },
        {
          path:"/pet",
          element:<Pet/>
      }
      ]
    },
    
  ]);





const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  
    <RouterProvider router={router} />
    
   
    
 
);