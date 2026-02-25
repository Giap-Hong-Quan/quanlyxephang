export interface Device {
    _id: string,
    device_code: string,
    device_name: string,
    ip_address:string,
isActive:boolean
}
export interface DeviceListData {
  devices: Device[];        // Đây mới là nơi chứa mảng users
    currentPage:number,
    limit:number,
    totalPages:number,
    totalDevices:number,
}