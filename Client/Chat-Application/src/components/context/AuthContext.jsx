import React, { createContext, useState, useContext } from "react";


// Create the context
const AuthContext = createContext();

// Create a custom hook to use the context easily
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  return useContext(AuthContext);
};

// Create the provider component
export const AuthProvider = ({ children }) => {
  // Initialize state from localStorage to persist login across refreshes
  const [authUser, setAuthUser] = useState(() => {
    const storedUser = localStorage.getItem("authUser");
    try {
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error("Failed to parse authUser from localStorage:", error);
      return null;
    }
  });

  const login = (userData) => {
    // Store user data in both state and localStorage
    localStorage.setItem("authUser", JSON.stringify(userData));
    setAuthUser(userData);
  };

  const logout = () => {
    // Clear user data from state and localStorage
    localStorage.removeItem("authUser");
    setAuthUser(null);
  };

  // The value provided to consuming components
  const value = {
    authUser,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
