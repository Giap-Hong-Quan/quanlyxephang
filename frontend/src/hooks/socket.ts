import { io } from "socket.io-client";

// Thay URL bằng URL backend của bạn
export const socket = io("http://localhost:5003", {
  autoConnect: true,
});