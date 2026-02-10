export interface User {
    _id: string,
    full_name: string,
    email: string,
    phone:string,
    role: {
        _id:string,
        name:string
    },
    lastLogin:Date,
    isActive: boolean,
    avatar_url?: string,
}
export interface UserListData {
  users: User[];        // Đây mới là nơi chứa mảng users
currentPage:number,
limit:number,
totalPages:number,
totalUsers:number,
}