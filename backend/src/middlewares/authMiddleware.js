import ApiError from "../exceptions/ApiError.js";
import User from "../models/User.js";
import { verifyAccessToken } from "../utils/jwt.js";

export const verifyToken = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            throw new ApiError(401, "Không có token hoặc token không hợp lệ");
        }

        const token = authHeader.split(" ")[1];
        const decoded = verifyAccessToken(token);
         // Tìm user theo id trong token
        const user = await User.findById(decoded.id).select("-password");

        if (!user) throw new ApiError(401, "Người dùng không tồn tại");

        req.user = user; // lưu user vào req
        next();
    } catch (error) {
        next(error);
    }
}