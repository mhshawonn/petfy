import React, { useState } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { AiOutlineClose } from "react-icons/ai"; 
import ChatPage from "../../src/assets/ChatApp/ChatPage";


const ChatModal = ({ open, onClose }) => {
  if (!open) return null;

  return ReactDOM.createPortal(
    <>
      {/* Modal container with relative positioning */}
      <div className="fixed inset-0 z-40 flex justify-center items-center bg-black bg-opacity-50">
        <div className="relative w-[80vw] h-[80vh] bg-white rounded-lg">
          {/* Close button positioned at the top-right of the modal */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-pink-500 bg-transparent hover:bg-gray-700 p-2 rounded-full z-60"
          >
            <AiOutlineClose size={30} />
          </button>

          {/* Chat page content */}
          <ChatPage />
        </div>
      </div>
    </>,
    document.getElementById("portal")
  );
};

ChatModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ChatModal;
