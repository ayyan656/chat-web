import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// --- THE FIX IS HERE: Correct the import path for the context ---
import { useAuth } from "../context/AuthContext.jsx";
import AuthForm from "../auth/AuthForm.jsx";
import { FiMail, FiLock } from "react-icons/fi";

const LoginPage = () => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // --- THE FIX IS HERE: Correct the backend URL ---
      const { data } = await axios.post(
        "http://localhost:3000/api/auth/login",
        formData,
        { withCredentials: true }
      );

      console.log("Login successful:", data);
      
      login(data);

      if (data.profileComplete) {
        navigate('/');
      } else {
        navigate('/complete-profile');
      }

    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Login failed. Please try again.";
      setError(errorMessage);
      console.error("Login error:", err.response);
      setLoading(false);
    }
  };

  const loginConfig = {
    title: "Welcome Back",
    subtitle: "Log in to access your secure chats.",
    fields: [
      {
        id: "email",
        label: "Email",
        type: "email",
        placeholder: "you@example.com",
        icon: <FiMail className="text-gray-400" />,
      },
      {
        id: "password",
        label: "Password",
        type: "password",
        placeholder: "••••••••",
        icon: <FiLock className="text-gray-400" />,
      },
    ],
    link: { href: "#", text: "Forgot Password?" },
    buttonText: loading ? "Logging In..." : "Log In",
    footerText: "Don't have an account?",
    footerLink: { to: "/register", text: "Sign Up" },
  };

  return (
    <AuthForm
      config={loginConfig}
      formData={formData}
      handleInputChange={handleInputChange}
      handleSubmit={handleSubmit}
      error={error}
    />
  );
};

export default LoginPage;