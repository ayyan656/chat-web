// import User from "../models/userModel.js";
// import OTP from "../models/otpModel.js"; // <-- Import OTP model
// import generateToken from "../utils/generateToken.js";
// import { sendEmail, createOtpEmailTemplate } from "../utils/sendEmail.js";

// // @desc    Register a new user
// const registerUser = async (req, res) => {
//   const { username, email, password } = req.body;

//   if (!username || !email || !password) {
//     return res.status(400).json({ message: "Please provide all fields" });
//   }

//   try {
//     const userExists = await User.findOne({ $or: [{ email }, { username }] });
//     if (userExists) {
//       return res.status(409).json({ message: "User already exists" });
//     }

//     // Create user but they are not yet "active"
//     const user = new User({ username, email, password_hash: password });
//     await user.save();

//     // Generate 4-digit OTP
//     const otpCode = Math.floor(1000 + Math.random() * 9000).toString();

//     // Save OTP to DB
//     await OTP.create({
//       userId: user._id,
//       otp_hash: otpCode, // The pre-save hook will hash this
//       expires_at: Date.now() + 10 * 60 * 1000, // 10 minutes
//     });

//     // Send email with the OTP
//     const emailTemplate = createOtpEmailTemplate(otpCode);
//     await sendEmail({
//       email: user.email,
//       subject: "Your OTP for Chat Web Verification",
//       html: emailTemplate,
//     });

//     // Don't send token yet, just a success message
//     res.status(201).json({
//       message: "Registration successful! Please check your email for an OTP.",
//       user: { email: user.email }, // Send back email for the frontend
//     });
//   } catch (error) {
//     console.error("REGISTRATION ERROR:", error);
//     res.status(500).json({ message: "Server error during registration." });
//   }
// };

// // @desc    Verify OTP and activate user
// // @route   POST /api/auth/verify-otp
// // @access  Public
// const verifyOtp = async (req, res) => {
//   const { email, otp } = req.body;
//   if (!email || !otp) {
//     return res.status(400).json({ message: "Please provide email and OTP" });
//   }

//   try {
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(404).json({ message: "User not found." });
//     }

//     // Find the latest OTP for this user
//     const otpRecord = await OTP.findOne({ userId: user._id }).sort({
//       expires_at: -1,
//     });
//     if (!otpRecord) {
//       return res
//         .status(400)
//         .json({ message: "No OTP found. Please sign up again." });
//     }

//     // Check if OTP is expired (although DB auto-deletes, this is a good check)
//     if (otpRecord.expires_at < Date.now()) {
//       return res
//         .status(400)
//         .json({ message: "OTP has expired. Please request a new one." });
//     }

//     const isMatch = await otpRecord.matchOtp(otp);
//     if (!isMatch) {
//       return res.status(400).json({ message: "Invalid OTP." });
//     }

//     // --- SUCCESS ---
//     // We can now "activate" the user if we had a status field, or just log them in

//     generateToken(res, user._id); // Log the user in by sending the JWT

//     // Optional: Delete the used OTP record immediately
//     await OTP.findByIdAndDelete(otpRecord._id);

//     res.status(200).json({
//       _id: user._id,
//       username: user.username,
//       email: user.email,
//       message: "Verification successful! You are now logged in.",
//     });
//   } catch (error) {
//     console.error("OTP VERIFICATION ERROR:", error);
//     res.status(500).json({ message: "Server error during OTP verification." });
//   }
// };

// // ... loginUser remains the same ...
// const loginUser = async (req, res) => {
//   /* ... no changes ... */
// };

// export { registerUser, verifyOtp, loginUser };

import User from "../models/userModel.js";
import OTP from "../models/otpModel.js";
import Profile from "../models/profileModel.js"; // <-- Import Profile model
import generateToken from "../utils/generateToken.js";
import { sendEmail, createOtpEmailTemplate } from "../utils/sendEmail.js";

// @desc    Register a new user
const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "Please provide all fields" });
  }

  try {
    const userExists = await User.findOne({ $or: [{ email }, { username }] });
    if (userExists) {
      return res
        .status(409)
        .json({ message: "User with this email or username already exists" });
    }

    const user = new User({ username, email, password_hash: password });
    await user.save();

    const otpCode = Math.floor(1000 + Math.random() * 9000).toString();

    await OTP.create({
      userId: user._id,
      otp_hash: otpCode,
      expires_at: Date.now() + 10 * 60 * 1000,
    });

    const emailTemplate = createOtpEmailTemplate(otpCode);
    await sendEmail({
      email: user.email,
      subject: "Your OTP for Chat Web Verification",
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

// @desc    Verify OTP and activate user
const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;
  if (!email || !otp) {
    return res.status(400).json({ message: "Please provide email and OTP" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const otpRecord = await OTP.findOne({ userId: user._id }).sort({
      expires_at: -1,
    });
    if (!otpRecord) {
      return res
        .status(400)
        .json({
          message: "No OTP found or it has expired. Please sign up again.",
        });
    }

    // Note: No need to manually check expiry if the DB auto-deletes, but it's safe.

    const isMatch = await otpRecord.matchOtp(otp);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid OTP." });
    }

    generateToken(res, user._id);
    await OTP.findByIdAndDelete(otpRecord._id);

    // Check if a profile exists for this new user (it won't, so this will be false)
    const profileExists = await Profile.findOne({ user: user._id });

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

// @desc    Auth user & get token (Login)
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Please provide both email and password" });
  }

  try {
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      generateToken(res, user._id);

      // Check if a profile exists for this existing user
      const profileExists = await Profile.findOne({ user: user._id });

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
