import ApiError from "../exceptions/ApiError.js";
import User from "../models/User.js";
import { hashPassword } from "../utils/password.js";
import { uploadToCloudinary } from "../utils/uploadCloudinary.js";

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

//create user
export const createUserService =async ({username,full_name, email, password, role},file)=>{
    const user = await User.findOne({$or: [{ username }, { email }]});
    if (user) {
        throw new ApiError(409, "Tên hoặc Email này đã tồn tại");
    }
    //  Hash password
    const hashedPassword =await hashPassword(password);
    let avatarUrl = null;
    if(file&&file.buffer){
        const uploadRes = await uploadToCloudinary(file.buffer);
        avatarUrl = uploadRes.secure_url;
    }
    //  Tạo user mới
    const newUser=await User.create({
        username,
        full_name,
        email,
        password: hashedPassword,
        role,
        status: "inactive", 
        avatar_url:avatarUrl
    });
const userResponse = newUser.toObject();
delete userResponse.password;
return userResponse;
}

// get all user 
export const getAllUserService =async (page=1,pageSize=10,filter={})=>{
    const {roleId,search}=filter; 
const query = {};
if(roleId){
    query.role = roleId;
}
if(search){
    query.$or=[
        {username:{$regex:search,$options:"i"}},
        {full_name:{$regex:search,$options:"i"}},
        {email:{$regex:search,$options:"i"}},
    ]
}
    const currentPage =Math.max(1,parseInt(page));   // số page hiện tại
    const limit =Math.max(1,parseInt(pageSize))  // số dòng của page
    const skip = (page - 1) * limit ;   
    const [users,count]= await Promise.all([
                        User.find(query)
                        .sort({ createdAt: -1 })
                        .select("-password -reset_token -reset_token_expires")
                        .populate("role","name")
                        .skip(skip)
                        .limit(limit)
                        .lean(),
                        User.countDocuments()
    ])
    return {
            users,
            currentPage,
            limit,
            totalPages: Math.ceil(count / limit),
            totalCount:count,
    }
}

