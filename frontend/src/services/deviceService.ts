import type { ApiResponse } from "../types/ApiResponse";
import type { Device, DeviceListData, DeviceParams } from "../types/deviceTypes";
import apiClient from "./apiClient"

export const getAllDeviceService = async (params:DeviceParams) => {
    const res = await apiClient.get<ApiResponse<DeviceListData>>('/device', {params});
    return res.data.data;
}
export const postDeviceService =async(params:Device)=>{
    const res =await apiClient.post<ApiResponse<Device>>('/device',params);
    return res.data;
}
export const deleteDeviceService = async (id: string) => {
    const res = await apiClient.delete(`/device/${id}`);
    return res.data;
}
export const updateDeviceService= async (id:string,params:Device)=>{
    const res= await apiClient.put(`/device/${id}`,params)
    return res.data
}
export const getByIdDeviceService = async (id: string) => {
    const res = await apiClient.get(`/device/${id}`);
    return res.data.data;
}