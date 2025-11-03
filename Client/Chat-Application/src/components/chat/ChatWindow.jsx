// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import io from "socket.io-client";
// import { useAuth } from "../context/AuthContext.jsx";

// import ChatHeader from "./ChatHeader";
// import MessageList from "./MessageList";
// import MessageInput from "./MessageInput";

// const ENDPOINT = "http://localhost:3000";
// let socket;

// const ChatWindow = ({ chat, onProfileClick, onCloseAllPopups }) => {
//   const { authUser } = useAuth();
//   const [messages, setMessages] = useState([]);
//   const [loading, setLoading] = useState(false);

//   // State from MessageInput has been lifted up to here
//   const [text, setText] = useState("");
//   const [showEmojiPicker, setShowEmojiPicker] = useState(false);
//   const [isAttachmentMenuOpen, setAttachmentMenuOpen] = useState(false);

//   // Find the other user in the chat to display their info in the header
//   const otherUser = chat.users.find((u) => u._id !== authUser._id);
//   const contactForHeader = {
//     name: otherUser.username,
//     avatar: otherUser.profile_picture_url,
//     status: otherUser.online_status,
//   };

//   useEffect(() => {
//     const fetchMessages = async () => {
//       if (!chat) return;
//       setLoading(true);
//       try {
//         const { data } = await axios.get(
//           `http://localhost:3000/api/messages/${chat._id}`,
//           { withCredentials: true }
//         );
//         setMessages(data);
//       } catch (error) {
//         console.error("Failed to fetch messages", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchMessages();

//     // --- Socket.IO Connection Setup ---
//     socket = io(ENDPOINT);
//     socket.emit("join_chat", chat._id);

//     // Disconnect socket when the component unmounts
//     return () => {
//       socket.disconnect();
//     };
//   }, [chat]);

//   useEffect(() => {
//     const messageListener = (newMessage) => {
//       // Basic check to prevent duplicate messages from your own emissions
//       if (newMessage.chat._id === chat._id) {
//         setMessages((prevMessages) => [...prevMessages, newMessage]);
//       }
//     };
//     socket.on("receive_message", messageListener);

//     // Cleanup the listener
//     return () => {
//       socket.off("receive_message", messageListener);
//     };
//   }, [chat]);

//   const handleSendMessage = (content) => {
//     if (!content.trim()) return;

//     socket.emit("send_message", {
//       chatId: chat._id,
//       senderId: authUser._id,
//       content,
//     });
//     // The message will be received back via the 'receive_message' event
//     setText(""); // Clear the input field
//     setShowEmojiPicker(false);
//     setAttachmentMenuOpen(false);
//   };

//   const handleChatAreaClick = () => {
//     setShowEmojiPicker(false);
//     setAttachmentMenuOpen(false);
//     onCloseAllPopups();
//   };

//   return (
//     <div className="flex-1 flex flex-col bg-chat-bg bg-cover bg-center">
//       <ChatHeader contact={contactForHeader} onProfileClick={onProfileClick} />
//       {loading ? (
//         <div className="flex-1 flex items-center justify-center">
//           <p className="text-gray-500">Loading messages...</p>
//         </div>
//       ) : (
//         <MessageList
//           messages={messages}
//           currentUserId={authUser._id}
//           onAreaClick={handleChatAreaClick}
//         />
//       )}
//       <MessageInput
//         text={text}
//         setText={setText}
//         showEmojiPicker={showEmojiPicker}
//         setShowEmojiPicker={setShowEmojiPicker}
//         isAttachmentMenuOpen={isAttachmentMenuOpen}
//         setAttachmentMenuOpen={setAttachmentMenuOpen}
//         onSendMessage={handleSendMessage}
//       />
//     </div>
//   );
// };

// export default ChatWindow;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import io from "socket.io-client"; // We will create the socket instance inside this component
// import { useAuth } from ".././context/AuthContext.jsx";

// import ChatHeader from "./ChatHeader";
// import MessageList from "./MessageList";
// import MessageInput from "./MessageInput";

