import React from 'react';
import { IoDocumentsOutline, IoImagesOutline, IoLocationOutline } from 'react-icons/io5';
import { FiBarChart2 } from 'react-icons/fi';

// A reusable component for each item in the menu
const MenuItem = ({ icon, text, color }) => {
  const handleClick = () => {
    alert(`Functionality for "${text}" would be triggered here.`);
  };

  return (
    <button
      onClick={handleClick}
      className="flex items-center w-full text-left p-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200"
    >
      <div className={`p-2 rounded-full mr-4 ${color.bg}`}>
        {React.cloneElement(icon, { size: 20, className: color.text })}
      </div>
      <span className="font-medium">{text}</span>
    </button>
  );
};

const AttachmentMenu = ({ isOpen }) => {
  const menuItems = [
    { icon: <IoDocumentsOutline />, text: 'Document', color: { bg: 'bg-purple-100', text: 'text-purple-600' } },
    { icon: <IoImagesOutline />, text: 'Photos & videos', color: { bg: 'bg-blue-100', text: 'text-blue-600' } },
    { icon: <FiBarChart2 />, text: 'Poll', color: { bg: 'bg-orange-100', text: 'text-orange-600' } },
    { icon: <IoLocationOutline />, text: 'Current location', color: { bg: 'bg-green-100', text: 'text-green-600' } },
  ];

  return (
    <div
      className={`
        absolute bottom-[80px] right-4 w-60 bg-white rounded-xl shadow-2xl p-2
        transform transition-all duration-300 ease-in-out
        ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}
      `}
      style={{ transformOrigin: 'bottom left' }}
    >
      <div className="space-y-1">
        {menuItems.map((item, index) => (
          <MenuItem key={index} {...item} />
        ))}
      </div>
    </div>
  );
};

export default AttachmentMenu;