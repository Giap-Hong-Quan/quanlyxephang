import crypto from 'crypto';
import ApiError from "../exceptions/ApiError.js";
import RefreshToken from "../models/RefreshToken.js";
import User from "../models/User.js";
import { signAccessToken, signRefreshToken } from "../utils/jwt.js";
import { comparePassword, hashPassword } from "../utils/password.js";
import { sendEmail } from './sendEmail.js';
//1:login
export const loginService =async (data)=>{
    const {email,password} = data;
    const exitUser = await User.findOne({email:email});
    if(!exitUser) throw new ApiError(404,"Email Không tồn tại");
    const ok  =comparePassword(password,exitUser.password)
    if(!ok) throw new ApiError(404,"Mât khẩu không hợp lệ");
    //  Nếu user inactive → kích hoạt
    if (exitUser.status === "inactive") {
        exitUser.status = "active";
        await exitUser.save();
    }
    // 3. Tạo Access Token
    const access = signAccessToken({
        id:exitUser._id,
        role:exitUser.role
    })
    // 4. Tạo Refresh Token
    const refresh=signRefreshToken({
        id:exitUser._id
    })
    
    await RefreshToken.deleteMany({ user: exitUser._id });
    // 5. Lưu refresh token vào DB (để quản lý logout, chống hack)
    const createRefresh = await RefreshToken.create({
        user: exitUser._id,
        token: refresh,
        expiresAt: new Date(Date.now() + 7 * 86400 * 1000),
    })
    // 6. Trả về FE
    return {
        user :{
            id: exitUser._id,
            full_name: exitUser.full_name,
            email: exitUser.email,
            phone: exitUser.phone,
            role: exitUser.role,
            status:exitUser.status,
            avatar_url: exitUser.avatar_url,
        },
        accessToken: access,
        refreshToken: refresh,
    }
}
//forgot_password
export const forgotPasswordService=async(email)=>{
    const exitUser= await User.findOne({email:email});
    if(!exitUser) throw new ApiError(404,"Email không tồn tại");
    const token =crypto.randomBytes(32).toString("hex");
    exitUser.reset_token = token;
    exitUser.reset_token_expires = Date.now() + 15 * 60 * 1000; // 15 phút
    await exitUser.save();
    const resetLink = `http://localhost:3000/reset-password?token=${token}`;
    
    await sendEmail({
        to: email,
        subject: "Đặt lại mật khẩu",
       html: `
   <!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Đặt lại mật khẩu</title>

    <style>
        body { margin:0; padding:0; background:#f4f4f4; font-family:Arial, sans-serif; }
        table { border-collapse: collapse; }
        img { border:0; display:block; max-width:100%; }

        .btn {
            background:#4F46E5;
            color:#fff !important;
            padding:14px 24px;
            border-radius:6px;
            text-decoration:none;
            font-size:16px;
            font-weight:bold;
            display:inline-block;
        }

        @media only screen and (max-width:600px) {
            .container { width:100% !important; }
            .content { padding:20px !important; }
        }
    </style>
</head>

<body>

<table width="100%" cellpadding="0" cellspacing="0" bgcolor="#f4f4f4" style="padding:30px 0;">
    <tr>
        <td align="center">

            <table width="600" bgcolor="#ffffff" class="container" style="border-radius:10px; overflow:hidden; box-shadow:0 4px 10px rgba(0,0,0,0.05);">

                <!-- Header -->
                <tr>
                    <td align="center" style="padding:20px; background:#111827;">
                  <a href="https://ibb.co/b5h6Xzsz"><img src="https://i.ibb.co/8g3m96r6/ima.png" alt="ima" border="0" /></a>
                    </td>
                </tr>

                <!-- Content -->
                <tr>
                    <td class="content" style="padding:40px 30px;">
                        <h2 style="margin:0 0 20px; color:#111827; font-size:24px;">
                            Yêu cầu đặt lại mật khẩu
                        </h2>

                        <p style="font-size:16px; color:#4B5563; line-height:1.6;">
                            Xin chào bạn,<br><br>
                            Chúng tôi nhận được yêu cầu đặt lại mật khẩu cho tài khoản của bạn.
                            Nếu bạn thực hiện yêu cầu này, vui lòng nhấn nút bên dưới:
                        </p>

                        <div style="text-align:center; margin:30px 0;">
                            <a href="${resetLink}" class="btn">ĐẶT LẠI MẬT KHẨU</a>
                        </div>

                        <p style="font-size:16px; color:#4B5563;">
                            Liên kết có hiệu lực trong <strong>15 phút</strong>.
                        </p>
                    </td>
                </tr>

            </table>

        </td>
    </tr>
</table>

</body>
</html>
    `,
    });
    return "Đã gửi email reset mật khẩu";
}
//reset_password

export const resetPasswordService =async (token,newPassword)=>{
    const exitUser = await User.findOne({
        reset_token: token,
        reset_token_expires: { $gt: Date.now() },
    });
    if (!exitUser) throw new ApiError(400, "Token không hợp lệ hoặc đã hết hạn");
    exitUser.password = hashPassword(newPassword);
    exitUser.reset_token = null;
    exitUser.reset_token_expires = null;
    await exitUser.save();
    return "Đổi mật khẩu thành công";
}
//get profile
export const getProfileService =async ()=>{
    
}
//update profile 
export const updateProfileService = async (userId,data,file)=>{
    const { full_name, email, phone, password, role } = data;
     if (!full_name || !email || !phone || !password || !role) {
        throw new ApiError(400, "Vui lòng nhập đầy đủ thông tin bắt buộc");
    }

    // 2. Hash password
    const hashedPassword = hashPassword(password);
    let avatarUrl = file?.path || 
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwk4R-qESlPq8lZz2mn3BcbVVROHU7-WxvU7nKNf1cDBZcOReoDuAnzKYOUBkN4UBGmcY&usqp=CAU";

     const updateData = {
        full_name,
        email,
        password:hashedPassword,
        phone,
        role,
     };
        if (avatarUrl) {
        updateData.avatar_url = avatarUrl;
    }
     const update = await User.findByIdAndUpdate(userId,updateData,{ new: true });

     return update 
}

// refesh tokrn 
export const refreshTokenService = async (refreshToken)=>{
    if (!refreshToken) {
        throw new ApiError(400, "Refresh token là bắt buộc");
    }
    // 1. Tìm refresh token trong DB
    const tokenDoc = await RefreshToken.findOne({ token: refreshToken });
     if (!tokenDoc) {
        throw new ApiError(401, "Refresh token không hợp lệ hoặc đã bị thu hồi");
    }
    // 2. Kiểm tra hạn
    if (tokenDoc.expiresAt < new Date()) {
        // Xoá token hết hạn
        await RefreshToken.deleteOne({ _id: tokenDoc._id });
        throw new ApiError(401, "Refresh token đã hết hạn");
    }
       // 3. Kiểm tra user
    const user = await User.findById(tokenDoc.user);
    if (!user) {
        throw new ApiError(404, "Người dùng không tồn tại");
    }
    // 4. Tạo access token mới
    const newAccessToken = signAccessToken({
        id: user._id,
        role: user.role,
    });

    return {
        access_token: newAccessToken,
    };
}