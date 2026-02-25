import { useMutation, useQuery } from "@tanstack/react-query"
import { getProfile, loginService, logoutService } from "../services/authService"
import { queryClient } from "../libs/queryClient"
import { toast } from "sonner"
import { useNavigate } from "react-router-dom"

export const useProfile=()=>{
    return useQuery({
        queryKey:["profile"],
        queryFn:getProfile,
    })
}

export const useLogin =()=>{
    const navigate = useNavigate();
    return useMutation({
        mutationFn:loginService,
        onSuccess: (res) => {
            // 1. Lưu token
            const token = res.data.accessToken;
            localStorage.setItem("token", token);
            // 2. Thông báo
            toast.success("Đăng nhập thành công!");
            // 3. Làm mới cache hoặc xóa cache cũ
            queryClient.invalidateQueries({ queryKey: ['profile'] });
            // 4. Điều hướng
            navigate("/");
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || "Đăng nhập thất bại");
        }
    })
}
export const useLogout =()=>{
    const navigate = useNavigate(); // Khai báo navigate
    return useMutation({
        mutationFn:logoutService,
        onSuccess:()=>{
            localStorage.clear();
            queryClient.clear();
            toast.success("Bạn đã đăng xuất thành công");
            navigate("/login")
        }
    })
}