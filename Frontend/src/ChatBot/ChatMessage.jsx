import React from "react";

const ChatMessage = ({ role, text }) => {
  const isUser = role === "user";
  return (
    <div
      className={`flex ${isUser ? "justify-end" : "justify-start"} mb-2`}
    >
      <div
        className={`p-2 rounded-lg ${
          isUser ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"
        } max-w-xs`}
      >
        {text}
      </div>
    </div>
  );
};

export default ChatMessage;
