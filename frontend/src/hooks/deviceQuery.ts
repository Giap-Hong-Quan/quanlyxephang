import { useMutation, useQuery } from "@tanstack/react-query"
import { deleteDeviceService, getAllDeviceService, getByIdDeviceService, postDeviceService, updateDeviceService } from "../services/deviceService"
import { toast } from "sonner"
import { queryClient } from "../libs/queryClient"
import type { Device, DeviceParams } from "../types/deviceTypes"

export const useGetAllDeviceQuery = (params:DeviceParams) => {
  return useQuery({
    queryKey: ["getAllDevice", params],
    queryFn: async () => {
     const res= await getAllDeviceService(params)
     return res
    },
  })
}
export const useDeleteDeviceQuery = () => {
  return useMutation({
    mutationFn:(deviceId:string)=> deleteDeviceService(deviceId),
    onSuccess: (res) => {
      toast.success(res.message || "Xóa thiết bị thành công");
      queryClient.invalidateQueries({ queryKey: ['getAllDevice'] })
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Xóa thiết bị thất bại");
    }
  })
}

export const usePostDeviceQuery=()=>{
  return useMutation({
    mutationFn:(params:Device)=>postDeviceService(params),
    onSuccess:(res)=>{
      toast.success(res.message||"Thêm thiết bị thành công");
      queryClient.invalidateQueries({queryKey:['getAllDevice']})
    },
    onError:(error:any)=>{
      toast.error(error.response?.data?.message || "Thêm thiết bị thất bại");
    }
  })
}
export const usePutDeviceQuery=()=>{
  return useMutation({
    mutationFn:({id,params}:{id:string,params:Device})=>updateDeviceService(id,params),
    onSuccess:(res)=>{
      toast.success(res.message|| "Cập nhật thiết bị thành công")
      queryClient.invalidateQueries({queryKey:['getAllDevice']})
    },
    onError:(error:any)=>{
      toast.error(error.response?.data?.message || "Cập nhật thiết bị thất bại");
    }
  })
}
export const useGetDeviceByIdQuery =(id:string)=>{
  return useQuery({
    queryKey:["getByIdDevice",id],
    queryFn:async()=>{
      const res =await getByIdDeviceService(id);
      return res
    },
    enabled: !!id,
  })
}