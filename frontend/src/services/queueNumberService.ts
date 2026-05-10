import type { queueNumber, queueParams } from "../types/queueNumber";
import apiClient from "./apiClient";

export const createQueueNumber =async (params:queueNumber) => {
  const res= await apiClient.post("/queue", params);
  return res.data;
};
export const getAllQueueNumbers =async (params?:queueParams) => {
  const res=await apiClient.get("/queue", { params });
  return res.data.data;
};
// export const getQueueNumberById = (id: string) => {
//   return apiClient.get(`/queues/${id}`);
// };
