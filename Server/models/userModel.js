import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    // THE FIX: The `unique` constraint should only be on username and email.
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password_hash: { type: String, required: true }, // <-- Password is NOT unique.
    profile_picture_url: { type: String, default: "" },
    about: { type: String, default: "" },
    online_status: {
      type: String,
      enum: ["online", "offline"],
      default: "offline",
    },
    last_seen: { type: Date, default: Date.now },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

// ... the rest of the file remains the same ...
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password_hash);
};

userSchema.pre("save", async function (next) {
  if (!this.isModified("password_hash")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password_hash = await bcrypt.hash(this.password_hash, salt);
});

const User = mongoose.model("User", userSchema);

export default User;
