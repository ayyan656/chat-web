

// export default ContactHeader;
import React from "react";
import { FiX } from "react-icons/fi";

function ContactHeader(props) {
  // This function runs when the close button is clicked
  function handleClose() {
    if (props.onClose) {
      props.onClose();
    }
  }

  return (
    <div className="p-5 border-b border-gray-200">
      <div className="flex justify-between items-center">
        {/* Left side: Title and subtitle */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Contact</h1>
          <p className="text-sm text-gray-500">Start Without Delay...</p>
        </div>

        {/* Right side: Close button */}
        <button
          onClick={handleClose}
          className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          <FiX size={20} className="cursor-pointer text-gray-600" />
        </button>
      </div>
    </div>
  );
}

export default ContactHeader;
