export interface Device {
  _id: string,
  device_code: string,
  device_name: string,
  ip_address: string,
  status: string
}
export interface DeviceListData {
  devices: Device[];     
  currentPage: number,
  limit: number,
  totalPages: number,
  totalDevices: number,
}
export interface DeviceParams {
  status?: string,
  search?: string,
  page: number
  pageSize: number
}