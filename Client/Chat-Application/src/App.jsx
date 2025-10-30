// import React from "react";
// import { useState } from "react";
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate,
//   useNavigate,
// } from "react-router-dom";
// import { useAuth } from "./components/context/AuthContext.jsx"; // <-- Import the custom hook

// // Import Components and Pages
// import Navbar from "./components/layout/Navbar";
// import Sidebar from "./components/layout/Sidebar";
// import ChatWindow from "./components/chat/ChatWindow";
// import Profile from "./components/profile/Profile.jsx";
// import LoginPage from "./components/pages/LoginPage.jsx";
// import SignupPage from "./components/pages/SignupPage.jsx";
// import OtpPage from "./components/pages/OtpPage.jsx";
// import CompleteProfilePage from "./components/pages/CompleteProfilePage.jsx";

// // function App() {
// //   // Get authentication state and functions from the context
// //   const { authUser, logout } = useAuth();

// //   // The logic is now much cleaner: is there an authUser or not?
// //   const isAuthenticated = !!authUser;

// //   // The ProtectedChatLayout no longer needs to manage its own state for the logged-in user
// //   const ProtectedChatLayout = ({ onLogout }) => {
// //     const [activeNav, setActiveNav] = useState("Chat");
// //     // We will soon replace mock data here too
// //     const [activeContactId, setActiveContactId] = useState(1);
// //     const [isSidebarVisible, setIsSidebarVisible] = useState(true);
// //     const [isProfileVisible, setIsProfileVisible] = useState(false);

// //     const closeAllPopups = () => setIsProfileVisible(false);

// //     const handleNavClick = (navId) => {
// //       setActiveNav(navId);
// //       // ... same logic
// //     };

// //     const handleContactSelect = (id) => {
// //       // ... same logic
// //     };

// //     // Get the REAL user from the context to pass to the Profile component
// //     const realUserForProfile = {
// //       name: authUser.displayName || authUser.username,
// //       email: authUser.email,
// //       avatar:
// //         authUser.profilePictureUrl ||
// //         `https://i.pravatar.cc/150?u=${authUser._id}`,
// //     };

// //     const closeSidebar = () => setIsSidebarVisible(false);
// //     const toggleProfile = () => setIsProfileVisible(!isProfileVisible);

// //     return (
// //       <div className="flex h-screen bg-gray-50 font-sans">
// //         <Navbar
// //           activeNav={activeNav}
// //           onNavClick={handleNavClick}
// //           onLogout={onLogout}
// //         />
// //         <main className="pl-24 w-full flex">
// //           {isSidebarVisible && activeNav === "Chat" && (
// //             <Sidebar
// //               activeContactId={activeContactId}
// //               onContactSelect={handleContactSelect}
// //               closeSidebar={closeSidebar}
// //             />
// //           )}
// //           <div className="flex-1 flex">
// //             {activeNav === "Chat" ? (
// //               <ChatWindow
// //                 key={activeContactId}
// //                 activeContactId={activeContactId}
// //                 onProfileClick={toggleProfile}
// //                 onCloseAllPopups={closeAllPopups}
// //               />
// //             ) : (
// //               <div className="p-6 w-full flex items-center justify-center">
// //                 <h1 className="text-2xl font-bold text-gray-400">
// //                   {activeNav} Page
// //                 </h1>
// //               </div>
// //             )}
// //           </div>
// //           {isProfileVisible && (
// //             // Pass the REAL user data to the profile
// //             <Profile
// //               contact={realUserForProfile}
// //               onClose={toggleProfile}
// //               onLogout={onLogout}
// //             />
// //           )}
// //         </main>
// //       </div>
// //     );
// //   };

// //   return (
// //     <Router>
// //       <Routes>
// //         <Route
// //           path="/login"
// //           element={!isAuthenticated ? <LoginPage /> : <Navigate to="/" />}
// //         />
// //         <Route
// //           path="/register"
// //           element={!isAuthenticated ? <SignupPage /> : <Navigate to="/" />}
// //         />
// //         <Route
// //           path="/verify-otp"
// //           element={!isAuthenticated ? <OtpPage /> : <Navigate to="/" />}
// //         />
// //         <Route
// //           path="/complete-profile"
// //           element={
// //             isAuthenticated ? <CompleteProfilePage /> : <Navigate to="/login" />
// //           }
// //         />
// //         <Route
// //           path="/"
// //           element={
// //             isAuthenticated ? (
// //               <ProtectedChatLayout onLogout={logout} />
// //             ) : (
// //               <Navigate to="/login" />
// //             )
// //           }
// //         />
// //         <Route path="*" element={<Navigate to="/" />} />
// //       </Routes>
// //     </Router>
// //   );
// // }

// // export default App;
// function App() {
//   // This is a wrapper component that contains all the routing logic.
//   // We use this pattern to get access to the `useNavigate` hook.
//   const AppRoutes = () => {
//     const { authUser, logout } = useAuth();
//     const isAuthenticated = !!authUser;
//     const navigate = useNavigate(); // Hook for programmatic navigation

