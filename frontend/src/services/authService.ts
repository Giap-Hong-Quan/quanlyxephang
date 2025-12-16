import { LoginPayload, LoginResponse, User } from "../types/authTypes";
import apiClient from "./apiClient";

export const loginService = async ( data:LoginPayload): Promise<User> =>{
    const result =await apiClient.post<LoginResponse>("/auth/login",data);
    localStorage.setItem("accessToken",result.data.data.accessToken);
    return result.data.data.user;
}