// // --- FIX #1: Correct the backend server endpoint ---
// const ENDPOINT = "http://localhost:3000";

// const ChatWindow = ({ chat, onProfileClick, onCloseAllPopups }) => {
//   const { authUser } = useAuth();
//   const [messages, setMessages] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const [text, setText] = useState("");
//   const [showEmojiPicker, setShowEmojiPicker] = useState(false);
//   const [isAttachmentMenuOpen, setAttachmentMenuOpen] = useState(false);

//   if (!chat || !chat.users || !authUser) {
//     return <div className="flex-1" />;
//   }

//   const otherUser = chat.users.find((u) => u._id !== authUser._id);
//   const contactForHeader = {
//     name: otherUser?.username || "Unknown User",
//     avatar: otherUser?.profile_picture_url,
//     status: otherUser?.online_status || "Offline",
//   };

//   // --- FIX #2: Combine all Socket.IO logic into ONE useEffect for robust cleanup ---
//   useEffect(() => {
//     // This effect now handles EVERYTHING: fetching, connecting, listening, and cleaning up.

//     // 1. Fetch initial message history
//     const fetchMessages = async () => {
//       setLoading(true);
//       try {
//         const { data } = await axios.get(
//           `http://localhost:3000/api/messages/${chat._id}`,
//           { withCredentials: true }
//         );
//         setMessages(data);
//       } catch (error) {
//         console.error("Failed to fetch messages", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchMessages();

//     // 2. Establish a new socket connection for this chat instance
//     const socket = io(ENDPOINT);

//     // 3. Join the specific room for this chat
//     socket.emit("join_chat", chat._id);

//     // 4. Set up the listener for incoming messages
//     const messageListener = (newMessage) => {
//       // Only update state if the incoming message belongs to this chat
//       if (newMessage.chat?._id === chat._id) {
//         setMessages((prevMessages) => [...prevMessages, newMessage]);
//       }
//     };
//     socket.on("receive_message", messageListener);

//     // 5. CRITICAL CLEANUP: This function is the key to fixing the bug.
//     // It runs when the component is "unmounted" (i.e., when you switch to a different chat).
//     return () => {
//       console.log(`Cleaning up socket for chat: ${chat._id}`);
//       socket.off("receive_message", messageListener); // Remove the specific listener
//       socket.disconnect(); // Disconnect the socket completely
//     };
//   }, [chat]); // The dependency array ensures this entire block re-runs for each new chat.

//   const handleSendMessage = (content) => {
//     // Find the current socket instance to emit the message
//     // We can't use a module-level variable reliably here
//     const socket = io(ENDPOINT); // A temporary connection to emit
//     if (!content.trim()) return;

//     socket.emit("send_message", {
//       chatId: chat._id,
//       senderId: authUser._id,
//       content,
//     });

//     // NOTE: We are removing the optimistic UI update.
//     // The message will appear when the server broadcasts it back.
//     // This prevents duplicate messages.

//     setText("");
//     setShowEmojiPicker(false);
//     setAttachmentMenuOpen(false);
//   };

//   const handleChatAreaClick = () => {
//     setShowEmojiPicker(false);
//     setAttachmentMenuOpen(false);
//     onCloseAllPopups?.();
//   };

//   // --- FIX #3: Implement the correct Flexbox layout for scrolling ---
//   return (
//     <div className="flex-1 flex flex-col h-full bg-gray-50">
//       <div className="flex-shrink-0">
//         <ChatHeader
//           contact={contactForHeader}
//           onProfileClick={onProfileClick}
//         />
//       </div>

//       <div className="flex-1 min-h-0 overflow-y-auto">
//         {loading ? (
//           <div className="flex h-full items-center justify-center">
//             <p className="text-gray-500">Loading conversation...</p>
//           </div>
//         ) : (
//           <MessageList
//             messages={messages}
//             currentUserId={authUser._id}
//             onAreaClick={handleChatAreaClick}
//           />
//         )}
//       </div>

