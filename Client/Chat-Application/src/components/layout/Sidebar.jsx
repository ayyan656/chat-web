// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import ContactHeader from "../contact/ContactHeader";
// import ContactList from "../contact/ContactList";
// import ContactSearch from "../contact/ContactSearch";
// import AddContactModal from "../contact/AddContactModal.jsx";

// const Sidebar = ({ activeChatId, onChatSelect, closeSidebar }) => {
//   const [allContacts, setAllContacts] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [isModalOpen, setModalOpen] = useState(false);

//   useEffect(() => {
//     const fetchContacts = async () => {
//       try {
//         setLoading(true);
//         const { data } = await axios.get("http://localhost:3000/api/contacts", {
//           withCredentials: true,
//         });
//         setAllContacts(data);
//       } catch (err) {
//         setError("Failed to load contacts.", { message: err.message });
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchContacts();
//   }, []);

//   const handleContactAdded = (newContact) => {
//     setAllContacts((prev) => [newContact, ...prev]);
//   };

//   const handleContactClick = async (contact) => {
//     if (!contact.isRegistered) {
//       alert(`${contact.displayName} is not a registered user.`);
//       return;
//     }
//     try {
//       const { data } = await axios.post(
//         "http://localhost:3000/api/chats",
//         { userId: contact.registeredUser._id },
//         { withCredentials: true }
//       );
//       onChatSelect(data);
//     } catch (error) {
//       console.error("Failed to access chat", error);
//     }
//   };

//   const filteredContacts = allContacts.filter(
//     (contact) =>
//       contact.displayName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       (contact.isRegistered &&
//         contact.registeredUser.username
//           .toLowerCase()
//           .includes(searchTerm.toLowerCase()))
//   );

//   return (
//     <>
//       <AddContactModal
//         isOpen={isModalOpen}
//         onClose={() => setModalOpen(false)}
//         onContactAdded={handleContactAdded}
//       />
//       <div className="w-[350px] flex flex-col bg-white border-r border-gray-200">
//         <ContactHeader onClose={closeSidebar} />

//         {/* --- THIS IS THE NEW LAYOUT FOR SEARCH + ADD BUTTON --- */}
//         <div className="p-3 border-b border-gray-200 flex items-center gap-3">
//           <ContactSearch
//             searchTerm={searchTerm}
//             onSearchChange={(e) => setSearchTerm(e.target.value)}
//           />
//           <button
//             onClick={() => setModalOpen(true)}
//             title="Add New Contact"
//             className="flex-shrink-0 bg-teal-500 text-white w-9 h-9 flex items-center justify-center font-bold text-lg rounded-full hover:bg-teal-600 transition-colors"
//           >
//             +
//           </button>
//         </div>

//         {loading ? (
//           <p className="p-4 text-center text-gray-500">Loading contacts...</p>
//         ) : error ? (
//           <p className="p-4 text-center text-red-500">{error}</p>
//         ) : (
//           <ContactList
//             contacts={filteredContacts}
//             activeChatId={activeChatId}
//             onContactClick={handleContactClick}
//           />
//         )}
//       </div>
//     </>
//   );
// };

// export default Sidebar;

// src/components/layout/Sidebar.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import ContactList from "../contact/ContactList";
import AddContactModal from "../contact/AddContactModal.jsx";
import { FiSearch } from "react-icons/fi";

const Sidebar = ({ activeChatId, onChatSelect }) => {
  const [allContacts, setAllContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    let mounted = true;
    const fetchContacts = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get("http://localhost:3000/api/contacts", {
          withCredentials: true,
        });
        if (!mounted) return;
        setAllContacts(data);
      } catch (err) {
        console.error(err);
        if (mounted) setError("Failed to load contacts.");
      } finally {
        if (mounted) setLoading(false);
      }
    };
    fetchContacts();
    return () => {
      mounted = false;
    };
  }, []);

  const handleContactAdded = (newContact) => {
    setAllContacts((prev) => [newContact, ...prev]);
  };

  const handleContactClick = async (contact) => {
    if (!contact.isRegistered) {
      alert(`${contact.displayName} is not a registered user.`);
      return;
    }
    try {
      const { data } = await axios.post(
        "http://localhost:3000/api/chats",
        { userId: contact.registeredUser._id },
        { withCredentials: true }
      );
      onChatSelect(data);
    } catch (error) {
      console.error("Failed to access chat", error);
    }
  };

  const filteredContacts = allContacts.filter(
    (contact) =>
      contact.displayName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (contact.isRegistered &&
        contact.registeredUser.username
          .toLowerCase()
          .includes(searchTerm.toLowerCase()))
  );

  return (
    <>
      <AddContactModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onContactAdded={handleContactAdded}
      />
      <div className="w-[350px] flex flex-col bg-white border-r border-gray-200">
        <div className="p-4 border-b">
          <h1 className="text-2xl font-bold">Contact</h1>
          <p className="text-sm text-gray-500">Start Without Delay...</p>
        </div>

        <div className="p-3 border-b flex items-center gap-2">
          <div className="relative flex-1">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search contacts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-100 rounded-full pl-10 pr-4 py-2 text-sm focus:outline-none"
            />
          </div>
          <button
            onClick={() => setModalOpen(true)}
            title="Add New Contact"
            className="flex-shrink-0 bg-teal-500 text-white w-9 h-9 flex items-center justify-center font-bold text-lg rounded-full hover:bg-teal-600 transition-colors"
          >
            +
          </button>
        </div>

        {loading ? (
          <p className="p-4 text-center text-gray-500">Loading...</p>
        ) : error ? (
          <p className="p-4 text-center text-red-500">{error}</p>
        ) : (
          <ContactList
            contacts={filteredContacts}
            activeChatId={activeChatId}
            onContactClick={handleContactClick}
          />
        )}
      </div>
    </>
  );
};

export default Sidebar;
