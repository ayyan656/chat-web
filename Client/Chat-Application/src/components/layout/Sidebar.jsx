import React, { useState } from 'react';
import ContactHeader from '../contact/ContactHeader';
import ContactList from '../contact/ContactList';
import ContactSearch from '../contact/ContactSearch';
import { mockContacts } from '../../mockData'; 

const Sidebar = ({ activeContactId, onContactSelect, closeSidebar }) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Filter contacts based on search term
  const filteredContacts = mockContacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    console.log(handleSearchChange)
  };

  const clearSearch = () => {
    setSearchTerm('');
  };

  return (
    <div className="w-[350px] flex flex-col bg-white border-r border-gray-200">
      {/* Header with close button */}
      <ContactHeader onClose={closeSidebar} />

      {/* Search bar */}
      <div className="p-4 border-b border-gray-200">
        <ContactSearch
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
          onClearSearch={clearSearch}
        />
      </div>

      {/* Contact list */}
      <ContactList
        contacts={filteredContacts}
        activeContactId={activeContactId}
        onContactSelect={onContactSelect}
      />
    </div>
  );
};

export default Sidebar;