//       <div className="flex-shrink-0 border-t border-gray-200">
//         <MessageInput
//           text={text}
//           setText={setText}
//           showEmojiPicker={showEmojiPicker}
//           setShowEmojiPicker={setShowEmojiPicker}
//           isAttachmentMenuOpen={isAttachmentMenuOpen}
//           setAttachmentMenuOpen={setAttachmentMenuOpen}
//           onSendMessage={handleSendMessage}
//         />
//       </div>
//     </div>
//   );
// };

// export default ChatWindow;
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import io from "socket.io-client";
import { useAuth } from "../context/AuthContext.jsx";

import ChatHeader from "./ChatHeader";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";

// Use one socket instance across all renders
const ENDPOINT = "http://localhost:3000";
const socket = io(ENDPOINT, { autoConnect: false });

const ChatWindow = ({ chat, onProfileClick, onCloseAllPopups }) => {
  const { authUser } = useAuth();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const [text, setText] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isAttachmentMenuOpen, setAttachmentMenuOpen] = useState(false);

  const endOfMessagesRef = useRef(null);

  // --- Always run hooks first ---
  useEffect(() => {
    if (!chat || !authUser) return;

    // Fetch messages from backend
    const fetchMessages = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(
          `${ENDPOINT}/api/messages/${chat._id}`,
          { withCredentials: true }
        );
        setMessages(data);
      } catch (error) {
        console.error("Failed to fetch messages:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();

    // Ensure socket is connected
    if (!socket.connected) {
      socket.connect();
    }

    // Join the current chat room
    socket.emit("join_chat", chat._id);

    // Listen for new messages
    const handleNewMessage = (newMessage) => {
      if (newMessage.chat?._id === chat._id) {
        setMessages((prev) => [...prev, newMessage]);
      }
    };

    socket.on("receive_message", handleNewMessage);

    // Cleanup: leave room & remove listener
    return () => {
      console.log(`Leaving room: ${chat._id}`);
      socket.emit("leave_chat", chat._id);
      socket.off("receive_message", handleNewMessage);
    };
  }, [chat, authUser]);

  // --- Auto-scroll on new messages ---
  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // --- Handle sending message ---
  const handleSendMessage = (content) => {
    if (!content.trim()) return;
    if (!socket.connected) {
      console.error("Socket not connected - message not sent");
      return;
    }

    const newMsg = {
      chatId: chat._id,
      senderId: authUser._id,
      content,
    };

    socket.emit("send_message", newMsg);
    setText("");
    setShowEmojiPicker(false);
    setAttachmentMenuOpen(false);
  };

  // --- Close pickers when clicking outside ---
  const handleChatAreaClick = () => {
    setShowEmojiPicker(false);
    setAttachmentMenuOpen(false);
    onCloseAllPopups?.();
  };

  // --- Safe render guard ---
  if (!chat || !chat.users || !authUser) {
    return <div className="flex-1 bg-gray-50" />;
  }

  const otherUser = chat.users.find((u) => u._id !== authUser._id);
  const contactForHeader = {
    name: otherUser?.username || "Unknown User",
    avatar: otherUser?.profile_picture_url || null,
    status: otherUser?.online_status ? "Online" : "Offline",
  };

  // --- UI Layout ---
  return (
    <div className="flex-1 flex flex-col h-full bg-gray-50">
      {/* Header */}
      <div className="flex-shrink-0">
        <ChatHeader
          contact={contactForHeader}
          onProfileClick={onProfileClick}
        />
      </div>

      {/* Messages */}
      <div
        className="flex-1 min-h-0 overflow-y-auto"
        onClick={handleChatAreaClick}
      >
        {loading ? (
          <div className="flex h-full items-center justify-center">
            <p className="text-gray-500">Loading conversation...</p>
          </div>
        ) : (
          <>
            <MessageList
              messages={messages}
              currentUserId={authUser._id}
              onAreaClick={handleChatAreaClick}
            />
            <div ref={endOfMessagesRef} />
          </>
        )}
      </div>

      {/* Input */}
      <div className="flex-shrink-0 border-t border-gray-200">
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
    </div>
  );
};

export default ChatWindow;
