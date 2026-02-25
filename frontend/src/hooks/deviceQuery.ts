import { useMutation, useQuery } from "@tanstack/react-query"
import { deleteDeviceService, getAllDeviceService } from "../services/deviceService"
import { toast } from "sonner"
import { queryClient } from "../libs/queryClient"

export const useGetAllDeviceQuery =()=>{
    return useQuery({
        queryKey:["getAllDevice"],
        queryFn:getAllDeviceService,
    })
}
export const useDeleteDeviceQuery =()=>{
    return useMutation({
        mutationFn:deleteDeviceService,
        onSuccess:(res)=>{
    toast.success(res.message || "Xóa thiết bị thành công");
            queryClient.invalidateQueries({queryKey:["getAllDevice"]})
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || "Xóa thiết bị thất bại");
        }
    })
}
