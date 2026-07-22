import { useQuery } from "@tanstack/react-query";
import { getOverviewStats, getServiceStats, getTimeStats } from "../services/statsService";

export const useOverviewStats = (params?: { fromDate?: string; toDate?: string }) => {
  return useQuery({
    queryKey: ["overviewStats", params],
    queryFn: () => getOverviewStats(params),
    refetchInterval: 10000, // Refresh every 10s for real-time monitoring
  });
};

export const useServiceStats = (params?: { fromDate?: string; toDate?: string }) => {
  return useQuery({
    queryKey: ["serviceStats", params],
    queryFn: () => getServiceStats(params),
    refetchInterval: 10000,
  });
};

export const useTimeStats = (params?: { period?: string; fromDate?: string; toDate?: string }) => {
  return useQuery({
    queryKey: ["timeStats", params],
    queryFn: () => getTimeStats(params),
    refetchInterval: 10000,
  });
};
