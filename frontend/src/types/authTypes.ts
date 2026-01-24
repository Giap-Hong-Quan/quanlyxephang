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
    _id: String,
    full_name: String,
    email: String,
    phone: String,
    role: String,
    status: String
  }
}