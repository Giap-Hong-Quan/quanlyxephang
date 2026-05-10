import { createQueueNumberService, deleteQueueNumberService, getAllQueueNumberService, getQueueNumberByIdService, updateQueueNumberService } from "../services/queueNumberService.js";
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
export const getAllQueueNumberController =async(req,res,next)=>{
    try {
        const { page, pageSize,status,device,fromDate,toDate,keyWord } = req.query;
        if(fromDate && toDate && new Date(fromDate) > new Date(toDate)){
            return res.status(400).json({
                message:"Ngày bắt đầu phải trước ngày kết thúc"
            })
        }
        const result = await getAllQueueNumberService({page, pageSize,status,device,fromDate,toDate,keyWord})
        success(res,result,"Lấy danh sách cấp số thành công",200)  

    } catch (error) {
        next(error)
    }
}
export const updateQueueNumberController =async(req,res,next)=>{
    try {
        const result = await updateQueueNumberService(req.params.id, req.body)
        success(res,result,"Cập nhật số thứ tự thành công",200)
    } catch (error) {
        next(error)
    }   
}
export const deleteQueueNumberController =async(req,res,next)=>{
    try {
        const result = await deleteQueueNumberService(req.params.id)
        success(res,result,"Xóa số thứ tự thành công",200)
    } catch (error) {
        next(error)
    }   
}
export const updateQueueNumberStatusController =async(req,res,next)=>{
    try {
        const { status } = req.body;
        if(!status){
            return res.status(400).json({
                message:"Vui lòng nhập trạng thái mới"
            })
        }       
        const result = await updateQueueNumberStatusService(req.params.id, status)
        success(res,result,"Cập nhật trạng thái số thứ tự thành công",200)
    } catch (error) {
        next(error)
    }   
}