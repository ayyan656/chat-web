import React, { useState } from "react";
import ProfileMenu from "./ProfileMenu.jsx";
import ProfileEditForm from "./ProfileEditForm.jsx";

const Profile = ({ contact, onClose, onLogout }) => {
  const [view, setView] = useState("menu"); // 'menu' or 'editForm'

  if (view === "menu") {
    return (
      <ProfileMenu
        contact={contact}
        onViewChange={setView}
        onClose={onClose}
        onLogout={onLogout}
      />
    );
  }

  if (view === "editForm") {
    return <ProfileEditForm contact={contact} onViewChange={setView} />;
  }

  return null;
};

export default Profile;
