import Role from "../models/Role.js";
import User from "../models/User.js";
import { hashPassword } from "../utils/password.js";
const seedData = async () => {   
    try {        
        // 1. Kiểm tra xem đã có data chưa để thoát sớm, đỡ tốn tài nguyên
        const userCount = await User.countDocuments();
        if (userCount > 0) return; 

        const roleData = [
            { name: "admin" },
            { name: "staff" },
            { name: "doctor" } // Sửa lỗi typo docter -> doctor
        ];

        let adminRoleId = null;

        // Dùng Promise.all để chạy song song cho nhanh
        const roles = await Promise.all(roleData.map(async (role) => {
            let exist = await Role.findOne({ name: role.name });
            if (!exist) {
                return await Role.create({ name: role.name });
            }
            return exist;
        }));

        const adminRole = roles.find(r => r.name === "admin");
        adminRoleId = adminRole._id;

        // 2. Tạo admin
        const adminExists = await User.findOne({ email: "admin@gmail.com" });
        if (!adminExists) {
            await User.create({
                username: "admin",
                full_name: "admin",
                email: "admin@gmail.com",
                password: hashPassword("admin"),
                role: adminRoleId,
                avatar_url: ""
            });
            console.log(" Admin created: admin@gmail.com / admin");
        }
    } catch (error) {
        console.error(" Lỗi seed dữ liệu:", error);
    }
};
 export default seedData;