import React from "react";
import { FiCheck, FiDownload } from "react-icons/fi";
import { FaFilePdf } from "react-icons/fa";

function Message(props) {
  const message = props.message;
  const sender = props.sender;
  const avatar = props.avatar;

  const isOutgoing = sender === "me";

  // Function to show message content based on its type
  function renderContent() {
    if (message.type === "text") {
      return <p className="leading-snug">{message.text}</p>;
    }

    if (message.type === "image") {
      return (
        <div className="flex flex-col">
          <div className="grid grid-cols-2 gap-1 rounded-lg overflow-hidden mb-2">
            {message.images.slice(0, 4).map(function (img, index) {
              return (
                <div key={index} className="relative group">
                  <img
                    src={img}
                    alt="sent"
                    className="object-cover h-32 w-full"
                  />

                  {/* Show file info on second image */}
                  {index === 1 ? (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white text-xs font-bold gap-1">
                      <FiDownload size={14} /> 53 MB
                    </div>
                  ) : null}

                  {/* Show extra image count if more than 4 */}
                  {index === 3 && message.images.length > 4 ? (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white text-2xl font-bold">
                      +{message.images.length - 4}
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>

          {message.text ? (
            <p className="leading-snug">{message.text}</p>
          ) : null}
        </div>
      );
    }

    if (message.type === "file") {
      return (
        <div className="flex items-center">
          <div className="p-3 bg-white rounded-lg mr-3">
            <FaFilePdf className="text-red-500" size={24} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-bold text-white truncate">
              {message.fileName}
            </p>
            <p className="text-sm text-teal-100">{message.fileInfo}</p>
          </div>
          <div className="ml-4 p-2 bg-teal-400 rounded-full cursor-pointer">
            <FiDownload size={18} className="text-white" />
          </div>
        </div>
      );
    }

    return null;
  }

  return (
    <div
      className={
        "flex items-end gap-3 my-2 " +
        (isOutgoing ? "justify-end" : "justify-start")
      }
    >
      {/* Show avatar only for incoming messages */}
      {!isOutgoing ? (
        <img
          src={avatar}
          alt="Avatar"
          className="w-8 h-8 rounded-full self-start"
        />
      ) : null}

      <div className="flex flex-col items-end">
        <div
          className={
            "max-w-md p-3 rounded-2xl " +
            (isOutgoing
              ? "bg-teal-500 text-white rounded-br-none"
              : "bg-white text-gray-800 rounded-bl-none")
          }
        >
          {renderContent()}
        </div>

        <div
          className={
            "flex items-center gap-1.5 mt-1 text-xs " +
            (isOutgoing ? "text-gray-500" : "text-gray-400")
          }
        >
          <span>{message.time}</span>
          {isOutgoing ? (
            <FiCheck size={16} className="text-blue-500" />
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default Message;
