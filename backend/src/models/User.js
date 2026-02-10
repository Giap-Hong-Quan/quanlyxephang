import mongoose from "mongoose";
import { type } from "os";

const userSchema = new mongoose.Schema(
    {
        full_name:{
            type:String,
            required:true,
            trim:true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        phone: { 
            type: String,
            trim: true ,
            default:null
        },
        password: {
            type: String,
            required: true,
        },
         avatar_url: {
            type: String,
            default: null,
        },
        role: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Role", 
            required: true,
        },
        lastLogin:{
            type:Date,
            default:null
        },
        isActive: {
            type: Boolean,
            default: false,
        },
        reset_token: { type: String, default: null },
        reset_token_expires: { type: Date, default: null },
    },
    {
    timestamps: true, versionKey:false  
    }
)
export default mongoose.model("User", userSchema);