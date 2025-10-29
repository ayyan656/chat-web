import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  user_id: {
    type: String,
  },
  name: {
    type: String,
    lowercase: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    unique: true,
  },
  profile_picture_url: {
    type: String,
  },
  about: {
    type: String,
  },
  online_status: {
    type: String,
    enum: ["online", "offline"],
    default: "offline",
  },
});

const User = mongoose.model("User", userSchema);
export default User;
