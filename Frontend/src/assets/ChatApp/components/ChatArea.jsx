// components/chat/ChatArea/ChatArea.jsx
import React from 'react';
import ChatHeader from './ChatHeader';
import MessageList from './MessageList';
import MessageInput from './MessageInput';

export const ChatArea = ({
  currentChat,
  auth,
  messages,
  onSendMessage,
  onSendFile,
}) => {
  return (
    <div className="w-[70%] relative bg-blue-200">
      <ChatHeader chat={currentChat} currentUser={auth.reqUser} />
      
      <MessageList 
        messages={messages}
        currentUserId={auth.reqUser?.id}
      />
      
      <MessageInput
        onSendMessage={onSendMessage}
        onSendFile={onSendFile}
      />
    </div>
  );
};