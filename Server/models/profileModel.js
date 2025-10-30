import mongoose from "mongoose";

const profileSchema = new mongoose.Schema(
  {
    // Create a one-to-one relationship with the User model
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
      unique: true, // Each user can only have one profile
    },
    displayName: {
      type: String,
      required: [true, "Display name is required"],
      trim: true,
    },
    about: {
      type: String,
      default: "",
      trim: true,
    },
    profilePictureUrl: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const Profile = mongoose.model("Profile", profileSchema);
export default Profile;
