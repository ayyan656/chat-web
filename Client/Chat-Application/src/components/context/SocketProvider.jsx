// src/components/context/SocketProvider.jsx
import React, { createContext, useContext, useEffect, useRef } from "react";
import io from "socket.io-client";

const SocketContext = createContext(null);

export const useSocket = () => useContext(SocketContext);

/**
 * SocketProvider
 * - Creates one socket for the whole app and keeps it alive.
 * - Does NOT disconnect on route changes. It disconnects only on unmount.
 * - Provides socket instance to any component via useSocket().
 */
export default function SocketProvider({ children }) {
  const socketRef = useRef(null);
  const ENDPOINT = "http://localhost:3000";

  useEffect(() => {
    if (!socketRef.current) {
      socketRef.current = io(ENDPOINT, {
        withCredentials: true,
        autoConnect: true,
      });

      socketRef.current.on("connect", () => {
        console.log("Socket connected:", socketRef.current.id);
      });

      socketRef.current.on("connect_error", (err) => {
        console.warn("Socket connect error:", err);
      });
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, [ENDPOINT]);

  return (
    <SocketContext.Provider value={socketRef.current}>
      {children}
    </SocketContext.Provider>
  );
}
