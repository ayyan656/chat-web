// import React from "react";
// import {
//   FiX,
//   FiEdit2,
//   FiStar,
//   FiBellOff,
//   FiClock,
//   FiShield,
//   FiLock,
//   FiHeart,
//   FiSlash,
//   FiThumbsDown,
//   FiTrash2,
// } from "react-icons/fi";
// import ProfileSection from "./ProfileSection";

// const ActionItem = ({ icon, text, hasToggle, subtext }) => (
//   <div className="flex items-center justify-between py-3 text-gray-300 hover:bg-gray-700/50 px-2 rounded-md cursor-pointer">
//     <div className="flex items-center gap-4">
//       {icon}
//       <div>
//         <p>{text}</p>
//         {subtext && <p className="text-xs text-gray-400">{subtext}</p>}
//       </div>
//     </div>
//     {hasToggle && (
//       <label className="relative inline-flex items-center cursor-pointer">
//         <input type="checkbox" value="" className="sr-only peer" />
//         <div className="w-11 h-6 bg-gray-600 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-500"></div>
//       </label>
//     )}
//   </div>
// );

// const Profile = ({ contact, onClose }) => {
//   if (!contact) return null;

//   return (
//     <div className="w-[380px] h-screen bg-gray-800 text-white flex flex-col border-l-2 border-gray-700">
//       {/* Header */}
//       <div className="flex items-center justify-between p-4 bg-gray-900/70">
//         <h2 className="text-xl font-semibold">Contact Info</h2>
//         <div className="flex items-center gap-4">
//           <button className="text-gray-300 hover:text-white">
//             <FiEdit2 size={20} />
//           </button>
//           <button onClick={onClose} className="text-gray-300 hover:text-white">
//             <FiX size={24} />
//           </button>
//         </div>
//       </div>

//       {/* Main Content - Scrollable */}
//       <div className="flex-1 overflow-y-auto p-4">
//         {/* User Info */}
//         <div className="flex flex-col items-center text-center my-6">
//           <img
//             src={contact.avatar}
//             alt={contact.name}
//             className="w-28 h-28 rounded-full mb-4 ring-4 ring-teal-500/50"
//           />
//           <h1 className="text-2xl font-bold">{contact.name}</h1>
//           <p className="text-gray-400 mt-1">+92 303 2408013</p>
//         </div>

//         {/* About Section */}
//         <ProfileSection title="About">
//           <p className="text-gray-300">لا غالب إلا الله</p>
//         </ProfileSection>

//         {/* Media Section */}
//         <ProfileSection title="Media, links and docs" count={32}>
//           <div className="grid grid-cols-3 gap-2">
//             {/* Placeholder images */}
//             <img
//               src="https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=200&h=200&fit=crop"
//               className="rounded-md"
//               alt="media"
//             />
//             <img
//               src="https://images.unsplash.com/photo-1499244571948-7ccddb3583ea?w=200&h=200&fit=crop"
//               className="rounded-md"
//               alt="media"
//             />
//             <img
//               src="https://images.unsplash.com/photo-1523437113738-bbd3cc89fb19?w=200&h=200&fit=crop"
//               className="rounded-md"
//               alt="media"
//             />
//           </div>
//         </ProfileSection>

//         {/* Action List */}
//         <div className="space-y-1 mt-4">
//           <ActionItem
//             icon={<FiStar className="text-yellow-400" />}
//             text="Starred messages"
//           />
//           <ActionItem
//             icon={<FiBellOff className="text-teal-400" />}
//             text="Mute notifications"
//             hasToggle
//           />
//           <ActionItem
//             icon={<FiClock className="text-teal-400" />}
//             text="Disappearing messages"
//             subtext="Off"
//           />
//           <ActionItem
//             icon={<FiShield className="text-teal-400" />}
//             text="Advanced chat privacy"
//             subtext="Off"
//           />
//           <ActionItem
//             icon={<FiLock className="text-teal-400" />}
//             text="Encryption"
//             subtext="Messages are end-to-end encrypted."
//           />
//         </div>

