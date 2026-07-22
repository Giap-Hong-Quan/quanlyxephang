import type { ApiResponse } from "../types/ApiResponse";
import type { User, UserListData } from "../types/userType";
import apiClient from "./apiClient";

export const getAllUserService = async (params?: any) => {
  const result = await apiClient.get<ApiResponse<UserListData>>('/user', { params });
  return result.data.data;
};

export const postUserService = async (data: any) => {
  const result = await apiClient.post<ApiResponse<User>>('/user', data);
  return result.data;
};

export const updateUserService = async (id: string, data: any) => {
  const result = await apiClient.put<ApiResponse<User>>(`/user/${id}`, data);
  return result.data;
};

export const deleteUserService = async (id: string) => {
  const result = await apiClient.delete<ApiResponse<any>>(`/user/${id}`);
  return result.data;
};