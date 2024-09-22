// for storing in disk
const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Directory to save uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Unique file name
  },
});

const uploadDiskStorage = multer({ storage: storage });

// aws s3

const AWS = require('aws-sdk');
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const cloudStorage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  }
  cb(null, false);
};

const s3Storage = multer({
  storage: cloudStorage,
  fileFilter,
  limits: { fileSize: 1024 * 1024 * 3 }, // 3mb limit
});

module.exports = { uploadDiskStorage, s3Storage, s3 };
