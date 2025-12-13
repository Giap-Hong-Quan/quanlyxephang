import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "QUANLYXEPHANG",
    resource_type: "image", // nhận tất cả file ảnh
  },
});
// Nhận đúng 1 ảnh → tạo hàm export
export const upload = multer({ storage });

// Factory function → dùng theo kiểu uploadSingle("avatar")
export const uploadSingle = (fieldName) => upload.single(fieldName);