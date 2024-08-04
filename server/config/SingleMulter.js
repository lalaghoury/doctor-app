import multer from "multer";
import { v4 as uuidv4 } from "uuid";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/");
  },
  filename: (req, file, cb) => {
    const uniquePrefix = uuidv4() + "-";
    cb(null, uniquePrefix + file.originalname);
  },
});

const upload = multer({ storage });

export { upload };
