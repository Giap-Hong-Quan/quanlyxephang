import { useMutation, useQuery } from "@tanstack/react-query"
import { getProfile, loginService } from "../services/authService"

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