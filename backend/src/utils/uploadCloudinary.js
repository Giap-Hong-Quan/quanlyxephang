import cloudinary from "../config/cloudinary.js";

export const uploadToCloudinary = (buffer, folder = "QUANLYXEPHANG") => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      { folder, resource_type: "image" },
      (err, result) => {
        if (err) return reject(err);
        resolve(result);
      }
    ).end(buffer);
  });
};