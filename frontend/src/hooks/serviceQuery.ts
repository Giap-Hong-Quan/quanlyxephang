import { useMutation, useQuery } from "@tanstack/react-query"
import { deleteServiceService, getAllServiceService, getByIdServiceService, postServiceService, updateServiceService } from "../services/seviceService"
import type { Service, ServiceParams } from "../types/seviceTypes";
import { deleteDeviceService, postDeviceService } from "../services/deviceService";
import { toast } from "sonner";
import { queryClient } from "../libs/queryClient";

export const useGetAllServiceQuery = (params:ServiceParams)=>{
    return useQuery({
        queryKey:["getAllService",params],
        queryFn:async()=>{
         return await getAllServiceService(params);
        }
    })
}
export const useDeleteServiceQuery = () => {
  return useMutation({
    mutationFn:(serviceId:string)=> deleteServiceService(serviceId),
    onSuccess: (res) => {
      toast.success(res.message || "Xóa dịch vụ thành công");
      queryClient.invalidateQueries({ queryKey: ['getAllService'] })
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Xóa dịch vụ thất bại");
    }
  })
}


export const usePostServiceQuery=()=>{
  return useMutation({
    mutationFn:(params:Service)=>postServiceService(params),
    onSuccess:(res)=>{
      toast.success(res.message||"Thêm dịch vụ thành công");
      queryClient.invalidateQueries({queryKey:['getAllService']})
    },
    onError:(error:any)=>{
      toast.error(error.response?.data?.message || "Thêm dịch vụ thất bại");
    }
  })
}
export const usePutServiceQuery=()=>{
  return useMutation({
    mutationFn:({id,params}:{id:string,params:Service})=>updateServiceService(id,params),
    onSuccess:(res)=>{
      toast.success(res.message|| "Cập nhật dịch vụ thành công")
      queryClient.invalidateQueries({queryKey:['getAllService']})
    },
    onError:(error:any)=>{
      toast.error(error.response?.data?.message || "Cập nhật dịch vụ thất bại");
    }
  })
}
export const useGetServiceByIdQuery =(id:string)=>{
  return useQuery({
    queryKey:["getByIdService",id],
    queryFn:async()=>{
      const res =await getByIdServiceService(id);
      return res
    },
    enabled: !!id,
  })
}