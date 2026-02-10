import type { ApiResponse } from "../types/ApiResponse";
import type { UserListData } from "../types/userType";
import apiClient from "./apiClient"

export const getAllUserService =async()=>{
    const result =await apiClient.get<ApiResponse<UserListData>>('/user');
   return result.data.data;
}