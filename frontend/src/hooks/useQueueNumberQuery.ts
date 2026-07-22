import { useMutation, useQuery } from "@tanstack/react-query";
import { createQueueNumber, getAllQueueNumbers, getQueueNumberById, updateQueueNumber, updateQueueNumberStatus } from "../services/queueNumberService";
import { queryClient } from "../libs/queryClient";
import type { queueNumber, queueParams } from "../types/queueNumber";
import { toast } from "sonner";

export const useCreateQueueNumber = () => {
  return useMutation({
    mutationFn: async (data: any) => createQueueNumber(data),
    onSuccess: (response) => {
      toast.success(response.message || "Cấp số mới thành công!");
      queryClient.invalidateQueries({ queryKey: ["queueNumbers"] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Lỗi khi tạo số thứ tự!");
      console.error("Lỗi khi tạo số thứ tự:", error);
    }
  });
};

export const useGetAllQueueNumbers = (params?: queueParams) => {
  return useQuery({
    queryKey: ["queueNumbers", params],
    queryFn: async () => {
      return await getAllQueueNumbers(params);
    },
  });
};

export const useGetDetailQueueNumberQuery = (id: string) => {
  return useQuery({
    queryKey: ["getDetailQueueNumber", id],
    queryFn: async () => {
      return await getQueueNumberById(id);
    },
    enabled: !!id,
  });
};

export const useUpdateQueueNumberQuery = () => {
  return useMutation({
    mutationFn: async ({ id, body }: { id: string; body: any }) => updateQueueNumber(id, body),
    onSuccess: (response) => {
      toast.success(response.message || "Cập nhật vé thành công!");
      queryClient.invalidateQueries({ queryKey: ["queueNumbers"] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Lỗi khi cập nhật vé");
    }
  });
};

export const useUpdateQueueNumberStatus = () => {
  return useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => updateQueueNumberStatus(id, status),
    onSuccess: (response) => {
      toast.success(response.message || "Cập nhật trạng thái thành công!");
      queryClient.invalidateQueries({ queryKey: ["queueNumbers"] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Lỗi khi cập nhật trạng thái");
      console.error("Lỗi khi cập nhật trạng thái số thứ tự:", error);
    }
  });
};

// Aliases
export const useCreateQueueNumberQuery = useCreateQueueNumber;