import ApiError from "../exceptions/ApiError.js";
import User from "../models/User.js";
import { verifyAccessToken } from "../utils/jwt.js";
export const verifyToken = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            throw new ApiError(401, "Bạn chưa đăng nhập hoặc phiên làm việc không hợp lệ");
        }
        const token = authHeader.split(" ")[1];
        // Giải mã token
        const decoded = verifyAccessToken(token);
        const user = await User.findById(decoded.id).select("-password -reset_token -reset_token_expires -createdAt -updatedAt -__v").populate({path:"role",select:"name"});
        if (!user) throw new ApiError(404, "Người dùng không tồn tại");
        req.user = user;
        next();
    } catch (error) {
        // Bắt lỗi hết hạn từ JWT
        if (error.name === "TokenExpiredError") {
            return next(new ApiError(401, "Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại"));
        }
        // Bắt lỗi token sai chữ ký hoặc bị sửa đổi
        if (error.name === "JsonWebTokenError") {
            return next(new ApiError(401, "Token không hợp lệ hoặc đã bị chỉnh sửa"));
        }
        next(error);
    }
};
