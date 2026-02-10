
import type { LoginRequest, LoginResponse, LogoutResponse, ProfileResponse } from "../types/authTypes";
import apiClient from "./apiClient";
// login 
export const loginService = async ( data:LoginRequest) : Promise<LoginResponse> =>{
    const result =await apiClient.post<LoginResponse>("/auth/login",data);
    const token = result.data.data.accessToken;
    localStorage.setItem("token",token);
    return result.data;
}
//get profile
export const getProfile =async()=>{
const result =await apiClient.get<ProfileResponse>("/auth/profile");
console.log(result.data)
    return result.data;
}
//get profile
export const logoutService =async()=>{
const result =await apiClient.post<LogoutResponse>("/auth/logout");
console.log(result.data)
    return result.data;
}