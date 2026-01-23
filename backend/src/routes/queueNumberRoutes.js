import express from 'express'
import { createQueueNumberController, getQueueNumberByIdController } from '../controllers/queueNumberController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';
const queueNumberRouter= express.Router();
/**
 * @swagger
 * /api/queue:
 *   post:
 *     summary: Tạo số thứ tự mới (Queue Number)
 *     description: Chọn dịch vụ, nhập tên khách hàng và thiết bị để tạo số thứ tự mới trong ngày.
 *     tags:
 *       - Queue Number
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - customer_name
 *               - serviceId
 *               - deviceId
 *             properties:
 *               customer_name:
 *                 type: string
 *                 example: "Nguyễn Văn A"
 *               serviceId:
 *                 type: string
 *                 example: "6770a81d12dd4c3d7c9f11a2"
 *               deviceId:
 *                 type: string
 *                 example: "67a1b823932f2ee489050001"
 *     responses:
 *       201:
 *         description: Tạo số thứ tự thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: "67ac0b1d99e4d1d660d7c321"
 *                 queueNumber:
 *                   type: string
 *                   example: "KHAM0001"
 *                 customer_name:
 *                   type: string
 *                   example: "Nguyễn Văn A"
 *                 service:
 *                   type: object
 *                   properties:
 *                     service_name:
 *                       type: string
 *                       example: "Khám tổng quát"
 *                 device:
 *                   type: object
 *                   properties:
 *                     device_name:
 *                       type: string
 *                       example: "Kiosk 01"
 *                 expiry_time:
 *                   type: string
 *                   format: date-time
 *                   example: "2026-01-23T23:59:59.999Z"
 *                 status:
 *                   type: string
 *                   example: "waiting"
 *       404:
 *         description: Dịch vụ không tồn tại
 *       500:
 *         description: Lỗi server
 */

queueNumberRouter.post("/",verifyToken,createQueueNumberController)
/**
 * @swagger
 * /api/queue/{id}:
 *   get:
 *     summary: Lấy chi tiết một số thứ tự (Queue Number)
 *     description: Trả về thông tin chi tiết của số thứ tự, bao gồm dịch vụ và thiết bị đã populate.
 *     tags:
 *       - Queue Number
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID của Queue Number
 *         schema:
 *           type: string
 *           example: "67ac0b1d99e4d1d660d7c321"
 *     responses:
 *       200:
 *         description: Lấy chi tiết thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: "67ac0b1d99e4d1d660d7c321"
 *                 queueNumber:
 *                   type: string
 *                   example: "KHAM0021"
 *                 customer_name:
 *                   type: string
 *                   example: "Nguyễn Văn A"
 *                 service:
 *                   type: object
 *                   properties:
 *                     service_name:
 *                       type: string
 *                       example: "Khám tổng quát"
 *                 device:
 *                   type: object
 *                   properties:
 *                     device_name:
 *                       type: string
 *                       example: "Kiosk 01"
 *                 expiry_time:
 *                   type: string
 *                   example: "2026-01-23T23:59:59.999Z"
 *                 status:
 *                   type: string
 *                   example: "waiting"
 *       404:
 *         description: Không tìm thấy số thứ tự
 *       500:
 *         description: Lỗi server
 */

queueNumberRouter.get("/:id",getQueueNumberByIdController)

export default queueNumberRouter