import { forgotPasswordService, loginService, registerService, resetPasswordService } from "../services/authService.js"
import { success } from "../utils/success.js";

export const loginController = async (req,res,next)=>{
    try {
        const {user,accessToken,refreshToken}=await loginService(req.body);
        res.cookie("refresh_token", refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });
        return success(res,{user,accessToken,refreshToken},"Đăng nhập thành công",200)
    } catch (error) {
        next(error)
    }
}
export const registerController =async(req,res,next)=>{
    try {
        const result =await registerService(req.body);
        return success(res,result,"Đăng ký thành công",201);
    } catch (error) {
        next(error);
    }
}
export const forgotPasswordController =async (req,res,next )=>{
    try {
        
        const result = await forgotPasswordService(req.body.email)
        return res.json({message:result})
    } catch (error) {
        next(error);
    }
}
export const resetPasswordController =async (req,res,next)=>{
    try{
        const { token, new_password } = req.body;
        const result =await resetPasswordService(token, new_password)
        return res.json({message:result})
    }catch(error){
        next(error)
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
