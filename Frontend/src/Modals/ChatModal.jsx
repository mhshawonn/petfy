import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import ChatPage from "../ChatPage";

export default function ChatModal({ open, children, onClose }) {
  if (!open) return null;

  return ReactDOM.createPortal(
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="relative bg-white w-4/5 h-4/5 md:w-3/5 md:h-3/5 lg:w-2/5 lg:h-2/5 p-4 rounded shadow-lg flex flex-col">
          <button
            className="absolute top-2 right-2 h-8 w-8 bg-red-500 text-white rounded-full flex items-center justify-center"
            onClick={onClose}
            aria-label="Close Chat Modal"
          >
            &times;
          </button>
          <div className="flex-grow overflow-auto">
            <ChatPage />
          </div>
        </div>
      </div>
    </>,
    document.getElementById("portal")
  );
}

ChatModal.propTypes = {
  open: PropTypes.bool.isRequired,
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};
