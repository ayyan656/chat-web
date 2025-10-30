import express from "express";
import { upsertProfile } from "../controllers/profileController.js";
// This import is now correct because it matches the new folder name
import { protect } from "../Middleware/authMiddleware.js";

const router = express.Router();

router.route("/").put(protect, upsertProfile);

export default router;