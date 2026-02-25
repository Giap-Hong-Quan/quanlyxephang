import type { ApiResponse } from "../types/ApiResponse";
import type { DeviceListData } from "../types/deviceTypes";
import apiClient from "./apiClient"

export const getAllDeviceService = async()=>{
    const res=await apiClient.get<ApiResponse<DeviceListData>>('/device');
    return res.data.data
}

export const deleteDeviceService = async(id:string)=>{
    const res=await apiClient.delete(`/device/${id}`);
    return res.data;
}
