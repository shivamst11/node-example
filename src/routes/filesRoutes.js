const express = require('express');
const fileController = require('../controllers/fileController');
const { s3Storage } = require('../middleware/fileUpload');

const router = express.Router();

router.get('/files', fileController.getFiles);
router.post(
  '/upload-file',
  s3Storage.single('file'),
  fileController.uploadFile
);

module.exports = router;
