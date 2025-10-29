import express from "express";
import {
  registerUser,
  verifyOtp,
  loginUser,
} from "../controllers/authController.js"; // <-- Add verifyOtp
const router = express.Router();

router.post("/register", registerUser);
router.post("/verify-otp", verifyOtp); // <-- Add the new route
router.post("/login", loginUser);

export default router;
