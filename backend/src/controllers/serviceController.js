import Service from "../models/Service.js";
import { createServiceItemService, deleteServiceItemService, getAllServiceItemsService, getServiceItemByIdService, updateServiceItemService } from "../services/serviceService.js";
import { success } from "../utils/success.js";

export const createServiceController = async (req, res, next) => {
    try {
        const { service_code, service_name, description, status } = req.body;
        if (!service_code || !service_name) {
            return res.status(400).json({ message: "Mã và tên dịch vụ là bắt buộc" });
        }
        const result = await createServiceItemService(req.body);
        success(res, result, "Tạo dịch vụ thành công", 201);
    } catch (error) { next(error); }
};

export const getAllServiceController = async (req, res, next) => {
    try {
        const { page, pageSize, status, search } = req.query;
        const result = await getAllServiceItemsService(page, pageSize, { status, search });
        success(res, result, "Lấy danh sách dịch vụ thành công");
    } catch (error) { next(error); }
};

export const getServiceByIdController = async (req, res, next) => {
    try {
        const result = await getServiceItemByIdService(req.params.id);
        success(res, result, "Lấy chi tiết dịch vụ thành công");
    } catch (error) { next(error); }
};

export const updateServiceController = async (req, res, next) => {
    try {
        const result = await updateServiceItemService(req.params.id, req.body);
        success(res, result, "Cập nhật dịch vụ thành công");
    } catch (error) { next(error); }
};

export const deleteServiceController = async (req, res, next) => {
    try {
    const result=   await deleteServiceItemService(req.params.id);
        success(res, result, "Xóa dịch vụ thành công");
    } catch (error) { next(error); }
};

export const getServiceCountController = async (req, res, next) => {
    try {
        const count = await Service.countDocuments();
        success(res, { count }, "Lấy số dịch vụ thành công", 200);
    } catch (error) {
        next(error);
    }
};
