import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { cloudinaryUpload } from "./cloudinary.config";

const storage = new CloudinaryStorage({
  cloudinary: cloudinaryUpload,
  params: async (req, file) => {
    // Example: folder name from request body or default
    const folderName = req.body.folder || "general";

    // Sanitize folder name (remove spaces and special chars)
    const safeFolder = folderName.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9\-]/g, "");

    // Clean and unique file name
    const fileName = file.originalname
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/\./g, "-")
      .replace(/[^a-z0-9\-\.]/g, "");

    const extension = file.originalname.split(".").pop();
    const uniqueFileName =
      Math.random().toString(36).substring(2) +
      "-" +
      Date.now() +
      "-" +
      fileName +
      "." +
      extension;

    return {
      folder: `myshop/${safeFolder}`, 
      public_id: uniqueFileName,
      allowed_formats: ["jpg", "jpeg", "png", "webp"],
    };
  },
});

export const uploadFile = multer({ storage });
