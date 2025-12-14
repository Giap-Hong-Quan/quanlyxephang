import express from 'express'
import { uploadSingle } from '../middlewares/uploadMiddleware.js';
import { createUserController, getAllUserController, getProfileController } from '../controllers/userController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';
const userRouter= express.Router();
/**
 * @openapi
 * /api/user/create:
 *   post:
 *     tags:
 *       - User
 *     summary: Admin tạo tài khoản mới
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
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
 *                 format: binary
 *     responses:
 *       201:
 *         description: Tạo user thành công
 *       401:
 *         description: Chưa đăng nhập
 *       403:
 *         description: Không có quyền admin
 */
userRouter.post('/create',verifyToken,uploadSingle("avatar_url"),createUserController)
/**
 * @openapi
 * /api/user/profile:
 *   get:
 *     tags:
 *       - User
 *     summary: Xem thông tin cá nhân
 *     description: API lấy thông tin user hiện tại (cần JWT Access Token)
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lấy thông tin thành công
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
 *                   example: Lấy thông tin người dùng thành công
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: 673efd9b97f234abc1234aaa
 *                     full_name:
 *                       type: string
 *                       example: Nguyễn Văn A
 *                     email:
 *                       type: string
 *                       example: nguyenvana@gmail.com
 *                     phone:
 *                       type: string
 *                       example: "098888888"
 *                     role:
 *                       type: string
 *                       example: staff
 *                     status:
 *                       type: string
 *                       example: active
 *       401:
 *         description: Không có token hoặc token hết hạn
 */
userRouter.get('/profile',verifyToken,getProfileController)
/**
 * @openapi
 * /api/user:
 *   get:
 *     tags:
 *       - User
 *     summary: Lấy danh sách người dùng
 *     description: |
 *       API lấy danh sách tất cả người dùng trong hệ thống.
 *       - Yêu cầu đăng nhập (JWT Access Token).
 *       - Hỗ trợ phân trang, tìm kiếm và lọc theo trạng thái.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 1
 *         description: Trang hiện tại
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           example: 10
 *         description: Số bản ghi trên mỗi trang
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *           example: admin
 *         description: Tìm kiếm theo tên, email hoặc số điện thoại
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [active, inactive]
 *         description: Lọc theo trạng thái người dùng
 *     responses:
 *       200:
 *         description: Lấy danh sách người dùng thành công
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
 *                   example: Lấy danh sách người dùng thành công
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: 673efd9b97f234abc1234aaa
 *                       full_name:
 *                         type: string
 *                         example: Nguyễn Văn A
 *                       email:
 *                         type: string
 *                         example: nguyenvana@gmail.com
 *                       phone:
 *                         type: string
 *                         example: "0988888888"
 *                       role:
 *                         type: string
 *                         example: admin
 *                       status:
 *                         type: string
 *                         example: active
 *                       avatar_url:
 *                         type: string
 *                         example: https://i.pravatar.cc/300
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     page:
 *                       type: integer
 *                       example: 1
 *                     limit:
 *                       type: integer
 *                       example: 10
 *                     totalPages:
 *                       type: integer
 *                       example: 5
 *                 count:
 *                   type: integer
 *                   example: 42
 *                 countActive:
 *                   type: integer
 *                   example: 30
 *                 countInactive:
 *                   type: integer
 *                   example: 12
 *       401:
 *         description: Không có token hoặc token không hợp lệ
 *       500:
 *         description: Lỗi server
 */
userRouter.get('/',verifyToken,getAllUserController)
export default userRouter;

// authRouter.put('/:id',uploadSingle("avatar_url"),updateProfileController)