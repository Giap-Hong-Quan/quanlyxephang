// export interface LoginPayload {
//     email:string,
//     password:string
// }
// export interface User {
//     id: string;
//     full_name: string;
//     email: string;
//     role: string;
//     permissions: string[];
//     status: string;
//     avatar_url?: string;
// }
// export interface LoginResponse {
//   message: string;
//   data: {
//     user: User;
//     accessToken: string;
//   };
// }

export interface LoginPayload {
    email:string,
    password:string
    role: string;
}
export interface AuthResponse {
  userCode: string;
  userFullName: string;
  passwordStatus: boolean;
  token: string;
  tokenRefresh: string;
  userRole: string;  
  avatar?: string;
  taxCode?: string | null;
  details?: any;
}