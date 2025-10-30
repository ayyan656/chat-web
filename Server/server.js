import express from "express";
import http from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js"; // <-- Note the .js extension
import authRoutes from "./routes/authRoutes.js"; // <-- Note the .js extension
import cookieParser from "cookie-parser"; // <-- Import cookie-parser
import profileRoutes from "./routes/profileRoutes.js"; // <-- Import profile routes

// --- Configurations ---
dotenv.config();
connectDB();
const app = express();
const server = http.createServer(app);

const corsOptions = {
  origin: ["http://localhost:3000", "http://localhost:5173"], // Allow both Vite and CRA defaults
  credentials: true,
};
app.use(cors(corsOptions));

const io = new Server(server, {
  cors: corsOptions,
});

// --- Middleware ---
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); // <-- Use cookie-parser

// --- API Routes ---
app.get("/", (req, res) => {
  res.send("API is running successfully...");
});
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
// --- Socket.IO Connection Logic ---
io.on("connection", (socket) => {
  console.log("A user connected with socket ID:", socket.id);
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// --- Server Initialization ---
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
