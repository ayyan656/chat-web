// import React, { useState } from "react";
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate,
// } from "react-router-dom";

// import Navbar from "./components/layout/Navbar";
// import Sidebar from "./components/layout/Sidebar";
// import ChatWindow from "./components/chat/ChatWindow";
// import Profile from "./components/profile/ProfileMenu.jsx";
// import LoginPage from "./components/pages/LoginPage.jsx";
// import SignupPage from "./components/pages/SignupPage.jsx";
// import OtpPage from "./components/pages/OtpPage.jsx"; // <-- Import the new page
// import { mockContacts } from "./mockData";

// function App() {
//   const [isAuthenticated, setIsAuthenticated] = useState(
//     localStorage.getItem("isAuthenticated") === "true"
//   );

//   const handleLogin = () => {
//     localStorage.setItem("isAuthenticated", "true");
//     setIsAuthenticated(true);
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("isAuthenticated");
//     setIsAuthenticated(false);
//   };

//   // --- No changes needed in the ProtectedChatLayout component ---
//   const ProtectedChatLayout = ({ onLogout }) => {
//     // ... (This entire component remains exactly the same as before)
//     const [activeNav, setActiveNav] = useState("Chat");
//     const [activeContactId, setActiveContactId] = useState(1);
//     const [isSidebarVisible, setIsSidebarVisible] = useState(true);
//     const [isProfileVisible, setIsProfileVisible] = useState(false);
//     const closeAllPopups = () => setIsProfileVisible(false);
//     const handleNavClick = (navId) => {
//       setActiveNav(navId);
//       if (navId === "Chat") {
//         if (activeNav === "Chat") setIsSidebarVisible(!isSidebarVisible);
//         else setIsSidebarVisible(true);
//       } else {
//         setIsSidebarVisible(false);
//       }
//       closeAllPopups();
//     };
//     const handleContactSelect = (id) => {
//       if (activeContactId !== id) {
//         setActiveContactId(id);
//         closeAllPopups();
//       }
//     };
//     const closeSidebar = () => setIsSidebarVisible(false);
//     const toggleProfile = () => setIsProfileVisible(!isProfileVisible);
//     const activeContact = mockContacts.find((c) => c.id === activeContactId);
//     return (
//       <div className="flex h-screen bg-gray-50 font-sans">
//         <Navbar
//           activeNav={activeNav}
//           onNavClick={handleNavClick}
//           onLogout={onLogout}
//         />
//         <main className="pl-24 w-full flex">
//           {isSidebarVisible && activeNav === "Chat" && (
//             <Sidebar
//               activeContactId={activeContactId}
//               onContactSelect={handleContactSelect}
//               closeSidebar={closeSidebar}
//             />
//           )}
//           <div className="flex-1 flex">
//             {activeNav === "Chat" ? (
//               <ChatWindow
//                 key={activeContactId}
//                 activeContactId={activeContactId}
//                 onProfileClick={toggleProfile}
//                 onCloseAllPopups={closeAllPopups}
//               />
//             ) : (
//               <div className="p-6 w-full flex items-center justify-center">
//                 <h1 className="text-2xl font-bold text-gray-400">
//                   {activeNav} Page
//                 </h1>
//               </div>
//             )}
//           </div>
//           {isProfileVisible && (
//             <Profile contact={activeContact} onClose={toggleProfile} />
//           )}
//         </main>
//       </div>
//     );
//   };
//   // --- End of ProtectedChatLayout ---

//   return (
//     <Router>
//       <Routes>
//         <Route
//           path="/login"
//           element={
//             !isAuthenticated ? (
//               <LoginPage onLogin={handleLogin} />
//             ) : (
//               <Navigate to="/" />
//             )
//           }
//         />
//         <Route
//           path="/register"
//           element={!isAuthenticated ? <SignupPage /> : <Navigate to="/" />}
//         />

//         {/* --- ADD THIS NEW ROUTE --- */}
//         <Route
//           path="/verify-otp"
//           element={
//             !isAuthenticated ? (
//               <OtpPage onVerify={handleLogin} />
//             ) : (
//               <Navigate to="/" />
//             )
//           }
//         />

//         <Route
//           path="/"
//           element={
//             isAuthenticated ? (
//               <ProtectedChatLayout onLogout={handleLogout} />
//             ) : (
//               <Navigate to="/login" />
//             )
//           }
//         />
//         <Route path="*" element={<Navigate to="/" />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;

import React, { useState } from "react";
// ... other imports remain the same
import Navbar from "./components/layout/Navbar";
import Sidebar from "./components/layout/Sidebar";
import ChatWindow from "./components/chat/ChatWindow";
import Profile from "./components/profile/Profile.jsx"; // Make sure this points to the right file
// import Profile from "./components/profile/ProfileMenu.jsx";
import LoginPage from "./components/pages/LoginPage.jsx";
import SignupPage from "./components/pages/SignupPage.jsx";
import OtpPage from "./components/pages/OtpPage.jsx";
import { mockContacts } from "./mockData";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("isAuthenticated") === "true"
  );

  const handleLogin = () => {
    localStorage.setItem("isAuthenticated", "true");
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    setIsAuthenticated(false);
  };

  const ProtectedChatLayout = ({ onLogout }) => {
    const [activeNav, setActiveNav] = useState("Chat");
    const [activeContactId, setActiveContactId] = useState(1);
    const [isSidebarVisible, setIsSidebarVisible] = useState(true);
    const [isProfileVisible, setIsProfileVisible] = useState(false);

    const closeAllPopups = () => setIsProfileVisible(false);

    const handleNavClick = (navId) => {
      setActiveNav(navId);
      if (navId === "Chat") {
        if (activeNav === "Chat") setIsSidebarVisible(!isSidebarVisible);
        else setIsSidebarVisible(true);
      } else {
        setIsSidebarVisible(false);
      }
      closeAllPopups();
    };

    const handleContactSelect = (id) => {
      if (activeContactId !== id) {
        setActiveContactId(id);
        closeAllPopups();
      }
    };

    const closeSidebar = () => setIsSidebarVisible(false);
    const toggleProfile = () => setIsProfileVisible(!isProfileVisible);
    const activeContact = mockContacts.find((c) => c.id === activeContactId);

    return (
      <div className="flex h-screen bg-gray-50 font-sans">
        {/* Pass the onLogout function down to the Navbar */}
        <Navbar
          activeNav={activeNav}
          onNavClick={handleNavClick}
          onLogout={onLogout}
        />
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
                onCloseAllPopups={closeAllPopups}
              />
            ) : (
              <div className="p-6 w-full flex items-center justify-center">
                <h1 className="text-2xl font-bold text-gray-400">
                  {activeNav} Page
                </h1>
              </div>
            )}
          </div>
          {/* This now renders our new Profile component, passing the logout function */}
          {isProfileVisible && (
            <Profile
              contact={activeContact}
              onClose={toggleProfile}
              onLogout={onLogout}
            />
          )}
        </main>
      </div>
    );
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={
            !isAuthenticated ? (
              <LoginPage onLogin={handleLogin} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/register"
          element={!isAuthenticated ? <SignupPage /> : <Navigate to="/" />}
        />
        <Route
          path="/verify-otp"
          element={
            !isAuthenticated ? (
              <OtpPage onVerify={handleLogin} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <ProtectedChatLayout onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
