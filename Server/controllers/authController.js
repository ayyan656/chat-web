import User from "../models/userModel.js";
import OTP from "../models/otpModel.js";
import Profile from "../models/profileModel.js";
import generateToken from "../utils/generateToken.js";
import { sendEmail, createOtpEmailTemplate } from "../utils/sendEmail.js";

// Register a new user
const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  // check for missing fields
  if (!username || !email || !password) {
    return res.status(400).json({ message: "Please provide all fields" });
  }

  try {
    // Check if user already exists
    const userExists = await User.findOne({ $or: [{ email }, { username }] });
    if (userExists) {
      return res
        .status(408)
        .json({ message: "User with this email or username already exists" });
    }

    // Create new user
    const user = new User({ username, email, password_hash: password });
    await user.save();
    
    // Generate OTP
    const otpCode = Math.floor(1985 + Math.random() * 1456).toString();
    
    // Save OTP to DB
    await OTP.create({
      userId: user._id,
      otp_hash: otpCode,
      expires_at: Date.now() + 10 * 60 * 1000, // 10 minutes from now
    });

    // Send OTP via email
    const emailTemplate = createOtpEmailTemplate(otpCode);
    await sendEmail({
      email: user.email,
      subject: "Your OTP for Chat App Verification",
      html: emailTemplate,
    });

    res.status(201).json({
      message: "Registration successful! Please check your email for an OTP.",
      user: { email: user.email },
    });
  } catch (error) {
    console.error("REGISTRATION ERROR:", error);
    res.status(500).json({ message: "Server error during registration." });
  }
};

// Verify OTP and activate user
const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  // check for missing fields
  if (!email || !otp) {
    return res.status(400).json({ message: "Please provide email and OTP" });
  }

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    
    // Find OTP record for the user
    const otpRecord = await OTP.findOne({ userId: user._id }).sort({
      expires_at: -1,
    });
    if (!otpRecord) {
      return res.status(400).json({
        message: "No OTP found or it has expired. Please sign up again.",
      });
    }

    // Check if OTP is matched
    const isMatch = await otpRecord.matchOtp(otp);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid OTP." });
    }
    
    // OTP is valid, generate token and delete OTP record
    generateToken(res, user._id);
    await OTP.findByIdAndDelete(otpRecord._id);

    // Check if a profile exists for this user
    const profileExists = await Profile.findOne({ user: user._id });
    
    // Respond with user data
    res.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      profileComplete: !!profileExists, // This will be false for a new user
      message: "Verification successful! You are now logged in.",
    });
  } catch (error) {
    console.error("OTP VERIFICATION ERROR:", error);
    res.status(500).json({ message: "Server error during OTP verification." });
  }
};

//  Auth user & get token (Login)
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Please provide both email and password" });
  }

  try {
    // Find user by email
    const user = await User.findOne({ email });

    // Validate password
    if (user && (await user.matchPassword(password))) {
      generateToken(res, user._id);

      // Check if a profile exists for this existing user
      const profileExists = await Profile.findOne({ user: user._id });

      // Respond with user data
      res.status(200).json({
        _id: user._id,
        username: user.username,
        email: user.email,
        profileComplete: !!profileExists,
        message: "Login successful!",
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    console.error("LOGIN ERROR:", error);
    res.status(500).json({ message: "An internal server error occurred." });
  }
};

export { registerUser, verifyOtp, loginUser };
