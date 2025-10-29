import User from "../models/User.js";
import Message from "../models/Messege.js";

export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ message: "User already registered" });
    }

    // Create new user
    const user = new User({ name, email: email.toLowerCase(), password });
    await user.save();

    return res.status(201).json({ message: "User created successfully", user });
  } catch (err) {
    console.error("Signup error:", err.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
;
