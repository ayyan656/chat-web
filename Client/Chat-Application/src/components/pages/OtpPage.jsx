import React, { useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

const OtpPage = ({ onVerify }) => {
  // The new design has 4 input fields instead of 6
  const [otp, setOtp] = useState(new Array(4).fill(""));
  const navigate = useNavigate();
  const inputRefs = useRef([]);

  const handleChange = (element, index) => {
    // Regex to allow only digits
    if (!/^[0-9]$/.test(element.value)) {
      // If the value is not a digit, clear it (except for backspace)
      element.value = "";
      return;
    }

    // Update OTP state
    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    // Focus next input
    if (element.nextSibling && element.value) {
      element.nextSibling.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    // Move focus to previous input on backspace if current is empty
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const enteredOtp = otp.join("");
    // Check if the OTP has 4 digits
    if (enteredOtp.length === 4) {
      console.log("Verifying OTP:", enteredOtp);
      onVerify(); // Call the login function from App.jsx
      navigate("/"); // Redirect to the main chat app
    } else {
      alert("Please enter the complete 4-digit OTP.");
    }
  };

  const handleResend = () => {
    alert("A new OTP would be sent to your email address.");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full bg-white shadow-xl rounded-2xl p-8 space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Verify Email Address
          </h1>
          <p className="mt-2 text-gray-600">
            We've sent an OTP to your email address. Please enter the OTP to
            verify your account.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="text-sm font-medium text-gray-700">
              Enter OTP
            </label>
            <div className="flex justify-center gap-3 mt-2">
              {otp.map((data, index) => (
                <input
                  key={index}
                  type="tel" // Use 'tel' for numeric keyboard on mobile
                  maxLength="1"
                  value={data}
                  ref={(el) => (inputRefs.current[index] = el)}
                  onChange={(e) => handleChange(e.target, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className="w-16 h-16 text-center text-2xl font-semibold border-2 border-teal-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              ))}
            </div>
          </div>

          <div className="text-sm text-center">
            <span className="text-gray-600">Didn't get a code? </span>
            <button
              type="button"
              onClick={handleResend}
              className="font-semibold text-orange-500 hover:underline"
            >
              Resend
            </button>
          </div>

          <div>
            <button
              type="submit"
              className="w-full bg-teal-500 text-white font-bold py-3 px-4 rounded-xl text-lg hover:bg-teal-600 transition-colors duration-300"
            >
              Verify
            </button>
          </div>
        </form>

        <div className="text-center">
          <Link
            to="/login"
            className="inline-flex items-center gap-2 font-medium text-gray-600 hover:text-teal-600"
          >
            <FiArrowLeft />
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OtpPage;
