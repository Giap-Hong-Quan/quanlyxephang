import mongoose from "mongoose";

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
            required: true,
            trim: true,
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
        status: {
            type: String,
            enum: ["active", "inactive"],
            default: "inactive",
        },

         reset_token: {
            type: String,
            default: null,
        },
        reset_token_expires: {
            type: Date,
            default: null,
        },
    },
    {
    timestamps: true,   
    }
)
export default mongoose.model("User", userSchema);