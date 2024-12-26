import { Fragment, useState } from "react";
import bgVideo from "./assets/cat.mp4";
import "./App.css";
import Navbar from "./Navbar";
import Hero from "./Hero";
import Service from "./assets/Service/Service";
import Card from "./assets/Card/Card";
import Card2 from "./assets/Card/Card2";
import Footer from "./assets/Footer/Footer";
import AOS from "aos";
import "aos/dist/aos.css";
import React from "react";
import Fab from "@mui/material/Fab";
import ChatModal from "./Modals/ChatModal";

const App = () => {
  const [isOpenChatModal, setIsOpenChatModal] = useState(false);

  React.useEffect(() => {
    AOS.init({
      duration: 200,
      easing: "ease-in-out",
    });
  }, []); // Add empty dependency array here

  return (
    <Fragment>
      <div className="h-[700px] relative">
        <video
          autoPlay
          loop
          muted
          className="fixed right-0 top-0 h-[700px] w-full object-cover z-[-1]"
        >
          <source src={bgVideo} type="video/mp4" />
        </video>
        <Navbar />
        <Hero />
      </div>

      <Fab
        color="primary"
        aria-label="chat"
        className="fixed bg-[#ff0000] rounded-full p-3 text-white"
        onClick={() => setIsOpenChatModal(true)}
      ></Fab>

      <ChatModal
        open={isOpenChatModal}
        onClose={() => setIsOpenChatModal(false)}
      >
        hello there, i am inside chat modal
      </ChatModal>

      <div>
        <Service />
        <Card />
        <Card2 />
        <Footer />
      </div>
    </Fragment>
  );
};

export default App;
