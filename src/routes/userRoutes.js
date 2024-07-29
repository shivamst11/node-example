const express = require('express');
const userController = require('../controllers/userController');
const fileController = require('../controllers/fileController');
const { authenticateToken } = require('../middleware/authenticateToken');

const router = express.Router();

//user routes
router.get('/profile', userController.getProfile);
router.get('/files', fileController.getFiles);

module.exports = router;
