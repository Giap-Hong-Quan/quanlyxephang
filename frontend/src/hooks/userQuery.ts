import { useQuery } from "@tanstack/react-query"
import { getAllUserService } from "../services/userService"

export const useGetAllUserQuery =()=>{
    return useQuery({
            queryKey:["getAllUser"],
            queryFn:getAllUserService
        })
}