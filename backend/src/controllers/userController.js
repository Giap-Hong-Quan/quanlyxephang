import { createUserService } from "../services/userService.js";
import { success } from "../utils/success.js";

export const createUserController =async(req,res,next)=>{
    try {
        const result =await createUserService(req.body,req.file);
        return success(res,result,"Đăng ký thành công",201);
    } catch (error) {
        next(error);
    }
}