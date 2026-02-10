import rateLimit from "express-rate-limit"
// Giới hạn login: 5 lần / 1 phút / 1 IP
export const loginLimiter = rateLimit({
    windowMs: 60 * 1000,     // 1 phút (Khoảng thời gian tính số request)
    max: 5,                  // Tối đa 5 request(Số lượng request tối đa trong khoảng thời gian)
    message: {
        success: false,
        message: "Bạn đăng nhập quá nhiều lần, vui lòng thử lại sau 1 phút."
    },
    standardHeaders: true,   // Hiển thị rate limit vào header
    legacyHeaders: false,    //Ẩn header cũ X-RateLimit-*
});