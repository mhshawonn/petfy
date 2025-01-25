import React, { useState } from "react";
import ChatMessage from "./ChatMessage";
import { useEffect } from "react";
import axios from "axios";
import { IoClose } from "react-icons/io5";
const BASE_API_URL = "http://localhost:8080";

const GEMINI_API_KEY = "AIzaSyCs8wGT0QYDduQR1hb3vJHZ7MiByI5GQA4";
const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";

const ChatBot = ({onClose}) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const token = localStorage.getItem("authToken");
  

  const fetchMessages = async () => {
    try {
      if (!token) return;
      const response = await fetch(`${BASE_API_URL}/chatbot/messages`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();

      console.log("data ", data);
      setMessages(data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  useEffect(() => {
    if (!token) {
      alert("Please login to chat.");
      return;
    }
    fetchMessages();
  }, []);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sentFrom: "user", message: input };

    try {
      //Call backend API to get the bot's response
      const response = await axios.post(
        `${BASE_API_URL}/chatbot/save`,
        {
          message: input,
          from: "user",
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = response.data;

      setMessages([...(messages || []), userMessage]);

      const gemini_response = await axios.post(
        `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
        {
          contents: [
            {
              parts: [{ text: input }],
            },
          ],
        }
      );

      const gemini_data = await gemini_response?.data?.candidates[0]?.content
        ?.parts[0]?.text;
      console.log("gemini_data ", gemini_data);

      const response2 = await axios.post(
        `${BASE_API_URL}/chatbot/save`,
        {
          message: gemini_data,
          from: "bot",
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data2 = response2.data;

      const botMessage = { sentFrom: "bot", message: gemini_data };
      setMessages((prev) => [...(prev || []), botMessage]);
    } catch (error) {
      console.error("Error fetching bot reply:", error);
      const errorMessage = {
        role: "bot",
        text: "Something went wrong. Please try again.",
      };
      setMessages((prev) => [...(prev || []), errorMessage]);
    }

    setInput(""); // Clear input
  };

  return (
    <div className="w-full h-full flex flex-col bg-white shadow-lg">
    {/* Header */}
    <div className="p-4 bg-gray-800 text-white flex justify-between items-center">
      <div className="flex items-center space-x-2">
        <img
          src="/path-to-avatar.jpg"
          alt="Support"
          className="w-8 h-8 rounded-full"
        />
        <span className="font-bold">Support</span>
      </div>
      <button
        onClick={onClose}
        className="text-white hover:text-gray-300"
      >
        <IoClose size={24} />
      </button>
    </div>

    {/* Messages Area */}
    <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
      {messages?.length === 0 ? (
        <p className="text-center text-gray-400">
          Start a conversation...
        </p>
      ) : (
        messages?.map((msg, idx) => (
          <div
            key={idx}
            className={`flex mb-4 ${
              msg?.sentFrom === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-xs rounded-lg p-3 shadow ${
                msg?.sentFrom === "user"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300 text-black"
              }`}
            >
              {msg?.message}
            </div>
          </div>
        ))
      )}
    </div>

    {/* Input Section */}
    <div className="p-4 border-t bg-white">
      <div className="flex items-center space-x-4">
        <input
          type="text"
          className="flex-1 p-3 border rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          onClick={sendMessage}
          className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-400"
        >
          Send
        </button>
      </div>
    </div>
  </div>
  );
};

export default ChatBot;
