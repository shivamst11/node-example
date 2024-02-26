const express = require("express");
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");
const { authenticateToken } = require("../middleware/authenticateToken");

const router = express.Router();
//auth routes
router.post("/signup", authController.signup);
router.post("/signin", authController.signin);
router.post("/logout", authController.logout);
router.post("/refresh-token", authController.refreshToken);

module.exports = router;
