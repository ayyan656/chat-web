import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
// import './index.css';
import { AuthProvider } from "./components/context/AuthContext.jsx"; // <-- Import the provider

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* Wrap the App component with the AuthProvider */}
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
