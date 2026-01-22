import mongoose from "mongoose";

const deviceSchema = new mongoose.Schema(
    {
        device_code: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        device_name: {
            type: String,
            required: true,
            trim: true
        },
        ip_address: {
            type: String,
            required: true,
            match: [
                /^(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}$/,
                "Địa chỉ IP không hợp lệ"
            ]
        },
        status: {
            type: String,
            enum: ["active", "inactive"],
            default: "inactive"
        }
    },
    {timestamps:true,versionKey:false}
)
export default mongoose.model("Device",deviceSchema)