import React from "react";
import {
  FiUser,
  FiSettings,
  FiBell,
  FiLogOut,
  FiArrowLeft,
} from "react-icons/fi";

// Reusable menu item component
const MenuItem = ({ icon, text, onClick }) => (
  <button
    onClick={onClick}
    className="flex items-center w-full p-3 text-left text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
  >
    {icon}
    <span className="ml-4 font-medium">{text}</span>
  </button>
);

const ProfileMenu = ({ contact, onViewChange, onClose, onLogout }) => {
  return (
    <div className="w-[300px] h-screen bg-white flex flex-col border-l border-gray-200">
      {/* Header */}
      <div className="flex items-center p-4 border-b border-gray-200">
        <button
          onClick={onClose}
          className="p-2 mr-2 rounded-full hover:bg-gray-100"
        >
          <FiArrowLeft size={22} className="text-gray-600" />
        </button>
        <h2 className="text-xl font-bold text-gray-800">Profile</h2>
      </div>

      {/* User Info */}
      <div className="p-6 flex items-center">
        <img
          src={contact.avatar}
          alt={contact.name}
          className="w-16 h-16 rounded-full"
        />
        <div className="ml-4">
          <h3 className="text-lg font-bold">{contact.name}</h3>
          <p className="text-sm text-gray-500">
            {contact.email || "user@example.com"}
          </p>
        </div>
      </div>

      {/* Menu List */}
      <div className="flex-1 px-4 py-2 space-y-2">
        <MenuItem
          icon={<FiUser size={22} className="text-gray-500" />}
          text="My Profile"
          onClick={() => onViewChange("editForm")}
        />
        <MenuItem
          icon={<FiSettings size={22} className="text-gray-500" />}
          text="Settings"
          onClick={() => alert("Settings page not implemented.")}
        />
        <MenuItem
          icon={<FiBell size={22} className="text-gray-500" />}
          text="Notifications"
          onClick={() => alert("Notifications page not implemented.")}
        />
      </div>

      {/* Logout Button */}
      <div className="p-4 border-t border-gray-200">
        <MenuItem
          icon={<FiLogOut size={22} className="text-red-500" />}
          text="Logout"
          onClick={onLogout}
        />
      </div>
    </div>
  );
};

export default ProfileMenu;
