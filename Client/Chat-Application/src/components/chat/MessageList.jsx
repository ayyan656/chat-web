
// export default MessageList;
import React, { useEffect, useRef } from "react";
import Message from "./Message";

// Accept a new prop: onAreaClick
const MessageList = ({ messages, senderAvatar, onAreaClick }) => {
  const endOfMessagesRef = useRef(null);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    // Add the onClick event to the main container
    <div className="flex-1 p-6 overflow-y-auto" onClick={onAreaClick}>
      {messages.map((msg) => (
        <Message
          key={msg.id}
          message={msg}
          sender={msg.sender}
          avatar={senderAvatar}
        />
      ))}
      <div ref={endOfMessagesRef} />
    </div>
  );
};

export default MessageList;
