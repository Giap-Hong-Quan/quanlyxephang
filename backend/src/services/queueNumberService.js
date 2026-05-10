import ApiError from "../exceptions/ApiError.js";
import QueueNumber from "../models/QueueNumber.js";
import Service from "../models/Service.js";
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