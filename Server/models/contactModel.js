import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    // The user who owns this contact entry
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    // The display name the owner gives to this contact
    displayName: {
      type: String,
      required: true,
    },
    // The email of the contact being added
    email: {
      type: String,
      required: true,
      lowercase: true,
    },
    // A flag to quickly know if this contact is a registered user of our app
    isRegistered: {
      type: Boolean,
      default: false,
    },
    // If registered, this links directly to their User document
    registeredUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  {
    timestamps: true,
    // Ensure a user cannot add the same email twice to their contact list
    unique: ["owner", "email"],
  }
);

const Contact = mongoose.model("Contact", contactSchema);
export default Contact;
