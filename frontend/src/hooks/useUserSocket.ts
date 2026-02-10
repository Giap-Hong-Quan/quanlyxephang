import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { socket } from "./socket";


export const useUserSocket = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    // Lắng nghe login 
    socket.on("user_login", (data: { userId: string; isActive: boolean }) => {
      console.log("Real-time update nhận được:", data);
      // Cách 1: Báo cho React Query rằng dữ liệu 'users' đã cũ
      // Nó sẽ tự động gọi lại hàm getAllUserService của bạn
      queryClient.invalidateQueries({ queryKey: ["getAllUser"] });
    });
    // Lắng nghe logout

       // 2. Lắng nghe logout (Sửa lỗi cú pháp ở đây)
    socket.on("user_logout", (data: { userId: string; isActive: boolean }) => {
      console.log("User logout:", data);
      queryClient.invalidateQueries({ queryKey: ["getAllUser"] });
    });

    return () => {
      socket.off("user_isActive_change");
        socket.off("user_logout")
    };
  }, [queryClient]);
};