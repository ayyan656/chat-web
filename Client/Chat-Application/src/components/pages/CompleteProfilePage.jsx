import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FiUser, FiInfo } from "react-icons/fi";

const CompleteProfilePage = () => {
  const [formData, setFormData] = useState({ displayName: "", about: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.displayName) {
      setError("Display name is required.");
      return;
    }
    setLoading(true);
    setError("");

    try {
      await axios.put(
        "http://localhost:3000/api/profile",
        formData,
        { withCredentials: true } // Crucial for sending the auth cookie
      );
      setLoading(false);
      navigate("/"); // Redirect to the main chat app on success
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Failed to update profile.";
      setError(errorMessage);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full bg-white shadow-xl rounded-2xl p-8 space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Complete Your Profile
          </h1>
          <p className="mt-2 text-gray-600">
            Just a few more details to get you started.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="text-center text-red-500 p-3 bg-red-100 rounded-lg">
              {error}
            </div>
          )}

          <div>
            <label
              htmlFor="displayName"
              className="block text-sm font-medium text-gray-700"
            >
              Display Name
            </label>
            <div className="mt-1 relative">
              <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                id="displayName"
                name="displayName"
                type="text"
                required
                value={formData.displayName}
                onChange={handleInputChange}
                placeholder="e.g., John Doe"
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="about"
              className="block text-sm font-medium text-gray-700"
            >
              About (Optional)
            </label>
            <div className="mt-1 relative">
              <FiInfo className="absolute left-3 top-3 text-gray-400" />
              <textarea
                id="about"
                name="about"
                value={formData.about}
                onChange={handleInputChange}
                placeholder="A little bit about yourself..."
                rows="3"
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-teal-500 text-white font-bold py-3 px-4 rounded-xl text-lg hover:bg-teal-600 transition-colors disabled:bg-teal-300"
            >
              {loading ? "Saving..." : "Save and Continue"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CompleteProfilePage;
