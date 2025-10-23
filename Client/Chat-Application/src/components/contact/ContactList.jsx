import React from "react";
import ContactItem from "./ContactItem";

function ContactList({ contacts = [], activeContactId, onContactSelect }) {
  return (
    <div className="flex-1 overflow-y-auto">
      {contacts.length > 0 ? (
        contacts.map((contact) => (
          <ContactItem
            key={contact.id}
            contact={contact}
            active={contact.id === activeContactId}
            onClick={() => onContactSelect(contact.id)}
          />
        ))
      ) : (
        <p className="text-center text-gray-500 p-4">No contacts found.</p>
      )}
    </div>
  );
}

export default ContactList;
