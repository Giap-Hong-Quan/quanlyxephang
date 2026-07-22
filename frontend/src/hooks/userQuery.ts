import { useMutation, useQuery } from "@tanstack/react-query";
import { deleteUserService, getAllUserService, postUserService, updateUserService } from "../services/userService";
import { toast } from "sonner";
import { queryClient } from "../libs/queryClient";

export const useGetAllUserQuery = (params?: any) => {
  return useQuery({
    queryKey: ["getAllUser", params],
    queryFn: () => getAllUserService(params)
  });
};

export const useCreateUserQuery = () => {
  return useMutation({
    mutationFn: (data: any) => postUserService(data),
    onSuccess: (res) => {
      toast.success(res.message || "Thêm tài khoản thành công!");
      queryClient.invalidateQueries({ queryKey: ["getAllUser"] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Thêm tài khoản thất bại!");
    }
  });
};

export const useUpdateUserQuery = () => {
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => updateUserService(id, data),
    onSuccess: (res) => {
      toast.success(res.message || "Cập nhật tài khoản thành công!");
      queryClient.invalidateQueries({ queryKey: ["getAllUser"] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Cập nhật tài khoản thất bại!");
    }
  });
};

export const useDeleteUserQuery = () => {
  return useMutation({
    mutationFn: (id: string) => deleteUserService(id),
    onSuccess: (res) => {
      toast.success(res.message || "Xóa tài khoản thành công!");
      queryClient.invalidateQueries({ queryKey: ["getAllUser"] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Xóa tài khoản thất bại!");
    }
  });
};