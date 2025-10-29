import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    message_id: {
      type: String,
      required: true,
    },
    chat_id: {
      type: String,
      required: true,
    },
    sender_id: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      lowercase: true,
    },
    attachement_url: {
      type: String,
    },
    attachement_type: {
      type: String,
      enum: ["JPG", "JPEG", "PNG", "PDF", "DOCS"],
      uppercase: true,
    },
  },
  {
    timestamps: true,
  }
);

const Message = mongoose.model("Message", messageSchema);
export default Message;
