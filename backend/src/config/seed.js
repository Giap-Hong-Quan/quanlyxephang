import Role from "../models/Role.js";
import User from "../models/User.js";
import { hashPassword } from "../utils/password.js";
const seedData = async () => {   
    try {        
        // 1. Kiểm tra xem đã có data chưa để thoát sớm, đỡ tốn tài nguyên
        const userCount = await User.countDocuments();
        if (userCount > 0) return; 

        const roleData = [
            { name: "admin",description:"Quản trị toàn bộ hệ thống, bao gồm thống kê, thiết bị, dịch vụ, cấp số, Cài đặt hệ thống" },
            { name: "staff",description:"Nhân viên hổ trợ tại quầy, bao gồm thống kê, cấp số, gọi số,danh sách số đã cấp, xử lý thông tin khách hàng và theo dõi trạng thái xếp hàng"},
            { name: "doctor",description:"Bác sĩ tiếp nhận và phục vụ khách theo số thứ tự, xem danh sách số đã cấp ,cấp nhật trạng thái sau khi khám " } // Sửa lỗi typo docter -> doctor
        ];

        let adminRoleId = null;

        // Dùng Promise.all để chạy song song cho nhanh
        const roles = await Promise.all(roleData.map(async (role) => {
            let exist = await Role.findOne({ name: role.name });
            if (!exist) {
                return await Role.create({ name: role.name,description:role.description});
            }
            return exist;
        }));

        const adminRole = roles.find(r => r.name === "admin");
        adminRoleId = adminRole._id;

        // 2. Tạo admin
        const adminExists = await User.findOne({ email: "admin@gmail.com" });
        if (!adminExists) {
            await User.create({
                full_name: "admin",
                email: "admin@gmail.com",
                phone:"0335906807",
                password: hashPassword("admin"),
                role: adminRoleId,
                lastLogin:new Date(),
                avatar_url: ""
            });
            console.log(" Admin created: admin@gmail.com / admin");
        }
    } catch (error) {
        console.error(" Lỗi seed dữ liệu:", error);
    }
};
 export default seedData;