import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { cloudinaryUpload } from "./cloudinary.config";

const storage = new CloudinaryStorage({
  cloudinary: cloudinaryUpload,
  params: async (req, file) => {
    const folderName = req.body.folder || "general";

    const safeFolder = folderName
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9\-]/g, "");

    // ✅ get file name without extension safely
    const nameWithoutExt = file.originalname
      .split(".")
      .slice(0, -1)
      .join("-")
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9\-]/g, "");

    // ✅ create unique ID without extra extension
    const uniqueFileName = `${Math.random()
      .toString(36)
      .substring(2)}-${Date.now()}-${nameWithoutExt}`;

    return {
      folder: `myshop/${safeFolder}`,
      public_id: uniqueFileName,
      allowed_formats: ["jpg", "jpeg", "png", "webp"], // ✅ keep allowed formats
    };
  },
});

export const uploadFile = multer({ storage });
