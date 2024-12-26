import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import ChatPage from "../ChatPage";

export default function ChatModal({ open, children, onClose }) {
  if (!open) return null;

  return ReactDOM.createPortal(
    <>
      i am inside chat modal
      <div className="fixed h-4/5 w-4/5 left-10 right-10 top-10 bottom-10 bg-[#ff0000] z-50">
        <ChatPage />
      </div>
      <div className="fixed bottom-5 left-10 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 z-50">
        <button className="bg-red-500 " onClick={onClose}>
          Close Modal
        </button>
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
