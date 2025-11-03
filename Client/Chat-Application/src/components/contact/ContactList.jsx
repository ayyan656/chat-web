// import React from "react";
// import ContactItem from "./ContactItem";

// // Accept the new 'onContactClick' prop
// const ContactList = ({ contacts, activeContactId, onContactClick }) => {
//   return (
//     <div className="flex-1 overflow-y-auto">
//       {contacts.length > 0 ? (
//         contacts.map((contact) => (
//           <ContactItem
//             key={contact._id}
//             contact={contact}
//             active={contact._id === activeContactId}
//             // The onClick now calls the handler from the Sidebar, passing the full contact object
//             onClick={() => onContactClick(contact)}
//           />
//         ))
//       ) : (
//         <div className="p-6 text-center text-gray-500">
//           <p>Your contact list is empty.</p>
//           <p className="text-sm mt-2">
//             Click the "+" button to add your first contact.
//           </p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ContactList;
// src/components/contact/ContactList.jsx
import React, { useEffect, useMemo, useState } from "react";
import ContactItem from "./ContactItem";
import { useSocket } from "../context/SocketProvider.jsx";

/**
 * Props:
 * - contacts: array
 * - activeChatId
 * - onContactClick(contact)
 */
const ContactList = ({ contacts = [], activeChatId, onContactClick }) => {
  const socket = useSocket();
  const [onlineMap, setOnlineMap] = useState({}); // { userId: true }

  useEffect(() => {
    if (!socket) return;

    const onOnlineUsers = (payload) => {
      // payload could be an array of ids or objects
      const map = {};
      if (Array.isArray(payload)) {
        payload.forEach((id) => {
          map[String(id)] = true;
        });
      } else if (payload && typeof payload === "object") {
        // Could be { userId: userObject } or array of objects, normalize:
        if (Array.isArray(payload.users)) {
          payload.users.forEach((u) => {
            const id = u._id || u.id;
            if (id) map[String(id)] = true;
          });
        } else {
          Object.keys(payload).forEach((id) => (map[String(id)] = true));
        }
      }
      setOnlineMap(map);
    };

    socket.on("online-users", onOnlineUsers);

    // ask server for initial list if server supports it
    socket.emit("get-online-users");

    return () => {
      socket.off("online-users", onOnlineUsers);
    };
  }, [socket]);

  const rendered = useMemo(() => {
    return contacts.map((c) => {
      const user = c.registeredUser;
      const userId = user?._id;
      const isOnline = userId ? !!onlineMap[String(userId)] : false;
      return (
        <ContactItem
          key={c._id || userId || c.email}
          contact={c}
          active={activeChatId && String(activeChatId) === String(c._id)}
          onClick={() => onContactClick(c)}
          isOnline={isOnline}
        />
      );
    });
  }, [contacts, activeChatId, onlineMap, onContactClick]);

  return <div className="overflow-y-auto">{rendered}</div>;
};

export default ContactList;
