import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    content: { type: String, trim: true },
    chat: { type: mongoose.Schema.Types.ObjectId, ref: "Chat" },
    // For E2EE, this content field will store ciphertext.
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);
export default Message;
