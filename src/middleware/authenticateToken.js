const jwt = require('jsonwebtoken');
const { isEmpty } = require('lodash');
const User = require('../models/user');

const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
      return res.sendStatus(401);
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
      if (err) {
        return res
          .status(401)
          .json({ message: 'This session has expired. Please login' });
      }

      const user = await User.findById(decoded.userId);

      const userId = decoded.userId;

      req.user = user; //{ _id: userId };
      next();
    });
  } catch (error) {
    return res.status(500).json({
      message: 'An error occurred',
      error: error.message,
    });
  }
};

module.exports = { authenticateToken };
