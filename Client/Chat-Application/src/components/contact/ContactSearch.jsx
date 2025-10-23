import React from 'react';
import { FiSearch, FiX } from 'react-icons/fi';

const ContactSearch = ({ searchTerm, onSearchChange, onClearSearch }) => {
  return (
    <div className="relative w-full">
      <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
      <input
        type="text"
        value={searchTerm}
        onChange={onSearchChange}
        placeholder="Search contacts..."
        className="w-full bg-gray-100 rounded-full pl-11 pr-10 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
      />
      {searchTerm && (
        <button
          onClick={onClearSearch}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-800"
        >
          <FiX />
        </button>
      )}
    </div>
  );
};

export default ContactSearch;

