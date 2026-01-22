import { createUserService, getAllUserService } from "../services/userService.js";
import { success } from "../utils/success.js";
//create user controller
export const createUserController =async(req,res,next)=>{
    try {
        const {username,full_name, email, password, role} = req.body;
        const file =req.file
        if (!username ||!full_name|| !email || !password || !role) {
            return res.status(400).json({message:"Vui lòng nhập đầy đủ"})
        }
        if (!file) {
            return res.status(400).json({ message: "Vui lòng chọn ảnh đại diện" });
        }
        const result =await createUserService({username,full_name, email, password, role },file);
        return success(res,result,"Đăng ký thành công",201);
    } catch (error) {
        next(error);
    }
}
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
    const {page,sizePage,search,roleId}=req.query;
    const result = await getAllUserService(page,sizePage,{roleId,search});
    return success(res, result, "Lấy danh sách user thành công", 200);
  } catch (error) {
    next(error);
  }
};