import multer from "multer";

export const upload = multer({ storage: multer.memoryStorage() });  //lưu tạm vào ram
