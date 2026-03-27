import { io } from "socket.io-client";
import { SOCKET_URL } from "../config/api";

let socket;

export function getSocket() {
  if (!socket) {
    socket = io(SOCKET_URL, {
      transports: ["websocket", "polling"]
    });
  }
  return socket;
}

export function disconnectSocket() {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
}