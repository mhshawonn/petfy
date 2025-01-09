import React from "react";

// MessageCard.jsx
const MessageCard = ({ isReqUserMessage, content, type }) => {
  return (
    <div
      className={`flex ${
        isReqUserMessage ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`max-w-[70%] p-3 rounded-lg ${
          isReqUserMessage
            ? "bg-blue-500 text-white rounded-br-none"
            : "bg-gray-200 text-gray-800 rounded-bl-none"
        }`}
      >
        {type === "text" ? (
          <p>{content}</p>
        ) : (
          <img
            src={content}
            alt="message"
            className="max-w-full rounded"
          />
        )}
      </div>
    </div>
  );
};

export default MessageCard;
