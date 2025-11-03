import express from "express";
import http from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

// Import all routes and configs
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";

//
import Message from "./models/messageModel.js";
import Chat from "./models/chatModel.js";
import User from "./models/userModel.js";

// --- Configurations ---
dotenv.config();

// --- Connect to Database ---
connectDB();

// --- Initialize Express and HTTP Server ---
const app = express();
const server = http.createServer(app);

// --- CORS Configuration ---
const corsOptions = {
  origin: ["http://localhost:3000", "http://localhost:5173"], // Allow both CRA and Vite default ports
  credentials: true,
};
app.use(cors(corsOptions));

// --- Initialize Socket.IO ---
const io = new Server(server, {
  pingTimeout: 60000, // Increase timeout to prevent connection drops
  cors: corsOptions,
});

// --- Middleware ---
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// --- API Routes ---
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/api/chats", chatRoutes);
app.use("/api/messages", messageRoutes);

// --- Socket.IO Connection Logic ---
io.on("connection", (socket) => {
  console.log("User connected via Socket.IO:", socket.id);
  // --- JOIN CHAT ROOM ---
  socket.on("join_chat", (chatId) => {
    socket.join(chatId);
    console.log(`User ${socket.id} joined room: ${chatId}`);
  });

  socket.on("send_message", async ({ chatId, senderId, content }) => {
    try {
      // Prepare the message data
      const messageData = {
        sender: senderId,
        content: content,
        chat: chatId,
      };

      // Create and save the new message
      let message = await Message.create(messageData);

      // Populate the newly created message with sender and chat info
      message = await message.populate(
        "sender",
        "username profile_picture_url email"
      );
      message = await message.populate("chat");
      // Now, populate the users within the chat object of the message
      message = await User.populate(message, {
        path: "chat.users",
        select: "username profile_picture_url email",
      });
      // ENSURE LATEST MESSAGE IS UPDATED CORRECTLY ---
      await Chat.findByIdAndUpdate(chatId, { latestMessage: message });
      // Broadcast the new message to everyone in the chat room
      io.to(chatId).emit("receive_message", message);
      console.log(`Message sent in room ${chatId}:`, message.content);
    } catch (error) {
      console.error("SOCKET SEND MESSAGE ERROR:", error);
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// --- Server Initialization ---
const PORT = process.env.PORT || 5000;
app.get("/", (req, res) => res.send("API is running successfully."));
server.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
