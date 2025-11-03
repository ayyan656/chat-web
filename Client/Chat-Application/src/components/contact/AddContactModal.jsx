import React, { useState } from "react";
import axios from "axios";
import { FiX, FiUser, FiMail } from "react-icons/fi";

const AddContactModal = ({ isOpen, onClose, onContactAdded }) => {
  const [formData, setFormData] = useState({ displayName: "", email: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const { data } = await axios.post(
        "http://localhost:3000/api/contacts",
        formData,
        { withCredentials: true }
      );
      onContactAdded(data); // Pass the new contact back to the sidebar
      onClose(); // Close the modal
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add contact.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Add New Contact</h2>
          <button onClick={onClose}>
            <FiX />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <p className="text-red-500">{error}</p>}
          <div>
            <label>Display Name</label>
            <input
              type="text"
              name="displayName"
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-teal-500 text-white p-2 rounded disabled:bg-teal-300"
          >
            {loading ? "Adding..." : "Add Contact"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddContactModal;
