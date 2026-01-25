//response login
export interface LoginResponse {
  success:boolean,
  message: string,
  data: {
    accessToken: string,
  }
}
// resquest login
export interface LoginRequset {
    username:string,
    password:string
}
//response get profile
export interface ProfileResponse{
  success:boolean,
  message: string,
  data: {
    _id: string,
    full_name: string,
    email: string,
    phone: string,
    role: string,
    avatar_url:string,
    status: string
  }
}