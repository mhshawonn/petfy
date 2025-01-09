import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { AiOutlineClose } from "react-icons/ai"; 
import ChatPage from "../ChatPage";

export default function ChatModal({ open, onClose }) {
  if (!open) return null;

  return ReactDOM.createPortal(
    <>
      {/* Modal container with relative positioning */}
      <div className="fixed inset-0 z-50 flex justify-center items-center bg-opacity-50 bg-black">
        <div className="relative h-4/5 w-4/5 bg-[#ff0000]">
          {/* Close button positioned at the top-right of the modal */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-pink-500 bg-transparent hover:bg-gray-700 p-2 rounded-full"
          >
            <AiOutlineClose size={30} />
          </button>

          {/* Chat page content */}
          <ChatPage />
        </div>
      </div>
    </>,
    document.getElementById("portal")
  );
}

ChatModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
