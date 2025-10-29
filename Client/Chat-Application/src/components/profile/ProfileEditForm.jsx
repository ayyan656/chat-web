import React, { useState } from "react";
import { FiArrowLeft, FiCamera } from "react-icons/fi";

const ProfileEditForm = ({ contact, onViewChange }) => {
  const [formData, setFormData] = useState({
    fullName: contact.name || "",
    dob: "2002-07-07",
    gender: "Male",
    mobile: "+62 821 1234 1234",
    email: contact.email || "bagjaalfatih17@gmail.com",
    weight: "64",
    height: "175.5",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Profile Saved:", formData);
    alert("Profile has been saved!");
    onViewChange("menu"); // Go back to the menu after saving
  };

  return (
    <div className="w-[350px] h-screen bg-white flex flex-col border-l border-gray-200">
      {/* Header */}
      <div className="flex items-center p-4 border-b border-gray-200">
        <button
          onClick={() => onViewChange("menu")}
          className="p-2 mr-2 rounded-full hover:bg-gray-100"
        >
          <FiArrowLeft size={22} className="text-gray-600" />
        </button>
        <h2 className="text-xl font-bold text-gray-800">My Profile</h2>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex-1 flex flex-col overflow-y-auto"
      >
        <div className="p-6 flex flex-col items-center">
          <div className="relative mb-6">
            <img
              src={contact.avatar}
              alt="Profile"
              className="w-24 h-24 rounded-full"
            />
            <button
              type="button"
              className="absolute bottom-0 right-0 bg-teal-500 p-2 rounded-full text-white"
            >
              <FiCamera size={16} />
            </button>
          </div>

          <div className="w-full space-y-4">
            {/* Basic Detail */}
            <fieldset>
              <legend className="text-lg font-bold text-gray-800 mb-3">
                Basic Detail
              </legend>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="Full name"
                className="w-full p-2 border rounded-lg bg-gray-50"
              />
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleInputChange}
                className="w-full p-2 mt-3 border rounded-lg bg-gray-50"
              />
              <div className="mt-3 flex gap-6 mb-4">
                <label className="flex-1 flex items-center p-2 border rounded-lg">
                  <input
                    type="radio"
                    name="gender"
                    value="Male"
                    checked={formData.gender === "Male"}
                    onChange={handleInputChange}
                    className="mr-2 text-teal-500 focus:ring-teal-500"
                  />{" "}
                  Male
                </label>
                <label className="flex-1 flex items-center p-2 border rounded-lg">
                  <input
                    type="radio"
                    name="gender"
                    value="Female"
                    checked={formData.gender === "Female"}
                    onChange={handleInputChange}
                    className="mr-2  text-teal-500 focus:ring-teal-500"
                  />{" "}
                  Female
                </label>
              </div>
            </fieldset>

            {/* Contact Detail */}
            <fieldset>
              <legend className="text-lg font-bold text-gray-800 mb-3">
                Contact Detail
              </legend>
              <input
                type="tel"
                name="mobile"
                value={formData.mobile}
                onChange={handleInputChange}
                placeholder="Mobile number"
                className="w-full p-2 border rounded-lg bg-gray-50"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email"
                className="w-full p-2 mt-3 mb-4 border rounded-lg bg-gray-50"
              />
            </fieldset>

            {/* Personal Detail */}
            <fieldset>
              <legend className="text-lg font-bold text-gray-800 mb-3">
                Personal Detail
              </legend>
              <input
                type="text"
                name="weight"
                value={formData.weight}
                onChange={handleInputChange}
                placeholder="Weight (kg)"
                className="w-full p-2 border rounded-lg bg-gray-50"
              />
              <input
                type="text"
                name="height"
                value={formData.height}
                onChange={handleInputChange}
                placeholder="Height (cm)"
                className="w-full p-2 mt-3 border rounded-lg bg-gray-50"
              />
            </fieldset>
          </div>
        </div>

        <div className="p-6 mt-auto">
          <button
            type="submit"
            className="w-full bg-teal-500 text-white font-bold py-3 px-4 rounded-xl text-lg hover:bg-teal-600 transition-colors"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileEditForm;
