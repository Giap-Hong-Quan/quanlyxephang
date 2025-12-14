import express from 'express';
import { forgotPasswordController, loginController, logoutController, refreshTokenController, resetPasswordController } from '../controllers/authController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';

const authRouter = express.Router();
/**
 * @openapi
 * /api/auth/login:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Đăng nhập hệ thống
 *     description: API đăng nhập, trả về Access Token và Refresh Token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: admin@gmail.com
 *               password:
 *                 type: string
 *                 example: admin
 *     responses:
 *       200:
 *         description: Đăng nhập thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: 673efd9b97f234abc1234aaa
 *                     full_name:
 *                       type: string
 *                       example: Admin
 *                     email:
 *                       type: string
 *                       example: admin@gmail.com
 *                     phone:
 *                       type: string
 *                       example: "0987654321"
 *                     role:
 *                       type: string
 *                       example: 673eff3397fa23abc1234bbb
 *                     status:
 *                       type: string
 *                       example: active
 *                 access_token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *                 refresh_token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       400:
 *         description: Sai email hoặc mật khẩu
 *       500:
 *         description: Lỗi server
 */
authRouter.post('/login',loginController)
/**
 * @openapi
 * /api/auth/forgot-password:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Gửi email đặt lại mật khẩu
 *     description: Người dùng nhập email, hệ thống sẽ gửi email chứa đường dẫn reset mật khẩu kèm token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 example: giaphongquan2407@gmail.com
 *     responses:
 *       200:
 *         description: Gửi email thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Đã gửi email reset mật khẩu
 *       404:
 *         description: Email không tồn tại
 *       500:
 *         description: Lỗi server
 */
authRouter.post("/forgot-password", forgotPasswordController);
/**
 * @openapi
 * /api/auth/reset-password:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Đặt lại mật khẩu mới
 *     description: API nhận token và mật khẩu mới, kiểm tra token hợp lệ và cập nhật mật khẩu.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - token
 *               - new_password
 *             properties:
 *               token:
 *                 type: string
 *                 example: dsk0f3jsdf03j23k40dfjsd09
 *               new_password:
 *                 type: string
 *                 example: 123456789
 *     responses:
 *       200:
 *         description: Đặt lại mật khẩu thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Đặt lại mật khẩu thành công
 *       400:
 *         description: Token không hợp lệ hoặc đã hết hạn
 *       500:
 *         description: Lỗi server
 */
authRouter.post("/reset-password", resetPasswordController);

/**
 * @openapi
 * /api/auth/refresh-token:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Tạo access token mới
 *     description: |
 *       API dùng **refresh token được lưu trong httpOnly cookie** để cấp access token mới.
 *
 *       ⚠️ Lưu ý:
 *       - FE **KHÔNG gửi refresh token trong body**
 *       - Trình duyệt sẽ tự động gửi cookie `refresh_token`
 *       - Khi FE gọi API này **phải bật `withCredentials: true`**
 *
 *       Ví dụ FE (Axios):
 *       ```js
 *       axios.post(
 *         "http://localhost:5003/api/auth/refresh-token",
 *         {},
 *         { withCredentials: true }
 *       );
 *       ```
 *     responses:
 *       200:
 *         description: Tạo access token mới thành công
 *       401:
 *         description: Refresh token không hợp lệ hoặc đã hết hạn
 */
authRouter.post("/refresh-token", refreshTokenController);
/**
 * @openapi
 * /api/auth/logout:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Đăng xuất và thu hồi refresh token
 *     description: Xóa refresh token trong database để kết thúc phiên đăng nhập.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Đăng xuất thành công
 *       401:
 *         description: Không có token hoặc token không hợp lệ
 */
authRouter.post('/logout',verifyToken,logoutController)
export default authRouter;
