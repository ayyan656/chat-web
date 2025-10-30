import React, { useState, useRef } from "react";
import { useNavigate, Link, useLocation, Navigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext.jsx"; // Import the useAuth hook
import { FiArrowLeft } from "react-icons/fi";

const OtpPage = () => {
  const { login } = useAuth(); // Get the global login function from context
  const [otp, setOtp] = useState(new Array(4).fill(""));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const inputRefs = useRef([]);

  const email = location.state?.email;

  if (!email) {
    return <Navigate to="/register" />;
  }

  const handleChange = (element, index) => {
    if (!/^[0-9]$/.test(element.value)) {
      element.value = "";
      return;
    }
    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);
    if (element.nextSibling && element.value) {
      element.nextSibling.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const enteredOtp = otp.join("");
    if (enteredOtp.length !== 4) {
      setError("Please enter the complete 4-digit OTP.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const { data } = await axios.post(
        "http://localhost:3000/api/auth/verify-otp",
        { email, otp: enteredOtp },
        { withCredentials: true }
      );

      console.log("Verification successful:", data);

      // Call the context's login function to save the new user's data globally
      login(data);

      // Redirect based on the backend's response
      if (data.profileComplete) {
        navigate("/");
      } else {
        navigate("/complete-profile");
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Verification failed.";
      setError(errorMessage);
      setLoading(false);
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
            We've sent an OTP to <span className="font-semibold">{email}</span>.
            Please enter it to verify your account.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="p-3 text-center bg-red-100 border border-red-400 text-red-700 rounded-md text-sm">
              {error}
            </div>
          )}

          <div>
            <label className="text-sm font-medium text-gray-700">
              Enter OTP
            </label>
            <div className="flex justify-center gap-3 mt-2">
              {otp.map((data, index) => (
                <input
                  key={index}
                  type="tel"
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
              disabled={loading}
              className="w-full bg-teal-500 text-white font-bold py-3 px-4 rounded-xl text-lg hover:bg-teal-600 transition-colors duration-300 disabled:bg-teal-300"
            >
              {loading ? "Verifying..." : "Verify"}
            </button>
          </div>
        </form>

        <div className="text-center">
          <Link
            to="/login"
            className="inline-flex items-center gap-2 font-medium text-gray-600 hover:text-teal-600"
          >
            <FiArrowLeft /> Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OtpPage;
