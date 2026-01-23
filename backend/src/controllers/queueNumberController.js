import { createQueueNumberService, getQueueNumberByIdService } from "../services/queueNumberService.js";
import { success } from "../utils/success.js";

export const createQueueNumberController =async(req,res,next)=>{
  try {
    const { customer_name, serviceId, deviceId }=req.body;
    if(!customer_name||!serviceId||!deviceId){
        return res.status(400).json({
            message:"Vui lòng nhập đầy đủ"
        })
    }
    const result = await createQueueNumberService(req.body);
    success(res,result,"Cấp số thành công",201)
  } catch (error) {
    next(error)
  }  
}

export const getQueueNumberByIdController =async(req,res,next)=>{
    try {
        const result =await getQueueNumberByIdService(req.params.id)
        success(res,result,"Lấy chi tiết cấp sô thành công",200)
    } catch (error) {
        next(error)
    }
}