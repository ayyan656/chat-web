// import React from "react";
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate,
//   useNavigate,
// } from "react-router-dom";
// import { useAuth } from "./components/context/AuthContext.jsx";
// import ProtectedRoute from "./utils/ProtectedRoute.jsx";
// import PublicRoute from "./utils/PublicRoute.jsx";
// import Navbar from "./components/layout/Navbar";
// import Sidebar from "./components/layout/Sidebar";
// import ChatWindow from "./components/chat/ChatWindow";
// import Profile from "./components/profile/Profile.jsx";
// import LoginPage from "./components/pages/LoginPage.jsx";
// import SignupPage from "./components/pages/SignupPage.jsx";
// import OtpPage from "./components/pages/OtpPage.jsx";
// import CompleteProfilePage from "./components/pages/CompleteProfilePage.jsx";
// import SocketProvider from "./components/context/SocketProvider.jsx";
// import { FiMessageSquare } from "react-icons/fi";

// function App() {
//   const AppContent = () => {
//     const { authUser, logout } = useAuth();
//     const navigate = useNavigate();

//     const handleLogout = () => {
//       logout();
//       navigate("/login");
//     };

//     const MainChatLayout = () => {
//       const [selectedChat, setSelectedChat] = React.useState(null);
//       const [isProfileVisible, setIsProfileVisible] = React.useState(false);

//       const handleChatSelect = (chat) => {
//         if (selectedChat?._id !== chat._id) {
//           setSelectedChat(chat);
//           setIsProfileVisible(false);
//         }
//       };

//       const WelcomePlaceholder = () => (
//         <div className="flex-1 flex flex-col items-center justify-center bg-gray-50 text-gray-400 p-4">
//           <FiMessageSquare size={80} className="mb-4" />
//           <h2 className="text-xl font-semibold">Select a chat to begin</h2>
//         </div>
//       );

//       return (
//         <div className="flex h-screen bg-white font-sans">
//           <Navbar onLogout={handleLogout} />
//           <Sidebar
//             activeChatId={selectedChat?._id}
//             onChatSelect={handleChatSelect}
//           />
//           <div className="flex-1 flex flex-col border-l border-gray-200">
//             {selectedChat ? (
//               // KEEP the key so ChatWindow remounts cleanly when chat changes.
//               <ChatWindow
//                 key={selectedChat._id}
//                 chat={selectedChat}
//                 onProfileClick={() => setIsProfileVisible((p) => !p)}
//               />
//             ) : (
//               <WelcomePlaceholder />
//             )}
//           </div>
//           {isProfileVisible && selectedChat && (
//             <Profile
//               contact={selectedChat.users.find((u) => u._id !== authUser._id)}
//               onClose={() => setIsProfileVisible(false)}
//               onLogout={handleLogout}
//             />
//           )}
//         </div>
//       );
//     };

//     return (
//       <Routes>
//         <Route element={<PublicRoute />}>
//           <Route path="/login" element={<LoginPage />} />
//           <Route path="/register" element={<SignupPage />} />
//           <Route path="/verify-otp" element={<OtpPage />} />
//         </Route>

//         <Route element={<ProtectedRoute />}>
//           <Route path="/" element={<MainChatLayout />} />
//           <Route path="/complete-profile" element={<CompleteProfilePage />} />
//         </Route>

//         <Route path="*" element={<Navigate to={authUser ? "/" : "/login"} />} />
//       </Routes>
//     );
//   };

//   return (
//     <Router>
//       <SocketProvider>
//         <AppContent />
//       </SocketProvider>
//     </Router>
//   );
// }

// export default App;
// src/App.jsx (replace your current App content with this)
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { useAuth } from "./components/context/AuthContext.jsx";
import ProtectedRoute from "./utils/ProtectedRoute.jsx";
import PublicRoute from "./utils/PublicRoute.jsx";
import Navbar from "./components/layout/Navbar";
import Sidebar from "./components/layout/Sidebar";
import ChatWindow from "./components/chat/ChatWindow";
import Profile from "./components/profile/Profile.jsx";
import LoginPage from "./components/pages/LoginPage.jsx";
import SignupPage from "./components/pages/SignupPage.jsx";
import OtpPage from "./components/pages/OtpPage.jsx";
import CompleteProfilePage from "./components/pages/CompleteProfilePage.jsx";
import SocketProvider from "./components/context/SocketProvider.jsx";
import { FiMessageSquare } from "react-icons/fi";

function App() {
  const AppContent = () => {
    const { authUser, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
      logout();
      navigate("/login");
    };

    const MainChatLayout = () => {
      const [selectedChat, setSelectedChat] = React.useState(null);
      const [isProfileVisible, setIsProfileVisible] = React.useState(false);

      const handleChatSelect = (chat) => {
        if (selectedChat?._id !== chat._id) {
          setSelectedChat(chat);
          setIsProfileVisible(false);
        }
      };

      const WelcomePlaceholder = () => (
        <div className="flex-1 flex flex-col items-center justify-center bg-gray-50 text-gray-400 p-4">
          <FiMessageSquare size={80} className="mb-4" />
          <h2 className="text-xl font-semibold">Select a chat to begin</h2>
        </div>
      );

      return (
        <div className="flex h-screen bg-white font-sans">
          <Navbar onLogout={handleLogout} />
          <Sidebar
            activeChatId={selectedChat?._id}
            onChatSelect={handleChatSelect}
          />
          <div className="flex-1 flex flex-col border-l border-gray-200">
            {selectedChat ? (
              // KEEP the key so ChatWindow remounts cleanly when chat changes.
              <ChatWindow
                key={selectedChat._id}
                chat={selectedChat}
                onProfileClick={() => setIsProfileVisible((p) => !p)}
              />
            ) : (
              <WelcomePlaceholder />
            )}
          </div>
          {isProfileVisible && selectedChat && (
            <Profile
              contact={selectedChat.users.find((u) => u._id !== authUser._id)}
              onClose={() => setIsProfileVisible(false)}
              onLogout={handleLogout}
            />
          )}
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
      <SocketProvider>
        <AppContent />
      </SocketProvider>
    </Router>
  );
}

export default App;
