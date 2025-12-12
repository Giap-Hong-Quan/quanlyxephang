import Permission from "../models/Permission.js";
import Role from "../models/Role.js";
import User from "../models/User.js";
import { hashPassword } from "../utils/password.js";

const seedData = async () => {  
    try {
        const PERMISSION = [
        { name: "view_dashboard", description: "Xem dashboard báo cáo" },
        { name: "manage_devices", description: "Quản lý thiết bị" },
        { name: "manage_services", description: "Quản lý dịch vụ" },
        { name: "issue_queue_number", description: "Cấp số và gọi số khách hàng" },
        { name: "view_reports", description: "Xem báo cáo thống kê" },
        { name: "system_settings", description: "Quản lý cài đặt hệ thống" }
        ];
        const permissionDocs = [];
        for (const per of PERMISSION) {
            const exist = await Permission.findOne({ name: per.name });
            if (!exist) {
                const created = await Permission.create(per);
                permissionDocs.push(created);
            } else {
                permissionDocs.push(exist);
            }
        }
         // Helper lấy permission id theo tên
        const getId = (name) => permissionDocs.find(p => p.name === name)._id;
        
        const roleData=[
             {
                name: "admin",
                permissions: permissionDocs.map((p) => p._id), // Full quyền
            },
            {
                name: "staff",
                permissions: [
                getId("view_dashboard"),
                getId("issue_queue_number"),
                ],
            },
        ]
        let adminRoleId = null;
        for (const role of roleData) {
            let exist = await Role.findOne({ name: role.name });
            if (!exist) {
                const created = await Role.create({
                name: role.name,
                permissions: role.permissions,
                });
                if (role.name === "admin") adminRoleId = created._id;
            } else {
                adminRoleId = exist._id;
            }
        }
        const adminExists = await User.findOne({ email: "admin@gmail.com" });
          if (!adminExists) {
            await User.create({
                full_name: "Admin",
                email:"admin@gmail.com",
                phone: "0123456789",
                password: hashPassword("admin"),
                role: adminRoleId,
                avatar_url:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwk4R-qESlPq8lZz2mn3BcbVVROHU7-WxvU7nKNf1cDBZcOReoDuAnzKYOUBkN4UBGmcY&usqp=CAU",
            });

            console.log("Admin tạo với: admin@gmail.com / admin");
            } else {
            console.log("ℹ admin đã sẳn sàng ");
            }
    } catch (error) {
         console.error("Lỗi seed dữ liệu:", error);
    }
 }
 export default seedData;