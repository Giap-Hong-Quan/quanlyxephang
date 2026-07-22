import ApiError from "../exceptions/ApiError.js";
import QueueNumber from "../models/QueueNumber.js";
import Service from "../models/Service.js";
import Device from "../models/Device.js";
import User from "../models/User.js";
import { io } from "../socket.js";

//create
export const createQueueNumberService = async ({ customer_name, serviceId, deviceId }) => {
    // 1. Check dịch vụ
    const service = await Service.findById(serviceId);
    if (!service) throw new ApiError(404, "Dịch vụ không tồn tại");
    const prefix = service.service_code; // Ví dụ: KHAM
    // 2. Lấy số cuối cùng theo prefix
    const lastQueue = await QueueNumber.findOne({
        queueNumber: { $regex: `^${prefix}` }
    }).sort({ queueNumber: -1 });  // Lấy thằng lớn nhất
    // 3. Sinh số mới
    let nextCount = 1;
    if (lastQueue) {
        const lastCount = parseInt(lastQueue.queueNumber.replace(prefix, ""));
        nextCount = lastCount + 1;
    }
    const nextQueueNumber = `${prefix}${nextCount.toString().padStart(4, "0")}`;
    // 4. Hạn sử dụng (cuối ngày)
    const expiryTime = new Date();
    expiryTime.setHours(23, 59, 59, 999);
    // 5. Tạo số thứ tự
    const newNumber = await QueueNumber.create({
        queueNumber: nextQueueNumber,
        customer_name,
        service: serviceId,
        device: deviceId,
        expiry_time: expiryTime,
        status: "waiting"
    });
    io.emit("new_queue_number", {
        _id: newNumber._id,
        queueNumber: newNumber.queueNumber
    });
    return await newNumber.populate([
        { path: "service", select: "service_name" },
        { path: "device", select: "device_name" }
    ]);
};
export const getQueueNumberByIdService =async(id)=>{
    const queue = await QueueNumber.findById(id)
    .populate([
        {path:"service",select:"service_name"},
        { path: "device", select: "device_name " }
    ]);
    if(!queue){
        throw new ApiError(404,"Lấy chi tiết cấp số thất bại")
    }
    return queue;
}
export const getAllQueueNumberService = async ({
  page = 1,
  pageSize = 10,
  status,
  device,
  fromDate,
  toDate,
  keyWord
}) => {

  const queries = {};

  // page, pageSize hợp lệ
  const currentPage = Math.max(1, Number(page));
  const limit = Math.max(1, Number(pageSize));
  console.log(">>> PAGE:", currentPage, "LIMIT:", limit);
  // Filter status
  if (status) {
    queries.status = status;
  }
  // Filter device
  if (device) {
    queries.device = device;
  }
  // Filter theo ngày
  if (fromDate && toDate) {
    const start = new Date(fromDate);
    const end = new Date(toDate);
    if (!isNaN(start) && !isNaN(end)) {
      queries.createdAt = {
        $gte: start,
        $lte: end
      };
    }
  }
  // Search keyword
  if (keyWord) {
    queries.$or = [
      { queueNumber: { $regex: keyWord, $options: "i" } },
      { customer_name: { $regex: keyWord, $options: "i" } }
    ];
  }

  // Query song song
  const [queueNumbers, total] = await Promise.all([
    QueueNumber.find(queries)
      .populate([
        { path: "service", select: "service_name" },
        { path: "device", select: "device_name" }
      ])
      .sort({ createdAt: -1 }) // ⭐ nên sort theo thời gian
      .skip((currentPage - 1) * limit)
      .limit(limit),

    QueueNumber.countDocuments(queries)
  ]);

  return {
    queueNumbers,
    total,
    page: currentPage,
    pageSize: limit,
    totalPages: Math.ceil(total / limit)
  };
};

export const updateQueueNumberService =async(id, data)=>{
    if(data.queueNumber){
        const existing = await QueueNumber.findOne({
            queueNumber: data.queueNumber,
            _id: { $ne: id }    
        });
        if (existing) throw new ApiError(409, "Số thứ tự này đã được sử dụng");
    }
    const updated = await QueueNumber.findByIdAndUpdate(id, data, { new: true });
    if(!updated){
        throw new ApiError(404,"Cập nhật số thứ tự thất bại")
    }
    return updated; 
}
export const updateStatusQueueNumberService =async(id, status)=>{
    const updated = await QueueNumber.findByIdAndUpdate(id, { status }, { new: true });
    if(!updated){
        throw new ApiError(404,"Cập nhật trạng thái số thứ tự thất bại")
    }
    io.emit("update_queue_number", {
        _id: updated._id,
        status: updated.status
    });
    return updated;
}
export const deleteQueueNumberService =async(id)=>{
    const deleted = await QueueNumber.findByIdAndDelete(id);
    if(!deleted){
        throw new ApiError(404,"Xóa số thứ tự thất bại")
    }   
    return deleted;
}

