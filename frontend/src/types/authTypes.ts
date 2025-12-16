export interface LoginPayload {
    email:string,
    password:string
}
export interface User {
    id: string;
    full_name: string;
    email: string;
    role: string;
    permissions: string[];
    status: string;
    avatar_url?: string;
}
export interface LoginResponse {
  message: string;
  data: {
    user: User;
    accessToken: string;
  };
}