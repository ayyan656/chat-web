import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const otpSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  otp_hash: {
    type: String,
    required: true,
  },
  expires_at: {
    type: Date,
    required: true,
    // Automatically delete the document after its expiry time
    expires: 0,
  },
});

// Hash the OTP before saving
otpSchema.pre("save", async function (next) {
  if (!this.isModified("otp_hash")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.otp_hash = await bcrypt.hash(this.otp_hash, salt);
});

// Method to compare the entered OTP with the stored hash
otpSchema.methods.matchOtp = async function (enteredOtp) {
  return await bcrypt.compare(enteredOtp, this.otp_hash);
};

const OTP = mongoose.model("OTP", otpSchema);
export default OTP;
