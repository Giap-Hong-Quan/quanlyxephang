export interface Service {
  _id: string,
  service_code: string,
  service_name: string,
  description: string,
  status: string,
  createdAt?: Date,
  updatedAt?: Date
}

export interface ServiceParams {
  status?: string,
  search?: string,
  page: number
  pageSize: number
}