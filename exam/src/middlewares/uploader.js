import multer from "multer";
import uniqud from "uniqid";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + uniqud() + file.originalname);
  },
});

export const upload = multer({ storage });
