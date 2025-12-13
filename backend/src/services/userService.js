import ApiError from "../exceptions/ApiError.js";
import RefreshToken from "../models/RefreshToken.js";
import User from "../models/User.js";
import { hashPassword } from "../utils/password.js";

//update profile 
// export const updateProfileService = async (userId,data,file)=>{
//     const { full_name, email, phone, password, role } = data;
//      if (!full_name || !email || !phone || !password || !role) {
//         throw new ApiError(400, "Vui lòng nhập đầy đủ thông tin bắt buộc");
//     }

//     // 2. Hash password
//     const hashedPassword = hashPassword(password);
//     let avatarUrl = file?.path || 
//     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwk4R-qESlPq8lZz2mn3BcbVVROHU7-WxvU7nKNf1cDBZcOReoDuAnzKYOUBkN4UBGmcY&usqp=CAU";

//      const updateData = {
//         full_name,
//         email,
//         password:hashedPassword,
//         phone,
//         role,
//      };
//         if (avatarUrl) {
//         updateData.avatar_url = avatarUrl;
//     }
//      const update = await User.findByIdAndUpdate(userId,updateData,{ new: true });

//      return update 
// }

//2:create user
export const createUserService =async (data,file)=>{
    const { full_name, email, phone, password, role } = data;
     if (!full_name || !email || !phone || !password || !role) {
        throw new ApiError(400, "Vui lòng nhập đầy đủ thông tin bắt buộc");
    }
    // 1. Check email đã tồn tại chưa
    const existEmail = await User.findOne({ email });
    if (existEmail) {
        throw new ApiError(400, "Email đã tồn tại");
    }

    // 2. Hash password
    const hashedPassword = hashPassword(password);
    let avatarUrl = file?.path || 
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwk4R-qESlPq8lZz2mn3BcbVVROHU7-WxvU7nKNf1cDBZcOReoDuAnzKYOUBkN4UBGmcY&usqp=CAU";

    // 3. Tạo user mới
    const newUser = await User.create({
        full_name,
        email,
        phone,
        password: hashedPassword,
        role,
        status: "inactive", 
        avatar_url:avatarUrl
    });
    return  {
    id: newUser._id,
    full_name: newUser.full_name,
    email: newUser.email,
    phone: newUser.phone,
    role: newUser.role,
    status: newUser.status,
    avatar_url: newUser.avatar_url,
  };;

}
// refreshTokenService 

