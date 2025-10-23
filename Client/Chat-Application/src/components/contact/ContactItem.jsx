import React from "react";
import { FiCheck } from "react-icons/fi";
import "../../index.css";
// Define colors for different user statuses
const statusColors = {
  online: "bg-green-400",
  away: "bg-yellow-400",
  offline: "bg-red-400",
};

function ContactItem({ contact, active, onClick }) {
  const { avatar, name, lastMessage, date, status, messageStatus } = contact;

  // This function returns the right status badge or message text
  function renderMessageStatus() {
    if (messageStatus.type === "unread") {
      return (
        <span className="overflow-y-scroll bg-teal-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center mt-1">
          {messageStatus.value}
        </span>
      );
    }

    if (messageStatus.type === "failed") {
      return (
        <p className="text-sm text-red-500 font-semibold mt-1">
          {messageStatus.value}
        </p>
      );
    }

    return (
      <p className="text-sm text-gray-400 mt-1">{messageStatus.value}</p>
    );
  }

  return (
    <div
      onClick={onClick}
      className={`flex items-center p-4 border-b border-gray-100 cursor-pointer transition-colors duration-200 ${
        active ? "bg-teal-50" : "hover:bg-gray-100"
      }`}
    >
      {/* Avatar + online/offline indicator */}
      <div className="relative mr-4">
        <img
          src={avatar}
          alt={name}
          className="w-14 h-14 rounded-full object-cover"
        />
        <span
          className={`absolute bottom-0 right-0 w-3.5 h-3.5 ${
            statusColors[status]
          } rounded-full border-2 border-white`}
        ></span>
      </div>

      {/* Name, message, and status */}
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-center mb-1">
          <h3 className="text-lg font-bold text-gray-800 truncate">{name}</h3>
          <p className="text-sm text-gray-400">{date}</p>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center text-sm text-gray-500 truncate">
            {messageStatus.type === "sent" && (
              <FiCheck className="mr-1 text-teal-500" />
            )}
            <p className="truncate">{lastMessage}</p>
          </div>
          {renderMessageStatus()}
        </div>
      </div>
    </div>
  );
}

export default ContactItem;
