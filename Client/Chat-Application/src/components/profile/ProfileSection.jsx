
// export default ProfileSection;
import React from "react";

const ProfileSection = ({ title, count, children }) => {
  return (
    <div className="bg-gray-700/50 rounded-lg p-4 my-4">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-bold text-gray-200">{title}</h3>
        {count && (
          <span className="text-sm text-teal-400 font-semibold">{count}</span>
        )}
      </div>
      <div>{children}</div>
    </div>
  );
};

export default ProfileSection;
