import ApiError from "../exceptions/ApiError.js";
import Service from "../models/Service.js";

// 1. Tạo dịch vụ mới
export const createServiceItemService = async (data) => {
    const existingCode = await Service.findOne({ service_code: data.service_code });
    if (existingCode) throw new ApiError(409, "Mã dịch vụ đã tồn tại");

    const existingName = await Service.findOne({ service_name: data.service_name });
    if (existingName) throw new ApiError(409, "Tên dịch vụ này đã tồn tại");

    return await Service.create(data);
};

// 2. Lấy danh sách dịch vụ (Phân trang, Lọc, Tìm kiếm)
export const getAllServiceItemsService = async (page = 1, pageSize = 10, filter = {}) => {
    const { status, search } = filter;
    const currentPage = Math.max(1, parseInt(page) || 1);
    const limit = Math.max(1, parseInt(pageSize) || 10);
    const skip = (currentPage - 1) * limit;

    const query = {};
    if (status) query.status = status;
    if (search) {
        query.$or = [
            { service_code: { $regex: search, $options: "i" } },
            { service_name: { $regex: search, $options: "i" } }
        ];
    }

    const [services, count] = await Promise.all([
        Service.find(query)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .lean(),
        Service.countDocuments(query)
    ]);

    return {
        services,
        currentPage,
        limit,
        totalPages: Math.ceil(count / limit),
        totalServices: count
    };
};

// 3. Lấy chi tiết dịch vụ theo ID
export const getServiceItemByIdService = async (id) => {
    const service = await Service.findById(id).lean();
    if (!service) throw new ApiError(404, "Không tìm thấy dịch vụ");
    return service;
};

// 4. Cập nhật dịch vụ
export const updateServiceItemService = async (id, data) => {
    if (data.service_code || data.service_name) {
        const existing = await Service.findOne({
            _id: { $ne: id },
            $or: [
                { service_code: data.service_code },
                { service_name: data.service_name }
            ]
        });
        if (existing) throw new ApiError(409, "Mã hoặc Tên dịch vụ này đã được sử dụng");
    }

    const updated = await Service.findByIdAndUpdate(
        id,
        { $set: data },
        { new: true, runValidators: true }
    );
    if (!updated) throw new ApiError(404, "Không tìm thấy dịch vụ để cập nhật");
    return updated;
};

// 5. Xóa dịch vụ
export const deleteServiceItemService = async (id) => {
    const deleted = await Service.findByIdAndDelete(id);
    if (!deleted) throw new ApiError(404, "Dịch vụ không tồn tại hoặc đã bị xóa");
};