import React, { useState, useEffect } from "react";
import ChatHeader from "./ChatHeader";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import { mockContacts, mockConversations } from "../../mockData";

// Accept a new prop: onCloseAllPopups
const ChatWindow = ({ activeContactId, onProfileClick, onCloseAllPopups }) => {
  const [messages, setMessages] = useState([]);
  // State for input and pop-ups is now managed here
  const [text, setText] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isAttachmentMenuOpen, setAttachmentMenuOpen] = useState(false);

  const activeContact = mockContacts.find((c) => c.id === activeContactId);

  useEffect(() => {
    if (activeContactId) {
      setMessages(mockConversations[activeContactId] || []);
    }
  }, [activeContactId]);

  // This is the function that gets triggered by the MessageList click
  const handleChatAreaClick = () => {
    // 1. Close local pop-ups
    setShowEmojiPicker(false);
    setAttachmentMenuOpen(false);
    // 2. Call the function from App.js to close the profile
    onCloseAllPopups();
  };

  const handleSendMessage = (messageText) => {
    const newMessage = {
      id: Date.now(),
      sender: "me",
      type: "text",
      text: messageText,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }),
    };
    setMessages([...messages, newMessage]);

    setTimeout(() => {
      const replyMessage = {
        id: Date.now() + 1,
        sender: "them",
        type: "text",
        text: "Welcome to the chat! This is a dummy reply.",
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }),
      };
      setMessages((prevMessages) => [...prevMessages, replyMessage]);
    }, 1200);
  };

  return (
    <div className="flex-1 flex flex-col bg-chat-bg bg-cover bg-center">
      <ChatHeader contact={activeContact} onProfileClick={onProfileClick} />
      {/* Pass the new handler down to MessageList */}
      <MessageList
        messages={messages}
        senderAvatar={activeContact?.avatar}
        onAreaClick={handleChatAreaClick}
      />
      {/* Pass all the new states and setters down to MessageInput */}
      <MessageInput
        text={text}
        setText={setText}
        showEmojiPicker={showEmojiPicker}
        setShowEmojiPicker={setShowEmojiPicker}
        isAttachmentMenuOpen={isAttachmentMenuOpen}
        setAttachmentMenuOpen={setAttachmentMenuOpen}
        onSendMessage={handleSendMessage}
      />
    </div>
  );
};

export default ChatWindow;
