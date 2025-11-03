// src/socket.js
import { io } from "socket.io-client";

// If your backend runs on a different port, update the URL below.
const SOCKET_URL = "http://localhost:3000";

// Create a single shared socket instance
export const socket = io(SOCKET_URL, {
  withCredentials: true,
  autoConnect: true, // Connect automatically
});
