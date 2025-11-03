import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AuthForm from "../auth/AuthForm.jsx";
import { FiUser, FiMail, FiLock } from "react-icons/fi";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
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

    if (!formData.username || !formData.email || !formData.password) {
      setError("All fields are required.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/register",
        formData
      );

      console.log("Registration successful:", response.data);
      setLoading(false);
      
      navigate("/verify-otp", { state: { email: formData.email } });
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Registration failed. Please try again.";
      setError(errorMessage);
      console.error("Registration error:", err);
      setLoading(false);
    }
  };

  const signupConfig = {
    title: "Create Your Secure Account",
    subtitle: "Privacy is our priority.",
    fields: [
      {
        id: "username",
        label: "Username",
        type: "text",
        placeholder: "e.g., john_doe",
        icon: <FiUser className="text-gray-400" />,
      },
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
    buttonText: loading ? "Creating Account..." : "Create Account",
    footerText: "Already have an account?",
    footerLink: { to: "/login", text: "Log In" },
  };

  return (
    <AuthForm
      config={signupConfig}
      formData={formData}
      handleInputChange={handleInputChange}
      handleSubmit={handleSubmit}
      error={error}
    />
  );
};

export default SignupPage;