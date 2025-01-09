import React from "react";

const ChatCard = ({ name, userImg, lastMessage }) => {
  return (
    <div className="flex items-center px-4 py-3 hover:bg-gray-100 cursor-pointer">
      <img
        src={userImg || "default-avatar.png"}
        alt={name}
        className="w-12 h-12 rounded-full mr-3"
      />
      <div className="flex-1">
        <h3 className="font-semibold">{name}</h3>
        {lastMessage && (
          <p className="text-sm text-gray-500 truncate">{lastMessage}</p>
        )}
      </div>
    </div>
  );
};

export default ChatCard;
