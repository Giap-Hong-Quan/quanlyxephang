import { LoginRequset, LoginResponse } from "../types/authTypes";
import apiClient from "./apiClient";

export const loginService = async ( data:LoginRequset) : Promise<LoginResponse> =>{
    const result =await apiClient.post<LoginResponse>("/auth/login",data);
    const token = result.data.data.accessToken;
    localStorage.setItem("accessToken",token);
    console.log(result.data)
    return result.data;
}
