
import ReactDOM from 'react-dom/client';
import App from './App';
import {createBrowserRouter,RouterProvider } from "react-router-dom";
import About from './About';
import { Children } from 'react';
import Home from './Home'
import ErrorPage from './ErrorPage';
import Profile from './Profile/Profile';





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
        }
      ]
    },
    
  ]);





const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  
    <RouterProvider router={router} />
    
   
    
 
);