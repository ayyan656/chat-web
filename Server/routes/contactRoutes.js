import express from "express";
import { getContacts, addContact } from "../controllers/contactController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Chain the GET and POST methods for the same base route
router.route("/").get(protect, getContacts).post(protect, addContact);

export default router;
