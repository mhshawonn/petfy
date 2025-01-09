// src/components/chat/MessageList.jsx
import React, { useEffect, useRef } from "react";
import MessageCard from "./MessageCard";

const MessageList = ({ messages, currentUserId }) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="px-10 h-[85%] overflow-y-scroll bg-[#efeae2]">
      <div className="space-y-1 flex flex-col justify-center mt-20 py-2">
        {messages?.map((message, i) => (
          <MessageCard
            key={i}
            isReqUserMessage={message?.user?.id === currentUserId}
            content={message?.content}
            type={message?.type}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default MessageList;