import { Fragment } from "react";
import bgVideo from "./assets/cat.mp4";
import "./App.css";
import Navbar from "./Navbar";
import Footer from "./assets/Footer/Footer";
import AOS from "aos";
import "aos/dist/aos.css"
import React from "react";
import { Outlet } from "react-router-dom";



const App = () => {
     


  return (
    <Fragment>
   
    <Navbar/>
    <div className="relative z-10 pt-16">
    <Outlet></Outlet>
    </div>
    <div  className="relative ">

<Footer ></Footer>
    </div>
    
    </Fragment>
  );
};

export default App;