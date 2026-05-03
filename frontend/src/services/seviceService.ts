import type { Service, ServiceParams } from "../types/seviceTypes"
import apiClient from "./apiClient"

export const getAllServiceService = async (params: ServiceParams) => {
	const res = await apiClient.get("/service", { params });
	return res.data.data;
}
export const postServiceService = async (params: Service) => {
	const res = await apiClient.post('/service', params);
	return res.data;
}
export const deleteServiceService = async (id: string) => {
	const res = await apiClient.delete(`/service/${id}`);
	return res.data;
}
export const updateServiceService = async (id: string, params: Service) => {
	const res = await apiClient.put(`/service/${id}`, params)
	return res.data
}
export const getByIdServiceService = async (id: string) => {
	const res = await apiClient.get(`/service/${id}`);
	return res.data.data;
}
