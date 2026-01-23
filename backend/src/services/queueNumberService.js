import ApiError from "../exceptions/ApiError.js";
import QueueNumber from "../models/QueueNumber.js";
import Service from "../models/Service.js";

//create
export const createQueueNumberService = async({ customer_name, serviceId, deviceId })=>{ 
    // check dich vu
    const service = await Service.findById(serviceId);
    if (!service) throw new ApiError(404, "Dịch vụ không tồn tại");
    // lấy số cuối cùng trong ngày trước khi tạo số mới 
    const currentDay  = new Date()
    currentDay.setHours(0,0,0,0) // set về đầu ngày hôm đđó;
    const lastNumberService = await QueueNumber.findOne(
        {
            service:serviceId,
            createdAt:{$gte:currentDay}
        }
    ).sort({createdAt:-1})
    // tạo số thứ tự
    let nextCount = 1;
    if (lastNumberService) {
        // Lấy 4 số cuối của STT cũ và tăng lên 1
        const lastCount = parseInt(lastNumberService.queueNumber.replace(service.service_code, ""));
        nextCount = lastCount + 1;
    }
    // Ghép mã: KHAM + 0001 -> KHAM0001
    const nextStt = `${service.service_code}${nextCount.toString().padStart(4, '0')}`;
    // 4. Hạn sử dụng (cuối ngày)
    const expiryTime = new Date();
    expiryTime.setHours(23, 59, 59, 999);
    const newNumber = await QueueNumber.create({
        queueNumber: nextStt,
        customer_name,
        service: serviceId,
        device: deviceId,
        expiry_time: expiryTime,
        status: "waiting"
    });
    return await newNumber.populate([
        { path: "service", select: "service_name " },
        { path: "device", select: "device_name " }
    ]);
}
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