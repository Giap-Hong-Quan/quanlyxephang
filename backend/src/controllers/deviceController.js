import Device from "../models/Device.js";
import { createDeviceService, deleteDeviceService, getAllDeviceService, getDeviceByIdService, updateDeviceService } from "../services/deviceService.js";
import { success } from "../utils/success.js";

export const createDeviceController = async (req, res, next) => {
    try {
        const { device_code, device_name, ip_address, status } = req.body;
        //  Check trống (Bad Request)
        if (!device_code || !device_name || !ip_address) {
            return res.status(400).json({ 
                message: "Vui lòng nhập đầy đủ " 
            });
        }
        // Check định dạng IP bằng Regex (giống trong Model để báo lỗi sớm)
        const ipRegex = /^(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}$/;
        if (!ipRegex.test(ip_address)) {
            return res.status(400).json({ 
                message: "Định dạng địa chỉ IP không hợp lệ" 
            });
        }
        const result = await createDeviceService({ device_code, device_name, ip_address, status });
        success(res, result, "Thêm thiết bị thành công", 201);
    } catch (error) { next(error); }
};
export const deleteDeviceController = async (req, res, next) => {
    try {
        const result = await deleteDeviceService(req.params.id);
        success(res, result, "Xóa thiết bị thành công",200);
    } catch (error) {
         next(error);
    }
};
export const getDeviceByIdController = async (req, res, next) => {
    try {
        const result = await getDeviceByIdService(req.params.id);
        success(res, result, "Lấy thông tin thiết bị thành công",200);
    } catch (error) { next(error); }
};
export const getAllDeviceController = async (req, res, next) => {
    try {
        const { page, pageSize,status, search } = req.query;
        const result = await getAllDeviceService(page, pageSize,{status, search});
        success(res, result, "Lấy danh sách thiết bị thành công",200);
    } catch (error) { next(error); }
};
export const updateDeviceController = async (req, res, next) => {
    try {
         const {device_code, device_name, ip_address, status } = req.body;
        if (!device_code || !device_name || !ip_address) {
            return res.status(400).json({
                message: "Vui lòng nhập đầy đủ thông tin thiết bị"
            });
        }

        // Check định dạng IP
        const ipRegex = /^(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}$/;
        if (!ipRegex.test(ip_address)) {
            return res.status(400).json({
                message: "Định dạng địa chỉ IP không hợp lệ"
            });
        }
        // Check status hợp lệ (chỉ cho phép 2 trạng thái)
        const validStatus = ["active", "inactive"];
        if (status && !validStatus.includes(status)) {
            return res.status(400).json({
                message: "Trạng thái không hợp lệ "
            });
        }
        const result = await updateDeviceService(req.params.id, req.body);
        success(res, result, "Cập nhật thiết bị thành công",200);
    } catch (error) { next(error); }
};
export const getDeviceCountController = async (req, res, next) => {
    try {
        const count = await Device.countDocuments();
        success(res, { count }, "Lấy số lượng thiết bị thành công", 200);
    } catch (error) { next(error); }
};