export const getQueueOverviewStatsService = async ({ fromDate, toDate } = {}) => {
  const dateFilter = {};
  if (fromDate && toDate) {
    const start = new Date(fromDate);
    const end = new Date(toDate);
    if (!isNaN(start) && !isNaN(end)) {
      dateFilter.createdAt = { $gte: start, $lte: end };
    }
  }

  const [
    totalQueue,
    waitingCount,
    processingCount,
    completedCount,
    skippedCount,
    totalServices,
    totalDevices,
    totalUsers
  ] = await Promise.all([
    QueueNumber.countDocuments(dateFilter),
    QueueNumber.countDocuments({ ...dateFilter, status: "waiting" }),
    QueueNumber.countDocuments({ ...dateFilter, status: "processing" }),
    QueueNumber.countDocuments({ ...dateFilter, status: "completed" }),
    QueueNumber.countDocuments({ ...dateFilter, status: "skipped" }),
    Service.countDocuments({ status: "active" }),
    Device.countDocuments({ status: "active" }),
    User.countDocuments()
  ]);

  return {
    totalQueue,
    waitingCount,
    processingCount,
    completedCount,
    skippedCount,
    totalServices,
    totalDevices,
    totalUsers
  };
};

export const getQueueStatsByServiceService = async ({ fromDate, toDate } = {}) => {
  const matchStage = {};
  if (fromDate && toDate) {
    const start = new Date(fromDate);
    const end = new Date(toDate);
    if (!isNaN(start) && !isNaN(end)) {
      matchStage.createdAt = { $gte: start, $lte: end };
    }
  }

  const stats = await QueueNumber.aggregate([
    { $match: matchStage },
    {
      $group: {
        _id: "$service",
        total: { $sum: 1 },
        waiting: { $sum: { $cond: [{ $eq: ["$status", "waiting"] }, 1, 0] } },
        processing: { $sum: { $cond: [{ $eq: ["$status", "processing"] }, 1, 0] } },
        completed: { $sum: { $cond: [{ $eq: ["$status", "completed"] }, 1, 0] } },
        skipped: { $sum: { $cond: [{ $eq: ["$status", "skipped"] }, 1, 0] } }
      }
    },
    {
      $lookup: {
        from: "services",
        localField: "_id",
        foreignField: "_id",
        as: "serviceInfo"
      }
    },
    { $unwind: { path: "$serviceInfo", preserveNullAndEmptyArrays: true } },
    {
      $project: {
        _id: 1,
        service_name: "$serviceInfo.service_name",
        service_code: "$serviceInfo.service_code",
        total: 1,
        waiting: 1,
        processing: 1,
        completed: 1,
        skipped: 1
      }
    }
  ]);

  return stats;
};

export const getQueueStatsByTimeService = async ({ period = 'day', fromDate, toDate } = {}) => {
  const matchStage = {};
  if (fromDate && toDate) {
    const start = new Date(fromDate);
    const end = new Date(toDate);
    if (!isNaN(start) && !isNaN(end)) {
      matchStage.createdAt = { $gte: start, $lte: end };
    }
  }

  let dateFormat = "%Y-%m-%d";
  if (period === 'hour') dateFormat = "%Y-%m-%d %H:00";
  if (period === 'month') dateFormat = "%Y-%m";
  if (period === 'year') dateFormat = "%Y";

  const stats = await QueueNumber.aggregate([
    { $match: matchStage },
    {
      $group: {
        _id: { $dateToString: { format: dateFormat, date: "$createdAt", timezone: "+07:00" } },
        total: { $sum: 1 },
        waiting: { $sum: { $cond: [{ $eq: ["$status", "waiting"] }, 1, 0] } },
        processing: { $sum: { $cond: [{ $eq: ["$status", "processing"] }, 1, 0] } },
        completed: { $sum: { $cond: [{ $eq: ["$status", "completed"] }, 1, 0] } },
        skipped: { $sum: { $cond: [{ $eq: ["$status", "skipped"] }, 1, 0] } }
      }
    },
    { $sort: { _id: 1 } },
    {
      $project: {
        time: "$_id",
        _id: 0,
        total: 1,
        waiting: 1,
        processing: 1,
        completed: 1,
        skipped: 1
      }
    }
  ]);

  return stats;
};