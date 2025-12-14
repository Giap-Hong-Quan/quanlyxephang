import { createUserService, getAllUserService } from "../services/userService.js";
import { success } from "../utils/success.js";

export const createUserController =async(req,res,next)=>{
    try {
        const result =await createUserService(req.body,req.file);
        return success(res,result,"Đăng ký thành công",201);
    } catch (error) {
        next(error);
    }
}
export const getProfileController = async (req, res, next) => {
    try {
        return res.status(200).json({
            success: true,
            message: "Lấy thông tin người dùng thành công",
            data: req.user
        });
    } catch (error) {
        next(error);
    }
};

// export const updateProfileController =async (req,res,next) =>{
//     try {
        
//         const result = await updateProfileService(req.user._id, req.body);
//         return success(res,result,"Cập nhật thành công",201);
//     } catch (error) {
//         next(error)
//     }
// }

export const getAllUserController = async (req, res, next) => {
  try {
    const result = await getAllUserService(req.query);
    return success(res, result, "Lấy danh sách user thành công", 200);
  } catch (error) {
    next(error);
  }
};