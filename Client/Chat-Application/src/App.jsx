import React, { useState } from "react";
import Navbar from "./components/layout/Navbar";
import Sidebar from "./components/layout/Sidebar";
import ChatWindow from "./components/chat/ChatWindow";
import Profile from "./components/profile/Profile";
import { mockContacts } from "./mockData";

function App() {
  const [activeNav, setActiveNav] = useState("Chat");
  const [activeContactId, setActiveContactId] = useState(1);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [isProfileVisible, setIsProfileVisible] = useState(false);

  // This is the new function to close any popups managed by App.js
  const closeAllPopups = () => {
    setIsProfileVisible(false);
  };

  const handleNavClick = (navId) => {
    setActiveNav(navId);
    if (navId === "Chat") {
      if (activeNav === "Chat") setIsSidebarVisible(!isSidebarVisible);
      else setIsSidebarVisible(true);
    } else {
      setIsSidebarVisible(false);
    }
    closeAllPopups(); // Also close profile when switching tabs
  };

  const handleContactSelect = (id) => {
    if (activeContactId !== id) {
      setActiveContactId(id);
      closeAllPopups(); // Close profile when switching contacts
    }
  };

  const closeSidebar = () => setIsSidebarVisible(false);

  const toggleProfile = () => setIsProfileVisible(!isProfileVisible);

  const activeContact = mockContacts.find((c) => c.id === activeContactId);

  return (
    <div className="flex h-screen bg-gray-50 font-sans">
      <Navbar activeNav={activeNav} onNavClick={handleNavClick} />

      <main className="pl-24 w-full flex">
        {isSidebarVisible && activeNav === "Chat" && (
          <Sidebar
            activeContactId={activeContactId}
            onContactSelect={handleContactSelect}
            closeSidebar={closeSidebar}
          />
        )}

        <div className="flex-1 flex">
          {activeNav === "Chat" ? (
            <ChatWindow
              key={activeContactId}
              activeContactId={activeContactId}
              onProfileClick={toggleProfile}
              onCloseAllPopups={closeAllPopups} // <-- Pass the function down
            />
          ) : (
            <div className="p-6 w-full flex items-center justify-center">
              <h1 className="text-2xl font-bold text-gray-400">
                {activeNav} Page
              </h1>
            </div>
          )}
        </div>

        {isProfileVisible && (
          <Profile contact={activeContact} onClose={toggleProfile} />
        )}
      </main>
    </div>
  );
}

export default App;
