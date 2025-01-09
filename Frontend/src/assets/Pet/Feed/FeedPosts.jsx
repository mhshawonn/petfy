import React, { useState } from 'react'; // Corrected the import for useState
import { AiOutlineMessage } from 'react-icons/ai'; // Added the correct import for AiOutlineMessage
import FeedPost from './FeedPost';
import AddPost from './AddPost';
import "aos/dist/aos.css";
import ChatModal from '../../../Modals/ChatModal';

export default function FeedPosts() {
  const [isOpenChatModal, setIsOpenChatModal] = useState(false); 

  return (
    <>
      <div className='mt-16'>
        <AddPost />

        <div>
          {/* Floating Message Icon in the bottom-left corner */}
          <div className="fixed bottom-5 left-5 z-50">
            <button
              onClick={() => setIsOpenChatModal(true)}
              className="p-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none"
            >
              <AiOutlineMessage size={30} />
            </button>
          </div>

          {/* Chat Modal */}
          <ChatModal
            open={isOpenChatModal}
            onClose={() => setIsOpenChatModal(false)} // Close modal when clicking close button
          />
        </div>

        <FeedPost /> {/* You can pass children or props to FeedPost if necessary */}
      </div>
    </>
  );
}
