import express from "express";
import { upsertProfile } from "../controllers/profileController.js";
import { protect } from "../Middleware/authMiddleware.js";

const router = express.Router();

router.route("/").put(protect, upsertProfile);

export default router;