// pages/ChatPage.jsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ChatSidebar } from './ChatSidebar';
import { ChatArea } from './ChatArea';
import { useWebSocket } from '../service/websocket';
import { searchUser, currentUser } from '../../../Redux/Auth/Action';
import { createChat, getUsersChat } from '../../../Redux/Chat/Action';
import { createMessage, getAllMessages } from '../../../Redux/Message/Action';

const ChatPage = () => {
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const dispatch = useDispatch();
  const { auth, chat, message } = useSelector((store) => store);
  const token = localStorage.getItem("authToken");

  const handleMessageReceive = (payload) => {
    const receivedMessage = JSON.parse(payload.body);
    setMessages(prev => [...prev, receivedMessage]);
  };

  const { stompClient, isConnect } = useWebSocket(token, currentChat, handleMessageReceive);

  // ... your existing effects and handlers ...

  return (
    <div className="relative">
      <div className="w-full py-14 bg-[#00a884]" />
      <div className="flex bg-[#f0f2f5] h-[90vh] w-[96vw] absolute left-[2vw] top-[5vh]">
        <ChatSidebar
          auth={auth}
          queries={queries}
          searchedUsers={searchedUsers}
          chat={chat}
          onSearch={handleSearch}
          onChatSelect={handleCurrentChat}
          onUserSelect={handleClickOnChatCard}
        />

        {currentChat ? (
          <ChatArea
            currentChat={currentChat}
            auth={auth}
            messages={messages}
            onSendMessage={handleCreateNewMessage}
            onSendFile={handleSendFile}
          />
        ) : (
          <WelcomeScreen />
        )}
      </div>
    </div>
  );
};

export default ChatPage;