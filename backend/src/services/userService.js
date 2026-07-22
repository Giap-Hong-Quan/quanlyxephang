import ApiError from "../exceptions/ApiError.js";
import User from "../models/User.js";
import Role from "../models/Role.js";
import { hashPassword } from "../utils/password.js";
import { uploadToCloudinary } from "../utils/uploadCloudinary.js";

//create user
export const createUserService = async ({ full_name, username, email, phone, password, role }, file) => {
    const user = await User.findOne({ email });
    if (user) {
        throw new ApiError(409, "Tên hoặc Email này đã tồn tại");
    }

    // Resolving role ID if role string is passed (e.g. "admin", "doctor", "staff")
    let roleId = role;
    if (typeof role === 'string' && !role.match(/^[0-9a-fA-F]{24}$/)) {
        const foundRole = await Role.findOne({ name: role.toLowerCase() });
        if (foundRole) {
            roleId = foundRole._id;
        } else {
            // Default to admin or create role if missing
            const adminRole = await Role.findOne({ name: "admin" });
            if (adminRole) roleId = adminRole._id;
        }
    }

    // Hash password
    const hashedPassword = await hashPassword(password);
    let avatarUrl = null;
    if (file && file.buffer) {
        const uploadRes = await uploadToCloudinary(file.buffer);
        avatarUrl = uploadRes.secure_url;
    }

    // Create new user
    const newUser = await User.create({
        full_name,
        username: username || email.split('@')[0],
        email,
        phone,
        password: hashedPassword,
        role: roleId,
        avatar_url: avatarUrl || ""
    });

    const userResponse = newUser.toObject();
    delete userResponse.password;
    return userResponse;
};

// get all user 
export const getAllUserService = async (page = 1, pageSize = 10, filter = {}) => {
    const { roleId, search } = filter;
    const query = {};
    if (roleId) {
        query.role = roleId;
    }
    if (search) {
        query.$or = [
            { username: { $regex: search, $options: "i" } },
            { full_name: { $regex: search, $options: "i" } },
            { email: { $regex: search, $options: "i" } },
        ];
    }
    const currentPage = Math.max(1, parseInt(page));
    const limit = Math.max(1, parseInt(pageSize));
    const skip = (currentPage - 1) * limit;
    const [users, count] = await Promise.all([
        User.find(query)
            .sort({ createdAt: -1 })
            .select("-password -reset_token -reset_token_expires")
            .populate("role", "name")
            .skip(skip)
            .limit(limit)
            .lean(),
        User.countDocuments(query)
    ]);
    return {
        users,
        currentPage,
        limit,
        totalPages: Math.ceil(count / limit),
        totalUsers: count,
    };
};

// Get User by ID
export const getUserByIdService = async (userId) => {
    const user = await User.findById(userId)
        .populate("role", "name")
        .select("-password -reset_token -reset_token_expires")
        .lean();

    if (!user) {
        throw new ApiError(404, "Không tìm thấy người dùng này");
    }
    return user;
};

// Delete User by ID
export const deleteUserService = async (userId) => {
    const user = await User.findById(userId);
    if (!user) {
        throw new ApiError(404, "Người dùng không tồn tại hoặc đã bị xóa trước đó");
    }
    await User.findByIdAndDelete(userId);
};

// Update User
export const updateUserService = async (userId, data, file) => {
    const { username, full_name, email, password, role, status, phone } = data;
    const user = await User.findById(userId);
    if (!user) throw new ApiError(404, "Không tìm thấy người dùng");

    let roleId = role;
    if (typeof role === 'string' && !role.match(/^[0-9a-fA-F]{24}$/)) {
        const foundRole = await Role.findOne({ name: role.toLowerCase() });
        if (foundRole) roleId = foundRole._id;
    }

    if (username || email) {
        const existingUser = await User.findOne({
            _id: { $ne: userId },
            $or: [
                ...(username ? [{ username }] : []),
                ...(email ? [{ email }] : [])
            ]
        });
        if (existingUser) throw new ApiError(409, "Tên đăng nhập hoặc Email đã được sử dụng");
    }

    const updateData = {
        ...(username && { username }),
        ...(full_name && { full_name }),
        ...(email && { email }),
        ...(phone && { phone }),
        ...(roleId && { role: roleId }),
        ...(status && { status })
    };

    if (password) {
        updateData.password = await hashPassword(password);
    }

    if (file && file.buffer) {
        const uploadRes = await uploadToCloudinary(file.buffer);
        updateData.avatar_url = uploadRes.secure_url;
    }

    const updatedUser = await User.findByIdAndUpdate(
        userId,
        { $set: updateData },
        { new: true, runValidators: true }
    ).select("-password -reset_token -reset_token_expires").populate("role", "name");

    return updatedUser;
};
