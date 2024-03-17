import multer from "multer";
import { nanoid } from "nanoid";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import ApiError from "./apiError.js";
import { log } from "console";

export const filesValidation = {
  image: ["image/gif", "image/png", "image/jpeg", "image/bmp", "image/jpg"],
};

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const fileUploads = (fileTypesValidation = [], __path = "general") => {
  const fullPath = path.join(__dirname, `../uploads/${__path}`);
  console.log(fullPath);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
  }
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, fullPath);
    },
    filename: (req, file, cb) => {
      const fullName = nanoid() + file.originalname;
      file.image = `${__path}/${fullName}`;
      cb(null, fullName);
    },
  });

  const fileFilter = (req, file, cb) => {
    if (fileTypesValidation.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new ApiError("in-valid file type", 400), false);
    }
  };
  const uploads = multer({ fileFilter, storage });
  return uploads;
};
export default fileUploads;
