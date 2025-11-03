import React from "react";
import { FiCheck } from "react-icons/fi";

function Message({ message, isOutgoing }) {
  const { sender, content, createdAt } = message;

  // Safety check to prevent crash if sender is missing
  if (!sender) {
    return null;
  }
  
  // --- ROBUST AVATAR LOGIC ---
  const avatar = sender.profile_picture_url || `https://i.pravatar.cc/150?u=${sender.email || sender._id}`;
  const time = new Date(createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div className={`flex items-end gap-3 my-2 ${isOutgoing ? "justify-end" : "justify-start"}`}>
      {!isOutgoing && (
        // The src attribute will never be an empty string
        <img src={avatar} alt={sender.username} className="w-8 h-8 rounded-full self-start bg-gray-200" />
      )}
      <div className={`flex flex-col ${isOutgoing ? 'items-end' : 'items-start'}`}>
        <div className={`max-w-md p-3 rounded-2xl ${isOutgoing ? "bg-teal-500 text-white rounded-br-none" : "bg-white text-gray-800 rounded-bl-none shadow-sm"}`}>
          {/* We only render text for now, as per your backend. */}
          <p className="leading-snug break-words">{content}</p>
        </div>
        <div className="flex items-center gap-1.5 mt-1 text-xs text-gray-400">
          <span>{time}</span>
          {isOutgoing && <FiCheck size={16} className="text-blue-500" />}
        </div>
      </div>
    </div>
  );
}

export default Message;