//     // --- LOGOUT FIX ---
//     // This function will be passed down to the protected layout.
//     // It now explicitly navigates to the login page after logging out.
//     const handleLogout = () => {
//       logout(); // Clears the auth context and localStorage
//       navigate("/login"); // Forces redirect to the login page
//     };

//     return (
//       <Routes>
//         <Route
//           path="/login"
//           element={!isAuthenticated ? <LoginPage /> : <Navigate to="/" />}
//         />
//         <Route
//           path="/register"
//           element={!isAuthenticated ? <SignupPage /> : <Navigate to="/" />}
//         />
//         <Route
//           path="/verify-otp"
//           element={!isAuthenticated ? <OtpPage /> : <Navigate to="/" />}
//         />
//         <Route
//           path="/complete-profile"
//           element={
//             isAuthenticated ? <CompleteProfilePage /> : <Navigate to="/login" />
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
//     );
//   };

//   // --- This component now contains ALL of your chat UI logic ---
//   const ProtectedChatLayout = ({ onLogout }) => {
//     const { authUser } = useAuth(); // Get the logged-in user from context
//     const [activeNav, setActiveNav] = useState("Chat");
//     const [activeContactId, setActiveContactId] = useState(1); // Will be replaced by real data later
//     const [isSidebarVisible, setIsSidebarVisible] = useState(true);
//     const [isProfileVisible, setIsProfileVisible] = useState(false);

//     const closeAllPopups = () => setIsProfileVisible(false);

//     // --- RESTORED LOGIC ---
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

//     // --- RESTORED LOGIC ---
//     const handleContactSelect = (id) => {
//       if (activeContactId !== id) {
//         setActiveContactId(id);
//         closeAllPopups();
//       }
//     };

//     const closeSidebar = () => setIsSidebarVisible(false);
//     const toggleProfile = () => setIsProfileVisible(!isProfileVisible);

//     // Safely access authUser properties
//     const realUserForProfile = {
//       name: authUser?.displayName || authUser?.username,
//       email: authUser?.email,
//       avatar:
//         authUser?.profilePictureUrl ||
//         `https://i.pravatar.cc/150?u=${authUser?._id}`,
//     };

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
//             <Profile
//               contact={realUserForProfile}
//               onClose={toggleProfile}
//               onLogout={onLogout}
//             />
//           )}
//         </main>
//       </div>
//     );
//   };

//   // The App component now only needs to wrap everything in the Router
//   return (
//     <Router>
//       <AppRoutes />
//     </Router>
//   );
// }

// export default App;
import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
// --- THE FIX IS HERE ---
import { useAuth } from "./components/context/AuthContext.jsx";

// Import Route Wrappers
import ProtectedRoute from "./utils/ProtectedRoute.jsx";
import PublicRoute from "./utils/PublicRoute.jsx";

// Import Components and Pages
import Navbar from "./components/layout/Navbar";
import Sidebar from "./components/layout/Sidebar";
import ChatWindow from "./components/chat/ChatWindow";
import Profile from "./components/profile/Profile.jsx";
import LoginPage from "./components/pages/LoginPage.jsx";
import SignupPage from "./components/pages/SignupPage.jsx";
import OtpPage from "./components/pages/OtpPage.jsx";
import CompleteProfilePage from "./components/pages/CompleteProfilePage.jsx";

function App() {
  const AppContent = () => {
    const { authUser, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
      logout();
      navigate("/login");
    };

    const MainChatLayout = () => {
      // ... This entire component's code is correct and does not need to change ...
      const [activeNav, setActiveNav] = useState("Chat");
      const [activeContactId, setActiveContactId] = useState(1);
      const [isSidebarVisible, setIsSidebarVisible] = useState(true);
      const [isProfileVisible, setIsProfileVisible] = useState(false);
      const closeAllPopups = () => setIsProfileVisible(false);
      const handleNavClick = (navId) => {
        setActiveNav(navId);
        if (navId === "Chat") setIsSidebarVisible((prev) => !prev);
        else setIsSidebarVisible(false);
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
      const realUserForProfile = {
        name: authUser?.displayName || authUser?.username,
        email: authUser?.email,
        avatar:
          authUser?.profilePictureUrl ||
          `https://i.pravatar.cc/150?u=${authUser?._id}`,
      };
      return (
        <div className="flex h-screen bg-gray-50 font-sans">
          <Navbar
            activeNav={activeNav}
            onNavClick={handleNavClick}
            onLogout={handleLogout}
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
            {isProfileVisible && (
              <Profile
                contact={realUserForProfile}
                onClose={toggleProfile}
                onLogout={handleLogout}
              />
            )}
          </main>
        </div>
      );
    };

    return (
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<SignupPage />} />
          <Route path="/verify-otp" element={<OtpPage />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<MainChatLayout />} />
          <Route path="/complete-profile" element={<CompleteProfilePage />} />
        </Route>
        <Route path="*" element={<Navigate to={authUser ? "/" : "/login"} />} />
      </Routes>
    );
  };

  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
