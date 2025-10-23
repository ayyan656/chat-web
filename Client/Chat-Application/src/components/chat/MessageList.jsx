// import React, { useEffect, useRef } from "react";
// import Message from "./Message";

// function MessageList(props) {
//   const endOfMessagesRef = useRef(null);

//   // Scroll to the bottom whenever new messages appear
//   useEffect(function () {
//     if (endOfMessagesRef.current) {
//       endOfMessagesRef.current.scrollIntoView({ behavior: "smooth" });
//     }
//   }, [props.messages]);

//   return (
//     <div className="flex-1 p-6 overflow-y-auto">
//       {/* Loop through all messages and show each one */}
//       {props.messages.map(function (msg) {
//         return (
//           <Message
//             key={msg.id}
//             message={msg}
//             sender={msg.sender}
//             avatar={props.senderAvatar}
//           />
//         );
//       })}

//       {/* Empty div to help scroll to the bottom */}
//       <div ref={endOfMessagesRef}></div>
//     </div>
//   );
// }

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
