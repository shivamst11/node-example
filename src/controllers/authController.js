const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

const generateAccessToken = (userId) => {
  return jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1m",
  });
};
const generateRefreshToken = (userId) => {
  return jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "3m",
  });
};

// Dummy database (in-memory storage)
const users = [];
const refreshTokens = [];

const signup = (req, res) => {
  const { username, password } = req.body;
  const id = uuidv4();
  const newUser = new User(id, username, password);
  users.push(newUser);
  res.status(201).json({ message: "User created successfully", user: newUser });
};

const signin = (req, res) => {
  // Authenticate user (e.g., verify credentials)
  const { username, password } = req.body;
  const user = users.find(
    (u) => u.username === username && u.password === password
  );
  if (!user) {
    return res.status(401).json({ message: "Invalid username or password" });
  }

  // Generate access token
  const accessToken = generateAccessToken(user.userId);
  // Generate refresh token
  const refreshToken = generateRefreshToken(user.userId);
  refreshTokens.push(refreshToken);
  // Save refresh token (in production, this should be stored securely)
  // Send tokens to client
  res.status(200).json({ accessToken, refreshToken });
};

const logout = (req, res) => {
  // Clear session or token information
  res.status(200).json({ message: "Logout successful" });
};

const refreshToken = (req, res) => {
  const refreshToken = req.body.refreshToken;
  if (!refreshToken) {
    return res.sendStatus(401);
  }
  // Verify refresh token (in production, this should be stored securely)
  if (!refreshTokens.includes(refreshToken)) {
    return res.sendStatus(403);
  }

  console.log(process.env.REFRESH_TOKEN_SECRET);
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) {
      console.log(err);
      return res.sendStatus(403);
    }
    const accessToken = generateAccessToken(user.userId);
    res.json({ accessToken });
  });
};

module.exports = { signup, signin, logout, refreshToken };
