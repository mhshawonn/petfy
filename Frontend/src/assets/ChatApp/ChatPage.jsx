import React, { useState, useEffect } from "react";
import EmojiPicker from "emoji-picker-react";
import { AiOutlineSearch } from "react-icons/ai";
import { BsEmojiSmile, BsFilter, BsThreeDotsVertical } from "react-icons/bs";
import { ImAttachment } from "react-icons/im";
import ChatCard from "./components/ChatCard";
import MessageCard from "./components/MessageCard";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { searchUser, currentUser } from "../../Redux/Auth/Action";
import { createChat, getUsersChat } from "../../Redux/Chat/Action";
import { createMessage, getAllMessages } from "../../Redux/Message/Action";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";


const ChatPage = () => {
  const [queries, setQueries] = useState("");
  const [currentChat, setCurrentChat] = useState(null);
  const [content, setContent] = useState("");
  const [showPicker, setShowPicker] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [showFileInput, setShowFileInput] = useState(false);
  const [messages, setMessages] = useState([]);
  const [searchedUsers, setSearchedUsers] = useState([]);

  const dispatch = useDispatch();
  const { auth, chat, message } = useSelector((store) => store);
  const token = localStorage.getItem("authToken");
  const navigate = useNavigate();
  const [stompClient, setStompClient] = useState(null);
  const [isConnect, setIsConnect] = useState(false);

  const connect = () => {
    const socket = new SockJS("http://localhost:8080/ws");
    const temp = Stomp.over(socket);

    const headers = {
      Authorization: `Bearer ${token}`,
      "X-XSRF-TOKEN": getCookies("XSRF-TOKEN"),
    };

    temp.connect(headers, onConnect, onError);
    setStompClient(temp);
  };

  function getCookies(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  }

  const onError = (error) => {
    console.log("stomp error-----> ", error);
    setIsConnect(false);
  };

  const onConnect = () => {
    setIsConnect(true);
  };

  useEffect(() => {
    if (isConnect && stompClient && auth.reqUser && currentChat) {
      const subscription = stompClient.subscribe(
        `/group/${currentChat.id}`,
        onMessageReceive
      );
      return () => {
        subscription.unsubscribe();
      };
    }
  }, [isConnect, stompClient, auth.reqUser, currentChat]);

  useEffect(() => {
    connect();
  }, []);

  useEffect(() => {
    if (message?.messages) {
      setMessages(message?.messages);
    }
  }, [message.messages]);

  const onMessageReceive = (payload) => {
    const receivedMessage = JSON.parse(payload.body);
    setMessages((prevMessages) => {
      const updatedMessages = [...prevMessages, receivedMessage];
      return updatedMessages;
    });
  };

  const handleSearch = (keyword) => {
    dispatch(searchUser({ keyword, token, userId: auth?.reqUser?.id, searching: true }));
  };

  const handleCreateNewMessage = () => {
    dispatch(createMessage({
      senderUserId: auth?.reqUser?.id,
      data: { chatId: currentChat?.id, content: content, type: "text" }
    }));
    setContent("");
  };

  const handleSendFile = () => {
    dispatch(createMessage({
      senderUserId: auth?.reqUser?.id,
      data: { chatId: currentChat?.id, content: selectedFile, type: "image" }
    }));
    setShowFileInput(false);
    setSelectedFile(null);
  };

  useEffect(() => {
    if (auth?.reqUser?.id != null) {
      dispatch(getUsersChat({ id: auth?.reqUser?.id, token: token }));
    }
  }, [chat?.createChat]);

  useEffect(() => {
    if (currentChat?.id) {
      dispatch(getAllMessages({
        chatId: currentChat?.id,
        userId: auth?.reqUser?.id,
        token: token,
      }));
    }
  }, [currentChat, message.newMessage]);

  useEffect(() => {
    if (token) {
      dispatch(currentUser(token));
      dispatch(searchUser({ keyword: "*", token, userId: auth?.reqUser?.id, searching: false }));
    }
  }, [token]);

  useEffect(() => {
    if (auth?.searchUser) {
      setSearchedUsers(auth?.searchUser);
    }
  }, [auth?.searchUser]);

  const handleCurrentChat = (item) => {
    setCurrentChat(item);
  };

  const handleEmojiClick = (emoji) => {
    setContent((prev) => prev + emoji.emoji);
    setShowPicker(false);
  };

  return (
   
      <div className="h-full flex overflow-hidden">
        {/* Left Sidebar */}
        <div className="w-[320px] flex flex-col border-r border-gray-200 bg-white">
          {/* User Profile Header */}
          <div className="p-4 border-b">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <img
                  className="w-10 h-10 rounded-full"
                  src={auth?.reqUser?.profilePic || "default-avatar.png"}
                  alt="Profile"
                />
                <span className="font-semibold">{auth?.reqUser?.name}</span>
              </div>
            </div>
          </div>
  
          {/* Search Bar */}
          <div className="p-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search in messages"
                className="w-full pl-10 pr-4 py-2 rounded-full bg-gray-100 focus:outline-none"
                value={queries}
                onChange={(e) => {
                  setQueries(e.target.value);
                  handleSearch(e.target.value);
                }}
              />
              <AiOutlineSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            </div>
          </div>
  
          {/* Chats List */}
          <div className="flex-1 overflow-y-auto">
            {chat.chats.map((item) => (
              <div
                key={item.id}
                onClick={() => handleCurrentChat(item)}
                className={`cursor-pointer hover:bg-gray-100 ${
                  currentChat?.id === item.id ? "bg-gray-100" : ""
                }`}
              >
                <ChatCard
                  isChat={true}
                  name={
                    auth.reqUser?.id !== item.users[0]?.id
                      ? item.users[0]?.name
                      : item.users[1]?.name
                  }
                  userImg={
                    auth.reqUser?.id !== item.users[0]?.id
                      ? item.users[0]?.profile_pic
                      : item.users[1]?.profile_pic
                  }
                />
              </div>
            ))}
          </div>
        </div>
  
        {/* Chat Area */}
        {currentChat ? (
          <div className="flex-1 flex flex-col bg-white">
            {/* Chat Header */}
            <div className="px-4 py-3 border-b flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <img
                  className="w-10 h-10 rounded-full"
                  src={currentChat?.users[0]?.profile_pic}
                  alt=""
                />
                <span className="font-semibold">
                  {currentChat?.users[0]?.name}
                </span>
              </div>
              <div className="flex items-center space-x-4">
                <AiOutlineSearch className="text-gray-600 text-xl cursor-pointer" />
                <BsThreeDotsVertical className="text-gray-600 text-xl cursor-pointer" />
              </div>
            </div>
  
            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
              <div className="space-y-2">
                {messages?.map((item, i) => (
                  <MessageCard
                    key={i}
                    isReqUserMessage={item?.user?.id === auth?.reqUser?.id}
                    content={item?.content}
                    type={item?.type}
                  />
                ))}
              </div>
            </div>
  
            {/* Message Input */}
            <div className="p-4 border-t">
              {showPicker && (
                <div className="absolute bottom-20 left-4">
                  <EmojiPicker onEmojiClick={handleEmojiClick} />
                </div>
              )}
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setShowPicker(!showPicker)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <BsEmojiSmile className="text-gray-600 text-xl" />
                </button>
                <button
                  onClick={() => setShowFileInput(!showFileInput)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <ImAttachment className="text-gray-600 text-xl" />
                </button>
                <input
                  type="text"
                  placeholder="Message..."
                  className="flex-1 px-4 py-2 rounded-full bg-gray-100 focus:outline-none"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleCreateNewMessage();
                      setContent("");
                    }
                  }}
                />
              </div>
            </div>
          </div>
        ) : (
          // Empty State
          <div className="flex-1 flex items-center justify-center bg-gray-50">
            <div className="text-center">
              <div className="text-gray-400 mb-4">
                <img
                  src="messenger-logo.png"
                  alt="Messenger"
                  className="w-20 h-20 mx-auto"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-700">
                Select a chat to start messaging
              </h3>
            </div>
          </div>
        )}
      </div>
    );
  };
export default ChatPage;
