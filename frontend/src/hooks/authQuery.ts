import { useMutation, useQuery } from "@tanstack/react-query"
import { getProfile, loginService, logoutService } from "../services/authService"
import { queryClient } from "../libs/queryClient"
import { toast } from "sonner"

export const useProfile=()=>{
    return useQuery({
        queryKey:["profile"],
        queryFn:getProfile,
    })
}

export const useLogin =()=>{
    return useMutation({
        mutationFn:loginService,
    })
}
export const useLogout =()=>{
    return useMutation({
        mutationFn:logoutService,
        onSuccess:()=>{
            localStorage.clear();
            queryClient.clear();
            toast.success("Bạn đã đăng xuất thành công");
            window.location.href="/login"
        }
    })
}