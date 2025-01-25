// ChatWidget.jsx
import React, { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import ChatBot from "./ChatBot";
import Image from "../../src/assets/image/blackdog.jpg"

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showInitialMessage, setShowInitialMessage] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowInitialMessage(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Initial Message Bubble */}
      {showInitialMessage && !isOpen && (
        <div className="absolute bottom-16 right-0 bg-white rounded-lg shadow-lg p-3 mb-2 w-64">
          <div className="flex justify-between items-start">
            <div className="flex items-start space-x-2">
              <img
                src={Image}
                alt="Support"
                className="w-10 h-10 rounded-full"
              />
              <p className="text-sm text-gray-800">
                Sir, How can I help you today?
              </p>
            </div>
            <button
              onClick={() => setShowInitialMessage(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <IoClose size={20} />
            </button>
          </div>
        </div>
      )}

      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-white p-2 rounded-full shadow-lg"
      >
        <img
          src={Image}
          alt="Support"
          className="w-12 h-12 rounded-full"
        />
      </button>

      {/* Chat Modal */}
      {isOpen && (
        <div className="absolute bottom-20 right-0 w-[380px] h-[500px] bg-white rounded-lg shadow-xl overflow-hidden">
          <ChatBot onClose={handleClose} />
        </div>
      )}
    </div>
  );
};

export default ChatWidget;