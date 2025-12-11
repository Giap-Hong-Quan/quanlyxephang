import ApiError from "../exceptions/ApiError.js";

export const errorHandle = (err,req,res,next)=>{
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