

export interface LoginResponse {
  success:boolean,
  message: string,
  data: {
    accessToken: string,
  }
}

export interface LoginRequset {
    username:string,
    password:string
}