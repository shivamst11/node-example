const Profile = require('../models/profile');

const getProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const data = await Profile.findOne({ user: userId });
    res.json({ data });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
const uploadProfileImage = async (req, res) => {
  try {
    // Access the uploaded file via req.file

    if (!req.files) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // File information available at req.file
    const profileImage = req.files;

    // Perform any additional processing or save file information to the database

    res.json({
      message: 'Profile image uploaded successfully',
      file: profileImage,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { getProfile, uploadProfileImage };
