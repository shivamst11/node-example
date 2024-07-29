const Profile = require('../models/profile');

const getProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const data = await Profile.find({ user: userId });
    res.json({ data });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { getProfile };
