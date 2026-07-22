import { io } from "socket.io-client";

const getSocketUrl = () => {
  const envUrl = import.meta.env.VITE_API_URL;
  if (!envUrl) return "http://localhost:5003";
  return envUrl.replace(/\/api\/?$/, "").replace(/\/$/, "");
};

export const socket = io(getSocketUrl(), {
  autoConnect: true,
});