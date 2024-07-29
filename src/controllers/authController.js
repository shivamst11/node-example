const User = require('../models/user');
const jwt = require('jsonwebtoken');
const Profile = require('../models/profile');
const File = require('../models/files');

const generateAccessToken = (userId) => {
  return jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '10m',
  });
};

const generateRefreshToken = (userId) => {
  return jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: '3m',
  });
};

const signup = async (req, res) => {
  const { username, password } = req.body;
  try {
    let documentIDs = [];
    let names = ['Scouts', 'Talents', 'Talouts'];
    for (let name of names) {
      const fileObject = {
        name,
        entries: [],
      };

      const file = new File(fileObject);
      const document = await file.save();

      documentIDs.push(document._id);
    }

    const newUser = new User({ username, password, files: documentIDs });

    const userData = await newUser.save();
    const profile = new Profile({ user: userData._id, email: username });
    await profile.save();
    res
      .status(201)
      .json({ message: 'User created successfully', user: newUser.username });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const signin = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username }).exec();
    if (!user) {
      return res.json({
        isAuth: false,
        message: 'Auth failed, username not found',
      });
    }

    const isMatch = await user.comparepassword(password);

    if (!isMatch) {
      return res.json({ isAuth: false, message: "Password doesn't match" });
    }

    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);
    user.token = accessToken;

    await user.save();

    res.status(200).json({
      accessToken,
      refreshToken,
      username: user.username,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const logout = async (req, res) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  res.status(200).json({ message: 'You are logged out!' });
};

const refreshToken = (req, res) => {
  const refreshToken = req.body.refreshToken;
  if (!refreshToken) {
    return res.sendStatus(401);
  }

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) {
      console.log(err);
      return res.sendStatus(403);
    }
    const accessToken = generateAccessToken(user.userId);
    const newRefreshToken = generateRefreshToken(user.userId);
    res.json({ accessToken, refreshToken: newRefreshToken });
  });
};

module.exports = { signup, signin, logout, refreshToken };
