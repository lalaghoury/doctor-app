const multer = require("multer");
const { v4: uuidv4 } = require("uuid");

// Making a storage Variable
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    const uniquePrefix = uuidv4() + "-";
    cb(null, uniquePrefix + file.originalname);
  },
});

// Making a upload Variable
const upload = multer({ storage: storage });

module.exports = { upload };
