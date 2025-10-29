import React, { useState } from "react";
import AuthForm from "../auth/AuthForm";
import { FiMail, FiLock } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const LoginPage = ({ onLogin }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login attempt:", formData);
    onLogin();
    navigate("/");
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
    buttonText: "Log In",
    footerText: "Don't have an account?",
    footerLink: { to: "/register", text: "Sign Up" },
  };

  return (
    <AuthForm
      config={loginConfig}
      formData={formData}
      handleInputChange={handleInputChange}
      handleSubmit={handleSubmit}
    />
  );
};

export default LoginPage;
