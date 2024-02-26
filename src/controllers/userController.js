// Dummy database (in-memory storage)

const getProfile = (req, res) => {
  // This route requires authentication
  // Access user information from req.user
  res.json({ user: req.user });
};

module.exports = { getProfile };
