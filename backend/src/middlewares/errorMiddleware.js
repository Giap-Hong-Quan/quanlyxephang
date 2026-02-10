import { ZodError } from "zod";
import ApiError from "../exceptions/ApiError.js";

export const errorHandle = (err,req,res,next)=>{
     // Nếu là lỗi Zod => trả về lỗi 400
           if (err instanceof ZodError) {
        return res.status(400).json({
            success: false,
            // Sử dụng .format() hoặc .flatten() để dữ liệu dễ đọc hơn
            message: err.flatten().fieldErrors 
        });
    }
    if(err instanceof ApiError){   
        return res.status(err.status).json({
            success:false,
            message:err.message,
        });
    }
    console.log("Lỗi không xác định:", err);
    return res.status(500).json({
        success:false,
        message:'Lỗi máy chủ nội bộ',
    });
}