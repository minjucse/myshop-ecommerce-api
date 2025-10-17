// src/config/multer.config.ts
import multer from "multer";
import path from "path";
import fs from "fs";

// Root directory for all uploads
const rootUploadPath = path.join(process.cwd(), "uploads");

/**
 * Decide which sub-folder to use based on the router's base URL.
 */
function resolveFolder(baseUrl: string): string {
  if (baseUrl.includes("shop")) return "shop";
  if (baseUrl.includes("product")) return "product";
  if (baseUrl.includes("banner")) return "banner";
  return "misc";
}

/**
 * Disk storage with dynamic destination and unique filenames.
 */
const storage = multer.diskStorage({
  destination: (req, _file, cb) => {
    const folder = resolveFolder(req.baseUrl);
    const fullPath = path.join(rootUploadPath, folder);

    // Make sure the folder exists
    fs.mkdirSync(fullPath, { recursive: true });
    cb(null, fullPath);
  },

  filename: (_req, file, cb) => {
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const ext = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${unique}${ext}`);
  },
});

/**
 * Allow only image files.
 */
function imageOnlyFilter(
  _req: Express.Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) {
  if (file.mimetype.startsWith("image/")) cb(null, true);
  else cb(new Error("Only image files are allowed"));
}

/**
 * Export a configured Multer instance.
 */
export const uploadFile = multer({
  storage,
  fileFilter: imageOnlyFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB limit
  },
});
