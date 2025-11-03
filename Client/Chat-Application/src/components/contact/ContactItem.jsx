// import React from "react";
// import { FiUserPlus, FiMessageSquare } from "react-icons/fi";

// const ContactItem = ({ contact, active, onClick }) => {
//   const user = contact.registeredUser;
//   const name = user ? user.username : contact.displayName;
//   const avatar = user
//     ? user.profile_picture_url || `https://i.pravatar.cc/150?u=${user.email}`
//     : `https://i.pravatar.cc/150?u=${contact.email}`;
//   const status = user ? user.online_status : "offline";

//   const statusColors = { online: "bg-green-500", offline: "bg-gray-400" };

//   return (
//     <div
//       onClick={onClick}
//       className={`flex items-center p-3 my-1 rounded-lg mx-2 transition-colors
//         ${!user && "opacity-70"}
//         ${user ? "cursor-pointer" : "cursor-not-allowed"}
//         ${active ? "bg-teal-50" : user ? "hover:bg-gray-100" : ""}
//       `}
//     >
//       <div className="relative mr-3">
//         <img
//           src={avatar}
//           alt={name}
//           className="w-12 h-12 rounded-full object-cover"
//         />
//         {user && (
//           <span
//             className={`absolute bottom-0.5 right-0.5 w-3 h-3 ${
//               statusColors[status] || "bg-gray-400"
//             } rounded-full border-2 border-white`}
//           />
//         )}
//       </div>

//       <div className="flex-1 min-w-0">
//         <h3 className="text-md font-bold text-gray-800 truncate">{name}</h3>
//         {user ? (
//           <p className="text-sm text-gray-500 truncate flex items-center gap-1.5">
//             <FiMessageSquare size={16} /> Last message placeholder...
//           </p>
//         ) : (
//           <p className="text-sm text-blue-600 font-semibold truncate flex items-center gap-1.5">
//             <FiUserPlus size={16} /> Invite to Chat Web
//           </p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ContactItem;
// src/components/contact/ContactItem.jsx
import React from "react";
import { FiUserPlus, FiMessageSquare } from "react-icons/fi";

const ContactItem = ({ contact, active, onClick }) => {
  const user = contact.registeredUser;
  const name = user ? user.username : contact.displayName;

  // --- ROBUST AVATAR LOGIC ---
  const avatar = user
    ? user.profile_picture_url || `https://i.pravatar.cc/150?u=${user.email}`
    : `https://i.pravatar.cc/150?u=${contact.email}`;

  // --- CORRECT STATUS LOGIC ---
  const status = user ? user.online_status : "offline";
  const statusColors = { online: "bg-green-500", offline: "bg-gray-400" };

  return (
    <div
      onClick={onClick}
      className={`flex items-center p-3 my-1 rounded-lg mx-2 transition-colors ${
        !user && "opacity-60"
      } ${user ? "cursor-pointer" : "cursor-not-allowed"} ${
        active ? "bg-teal-100" : user ? "hover:bg-gray-100" : ""
      }`}
    >
      <div className="relative mr-3">
        {/* The src attribute will never be an empty string */}
        <img
          src={avatar}
          alt={name}
          className="w-12 h-12 rounded-full object-cover bg-gray-200"
        />
        {user && (
          <span
            className={`absolute bottom-0.5 right-0.5 w-3 h-3 ${
              statusColors[status] || "bg-gray-400"
            } rounded-full border-2 border-white`}
          />
        )}
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="text-md font-bold text-gray-800 truncate">{name}</h3>
        {user ? (
          <p className="text-sm text-gray-500 truncate flex items-center gap-1.5">
            <FiMessageSquare size={14} /> Last message...
          </p>
        ) : (
          <p className="text-sm text-blue-600 font-semibold truncate flex items-center gap-1.5">
            <FiUserPlus size={14} /> Invite to Chat Web
          </p>
        )}
      </div>
    </div>
  );
};

export default ContactItem;
