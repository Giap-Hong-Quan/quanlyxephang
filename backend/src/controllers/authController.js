import { forgotPasswordService, loginService, logoutService, refreshTokenService, resetPasswordService } from "../services/authService.js"
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




export const refreshTokenController = async (req,res,next)=>{
    try {
         const refresh_token = req.cookies.refresh_token;
        const result =await refreshTokenService(refresh_token)
        return success(res,result,"Tạo token mơi thành công",200)
    } catch (error) {
        next(error)
    }
}
// logput

export const logoutController =async (req,res,next)=>{
    try {
       const result= await logoutService(req.user._id);
           res.clearCookie("refresh_token", {
            httpOnly: true,
            secure: true,
            sameSite: "none", // hoặc "none" nếu cross-site
            });
        success(res,result,"Đăng xuất thành công",201);
    } catch (error) {
        next(error)
    }
}