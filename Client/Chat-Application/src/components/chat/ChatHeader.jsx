import React from "react";
import { FiPhone, FiSearch, FiMoreVertical } from "react-icons/fi";
import { HiOutlineSpeakerWave } from "react-icons/hi2";
import { IoGridOutline } from "react-icons/io5";

const ChatHeader = ({ contact, onProfileClick }) => {
  // <-- Add onProfileClick prop
  if (!contact) return null;

  return (
    <div className=" p-4 bg-white border-b border-gray-200  flex justify-between items-center ">
      {/* Make this whole section clickable */}
      <button
        onClick={onProfileClick}
        className="flex items-center gap-4 text-left"
      >
        <div className="relative">
          <img
            src={contact.avatar}
            alt={contact.name}
            className="w-12 h-12 rounded-full"
          />
          <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></span>
        </div>
        <div>
          <h2 className="text-lg font-bold text-gray-800">{contact.name}</h2>
          <p className="text-sm text-gray-500">Online</p>
        </div>
      </button>

      <div className="flex items-center divide-x divide-gray-200">
        <div className="flex items-center gap-1 px-4">
          <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full">
            <HiOutlineSpeakerWave size={22} />
          </button>
          <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full">
            <FiSearch size={22} />
          </button>
          <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full">
            <FiPhone size={22} />
          </button>
          <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full">
            <IoGridOutline size={22} />
          </button>
        </div>
        <div className="pl-4">
          <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full">
            <FiMoreVertical size={22} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
