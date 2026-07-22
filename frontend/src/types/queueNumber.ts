interface ServiceType {
  _id: string;
  service_name?: string;
}

interface DeviceType {
  _id: string;
  device_name: string;
}

export interface queueNumber {
  _id: string;
  queueNumber: string;
  customer_name: string;
  phone_number?: string;
  service: ServiceType;
  device: DeviceType;
  expiry_time: string;
  expiration: string;
  status: "waiting" | "processing" | "completed" | "skipped";
  issue_time: string;
  createdAt: string;
  updatedAt: string;
}

export interface queueParams {
  page?: number;
  pageSize?: number;
  status?: string;
  device?: string;
  fromDate?: string;
  toDate?: string;
  keyWord?: string;
}