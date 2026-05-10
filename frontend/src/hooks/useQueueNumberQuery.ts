import { useMutation, useQuery } from "@tanstack/react-query"
import { createQueueNumber, getAllQueueNumbers } from "../services/queueNumberService"
import type { queueNumber, queueParams } from "../types/queueNumber"
import { toast } from "sonner"

export const useCreateQueueNumber = () => {
	return useMutation({
		mutationFn: async (data: queueNumber) => createQueueNumber(data),
		onSuccess: (response) => {
			toast.success(response.message || "Cấp số mới thành công!")
			// Có thể thêm logic sau khi tạo thành công, ví dụ: hiển thị thông báo, điều hướng, v.v.
		}
		, onError: (error) => {
			// Xử lý lỗi, ví dụ: hiển thị thông báo lỗi
			console.error("Lỗi khi tạo số thứ tự:", error)
		}
	})
}
export const useGetAllQueueNumbers = (params?: queueParams) => {
	return useQuery({
		queryKey: ["queueNumbers", params],
		queryFn: async () => {	
			return await getAllQueueNumbers(params);
		},
	})
}