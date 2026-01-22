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
// Get User by ID
export const getUserByIdService = async (userId) => {
    const user = await User.findById(userId)
        .populate("role", "name")
        .select("-password -reset_token -reset_token_expires")
        .lean();

    if (!user) {
        throw new ApiError(404, "Không tìm thấy người dùng này");
    }
    return user;
};

// Delete User by ID
export const deleteUserService = async (userId) => {
    const user = await User.findById(userId);
    if (!user) {
        throw new ApiError(404, "Người dùng không tồn tại hoặc đã bị xóa trước đó");
    }
    await User.findByIdAndDelete(userId);
    // Lưu ý: Nếu sau này bạn có lưu ảnh trên Cloudinary, 
    // bạn nên thêm logic xóa ảnh trên Cloudinary tại đây để tránh rác storage.
};

// Update User
export const updateUserService = async (userId, data, file) => {
    const { username, full_name, email, password, role, status } = data;
    const user = await User.findById(userId);
    if (!user) throw new ApiError(404, "Không tìm thấy người dùng");
    if (username || email) {
        const existingUser = await User.findOne({
            _id: { $ne: userId }, // Không tính chính user đang update
            $or: [{ username }, { email }]
        });
        if (existingUser) throw new ApiError(409, "Tên đăng nhập hoặc Email đã được sử dụng");
    }
    const updateData = { username, full_name, email, role, status };
    //  Xử lý Password (chỉ hash nếu có thay đổi)
    if (password) {
        updateData.password = await hashPassword(password);
    }
    // Xử lý Avatar mới (nếu có)
    if (file && file.buffer) {
        const uploadRes = await uploadToCloudinary(file.buffer);
        updateData.avatar_url = uploadRes.secure_url;
    }
    // Cập nhật vào DB
    const updatedUser = await User.findByIdAndUpdate(
        userId,
        { $set: updateData },
        { new: true, runValidators: true }
    ).select("-password -reset_token -reset_token_expires").populate("role", "name");
    return updatedUser;
};
