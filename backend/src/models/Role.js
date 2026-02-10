import mongoose from "mongoose";

const roleSchema =new mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
            unique:true,
            trim:true,
        },
        description: String,
        isSystem: {           // true thì role đó k đc xóa sửa 
            type: Boolean,
            default: false 
        }
    },
    {
        timestamps:true,versionKey:false
    }
)
export default mongoose.model("Role",roleSchema);