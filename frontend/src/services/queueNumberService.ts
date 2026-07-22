import type { queueNumber, queueParams } from "../types/queueNumber";
import apiClient from "./apiClient";

export const createQueueNumber = async (params: any) => {
  const res = await apiClient.post("/queue", params);
  return res.data;
};

export const getAllQueueNumbers = async (params?: queueParams) => {
  const res = await apiClient.get("/queue", { params });
  return res.data.data;
};

export const getQueueNumberById = async (id: string) => {
  const res = await apiClient.get(`/queue/${id}`);
  return res.data.data;
};

export const updateQueueNumber = async (id: string, body: any) => {
  const res = await apiClient.put(`/queue/${id}`, body);
  return res.data;
};

export const updateQueueNumberStatus = async (id: string, status: string) => {
  const res = await apiClient.put(`/queue/${id}/status`, { status });
  return res.data;
};

export const deleteQueueNumber = async (id: string) => {
  const res = await apiClient.delete(`/queue/${id}`);
  return res.data;
};
