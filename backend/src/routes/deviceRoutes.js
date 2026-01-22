import express from 'express';
import { createDeviceController, deleteDeviceController, getAllDeviceController, getDeviceByIdController, getDeviceCountController, updateDeviceController } from '../controllers/deviceController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';
const deviceRouter = express.Router();
/**
 * @openapi
 * /api/device:
 *   post:
 *     tags:
 *       - Device
 *     summary: Tạo thiết bị mới
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - device_code
 *               - device_name
 *               - ip_address
 *             properties:
 *               device_code:
 *                 type: string
 *                 example: TB001
 *               device_name:
 *                 type: string
 *                 example: Máy lấy số tự động
 *               ip_address:
 *                 type: string
 *                 example: 192.168.1.10
 *               status:
 *                 type: string
 *                 enum: [active, inactive]
 *                 default: active
 *                 example: active
 *     responses:
 *       201:
 *         description: Thêm thiết bị thành công
 *       400:
 *         description: Thiếu dữ liệu hoặc IP không hợp lệ
 *       401:
 *         description: Chưa đăng nhập
 *       409:
 *         description: Mã thiết bị đã tồn tại
 */
deviceRouter.post("/",verifyToken,createDeviceController)
/**
 * @swagger
 * /api/device/count:
 *   get:
 *     summary: Lấy tổng số lượng thiết bị
 *     tags: [Device]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lấy số lượng thiết bị thành công
 *         content:
 *           application/json:
 *             example:
 *               status: success
 *               message: Lấy số lượng thiết bị thành công
 *               data:
 *                 count: 42
 *       401:
 *         description: Không có token hoặc token không hợp lệ
 */
deviceRouter.get("/count", verifyToken, getDeviceCountController);
/**
 * @openapi
 * /api/device:
 *   get:
 *     tags:
 *       - Device
 *     summary: Lấy danh sách thiết bị (phân trang, tìm kiếm, lọc trạng thái)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 1
 *         description: Trang hiện tại (mặc định = 1)
 *
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: integer
 *           example: 10
 *         description: Số lượng thiết bị trong 1 trang (mặc định = 10)
 *
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [active, inactive]
 *           example: active
 *         description: Lọc theo trạng thái hoạt động của thiết bị
 *
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *           example: DV00
 *         description: Tìm kiếm theo mã thiết bị hoặc tên thiết bị (không phân biệt hoa thường)
 *
 *     responses:
 *       200:
 *         description: Lấy danh sách thiết bị thành công
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
 *                   example: Lấy danh sách thiết bị thành công
 *                 data:
 *                   type: object
 *                   properties:
 *                     devices:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                             example: 67a2f8b1c3f4a12bcd9e1234
 *                           device_code:
 *                             type: string
 *                             example: DV001
 *                           device_name:
 *                             type: string
 *                             example: Máy cấp số tự động
 *                           ip_address:
 *                             type: string
 *                             example: 192.168.1.10
 *                           status:
 *                             type: string
 *                             example: active
 *                           createdAt:
 *                             type: string
 *                             example: 2026-01-20T10:15:30.123Z
 *                           updatedAt:
 *                             type: string
 *                             example: 2026-01-20T10:18:45.789Z
 *                     currentPage:
 *                       type: integer
 *                       example: 1
 *                     limit:
 *                       type: integer
 *                       example: 10
 *                     totalPages:
 *                       type: integer
 *                       example: 5
 *                     totalDevices:
 *                       type: integer
 *                       example: 42
 *       401:
 *         description: Chưa đăng nhập
 */
deviceRouter.get("/",verifyToken,getAllDeviceController)
/**
 * @openapi
 * /api/device/{id}:
 *   get:
 *     tags:
 *       - Device
 *     summary: Lấy chi tiết thiết bị theo ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: 67a2f8b1c3f4a12bcd9e1234
 *         description: ID của thiết bị cần lấy thông tin
 *     responses:
 *       200:
 *         description: Lấy thông tin thiết bị thành công
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
 *                   example: Lấy chi tiết thiết bị thành công
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 67a2f8b1c3f4a12bcd9e1234
 *                     device_code:
 *                       type: string
 *                       example: DV001
 *                     device_name:
 *                       type: string
 *                       example: Máy cấp số tự động A1
 *                     ip_address:
 *                       type: string
 *                       example: 192.168.1.10
 *                     status:
 *                       type: string
 *                       example: active
 *                     createdAt:
 *                       type: string
 *                       example: 2026-01-20T10:15:30.123Z
 *                     updatedAt:
 *                       type: string
 *                       example: 2026-01-20T10:18:45.789Z
 *       400:
 *         description: ID không hợp lệ
 *       401:
 *         description: Chưa đăng nhập
 *       404:
 *         description: Không tìm thấy thiết bị
 */
deviceRouter.get("/:id",verifyToken,getDeviceByIdController)
/**
 * @openapi
 * /api/device/{id}:
 *   delete:
 *     tags:
 *       - Device
 *     summary: Xóa thiết bị theo ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID của thiết bị
 *         schema:
 *           type: string
 *           example: 67a1c8b1d23f4a001234abcd
 *     responses:
 *       200:
 *         description: Xóa thiết bị thành công
 *       400:
 *         description: ID không hợp lệ
 *       401:
 *         description: Chưa đăng nhập
 *       404:
 *         description: Không tìm thấy thiết bị
 */
deviceRouter.delete("/:id",verifyToken,deleteDeviceController)
/**
 * @openapi
 * /api/device/{id}:
 *   put:
 *     tags:
 *       - Device
 *     summary: Cập nhật thông tin thiết bị
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của thiết bị cần cập nhật
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - device_code
 *               - device_name
 *               - ip_address
 *               - status
 *             properties:
 *               device_code:
 *                 type: string
 *                 example: DEV_001
 *               device_name:
 *                 type: string
 *                 example: Máy bốc số tầng 1
 *               ip_address:
 *                 type: string
 *                 example: 192.168.1.10
 *               status:
 *                 type: string
 *                 enum: [active, inactive]
 *                 example: active
 *     responses:
 *       200:
 *         description: Cập nhật thiết bị thành công
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
 *                   example: Cập nhật thiết bị thành công
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 67a1c23f98f5d31ae98c12de
 *                     device_code:
 *                       type: string
 *                       example: DEV_001
 *                     device_name:
 *                       type: string
 *                       example: Máy bốc số tầng 1
 *                     ip_address:
 *                       type: string
 *                       example: 192.168.1.10
 *                     status:
 *                       type: string
 *                       example: active
 *                     createdAt:
 *                       type: string
 *                       example: 2026-01-10T10:00:00.000Z
 *                     updatedAt:
 *                       type: string
 *                       example: 2026-01-21T08:30:00.000Z
 *       400:
 *         description: Dữ liệu không hợp lệ (thiếu hoặc sai định dạng)
 *       401:
 *         description: Chưa đăng nhập
 *       404:
 *         description: Không tìm thấy thiết bị
 *       409:
 *         description: Mã thiết bị đã tồn tại
 */
deviceRouter.put("/:id",verifyToken,updateDeviceController)

export default deviceRouter;