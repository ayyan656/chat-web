// import React from "react";
// import { FiPhone, FiSearch, FiMoreVertical } from "react-icons/fi";
// import { HiOutlineSpeakerWave } from "react-icons/hi2";
// import { IoGridOutline } from "react-icons/io5";

// const ChatHeader = ({ contact, onProfileClick }) => {
//   // <-- Add onProfileClick prop
//   if (!contact) return null;

//   return (
//     <div className=" p-4 bg-white border-b border-gray-200  flex justify-between items-center ">
//       {/* Make this whole section clickable */}
//       <button
//         onClick={onProfileClick}
//         className="flex items-center gap-4 text-left"
//       >
//         <div className="relative">
//           <img
//             src={contact.avatar}
//             alt={contact.name}
//             className="w-12 h-12 rounded-full"
//           />
//           <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></span>
//         </div>
//         <div>
//           <h2 className="text-lg font-bold text-gray-800">{contact.name}</h2>
//           <p className="text-sm text-gray-500">Online</p>
//         </div>
//       </button>

//       <div className="flex items-center divide-x divide-gray-200">
//         <div className="flex items-center gap-1 px-4">
//           <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full">
//             <HiOutlineSpeakerWave size={22} />
//           </button>
//           <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full">
//             <FiSearch size={22} />
//           </button>
//           <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full">
//             <FiPhone size={22} />
//           </button>
//           <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full">
//             <IoGridOutline size={22} />
//           </button>
//         </div>
//         <div className="pl-4">
//           <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full">
//             <FiMoreVertical size={22} />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ChatHeader;
// src/components/chat/ChatHeader.jsx
import React from "react";
import { FiPhone, FiSearch, FiMoreVertical } from "react-icons/fi";

// NOTE: This component should now receive a 'user' object, not 'contact'.
const ChatHeader = ({ user, onProfileClick }) => {
  if (!user) {
    return <div className="p-4 bg-white border-b h-[72px]" />;
  }

  // --- ROBUST AVATAR & STATUS LOGIC ---
  const name = user.username;
  const avatar =
    user.profile_picture_url || `https://i.pravatar.cc/150?u=${user.email}`;
  const status = user.online_status || "offline";
  const isOnline = status === "online";

  return (
    <div className="p-4 bg-white border-b border-gray-200 flex justify-between items-center h-[72px]">
      <button
        onClick={onProfileClick}
        className="flex items-center gap-4 text-left focus:outline-none"
        aria-label="Open profile"
      >
        <div className="relative">
          {/* The src attribute will never be an empty string */}
          <img
            src={avatar}
            alt={name}
            className="w-12 h-12 rounded-full object-cover bg-gray-200"
          />
          <span
            className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
              isOnline ? "bg-green-400" : "bg-gray-300"
            }`}
          />
        </div>
        <div className="min-w-0">
          <h2 className="text-lg font-bold text-gray-800 truncate">{name}</h2>
          <p className="text-sm text-gray-500 truncate">
            {isOnline ? "Online" : "Offline"}
          </p>
        </div>
      </button>

      <div className="flex items-center gap-3 text-gray-500">
        <button title="Search" className="p-2 hover:bg-gray-100 rounded-full">
          <FiSearch size={20} />
        </button>
        <button title="Call" className="p-2 hover:bg-gray-100 rounded-full">
          <FiPhone size={20} />
        </button>
        <button title="More" className="p-2 hover:bg-gray-100 rounded-full">
          <FiMoreVertical size={20} />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
