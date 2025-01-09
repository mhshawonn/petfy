// src/components/chat/MessageInput.jsx
import React from "react";
import { BsEmojiSmile } from "react-icons/bs";
import { ImAttachment } from "react-icons/im";
import EmojiPicker from "emoji-picker-react";

const MessageInput = ({
  content,
  setContent,
  showEmojiPicker,
  setShowEmojiPicker,
  showFileInput,
  setShowFileInput,
  selectedFile,
  setSelectedFile,
  onSendMessage,
}) => {
  const handleEmojiClick = (emoji) => {
    setContent((prev) => prev + emoji.emoji);
    setShowEmojiPicker(false);
  };

  return (
    <div className="footer bg-[#f0f2f5] absolute bottom-0 w-full py-3 text-2xl">
      {showEmojiPicker && (
        <div className="absolute bottom-16 left-0">
          <EmojiPicker onEmojiClick={handleEmojiClick} />
        </div>
      )}

      {showFileInput && (
        <div className="absolute bottom-16 left-0 right-0 bg-white p-4 shadow-lg">
          <input
            type="file"
            onChange={(e) => {
              setSelectedFile(URL.createObjectURL(e.target.files[0]));
              setShowFileInput(false);
            }}
            className="w-full"
          />
        </div>
      )}

      {selectedFile && (
        <div className="absolute bottom-16 left-0 right-0 bg-white p-4 shadow-lg">
          <div className="flex items-center justify-between">
            <img
              src={selectedFile}
              alt="Preview"
              className="w-20 h-20 object-cover rounded"
            />
            <div className="flex space-x-2">
              <button
                onClick={() => setSelectedFile(null)}
                className="text-red-500"
              >
                Cancel
              </button>
              <button
                onClick={onSendMessage}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center px-4 space-x-4">
        <BsEmojiSmile
          className="cursor-pointer"
          onClick={() => {
            setShowEmojiPicker(!showEmojiPicker);
            setShowFileInput(false);
          }}
        />
        <ImAttachment
          className="cursor-pointer"
          onClick={() => {
            setShowFileInput(!showFileInput);
            setShowEmojiPicker(false);
          }}
        />
        <input
          className="flex-1 py-2 px-4 rounded-full outline-none"
          type="text"
          placeholder="Type a message"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              onSendMessage();
            }
          }}
        />
      </div>
    </div>
  );
};

export default MessageInput;