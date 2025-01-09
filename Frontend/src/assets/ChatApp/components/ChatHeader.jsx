// src/components/chat/ChatHeader.jsx
import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { BsThreeDotsVertical } from "react-icons/bs";

const ChatHeader = ({ chat, currentUser }) => {
  const otherUser = chat.users.find(user => user.id !== currentUser.id);

  return (
    <div className="header absolute top-0 w-full bg-[#f0f2f5]">
      <div className="flex justify-between items-center px-4 py-3">
        <div className="flex items-center space-x-4">
          <img
            className="w-10 h-10 rounded-full object-cover"
            src={otherUser?.profilePic || "/default-avatar.png"}
            alt={otherUser?.name}
          />
          <div>
            <p className="font-medium">{otherUser?.name}</p>
            <p className="text-sm text-gray-500">
              {otherUser?.isOnline ? "Online" : "Offline"}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <AiOutlineSearch className="text-xl cursor-pointer" />
          <BsThreeDotsVertical className="text-xl cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;