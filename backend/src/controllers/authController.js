import { forgotPasswordService, loginService, logoutService, resetPasswordService } from "../services/authService.js"
import { success } from "../utils/success.js";
import { loginSchema } from "../validators/loginValidator.js";
// login controller
export const loginController = async (req,res,next)=>{
    try {
        const validator = loginSchema.parse(req.body)
        const result=await loginService(validator);
        return success(res,result,"Đăng nhập thành công",200)
    } catch (error) {
        next(error)
    }
}
// gửi mã quên mật khẩu
export const forgotPasswordController =async (req,res,next )=>{
    try {
        const result = await forgotPasswordService(req.body.email)
        return res.json({message:result})
    } catch (error) {
        next(error);
    }
}
//reset mật khẩu
export const resetPasswordController =async (req,res,next)=>{
    try{
        const {token,new_password } = req.body;
        const result =await resetPasswordService(token,new_password)
        return res.json({message:result})
    }catch(error){
        next(error)
    }
}
// logput
export const logoutController =async (req,res,next)=>{
    try {
       const result= await logoutService(req.user._id);
        success(res,result,"Đăng xuất thành công",200);
    } catch (error) {
        next(error)
    }
}
// profile
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