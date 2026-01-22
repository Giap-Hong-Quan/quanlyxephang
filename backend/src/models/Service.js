import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    service_code: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    service_name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      default: "",
      trim: true,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    }
  },
  { timestamps: true }
);

export default mongoose.model("Service", serviceSchema);
