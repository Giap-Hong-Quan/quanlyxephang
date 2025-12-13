import express from 'express'
import { uploadSingle } from '../middlewares/uploadMiddleware.js';
import { createUserController } from '../controllers/userController.js';
const userRouter= express.Router();
/**
 * @openapi
 * /api/user/create:
 *   post:
 *     tags:
 *       - User
 *     summary: Tạo tài khoản mới 
 *     description: API tạo tài khoản mới. Trả về thông tin user sau khi tạo (không bao gồm mật khẩu).
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - full_name
 *               - email
 *               - phone
 *               - password
 *               - role
 *             properties:
 *               full_name:
 *                 type: string
 *                 example: Nguyễn Văn A
 *               email:
 *                 type: string
 *                 example: user@gmail.com
 *               phone:
 *                 type: string
 *                 example: "0987654321"
 *               password:
 *                 type: string
 *                 example: user123
 *               role:
 *                 type: string
 *                 example: 673eff3397fa23abc1234bbb
 *               avatar_url:
 *                 type: string
 *                 example: https://i.pravatar.cc/300
 *     responses:
 *       201:
 *         description: Đăng ký thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Đăng ký thành công
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: 675abf3497fa23abc8888fff
 *                     full_name:
 *                       type: string
 *                       example: Nguyễn Văn A
 *                     email:
 *                       type: string
 *                       example: user@gmail.com
 *                     phone:
 *                       type: string
 *                       example: "0987654321"
 *                     role:
 *                       type: string
 *                       example: 673eff3397fa23abc1234bbb
 *                     status:
 *                       type: string
 *                       example: inactive
 *                     avatar_url:
 *                       type: string
 *                       example: https://i.pravatar.cc/300
 *       400:
 *         description: Dữ liệu không hợp lệ hoặc email đã tồn tại
 *       500:
 *         description: Lỗi server
 */
userRouter.post('/create',uploadSingle("avatar_url"),createUserController)
export default userRouter;