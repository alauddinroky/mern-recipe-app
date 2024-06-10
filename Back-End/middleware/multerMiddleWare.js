import multer, { diskStorage } from "multer";
import { existsSync, mkdirSync } from "fs";

const multerMiddleWare = async (req, res, next) => {
  // Multer configuration for handling file uploads
  const storage = diskStorage({
    destination: (req, file, cb) => {
      // Create a 'uploads' directory if it doesn't exist
      const dir = "./uploads";
      if (!existsSync(dir)) {
        mkdirSync(dir);
      }
      cb(null, dir);
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + "-" + file.originalname);
    },
  });
  const upload = multer({
    storage: storage,
  });
  // Export configured Multer middleware
  // export default multer({ storage: storage });
  upload.any()(req, res, (err) => {
    if (err) {
      res.status(500).json("failed to upload file");
    } else {
      next();
    }
  });
};
export default multerMiddleWare;
