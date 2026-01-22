import Role from "../models/Role.js";
import User from "../models/User.js";
import { hashPassword } from "../utils/password.js";

const seedData = async () => {  
    try {        
        const roleData=[
            {name: "admin"},
            {name: "staff"},
            {name:"docter"}
        ]
        let adminRoleId = null;
        for (const role of roleData) {
            let exist = await Role.findOne({ name: role.name });
            if (!exist) {
                const created = await Role.create({
                name: role.name,
                });
                if (role.name === "admin") adminRoleId = created._id;
            } else {
                adminRoleId = exist._id;
            }
        }
        const adminExists = await User.findOne({ email: "admin@gmail.com" });
          if (!adminExists) {
            await User.create({
                username: "admin",
                full_name:"admin",
                email:"admin@gmail.com",
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