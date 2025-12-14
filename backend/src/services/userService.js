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

//create user
export const createUserService =async (data,file)=>{
    const { full_name, email, phone, password, role } = data;
     if (!full_name || !email || !phone || !password || !role) {
        throw new ApiError(400, "Vui lòng nhập đầy đủ thông tin bắt buộc");
    }
    //  Check email đã tồn tại chưa
    const existEmail = await User.findOne({ email });
    if (existEmail) {
        throw new ApiError(400, "Email đã tồn tại");
    }

    //  Hash password
    const hashedPassword = hashPassword(password);
    let avatarUrl = file?.path || 
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwk4R-qESlPq8lZz2mn3BcbVVROHU7-WxvU7nKNf1cDBZcOReoDuAnzKYOUBkN4UBGmcY&usqp=CAU";

    //  Tạo user mới
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

// get all user 
export const getAllUserService =async (data)=>{
    const page =Number(data.page) || 1;   // số page hiện tại
    const limit =Number(data.limit) || 10;  // số dòng của page
    const skip = (page - 1) * limit ;      //bỏ qua bao nhiêu  để qua trang
    const search = data.search || "";   // dư liệu seach 
    const status = data.status;         // trang thai

    // lọc stage theo filter và status
    const matchStage ={
        $match : {
            ...(status && {status}),
            ...(search && {
                $or : [
                    { full_name: { $regex: search, $options: "i" } },
                    { email: { $regex: search, $options: "i" } },
                    { phone: { $regex: search, $options: "i" } },
                ]
            })
        }
    }

    const result =await User.aggregate(
        [
            matchStage,
            {
                $facet :{
                        data:[
                            {$sort:{createdAt: -1 }},
                            {$skip:skip},
                            {$limit:limit},
                            {$project:{
                                password: 0,
                                reset_token: 0,
                                reset_token_expires: 0,
                            }}
                        ],
                        count: [{ $count: "count" }],
                        activeCount: [
                            { $match: { status: "active" } },
                            { $count: "count" }
                        ],
                        inactiveCount: [
                            { $match: { status: "inactive" } },
                            { $count: "count" }
                        ]
                }
            }
        ]  
    )
    const users = result[0].data;
    const count = result[0].count[0]?.count || 0;
    const countActive = result[0].activeCount[0]?.count || 0;
    const countInactive = result[0].inactiveCount[0]?.count || 0;
    return {
        data:users,
        pagination:{
            page,
            limit,
            totalPages: Math.ceil(count / limit),
        },
        count,
        countActive,
        countInactive
    }
}

