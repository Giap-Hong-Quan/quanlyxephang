import { LoginRequset, LoginResponse, ProfileResponse } from "../types/authTypes";
import apiClient from "./apiClient";

export const loginService = async ( data:LoginRequset) : Promise<LoginResponse> =>{
    const result =await apiClient.post<LoginResponse>("/auth/login",data);
    const token = result.data.data.accessToken;
    localStorage.setItem("token",token);
    console.log(result.data)
    return result.data;
}

export const getProfile =async()=>{
const result =await apiClient.get<ProfileResponse>("/auth/profile");
console.log(result.data)
    return result.data;
}