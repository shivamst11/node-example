const express = require("express");
const userController = require("../controllers/userController");
const { authenticateToken } = require("../middleware/authenticateToken");

const router = express.Router();

//user routes
router.get("/profile", userController.getProfile);

module.exports = router;
