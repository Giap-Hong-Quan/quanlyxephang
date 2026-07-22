import apiClient from "./apiClient";

export interface OverviewStats {
  totalQueue: number;
  waitingCount: number;
  processingCount: number;
  completedCount: number;
  skippedCount: number;
  totalServices: number;
  totalDevices: number;
  totalUsers: number;
}

export interface ServiceStatItem {
  _id: string;
  service_name: string;
  service_code: string;
  total: number;
  waiting: number;
  processing: number;
  completed: number;
  skipped: number;
}

export interface TimeStatItem {
  time: string;
  total: number;
  waiting: number;
  processing: number;
  completed: number;
  skipped: number;
}

export const getOverviewStats = async (params?: { fromDate?: string; toDate?: string }): Promise<OverviewStats> => {
  const res = await apiClient.get("/queue/stats/overview", { params });
  return res.data.data;
};

export const getServiceStats = async (params?: { fromDate?: string; toDate?: string }): Promise<ServiceStatItem[]> => {
  const res = await apiClient.get("/queue/stats/by-service", { params });
  return res.data.data;
};

export const getTimeStats = async (params?: { period?: string; fromDate?: string; toDate?: string }): Promise<TimeStatItem[]> => {
  const res = await apiClient.get("/queue/stats/by-time", { params });
  return res.data.data;
};
