import express from 'express'
import { upload } from '../middlewares/uploadMiddleware.js';
import { createUserController, deleteUserController, getAllUserController, getUserByIdController, getUserCountController, updateUserController } from '../controllers/userController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';
const userRouter= express.Router();
/**
 * @openapi
 * /api/user:
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
userRouter.post('/',verifyToken,upload.single("avatar_url"),createUserController)
/**
 * @swagger
 * /api/user/count:
 *   get:
 *     summary: Lấy tổng số lượng người dùng
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lấy số lượng người dùng thành công
 *         content:
 *           application/json:
 *             example:
 *               status: success
 *               message: Lấy số lượng người dùng thành công
 *               data:
 *                 total: 120
 *       401:
 *         description: Không có token hoặc token không hợp lệ
 */

userRouter.get('/count',verifyToken,getUserCountController)
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
/**
 * @openapi
 * /api/user/{id}:
 *   get:
 *     tags:
 *       - User
 *     summary: Lấy thông tin chi tiết người dùng theo ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: 67a1f3a8b9c4d55d129f4e91
 *         description: ID của người dùng
 *     responses:
 *       200:
 *         description: Lấy chi tiết người dùng thành công
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
 *                   example: Lấy chi tiết người dùng thành công
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 67a1f3a8b9c4d55d129f4e91
 *                     username:
 *                       type: string
 *                       example: hoang123
 *                     full_name:
 *                       type: string
 *                       example: Nguyễn Văn Hoàng
 *                     email:
 *                       type: string
 *                       example: hoang@gmail.com
 *                     avatar_url:
 *                       type: string
 *                       example: https://res.cloudinary.com/.../avatar.png
 *                     status:
 *                       type: string
 *                       example: active
 *                     role:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                           example: 673eff3397fa23abc1234bbb
 *                         name:
 *                           type: string
 *                           example: Admin
 *       404:
 *         description: Không tìm thấy người dùng này
 *       401:
 *         description: Chưa đăng nhập
 */
userRouter.get('/:id',verifyToken,getUserByIdController)
/**
 * @openapi
 * /api/user/{id}:
 *   delete:
 *     tags:
 *       - User
 *     summary: Xóa người dùng theo ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: 67a1f3a8b9c4d55d129f4e91
 *         description: ID của người dùng cần xóa
 *     responses:
 *       200:
 *         description: Xóa người dùng thành công
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
 *                   example: Xóa người dùng thành công
 *                 data:
 *                   type: string
 *                   nullable: true
 *                   example: null
 *       404:
 *         description: Người dùng không tồn tại hoặc đã bị xóa trước đó
 *       401:
 *         description: Chưa đăng nhập
 *       403:
 *         description: Không có quyền admin
 */
userRouter.delete('/:id',verifyToken,deleteUserController)
/**
 * @openapi
 * /api/user/{id}:
 *   put:
 *     tags:
 *       - User
 *     summary: Cập nhật thông tin người dùng
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của user cần cập nhật
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: hoang123
 *               full_name:
 *                 type: string
 *                 example: Nguyễn Văn B
 *               email:
 *                 type: string
 *                 example: newemail@gmail.com
 *               password:
 *                 type: string
 *                 example: newpassword123
 *               role:
 *                 type: string
 *                 description: ObjectId của role
 *                 example: 673eff3397fa23abc1234bbb
 *               status:
 *                 type: string
 *                 enum: [active, inactive]
 *                 example: active
 *               avatar_url:
 *                 type: string
 *                 format: binary
 *                 description: Ảnh đại diện mới (tùy chọn)
 *     responses:
 *       200:
 *         description: Cập nhật người dùng thành công
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
 *                   example: Cập nhật thông tin thành công
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 67a1f3a8b9c4d55d129f4e91
 *                     username:
 *                       type: string
 *                       example: hoang123
 *                     full_name:
 *                       type: string
 *                       example: Nguyễn Văn B
 *                     email:
 *                       type: string
 *                       example: newemail@gmail.com
 *                     avatar_url:
 *                       type: string
 *                       example: https://res.cloudinary.com/.../avatar.png
 *                     status:
 *                       type: string
 *                       example: active
 *                     role:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                           example: 673eff3397fa23abc1234bbb
 *                         name:
 *                           type: string
 *                           example: Admin
 *       400:
 *         description: Dữ liệu không hợp lệ
 *       401:
 *         description: Chưa đăng nhập
 *       403:
 *         description: Không có quyền admin
 *       404:
 *         description: Không tìm thấy người dùng
 *       409:
 *         description: Username hoặc Email đã tồn tại
 */
userRouter.put('/:id', verifyToken, upload.single("avatar_url"),updateUserController);
export default userRouter;
