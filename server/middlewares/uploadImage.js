import multer from "multer";
import path from "path";

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Set the destination folder for file uploads
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: (req, file, cb) => {
    // Set the filename for uploaded files
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// Configure multer upload settings
const uploadPic = multer({
  storage: storage,
  limits: {
    fileSize: 1 * 1000000, // Set the maximum file size to 1MB
  },
  fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname);
    // Check if the file extension is allowed (only allow .png, .jpg, and .jpeg)
    if (ext !== ".png" && ext !== ".jpg" && ext !== ".jpeg") {
      // If the file extension is not allowed, reject the file
      return cb(new Error("Only .png, .jpg, and .jpeg files are allowed"));
    }
    // If the file extension is allowed, accept the file
    cb(null, true);
  },
});

export default uploadPic;
