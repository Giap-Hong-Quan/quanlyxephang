import ApiError from "../exceptions/ApiError.js";
import Device from "../models/Device.js";

// 1. Tạo thiết bị mới
export const createDeviceService = async (data) => {
    const existing = await Device.findOne({ device_code: data.device_code });
    if (existing) throw new ApiError(409, "Mã thiết bị đã tồn tại");
    return await Device.create(data);
};
//2 xóa 
export const deleteDeviceService = async (id) => {
    const deleted = await Device.findByIdAndDelete(id);
    if (!deleted) throw new ApiError(404, "Thiết bị không tồn tại hoặc đã bị xóa");
};
// 3. Lấy chi tiết thiết bị theo ID
export const getDeviceByIdService = async (id) => {
    const device = await Device.findById(id).lean();
    if (!device) throw new ApiError(404, "Không tìm thấy thiết bị");
    return device;
};

// 4. Lấy danh sách thiết bị (Phân trang & Tìm kiếm)
export const getAllDeviceService = async (page = 1, pageSize = 10, filter={}) => {
    const {status,search}=filter;
    const currentPage = Math.max(1, parseInt(page) || 1);
    const limit = Math.max(1, parseInt(pageSize) || 10);
    const skip = (currentPage - 1) * limit;

    const query = {};
    if(status){
        query.status=status
    }
    if (search) {
        query.$or = [
            { device_code: { $regex: search, $options: "i" } },
            { device_name: { $regex: search, $options: "i" } }
        ];
    }
    const [devices, count] = await Promise.all([
                            Device.find(query)
                            .sort({ createdAt: -1 })
                            .skip(skip)
                            .limit(limit)
                            .lean(),
                            Device.countDocuments(query)
    ]);
    return {
        devices,
        currentPage,
        limit,
        totalPages: Math.ceil(count / limit),
        totalDevices: count 
    };
};

// 4 Cập nhật thiết bị
export const updateDeviceService = async (id, data) => {
    if (data.device_code) {
        const existing = await Device.findOne({
             device_code: data.device_code,
              _id: { $ne: id }
             });
        if (existing) throw new ApiError(409, "Mã thiết bị này đã được sử dụng");
    }
    const updated = await Device.findByIdAndUpdate(
        id, 
        { $set: data }, 
        { new: true, runValidators: true });
    if (!updated) throw new ApiError(404, "Không tìm thấy thiết bị để cập nhật");
    return updated;
};