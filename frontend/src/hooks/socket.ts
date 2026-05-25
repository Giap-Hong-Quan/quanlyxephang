import { io } from "socket.io-client";

// Thay URL bằng URL backend của bạn
export const socket = io(import.meta.env.BASE_URL ||"http://localhost:5003", {
  autoConnect: true,
});