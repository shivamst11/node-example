const express = require('express');
const {
  signup,
  signin,
  logout,
  refreshToken,
} = require('../controllers/authController');

const router = express.Router();

//auth routes
router.post('/signup', signup);
router.post('/signin', signin);
router.post('/logout', logout);
router.post('/refresh-token', refreshToken);

module.exports = router;
