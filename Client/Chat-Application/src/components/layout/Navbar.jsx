// import React from "react";
// import { IoChatbubbleEllipsesSharp } from "react-icons/io5";
// import {
//   HiOutlineChatBubbleOvalLeft,
//   HiOutlineUsers,
//   HiOutlineBell,
//   HiOutlineDocument,
//   HiOutlineStar,
//   HiOutlineCog6Tooth,
// } from "react-icons/hi2";
// import { FiLogOut } from "react-icons/fi"; // <-- Import the logout icon

// // NavLink component remains the same
// const NavLink = ({ icon, id, activeNav, onNavClick }) => (
//   <button
//     onClick={() => onNavClick(id)}
//     className={`relative flex items-center justify-center w-full py-4 transition-colors duration-200
//       ${
//         activeNav === id
//           ? "bg-teal-700 text-white"
//           : "text-teal-100 hover:bg-teal-700"
//       }`}
//   >
//     {activeNav === id && (
//       <div className="absolute left-0 top-0 h-full w-1 bg-white"></div>
//     )}
//     {icon}
//   </button>
// );

// // Accept the onLogout function as a prop
// const Navbar = ({ activeNav, onNavClick, onLogout }) => {
//   const navItems = [
//     { id: "Chat", icon: <HiOutlineChatBubbleOvalLeft size="28" /> },
//     { id: "Contacts", icon: <HiOutlineUsers size="28" /> },
//     { id: "Notifications", icon: <HiOutlineBell size="28" /> },
//     { id: "Documents", icon: <HiOutlineDocument size="28" /> },
//     { id: "Favorites", icon: <HiOutlineStar size="28" /> },
//     { id: "Settings", icon: <HiOutlineCog6Tooth size="28" /> },
//   ];

//   return (
//     <div className="fixed top-0 left-0 h-screen w-24 flex flex-col items-center bg-teal-600 text-white shadow-lg z-10">
//       {/* Logo */}
//       <div className="py-5">
//         <IoChatbubbleEllipsesSharp
//           size="40"
//           className="text-white bg-white/25 p-2 rounded-full"
//         />
//       </div>

//       {/* Main Navigation Links */}
//       <div className="flex-1 flex flex-col w-full">
//         {navItems.map((item) => (
//           <NavLink
//             key={item.id}
//             id={item.id}
//             icon={item.icon}
//             activeNav={activeNav}
//             onNavClick={onNavClick}
//           />
//         ))}
//       </div>

//       {/* --- NEW LOGOUT BUTTON --- */}
//       <div className="w-full">
//         <button
//           onClick={onLogout}
//           className="relative flex items-center justify-center w-full py-4 text-teal-100 hover:bg-red-500 hover:text-white transition-colors duration-200"
//           title="Logout"
//         >
//           <FiLogOut size="28" />
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Navbar;
import React from 'react';
import {
  IoChatbubbleEllipsesSharp
} from 'react-icons/io5';
import {
  HiOutlineChatBubbleOvalLeft,
  HiOutlineUsers,
  HiOutlineBell,
  HiOutlineDocument,
  HiOutlineStar,
  HiOutlineCog6Tooth,
} from 'react-icons/hi2';
import { FiLogOut } from 'react-icons/fi';

const NavLink = ({ icon, id, activeNav, onNavClick, isLogout = false }) => (
    <button
        onClick={() => onNavClick(id)}
        className={`relative flex items-center justify-center w-full py-5 transition-colors duration-200
      ${activeNav === id ? 'bg-teal-700 text-white' : 'text-teal-100 hover:bg-teal-700'}
      ${isLogout ? 'hover:bg-red-500' : ''}`}
        title={id}
    >
        {activeNav === id && !isLogout && (
            <div className="absolute left-0 top-0 h-full w-1 bg-white rounded-r-full"></div>
        )}
        {icon}
    </button>
);

const Navbar = ({ activeNav, onNavClick, onLogout }) => {
  const navItems = [
    { id: 'Chat', icon: <HiOutlineChatBubbleOvalLeft size="26" /> },
    { id: 'Contacts', icon: <HiOutlineUsers size="26" /> },
    { id: 'Notifications', icon: <HiOutlineBell size="26" /> },
    { id: 'Documents', icon: <HiOutlineDocument size="26" /> },
    { id: 'Favorites', icon: <HiOutlineStar size="26" /> },
    { id: 'Settings', icon: <HiOutlineCog6Tooth size="26" /> },
  ];

  return (
    <div className="w-20 h-screen flex flex-col items-center bg-teal-600 text-white shadow-lg z-20">
      {/* Logo */}
      <div className="py-4 my-2">
        <IoChatbubbleEllipsesSharp size="36" className="text-white bg-teal-500 p-1.5 rounded-full" />
      </div>

      {/* Main Navigation */}
      <div className="flex flex-col w-full">
        {navItems.map((item) => (
          <NavLink
            key={item.id}
            id={item.id}
            icon={item.icon}
            activeNav={activeNav}
            onNavClick={onNavClick}
          />
        ))}
      </div>

      {/* Logout Button at the bottom */}
      <div className="w-full mt-auto">
         <NavLink
            id="Logout"
            icon={<FiLogOut size="26" />}
            onNavClick={onLogout} // Pass the onLogout function directly
            isLogout={true}
          />
      </div>
    </div>
  );
};

export default Navbar;