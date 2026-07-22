import { createQueueNumberService, deleteQueueNumberService, getAllQueueNumberService, getQueueNumberByIdService, getQueueOverviewStatsService, getQueueStatsByServiceService, getQueueStatsByTimeService, updateQueueNumberService, updateStatusQueueNumberService } from "../services/queueNumberService.js";
import Device from "../models/Device.js";
import { success } from "../utils/success.js";

export const createQueueNumberController = async (req, res, next) => {
  try {
    let { customer_name, serviceId, deviceId } = req.body;
    if (!customer_name || !serviceId) {
      return res.status(400).json({
        message: "Vui lòng nhập đầy đủ tên khách hàng và dịch vụ"
      });
    }

    // Auto assign active device if deviceId is not explicitly sent
    if (!deviceId) {
      const activeDevice = await Device.findOne({ status: "active" });
      if (activeDevice) {
        deviceId = activeDevice._id;
      } else {
        const anyDevice = await Device.findOne();
        if (anyDevice) deviceId = anyDevice._id;
      }
    }

    const result = await createQueueNumberService({ customer_name, serviceId, deviceId, ...req.body });
    success(res, result, "Cấp số thành công", 201);
  } catch (error) {
    next(error);
  }  
};

export const getQueueNumberByIdController = async (req, res, next) => {
  try {
    const result = await getQueueNumberByIdService(req.params.id);
    success(res, result, "Lấy chi tiết cấp số thành công", 200);
  } catch (error) {
    next(error);
  }
};

export const getAllQueueNumberController = async (req, res, next) => {
  try {
    const { page, pageSize, status, device, fromDate, toDate, keyWord } = req.query;
    if (fromDate && toDate && new Date(fromDate) > new Date(toDate)) {
      return res.status(400).json({
        message: "Ngày bắt đầu phải trước ngày kết thúc"
      });
    }
    const result = await getAllQueueNumberService({ page, pageSize, status, device, fromDate, toDate, keyWord });
    success(res, result, "Lấy danh sách cấp số thành công", 200);  

  } catch (error) {
    next(error);
  }
};

export const updateQueueNumberController = async (req, res, next) => {
  try {
    const result = await updateQueueNumberService(req.params.id, req.body);
    success(res, result, "Cập nhật số thứ tự thành công", 200);
  } catch (error) {
    next(error);
  }   
};

export const deleteQueueNumberController = async (req, res, next) => {
  try {
    const result = await deleteQueueNumberService(req.params.id);
    success(res, result, "Xóa số thứ tự thành công", 200);
  } catch (error) {
    next(error);
  }   
};

export const updateQueueNumberStatusController = async (req, res, next) => {
  try {
    const { status } = req.body;
    if (!status) {
      return res.status(400).json({
        message: "Vui lòng nhập trạng thái mới"
      });
    }       
    const result = await updateStatusQueueNumberService(req.params.id, status);
    success(res, result, "Cập nhật trạng thái số thứ tự thành công", 200);
  } catch (error) {
    next(error);
  }   
};

export const getQueueOverviewStatsController = async (req, res, next) => {
  try {
    const { fromDate, toDate } = req.query;
    const result = await getQueueOverviewStatsService({ fromDate, toDate });
    success(res, result, "Lấy thống kê tổng quan thành công", 200);
  } catch (error) {
    next(error);
  }
};

export const getQueueStatsByServiceController = async (req, res, next) => {
  try {
    const { fromDate, toDate } = req.query;
    const result = await getQueueStatsByServiceService({ fromDate, toDate });
    success(res, result, "Lấy thống kê theo dịch vụ thành công", 200);
  } catch (error) {
    next(error);
  }
};

export const getQueueStatsByTimeController = async (req, res, next) => {
  try {
    const { period, fromDate, toDate } = req.query;
    const result = await getQueueStatsByTimeService({ period, fromDate, toDate });
    success(res, result, "Lấy thống kê theo thời gian thành công", 200);
  } catch (error) {
    next(error);
  }
};