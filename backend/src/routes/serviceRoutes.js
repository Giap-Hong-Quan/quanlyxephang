import express from 'express'
import { verifyToken } from '../middlewares/authMiddleware.js';
import { createServiceController, deleteServiceController, getAllServiceController, getServiceByIdController, getServiceCountController, updateServiceController } from '../controllers/serviceController.js';
const serviceRouter= express.Router();
/**
 * @swagger
 * /api/service:
 *   post:
 *     summary: Tạo dịch vụ mới
 *     tags: [Service]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - service_code
 *               - service_name
 *             properties:
 *               service_code:
 *                 type: string
 *                 example: DV001
 *               service_name:
 *                 type: string
 *                 example: Cấp số khám bệnh
 *               description:
 *                 type: string
 *                 example: Dịch vụ cấp số tại quầy
 *               status:
 *                 type: string
 *                 enum: [active, inactive]
 *                 example: active
 *     responses:
 *       201:
 *         description: Tạo dịch vụ thành công
 *       400:
 *         description: Thiếu dữ liệu
 *       409:
 *         description: Mã hoặc Tên dịch vụ đã tồn tại
 */

serviceRouter.post("/", verifyToken, createServiceController);
/**
 * @swagger
 * /api/service/count:
 *   get:
 *     summary: Lấy tổng số lượng dịch vụ
 *     tags: [Service]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lấy số lượng dịch vụ thành công
 *         content:
 *           application/json:
 *             example:
 *               status: success
 *               message: Lấy tổng số lượng dịch vụ thành công
 *               data:
 *                 count: 15
 *       401:
 *         description: Không có token hoặc token không hợp lệ
 */

serviceRouter.get("/count", verifyToken, getServiceCountController);
/**
 * @swagger
 * /api/service:
 *   get:
 *     summary: Lấy danh sách dịch vụ (phân trang + tìm kiếm + lọc)
 *     tags: [Service]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         example: 1
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: integer
 *         example: 10
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *         example: active
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         example: DV
 *     responses:
 *       200:
 *         description: Lấy danh sách dịch vụ thành công
 */

serviceRouter.get("/", verifyToken, getAllServiceController);
/**
 * @swagger
 * /api/service/{id}:
 *   get:
 *     summary: Lấy chi tiết dịch vụ theo ID
 *     tags: [Service]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 673efa123987abcd12345678
 *     responses:
 *       200:
 *         description: Lấy chi tiết dịch vụ thành công
 *       404:
 *         description: Không tìm thấy dịch vụ
 */

serviceRouter.get("/:id", verifyToken, getServiceByIdController);
/**
 * @swagger
 * /api/service/{id}:
 *   put:
 *     summary: Cập nhật thông tin dịch vụ
 *     tags: [Service]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 673efa123987abcd12345678
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               service_code:
 *                 type: string
 *                 example: DV002
 *               service_name:
 *                 type: string
 *                 example: Dịch vụ cấp số ưu tiên
 *               description:
 *                 type: string
 *                 example: Cập nhật mô tả dịch vụ
 *               status:
 *                 type: string
 *                 enum: [active, inactive]
 *                 example: active
 *     responses:
 *       200:
 *         description: Cập nhật dịch vụ thành công
 *       404:
 *         description: Không tìm thấy dịch vụ
 *       409:
 *         description: Mã hoặc Tên dịch vụ đã tồn tại
 */

serviceRouter.put("/:id", verifyToken, updateServiceController);
/**
 * @swagger
 * /api/service/{id}:
 *   delete:
 *     summary: Xóa dịch vụ theo ID
 *     tags: [Service]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 673efa123987abcd12345678
 *     responses:
 *       200:
 *         description: Xóa dịch vụ thành công
 *       404:
 *         description: Không tìm thấy dịch vụ
 */

serviceRouter.delete("/:id", verifyToken, deleteServiceController);
export default serviceRouter