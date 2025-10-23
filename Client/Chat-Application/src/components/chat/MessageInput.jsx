// // export default MessageInput;
// import React from "react"; // Removed useState
// import { HiOutlinePlus, HiOutlineFaceSmile } from "react-icons/hi2";
// import { FiMic } from "react-icons/fi";
// import { IoSend } from "react-icons/io5";
// import EmojiPicker from "emoji-picker-react";
// import AttachmentMenu from "./AttachmentMenu";

// // Receive state and setters as props
// const MessageInput = ({
//   text,
//   setText,
//   showEmojiPicker,
//   setShowEmojiPicker,
//   isAttachmentMenuOpen,
//   setAttachmentMenuOpen,
//   onSendMessage,
// }) => {
//   const handleEmojiClick = (emojiObject) => {
//     setText((prevText) => prevText + emojiObject.emoji);
//   };

//   const handlePlusClick = () => {
//     setAttachmentMenuOpen((prevState) => !prevState);
//     setShowEmojiPicker(false);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (text.trim()) {
//       onSendMessage(text);
//       setText("");
//       setShowEmojiPicker(false);
//       setAttachmentMenuOpen(false);
//     }
//   };

//   const handleFocus = () => {
//     setShowEmojiPicker(false);
//     setAttachmentMenuOpen(false);
//   };

//   return (
//     <div className="relative bg-white px-4 py-2 border-t border-gray-200">
//       {/* These components are now controlled by props */}
//       <AttachmentMenu isOpen={isAttachmentMenuOpen} />
//       {showEmojiPicker && (
//         <div className="absolute bottom-[80px] ">
//           <EmojiPicker onEmojiClick={handleEmojiClick} />
//         </div>
//       )}

//       <form onSubmit={handleSubmit} className="flex items-center gap-3">
//         <div className="flex-1 flex items-center bg-gray-100 rounded-full px-2">
//           <button
//             type="button"
//             onClick={() => {
//               setShowEmojiPicker(!showEmojiPicker);
//               setAttachmentMenuOpen(false);
//             }}
//             className="p-2 text-gray-500 hover:text-gray-800"
//           >
//             <HiOutlineFaceSmile size={24} />
//           </button>
//           <input
//             type="text"
//             value={text}
//             onChange={(e) => setText(e.target.value)}
//             onFocus={handleFocus}
//             placeholder="Type a message"
//             className="w-full bg-transparent px-2 py-3.5 text-gray-800 placeholder:text-gray-500 focus:outline-none"
//           />
//           <button
//             type="button"
//             onClick={handlePlusClick}
//             className="p-2 text-gray-500 hover:text-gray-800"
//           >
//             <HiOutlinePlus size={24} />
//           </button>
//         </div>

//         <button
//           type="submit"
//           className="p-3 rounded-full bg-transparent text-teal-500 hover:bg-teal-500 hover:text-white transition-colors duration-200"
//         >
//           {text ? <IoSend size={22} /> : <FiMic size={22} />}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default MessageInput;
import React from "react";
import { HiOutlinePlus, HiOutlineFaceSmile } from "react-icons/hi2";
import { FiMic } from "react-icons/fi";
import { IoSend } from "react-icons/io5";
import EmojiPicker from "emoji-picker-react";
import AttachmentMenu from "./AttachmentMenu";

const MessageInput = ({
  text,
  setText,
  showEmojiPicker,
  setShowEmojiPicker,
  isAttachmentMenuOpen,
  setAttachmentMenuOpen,
  onSendMessage,
}) => {
  const handleEmojiClick = (emojiObject) => {
    setText((prevText) => prevText + emojiObject.emoji);
  };

  const handlePlusClick = () => {
    setAttachmentMenuOpen((prevState) => !prevState);
    setShowEmojiPicker(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      onSendMessage(text);
      setText("");
      setShowEmojiPicker(false);
      setAttachmentMenuOpen(false);
    }
  };

  const handleFocus = () => {
    setShowEmojiPicker(false);
    setAttachmentMenuOpen(false);
  };

  return (
    <div className="relative bg-white px-4 py-2 border-t border-gray-200">
      <AttachmentMenu isOpen={isAttachmentMenuOpen} />

      {showEmojiPicker && (
        <div className="absolute bottom-[70px]">
          <EmojiPicker
            onEmojiClick={handleEmojiClick}
            width={350} // <-- SET THE WIDTH HERE
            height={400} // <-- SET THE HEIGHT HERE
          />
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex items-center gap-3">
        <div className="flex-1 flex items-center bg-gray-100 rounded-full px-2">
          <button
            type="button"
            onClick={() => {
              setShowEmojiPicker(!showEmojiPicker);
              setAttachmentMenuOpen(false);
            }}
            className="p-2 text-gray-500 hover:text-gray-800"
          >
            <HiOutlineFaceSmile size={24} />
          </button>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onFocus={handleFocus}
            placeholder="Type a message"
            className="w-full bg-transparent px-2 py-2.5 text-gray-800 placeholder:text-gray-500 focus:outline-none"
          />
          <button
            type="button"
            onClick={handlePlusClick}
            className="p-2 text-gray-500 hover:text-gray-800"
          >
            <HiOutlinePlus size={24} />
          </button>
        </div>

        <button
          type="submit"
          className="p-3 rounded-full bg-transparent text-teal-500 hover:bg-teal-500 hover:text-white transition-colors duration-200"
        >
          {text ? <IoSend size={22} /> : <FiMic size={22} />}
        </button>
      </form>
    </div>
  );
};

export default MessageInput;
