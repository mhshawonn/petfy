
import ReactDOM from 'react-dom/client';
import App from './App';
import {createBrowserRouter,RouterProvider } from "react-router-dom";
import About from './About';
import { Children } from 'react';
import Home from './Home'
import ErrorPage from './ErrorPage';
import Profile from './Profile/ProfilePost';
import Pet from './assets/Pet/Feed/Pet';
import LogIn from "../src/LogIn/LogIn"
import SignUp from "../src/LogIn/SignUp"
import ChatPage from './ChatPage';
import { Provider } from 'react-redux'; 
import {store} from './Redux/store';


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
        },
        {
        path:"/login",
        element:<LogIn/>
        },
        {
        path:"/signup",
        element:<SignUp/>
        },
        {
          path:"/chat",
          element:<ChatPage/>
        }
      ]
    },
    
  ]);





const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
   
    
 
);