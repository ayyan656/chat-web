import React, { useEffect, useRef } from "react";
import Message from "./Message";

// This is now a "dumb" component. It does not control its own layout.
const MessageList = ({ messages, currentUserId, onAreaClick }) => {
  const endRef = useRef(null);

  // This effect ensures the view scrolls down when new messages are added
  useEffect(() => {
    if (endRef.current) {
      endRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    // The onClick is now on the parent div
    <div onClick={onAreaClick} className="p-4 md:p-6">
      {messages.map((msg) => (
        <Message
          key={msg._id}
          message={msg}
          isOutgoing={msg.sender._id === currentUserId}
        />
      ))}
      {/* This invisible div is what we scroll to */}
      <div ref={endRef} />
    </div>
  );
};

export default MessageList;