//         <div className="mt-6">
//           <ActionItem
//             icon={<FiHeart className="text-pink-500" />}
//             text="Add to favourites"
//           />
//           <ActionItem
//             icon={<FiSlash className="text-red-500" />}
//             text={`Block ${contact.name}`}
//           />
//           <ActionItem
//             icon={<FiThumbsDown className="text-red-500" />}
//             text={`Report ${contact.name}`}
//           />
//           <ActionItem
//             icon={<FiTrash2 className="text-red-500" />}
//             text="Delete chat"
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;
import React from "react";
import {
  FiX,
  FiEdit2,
  FiStar,
  FiBellOff,
  FiClock,
  FiShield,
  FiLock,
  FiHeart,
  FiSlash,
  FiThumbsDown,
  FiTrash2,
} from "react-icons/fi";
import ProfileSection from "./ProfileSection";

const ActionItem = ({ icon, text, hasToggle, subtext }) => (
  <div className="flex items-center justify-between py-3 text-gray-300 hover:bg-gray-700/50 px-2 rounded-md cursor-pointer">
    <div className="flex items-center gap-4">
      {icon}
      <div>
        <p>{text}</p>
        {subtext && <p className="text-xs text-gray-400">{subtext}</p>}
      </div>
    </div>
    {hasToggle && (
      <label className="relative inline-flex items-center cursor-pointer">
        <input type="checkbox" value="" className="sr-only peer" />
        <div className="w-11 h-6 bg-gray-600 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-500"></div>
      </label>
    )}
  </div>
);

const Profile = ({ contact, onClose }) => {
  if (!contact) return null;

  return (
    <div className="w-[380px] h-screen bg-gray-800 text-white flex flex-col border-l-2 border-gray-700">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-gray-900/70">
        <h2 className="text-xl font-semibold">Contact Info</h2>
        <div className="flex items-center gap-4">
          <button className="text-gray-300 hover:text-white">
            <FiEdit2 size={20} />
          </button>
          <button onClick={onClose} className="text-gray-300 hover:text-white">
            <FiX size={24} />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {/* User Info */}
        <div className="flex flex-col items-center text-center my-6">
          <img
            src={contact.avatar}
            alt={contact.name}
            className="w-28 h-28 rounded-full mb-4 ring-4 ring-teal-500/50"
          />
          <h1 className="text-2xl font-bold">{contact.name}</h1>
          <p className="text-gray-400 mt-1">+92 303 2408013</p>
        </div>

        {/* About */}
        <ProfileSection title="About">
          <p className="text-gray-300">لا غالب إلا الله</p>
        </ProfileSection>

        {/* Media */}
        <ProfileSection title="Media, links and docs" count={32}>
          <div className="grid grid-cols-3 gap-2">
            <img
              src="https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=200&h=200&fit=crop"
              className="rounded-md"
              alt="media"
            />
            <img
              src="https://images.unsplash.com/photo-1499244571948-7ccddb3583ea?w=200&h=200&fit=crop"
              className="rounded-md"
              alt="media"
            />
            <img
              src="https://images.unsplash.com/photo-1523437113738-bbd3cc89fb19?w=200&h=200&fit=crop"
              className="rounded-md"
              alt="media"
            />
          </div>
        </ProfileSection>

        {/* Actions */}
        <div className="space-y-1 mt-4">
          <ActionItem
            icon={<FiStar className="text-yellow-400" />}
            text="Starred messages"
          />
          <ActionItem
            icon={<FiBellOff className="text-teal-400" />}
            text="Mute notifications"
            hasToggle
          />
          <ActionItem
            icon={<FiClock className="text-teal-400" />}
            text="Disappearing messages"
            subtext="Off"
          />
          <ActionItem
            icon={<FiShield className="text-teal-400" />}
            text="Advanced chat privacy"
            subtext="Off"
          />
          <ActionItem
            icon={<FiLock className="text-teal-400" />}
            text="Encryption"
            subtext="Messages are end-to-end encrypted."
          />
        </div>

        {/* Footer Actions */}
        <div className="mt-6">
          <ActionItem
            icon={<FiHeart className="text-pink-500" />}
            text="Add to favourites"
          />
          <ActionItem
            icon={<FiSlash className="text-red-500" />}
            text={`Block ${contact.name}`}
          />
          <ActionItem
            icon={<FiThumbsDown className="text-red-500" />}
            text={`Report ${contact.name}`}
          />
          <ActionItem
            icon={<FiTrash2 className="text-red-500" />}
            text="Delete chat"
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;
