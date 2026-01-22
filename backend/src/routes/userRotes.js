import express from 'express'
import { upload } from '../middlewares/uploadMiddleware.js';
import { createUserController, getAllUserController } from '../controllers/userController.js';
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
 *               - username
 *               - full_name
 *               - email
 *               - password
 *               - role
 *               - file
 *             properties:
 *               username:
 *                 type: string
 *                 example: hoang123
 *               full_name:
 *                 type: string
 *                 example: Nguyễn Văn A
 *               email:
 *                 type: string
 *                 example: user@gmail.com
 *               password:
 *                 type: string
 *                 example: user123
 *               role:
 *                 type: string
 *                 description: ObjectId của role
 *                 example: 673eff3397fa23abc1234bbb
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: Ảnh đại diện tải lên
 *     responses:
 *       201:
 *         description: Đăng ký thành công
 *       400:
 *         description: Thiếu dữ liệu hoặc không có ảnh đại diện
 *       401:
 *         description: Chưa đăng nhập
 *       403:
 *         description: Không có quyền admin
 *       409:
 *         description: Tên hoặc Email này đã tồn tại
 */
userRouter.post('/create',verifyToken,upload.single("avatar_url"),createUserController)
/**
 * @openapi
 * /api/user:
 *   get:
 *     tags:
 *       - User
 *     summary: Lấy danh sách user (có phân trang và lọc)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 1
 *         description: Số trang muốn lấy (mặc định = 1)
 *       
 *       - in: query
 *         name: sizePage
 *         schema:
 *           type: integer
 *           example: 10
 *         description: Số lượng user trong 1 trang (mặc định = 10)
 *       
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *           example: hoang
 *         description: Tìm kiếm theo username, full_name hoặc email (regex, không phân biệt hoa thường)
 *       
 *       - in: query
 *         name: roleId
 *         schema:
 *           type: string
 *           example: 673eff3397fa23abc1234bbb
 *         description: Lọc theo ID role
 *     
 *     responses:
 *       200:
 *         description: Lấy danh sách user thành công
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
 *                   example: Lấy danh sách user thành công
 *                 data:
 *                   type: object
 *                   properties:
 *                     users:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                             example: 67a1f3a8b9c4d55d129f4e91
 *                           username:
 *                             type: string
 *                             example: hoang123
 *                           full_name:
 *                             type: string
 *                             example: Nguyễn Văn Hoàng
 *                           email:
 *                             type: string
 *                             example: hoang@gmail.com
 *                           avatar_url:
 *                             type: string
 *                             example: https://res.cloudinary.com/.../avatar.png
 *                           status:
 *                             type: string
 *                             example: active
 *                           role:
 *                             type: object
 *                             properties:
 *                               _id:
 *                                 type: string
 *                                 example: 673eff3397fa23abc1234bbb
 *                               name:
 *                                 type: string
 *                                 example: Admin
 *                     currentPage:
 *                       type: integer
 *                       example: 1
 *                     limit:
 *                       type: integer
 *                       example: 10
 *                     totalPages:
 *                       type: integer
 *                       example: 5
 *                     totalCount:
 *                       type: integer
 *                       example: 47
 *       401:
 *         description: Chưa đăng nhập
 *       403:
 *         description: Không có quyền admin
 */
userRouter.get('/',verifyToken,getAllUserController)

export default userRouter;

// authRouter.put('/:id',uploadSingle("avatar_url"),updateProfileController)