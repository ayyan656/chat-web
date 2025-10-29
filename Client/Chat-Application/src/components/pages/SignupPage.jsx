// import React, { useState } from "react";
// import AuthForm from "../auth/AuthForm";
// import { FiMail, FiPhone, FiLock } from "react-icons/fi";

// const SignupPage = () => {
//   const [formData, setFormData] = useState({
//     email: "",
//     phoneNumber: "",
//     password: "",
//   });

//   const handleInputChange = (e) => {
//     setFormData({ ...formData, [e.target.id]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Signup Submitted:", formData);
//     alert("Signup successful! You would be redirected to email verification.");
//   };

//   const signupConfig = {
//     title: "Create Your Secure Account",
//     subtitle: "Privacy is our priority.",
//     fields: [
//       {
//         id: "email",
//         label: "Email",
//         type: "email",
//         placeholder: "you@example.com",
//         icon: <FiMail className="text-gray-400" />,
//       },
//       {
//         id: "phoneNumber",
//         label: "Phone Number",
//         type: "tel",
//         placeholder: "+1 202 555 0123",
//         icon: <FiPhone className="text-gray-400" />,
//       },
//       {
//         id: "password",
//         label: "Password",
//         type: "password",
//         placeholder: "••••••••",
//         icon: <FiLock className="text-gray-400" />,
//       },
//     ],
//     buttonText: "Create Account",
//     footerText: "Already have an account?",
//     footerLink: { to: "/login", text: "Log In" },
//   };

//   return (
//     <AuthForm
//       config={signupConfig}
//       formData={formData}
//       handleInputChange={handleInputChange}
//       handleSubmit={handleSubmit}
//     />
//   );
// };

// export default SignupPage;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // <-- Import useNavigate
import AuthForm from "../auth/AuthForm";
import { FiMail, FiPhone, FiLock } from "react-icons/fi";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    phoneNumber: "",
    password: "",
  });
  const navigate = useNavigate(); // <-- Initialize the hook

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Signup Submitted:", formData);
    // Instead of an alert, we now redirect to the OTP page
    navigate("/verify-otp"); // <-- Redirect here
  };

  const signupConfig = {
    title: "Create Your Secure Account",
    subtitle: "Privacy is our priority.",
    fields: [
      {
        id: "email",
        label: "Email",
        type: "email",
        placeholder: "you@example.com",
        icon: <FiMail className="text-gray-400" />,
      },
      {
        id: "phoneNumber",
        label: "Phone Number",
        type: "tel",
        placeholder: "+1 202 555 0123",
        icon: <FiPhone className="text-gray-400" />,
      },
      {
        id: "password",
        label: "Password",
        type: "password",
        placeholder: "••••••••",
        icon: <FiLock className="text-gray-400" />,
      },
    ],
    buttonText: "Create Account",
    footerText: "Already have an account?",
    footerLink: { to: "/login", text: "Log In" },
  };

  return (
    <AuthForm
      config={signupConfig}
      formData={formData}
      handleInputChange={handleInputChange}
      handleSubmit={handleSubmit}
    />
  );
};

export default SignupPage;
