import mongoose from "mongoose";

const queueNumberSchema =new mongoose.Schema(
    {
        queueNumber: {
            type: String, // Định dạng: ma dichvu + số thư tự
            required: true,
            unique: true,
        },
        customer_name: {
            type: String,
            required: true,
            trim: true,
        },
        service: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Service",
            required: true,
        },
        device: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Device",
            required: true,
        },
        issue_time: {
            type: Date,
            default: Date.now,
        },
        expiry_time: {
            type: Date,
            required: true,
        },
        status: {
            type: String,
            enum: ["waiting", "processing", "completed", "skipped"], 
            // waiting: Đang chờ (mới cấp)
            // processing: Đang sử dụng (đang khám)
            // completed: Đã xong
            // skipped: Bỏ qua (gọi không có)
            default: "waiting",
        },
    },{timestamps: true, versionKey: false}
)
export default mongoose.model("QueueNumber",queueNumberSchema)