const express = require('express');
const userController = require('../controllers/userController');
const { uploadDiskStorage } = require('../middleware/fileUpload');

const router = express.Router();

//user routes
router.get('/profile', userController.getProfile);
router.post(
  '/profile-image',
  uploadDiskStorage.single('profileImage'), // for multiple upload upload.array('profileImage', 10)
  userController.uploadProfileImage
);

module.exports = router;
